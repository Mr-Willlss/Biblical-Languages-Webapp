import { LangManager, LANG_CONFIGS } from "./language-manager.js";
import { icon, renderAppShell, renderIcons, safeText, showToast } from "./app.js?v=20260710-mobile-admin";
import { requireAuth } from "./auth-guard.js?v=20260710-sync-all";
import { initFirestore } from "./firebase-config.js?v=20260703-retention";

const AVATAR_COLORS = ["#ef5b55", "#168c88", "#d28b24", "#4969a8", "#8b5aa8", "#33453f"];
const signedInUser = await requireAuth();
const { user, root } = renderAppShell({ page: "profile", title: "Profile", currentUser: signedInUser });
const localKey = `blq_social_profile:${user.uid}`;
let profileDirty = false;
let unsubscribeProfile = null;

function localProfile() {
  try { return JSON.parse(localStorage.getItem(localKey) || "{}"); }
  catch { return {}; }
}

function fallbackProfile() {
  return {
    displayName: user.displayName || "Language Learner",
    username: "",
    bio: "",
    studyGoal: "Read Scripture in the original languages",
    location: "",
    avatarColor: AVATAR_COLORS[1],
    activeLanguage: LangManager.get(),
    publicProfile: true,
    allowFriendRequests: true,
    ...localProfile()
  };
}

function normalizeProfile(data = {}, fallback = fallbackProfile()) {
  const source = data.profile || {};
  return {
    ...fallback,
    displayName: source.displayName || data.displayName || fallback.displayName,
    username: source.username || data.username || fallback.username,
    bio: source.bio || data.bio || fallback.bio,
    studyGoal: source.studyGoal || data.studyGoal || fallback.studyGoal,
    location: source.location || data.location || fallback.location,
    avatarColor: source.avatarColor || data.avatarColor || fallback.avatarColor,
    activeLanguage: source.activeLanguage || data.activeLanguage || data.language || fallback.activeLanguage,
    publicProfile: source.publicProfile ?? source.isProfilePublic ?? data.publicProfile ?? fallback.publicProfile,
    allowFriendRequests: source.allowFriendRequests ?? data.allowFriendRequests ?? fallback.allowFriendRequests,
    photoURL: source.photoURL || data.photoURL || user.photoURL || ""
  };
}

async function loadCloudProfile(fallback) {
  try {
    const state = await initFirestore();
    if (state.mode !== "firebase") return null;
    const sdk = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js");
    const snapshot = await sdk.getDoc(sdk.doc(state.db, "users", user.uid));
    return snapshot.exists() ? normalizeProfile(snapshot.data(), fallback) : null;
  } catch (error) {
    console.warn("Cloud profile unavailable; using local profile:", error);
    return null;
  }
}

async function watchCloudProfile(fallback) {
  try {
    const state = await initFirestore();
    if (state.mode !== "firebase") return;
    const sdk = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js");
    if (unsubscribeProfile) unsubscribeProfile();
    unsubscribeProfile = sdk.onSnapshot(sdk.doc(state.db, "users", user.uid), (snapshot) => {
      if (!snapshot.exists() || profileDirty) return;
      const synced = normalizeProfile(snapshot.data(), fallback);
      localStorage.setItem(localKey, JSON.stringify(synced));
      LangManager.set(synced.activeLanguage, false);
      render(synced);
    }, (error) => console.warn("Live profile sync unavailable:", error));
  } catch (error) {
    console.warn("Live profile sync unavailable:", error);
  }
}

