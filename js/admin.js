import { requireAuth } from "./auth-guard.js?v=20260710-admin-spark";
import { initFirestore } from "./firebase-config.js?v=20260701-authfix2";
import {
  formatXP,
  icon,
  renderAppShell,
  renderIcons,
  safeText,
  showToast
} from "./app.js?v=20260710-admin";

const BOOTSTRAP_ADMIN_EMAIL = "samiduvimo@gmail.com";

const state = {
  firebase: null,
  currentUser: null,
  data: null,
  loading: false
};

function number(value) {
  return Number(value || 0).toLocaleString();
}

function percent(value) {
  return `${Math.round(Number(value || 0))}%`;
}

function isBootstrapAdmin(user) {
  return String(user?.email || "").trim().toLowerCase() === BOOTSTRAP_ADMIN_EMAIL;
}

function toMillis(value) {
  if (!value) return null;
  if (typeof value === "number") return value;
  if (typeof value.toMillis === "function") return value.toMillis();
  if (typeof value.toDate === "function") return value.toDate().getTime();
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function formatDate(value) {
  const millis = toMillis(value);
  if (!millis) return "Not recorded";
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(millis));
}

function asNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function normalizeUser(id, data = {}) {
  const profile = data.profile || {};
  const stats = data.stats || {};
  const social = data.social || {};
  const xpGreek = asNumber(stats.xp_greek ?? data.xp_greek);
  const xpHebrew = asNumber(stats.xp_hebrew ?? data.xp_hebrew);
  const totalXp = asNumber(stats.totalXp ?? data.xp_total, xpGreek + xpHebrew);
  const email = data.email || "";
  const isAdmin = data.isAdmin === true || data.role === "admin" || email.toLowerCase() === BOOTSTRAP_ADMIN_EMAIL;
  return {
    uid: data.uid || id,
    displayName: profile.displayName || data.displayName || "Language Learner",
    username: profile.username || data.username || "",
    email,
    activeLanguage: data.activeLanguage || data.language || profile.activeLanguage || "greek",
    isAdmin,
    role: isAdmin ? "admin" : data.role || "student",
    stats: {
      totalXp,
      xp_greek: xpGreek,
      xp_hebrew: xpHebrew,
      level: asNumber(stats.level, Math.max(1, Math.floor(totalXp / 50) + 1)),
      totalLessonsCompleted: asNumber(stats.totalLessonsCompleted),
      accuracy: asNumber(stats.accuracy ?? data.accuracy)
    },
    social: {
      weeklyXp: asNumber(social.weeklyXp),
      lastActiveAt: data.updatedAt || data.lastActiveAt || social.lastLessonCompletedAt || data.profileUpdatedAt
    }
  };
}

function summarizeUsers(users) {
  return users.reduce((summary, user) => {
    summary.students += user.isAdmin ? 0 : 1;
    summary.admins += user.isAdmin ? 1 : 0;
    summary.greek.students += user.activeLanguage === "greek" ? 1 : 0;
    summary.hebrew.students += user.activeLanguage === "hebrew" ? 1 : 0;
    summary.greek.xp += user.stats.xp_greek;
    summary.hebrew.xp += user.stats.xp_hebrew;
    summary.greek.lessons += user.stats.xp_greek > 0 ? user.stats.totalLessonsCompleted : 0;
    summary.hebrew.lessons += user.stats.xp_hebrew > 0 ? user.stats.totalLessonsCompleted : 0;
    return summary;
  }, {
    students: 0,
    admins: 0,
    greek: { students: 0, xp: 0, lessons: 0 },
    hebrew: { students: 0, xp: 0, lessons: 0 }
  });
}

function getCourseProgress(course) {
  const students = Number(course?.students || 0);
  const lessons = Number(course?.lessons || 0);
  if (!students) return 0;
  return Math.min(100, Math.round((lessons / (students * 25)) * 100));
}

