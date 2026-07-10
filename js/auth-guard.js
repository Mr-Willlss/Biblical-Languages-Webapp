import { initFirebase, initFirestore } from "./firebase-config.js?v=20260701-authfix2";
import { LangManager } from "./language-manager.js";

const BOOTSTRAP_ADMIN_EMAILS = new Set(["samiduvimo@gmail.com"]);

function isBootstrapAdminEmail(email) {
  return BOOTSTRAP_ADMIN_EMAILS.has(String(email || "").trim().toLowerCase());
}

async function getAdminProfile(state, user) {
  const [{ getDoc, doc }, token] = await Promise.all([
    import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js"),
    user.getIdTokenResult(true).catch(() => ({ claims: {} }))
  ]);
  const userDoc = await getDoc(doc(state.db, "users", user.uid)).catch(() => null);
  const data = userDoc?.exists() ? userDoc.data() : {};
  const isAdmin = isBootstrapAdminEmail(user.email) || token.claims?.admin === true || data?.isAdmin === true || data?.role === "admin";
  return { data, isAdmin };
}

async function getUserProfile(state, user) {
  try {
    const firestoreState = state.db ? state : await initFirestore();
    if (firestoreState.mode !== "firebase" || !firestoreState.db) return { data: {}, isAdmin: isBootstrapAdminEmail(user.email) };
    const [{ getDoc, doc }, token] = await Promise.all([
      import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js"),
      user.getIdTokenResult(false).catch(() => ({ claims: {} }))
    ]);
    const userDoc = await getDoc(doc(firestoreState.db, "users", user.uid)).catch(() => null);
    const data = userDoc?.exists() ? userDoc.data() : {};
    return {
      data,
      isAdmin: isBootstrapAdminEmail(user.email) || token.claims?.admin === true || data?.isAdmin === true || data?.role === "admin"
    };
  } catch (error) {
    console.warn("Account profile sync unavailable:", error);
    return { data: {}, isAdmin: isBootstrapAdminEmail(user.email) };
  }
}

async function requireAuth({ admin = false } = {}) {
  const state = admin ? await initFirestore() : await initFirebase();
  if (state.mode === "firebase") {
    const { onAuthStateChanged } = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js");
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(state.auth, async (user) => {
        unsubscribe();
        if (!user) {
          sessionStorage.setItem("blq_auth_notice", "Your sign-in session was not retained. Allow cookies and site storage for this site, then try again.");
          window.location.replace("login.html?reason=session");
          return;
        }
        const profile = admin
          ? await getAdminProfile(state, user)
          : await getUserProfile(state, user);
        if (admin && !profile.isAdmin) {
          sessionStorage.setItem("blq_auth_notice", "Admin access is required for that page.");
          window.location.replace("dashboard.html?reason=admin");
          return;
        }
        const profileData = profile.data?.profile || {};
        const stats = profile.data?.stats || {};
        const activeLanguage = profileData.activeLanguage || profile.data?.activeLanguage || profile.data?.language;
        if (activeLanguage) LangManager.set(activeLanguage, false);
        const appUser = {
          uid: user.uid,
          email: user.email || profile.data?.email || "",
          displayName: profileData.displayName || user.displayName || profile.data?.displayName || "Language Learner",
          photoURL: profileData.photoURL || user.photoURL || "",
          role: profile.isAdmin ? "admin" : profile.data?.role || "student",
          isAdmin: profile.isAdmin,
          xp_greek: Number(stats.xp_greek ?? profile.data?.xp_greek ?? 0),
          xp_hebrew: Number(stats.xp_hebrew ?? profile.data?.xp_hebrew ?? 0),
          xp_total: Number(stats.totalXp ?? profile.data?.xp_total ?? 0),
          streak: Number(stats.streakDays ?? profile.data?.streak ?? 0),
          gems: Number(profile.data?.gems ?? 0)
        };
        window.BLQ_CURRENT_USER = appUser;
        localStorage.setItem("blq_last_uid", user.uid);
        resolve(appUser);
      }, (error) => {
        console.error("Firebase auth state failed:", error);
        window.location.replace("login.html");
      });
    });
  }
  sessionStorage.setItem("blq_auth_notice", "Sign-in is temporarily unavailable. Please try again shortly.");
  window.location.replace("login.html?reason=configuration");
  return new Promise(() => {});
}

export { requireAuth };