function initials(name) {
  return String(name || "BL").split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

function render(profile) {
  root.innerHTML = `
    <div class="social-profile-page">
      <section class="profile-preview">
        <div class="profile-avatar" id="profile-avatar" style="--avatar:${safeText(profile.avatarColor)}">${safeText(initials(profile.displayName))}</div>
        <div class="profile-identity">
          <span class="challenge-language">Public study identity</span>
          <h2 id="profile-preview-name">${safeText(profile.displayName)}</h2>
          <p id="profile-preview-handle">${profile.username ? `@${safeText(profile.username)}` : "Choose a username so friends can find you"}</p>
          <p id="profile-preview-bio">${safeText(profile.bio || profile.studyGoal)}</p>
          <div class="profile-meta">
            <span>${icon("book-open")} ${safeText(LANG_CONFIGS[profile.activeLanguage]?.label || "Biblical Languages")}</span>
            ${profile.location ? `<span>${icon("map-pin")} ${safeText(profile.location)}</span>` : ""}
          </div>
        </div>
        <div class="profile-actions">
          <a class="btn btn-ghost" href="friends.html">${icon("users", "Find friends")}</a>
          <a class="btn btn-ghost" href="settings.html">${icon("settings", "Settings")}</a>
        </div>
      </section>

      <section class="profile-editor">
        <div class="profile-form">
          <div class="section-title"><div><span class="path-label">Identity</span><h3>Edit profile</h3></div><span class="save-state" id="save-state">Saved across devices</span></div>
          <div class="profile-fields">
            <div class="field"><label for="display-name">Display name</label><input id="display-name" maxlength="40" value="${safeText(profile.displayName)}"></div>
            <div class="field"><label for="username">Username</label><div class="input-prefix"><span>@</span><input id="username" maxlength="24" value="${safeText(profile.username)}" placeholder="samuel_reads"></div><small>Letters, numbers, and underscores only.</small></div>
            <div class="field field-wide"><label for="bio">Bio</label><textarea id="bio" maxlength="180" rows="3" placeholder="What are you studying?">${safeText(profile.bio)}</textarea></div>
            <div class="field"><label for="study-goal">Study goal</label><input id="study-goal" maxlength="80" value="${safeText(profile.studyGoal)}"></div>
            <div class="field"><label for="location">Location</label><input id="location" maxlength="50" value="${safeText(profile.location)}" placeholder="Lagos, Nigeria"></div>
          </div>

          <div class="profile-section">
            <label>Avatar color</label>
            <div class="avatar-swatches">${AVATAR_COLORS.map((color) => `<button class="avatar-swatch ${color === profile.avatarColor ? "active" : ""}" style="--swatch:${color}" data-avatar-color="${color}" type="button" aria-label="Use avatar color ${color}"></button>`).join("")}</div>
          </div>

          <div class="profile-section">
            <label>Primary course</label>
            <div class="tabs">${Object.values(LANG_CONFIGS).map((cfg) => `<button class="tab-btn ${cfg.lang === profile.activeLanguage ? "active" : ""}" data-profile-lang="${cfg.lang}" type="button">${cfg.logo} ${cfg.shortLabel}</button>`).join("")}</div>
          </div>

          <div class="privacy-options">
            <label class="setting-row"><span><strong>Public profile</strong><small>Let learners see your bio, level, and study language.</small></span><input id="public-profile" type="checkbox" ${profile.publicProfile ? "checked" : ""}></label>
            <label class="setting-row"><span><strong>Friend requests</strong><small>Allow learners to invite you to their study circle.</small></span><input id="friend-requests" type="checkbox" ${profile.allowFriendRequests ? "checked" : ""}></label>
          </div>

          <button class="btn btn-primary profile-save" id="save-profile" type="button">${icon("save", "Save profile")}</button>
        </div>
      </section>
    </div>`;

  let avatarColor = profile.avatarColor;
  let activeLanguage = profile.activeLanguage;
  const updatePreview = () => {
    const name = document.getElementById("display-name").value.trim() || "Language Learner";
    document.getElementById("profile-preview-name").textContent = name;
    document.getElementById("profile-preview-handle").textContent = document.getElementById("username").value.trim() ? `@${document.getElementById("username").value.trim()}` : "Choose a username so friends can find you";
    document.getElementById("profile-preview-bio").textContent = document.getElementById("bio").value.trim() || document.getElementById("study-goal").value.trim();
    document.getElementById("profile-avatar").textContent = initials(name);
  };
  ["display-name", "username", "bio", "study-goal", "location", "public-profile", "friend-requests"].forEach((id) => document.getElementById(id).addEventListener("input", () => {
    profileDirty = true;
    updatePreview();
  }));
  document.querySelectorAll("[data-avatar-color]").forEach((button) => button.addEventListener("click", () => {
    profileDirty = true;
    avatarColor = button.dataset.avatarColor;
    document.querySelectorAll("[data-avatar-color]").forEach((item) => item.classList.toggle("active", item === button));
    document.getElementById("profile-avatar").style.setProperty("--avatar", avatarColor);
  }));
  document.querySelectorAll("[data-profile-lang]").forEach((button) => button.addEventListener("click", () => {
    profileDirty = true;
    activeLanguage = button.dataset.profileLang;
    document.querySelectorAll("[data-profile-lang]").forEach((item) => item.classList.toggle("active", item === button));
  }));
  document.getElementById("save-profile").addEventListener("click", async () => {
    const username = document.getElementById("username").value.trim().toLowerCase();
    if (username && !/^[a-z0-9_]{3,24}$/.test(username)) {
      showToast("Username must be 3-24 letters, numbers, or underscores.", "error");
      return;
    }
    const next = {
      displayName: document.getElementById("display-name").value.trim() || "Language Learner",
      username,
      usernameLower: username,
      bio: document.getElementById("bio").value.trim(),
      studyGoal: document.getElementById("study-goal").value.trim(),
      location: document.getElementById("location").value.trim(),
      avatarColor,
      activeLanguage,
      publicProfile: document.getElementById("public-profile").checked,
      allowFriendRequests: document.getElementById("friend-requests").checked
    };
    localStorage.setItem(localKey, JSON.stringify(next));
    const button = document.getElementById("save-profile");
    button.disabled = true;
    document.getElementById("save-state").textContent = "Saving...";
    try {
      const state = await initFirestore();
      if (state.mode === "firebase") {
        const authSdk = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js");
        const storeSdk = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js");
        await authSdk.updateProfile(state.auth.currentUser, { displayName: next.displayName });
        await storeSdk.setDoc(storeSdk.doc(state.db, "users", user.uid), {
          displayName: next.displayName,
          activeLanguage: next.activeLanguage,
          profile: {
            ...next,
            photoURL: user.photoURL || "",
            updatedAt: storeSdk.serverTimestamp()
          },
          lastActiveAt: storeSdk.serverTimestamp(),
          profileUpdatedAt: storeSdk.serverTimestamp()
        }, { merge: true });
      }
      LangManager.set(activeLanguage, false);
      document.getElementById("save-state").textContent = "Saved across devices";
      showToast("Profile saved.", "success");
      profileDirty = false;
    } catch (error) {
      console.warn("Cloud profile save unavailable:", error);
      document.getElementById("save-state").textContent = "Saved on this device";
      showToast("Saved locally. Cloud sync will retry when available.", "info");
    } finally {
      button.disabled = false;
    }
  });
  renderIcons();
}

const initialProfile = fallbackProfile();
render(initialProfile);
void loadCloudProfile(initialProfile).then((cloudProfile) => {
  if (!cloudProfile || profileDirty) return;
  localStorage.setItem(localKey, JSON.stringify(cloudProfile));
  LangManager.set(cloudProfile.activeLanguage, false);
  render(cloudProfile);
});
void watchCloudProfile(initialProfile);