function renderMetric(label, value, iconName) {
  return `
    <article class="admin-metric">
      <div class="admin-metric-icon">${icon(iconName)}</div>
      <div>
        <span>${safeText(label)}</span>
        <strong>${safeText(value)}</strong>
      </div>
    </article>`;
}

function renderCourseCard(key, course) {
  const progress = getCourseProgress(course);
  return `
    <article class="admin-course">
      <div class="admin-course-head">
        <div>
          <span class="eyebrow">${key === "greek" ? "Greek path" : "Hebrew path"}</span>
          <h3>${safeText(course.label)}</h3>
        </div>
        <strong>${number(course.students)} students</strong>
      </div>
      <div class="progress-bar" aria-label="${safeText(course.label)} progress">
        <span style="width:${progress}%"></span>
      </div>
      <dl class="admin-course-stats">
        <div><dt>Total XP</dt><dd>${formatXP(course.xp)}</dd></div>
        <div><dt>Average XP</dt><dd>${formatXP(course.averageXp)}</dd></div>
        <div><dt>Lesson momentum</dt><dd>${percent(progress)}</dd></div>
      </dl>
    </article>`;
}

function renderUsers(users = []) {
  if (!users.length) return `<div class="empty-state">No students match this search.</div>`;
  return `
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Course</th>
            <th>Greek</th>
            <th>Hebrew</th>
            <th>Accuracy</th>
            <th>Last active</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          ${users.map((user) => `
            <tr>
              <td>
                <strong>${safeText(user.displayName)}</strong>
                <span>${safeText(user.username || user.email || user.uid)}</span>
              </td>
              <td>${safeText(user.activeLanguage === "hebrew" ? "Hebrew" : "Greek")}</td>
              <td>${formatXP(user.stats.xp_greek)}</td>
              <td>${formatXP(user.stats.xp_hebrew)}</td>
              <td>${user.stats.accuracy ? percent(user.stats.accuracy) : "New"}</td>
              <td>${safeText(formatDate(user.social.lastActiveAt))}</td>
              <td><span class="role-pill ${user.isAdmin ? "admin" : ""}">${user.isAdmin ? "Admin" : "Student"}</span></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>`;
}

function renderDashboard() {
  const root = document.getElementById("page-root");
  const data = state.data;
  root.innerHTML = `
    <section class="admin-page">
      <div class="admin-hero">
        <div>
          <span class="eyebrow">Protected portal</span>
          <h2>Student progress and admin control</h2>
          <p>Monitor Greek and Hebrew learning activity, inspect essential student records, and manage who can access this portal.</p>
        </div>
        <button class="btn btn-secondary" type="button" id="refresh-admin">${icon("refresh-cw", "Refresh")}</button>
      </div>

      <section class="admin-metrics" aria-label="Platform totals">
        ${renderMetric("Students", number(data.totals.students), "users")}
        ${renderMetric("Admins", number(data.totals.admins), "shield-check")}
        ${renderMetric("Greek learners", number(data.courses.greek.students), "omega")}
        ${renderMetric("Hebrew learners", number(data.courses.hebrew.students), "languages")}
      </section>

      <section class="admin-courses" aria-label="Course statistics">
        ${renderCourseCard("greek", data.courses.greek)}
        ${renderCourseCard("hebrew", data.courses.hebrew)}
      </section>

      <section class="admin-panel">
        <div class="section-head">
          <div>
            <span class="eyebrow">Students</span>
            <h2>Student information</h2>
          </div>
          <form id="student-search" class="admin-search">
            <input id="student-search-input" type="search" placeholder="Search name, email, uid, or course" autocomplete="off">
            <button class="btn btn-primary" type="submit">${icon("search", "Search")}</button>
          </form>
        </div>
        ${renderUsers(data.users)}
      </section>

      <section class="admin-panel admin-form-panel">
        <div>
          <span class="eyebrow">Permissions</span>
          <h2>Add or remove an admin</h2>
          <p>Use a learner email or uid. On the Spark plan this updates Firestore admin status; Cloud Functions custom claims can be added later when Blaze is enabled.</p>
        </div>
        <form id="admin-member-form" class="admin-member-form">
          <label>Email<input name="email" type="email" placeholder="student@example.com"></label>
          <label>UID<input name="targetUid" type="text" placeholder="Optional if email is known"></label>
          <label>Display name<input name="displayName" type="text" placeholder="Optional"></label>
          <label>Username<input name="username" type="text" placeholder="Optional"></label>
          <label class="checkbox-row"><input name="makeAdmin" type="checkbox" checked> Grant admin access</label>
          <button class="btn btn-primary" type="submit">${icon("shield-plus", "Save admin")}</button>
        </form>
      </section>
    </section>`;
  bindDashboardEvents();
  renderIcons();
}

function renderDenied(errorMessage = "Admin access is required for this page.") {
  const root = document.getElementById("page-root");
  root.innerHTML = `
    <section class="admin-denied">
      <div class="admin-denied-card">
        <span class="denied-icon">${icon("lock-keyhole")}</span>
        <span class="eyebrow">Admin only</span>
        <h2>This portal is hidden from students.</h2>
        <p>${safeText(errorMessage)}</p>
        <a class="btn btn-secondary" href="dashboard.html">${icon("arrow-left", "Back to home")}</a>
      </div>
    </section>`;
  renderIcons();
}

function buildDashboard(users, search = "") {
  let filtered = users;
  const normalizedSearch = search.trim().toLowerCase();
  if (normalizedSearch) {
    filtered = users.filter((user) => [
      user.displayName,
      user.username,
      user.email,
      user.uid,
      user.activeLanguage
    ].some((value) => String(value || "").toLowerCase().includes(normalizedSearch)));
  }
  const totals = summarizeUsers(users);
  return {
    totals,
    courses: {
      greek: {
        label: "Koine Greek",
        students: totals.greek.students,
        xp: totals.greek.xp,
        lessons: totals.greek.lessons,
        averageXp: totals.greek.students ? Math.round(totals.greek.xp / totals.greek.students) : 0
      },
      hebrew: {
        label: "Biblical Hebrew",
        students: totals.hebrew.students,
        xp: totals.hebrew.xp,
        lessons: totals.hebrew.lessons,
        averageXp: totals.hebrew.students ? Math.round(totals.hebrew.xp / totals.hebrew.students) : 0
      }
    },
    users: filtered.slice(0, 100)
  };
}

async function getFirestoreTools() {
  if (state.firebase) return state.firebase;
  const firebaseState = await initFirestore();
  if (firebaseState.mode !== "firebase") throw new Error("Firebase is not configured.");
  const sdk = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js");
  state.firebase = { ...firebaseState, sdk };
  return state.firebase;
}

async function ensureBootstrapProfile() {
  if (!isBootstrapAdmin(state.currentUser)) return;
  const { db, sdk } = await getFirestoreTools();
  await sdk.setDoc(sdk.doc(db, "users", state.currentUser.uid), {
    uid: state.currentUser.uid,
    email: state.currentUser.email || BOOTSTRAP_ADMIN_EMAIL,
    role: "admin",
    isAdmin: true,
    profile: {
      displayName: state.currentUser.displayName || "Sammie",
      username: "Sammie",
      usernameLower: "sammie",
      photoURL: state.currentUser.photoURL || ""
    },
    updatedAt: sdk.serverTimestamp()
  }, { merge: true }).catch((error) => {
    console.warn("Bootstrap admin profile sync skipped:", error);
  });
}

async function loadDashboard(search = "") {
  if (state.loading) return;
  state.loading = true;
  const root = document.getElementById("page-root");
  root.innerHTML = `<section class="loading-panel"><span class="spinner"></span><strong>Loading admin portal...</strong></section>`;
  try {
    const { db, sdk } = await getFirestoreTools();
    await ensureBootstrapProfile();
    const snapshot = await sdk.getDocs(sdk.query(sdk.collection(db, "users"), sdk.limit(2000)));
    const users = snapshot.docs.map((docSnap) => normalizeUser(docSnap.id, docSnap.data()));
    users.sort((a, b) => b.stats.totalXp - a.stats.totalXp || a.displayName.localeCompare(b.displayName));
    state.data = buildDashboard(users, search);
    renderDashboard();
  } catch (error) {
    console.error("Admin dashboard failed:", error);
    if (error?.code === "permission-denied") {
      renderDenied(error.message || "Admin access is required for this page.");
    } else {
      root.innerHTML = `<section class="empty-state">Admin data could not load. ${safeText(error.message || "Try again shortly.")}</section>`;
    }
  } finally {
    state.loading = false;
  }
}

async function findUserDoc({ email, targetUid }) {
  const { db, sdk } = await getFirestoreTools();
  if (targetUid) {
    const ref = sdk.doc(db, "users", targetUid);
    const snap = await sdk.getDoc(ref);
    if (!snap.exists()) throw new Error("No user profile exists for that uid yet.");
    return { ref, id: targetUid, data: snap.data() };
  }
  const snapshot = await sdk.getDocs(sdk.query(
    sdk.collection(db, "users"),
    sdk.where("email", "==", email),
    sdk.limit(1)
  ));
  if (snapshot.empty) throw new Error("No signed-in user profile exists for that email yet.");
  const snap = snapshot.docs[0];
  return { ref: snap.ref, id: snap.id, data: snap.data() };
}

async function saveAdminMember(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const email = String(form.get("email") || "").trim().toLowerCase();
  const targetUid = String(form.get("targetUid") || "").trim();
  const makeAdmin = form.get("makeAdmin") === "on";
  if (!email && !targetUid) {
    showToast("Add an email or uid first.", "warning");
    return;
  }
  try {
    const { sdk } = await getFirestoreTools();
    const target = await findUserDoc({ email, targetUid });
    const currentProfile = target.data.profile || {};
    const displayName = String(form.get("displayName") || currentProfile.displayName || target.data.displayName || "").trim();
    const username = String(form.get("username") || currentProfile.username || "").trim();
    if (target.id === state.currentUser.uid && !makeAdmin) {
      throw new Error("You cannot remove your own admin access.");
    }
    await sdk.setDoc(target.ref, {
      role: makeAdmin ? "admin" : "student",
      isAdmin: makeAdmin,
      adminUpdatedAt: sdk.serverTimestamp(),
      adminUpdatedBy: state.currentUser.uid,
      profile: {
        ...currentProfile,
        ...(displayName ? { displayName } : {}),
        ...(username ? { username, usernameLower: username.toLowerCase().replace(/[^a-z0-9_]+/g, "").slice(0, 24) } : {})
      },
      updatedAt: sdk.serverTimestamp()
    }, { merge: true });
    showToast("Admin permissions updated.", "success");
    event.currentTarget.reset();
    loadDashboard();
  } catch (error) {
    console.error("Admin permission update failed:", error);
    showToast(error.message || "Could not update admin permissions.", "error", 5000);
  }
}

function bindDashboardEvents() {
  document.getElementById("refresh-admin")?.addEventListener("click", () => loadDashboard());
  document.getElementById("student-search")?.addEventListener("submit", (event) => {
    event.preventDefault();
    loadDashboard(document.getElementById("student-search-input")?.value || "");
  });
  document.getElementById("admin-member-form")?.addEventListener("submit", saveAdminMember);
}

async function init() {
  const signedInUser = await requireAuth();
  signedInUser.isAdmin = signedInUser.isAdmin || isBootstrapAdmin(signedInUser);
  signedInUser.role = signedInUser.isAdmin ? "admin" : signedInUser.role;
  state.currentUser = signedInUser;
  renderAppShell({ page: "admin", title: "Admin", currentUser: signedInUser });
  await loadDashboard();
}

init();
