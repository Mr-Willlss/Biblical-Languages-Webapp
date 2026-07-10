import { initFirebase, initFirestore } from "./firebase-config.js?v=20260701-authfix2";

async function getAdminProfile(state, user) {
  const [{ getDoc, doc }, token] = await Promise.all([
    import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js"),
    user.getIdTokenResult(true).catch(() => ({ claims: {} }))
  ]);
  const userDoc = await getDoc(doc(state.db, "users", user.uid)).catch(() => null);
  const data = userDoc?.exists() ? userDoc.data() : {};
  const isAdmin = token.claims?.admin === true || data?.isAdmin === true || data?.role === "admin";
  return { data, isAdmin };
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
        const token = admin ? null : await user.getIdTokenResult(false).catch(() => ({ claims: {} }));
        const profile = admin
          ? await getAdminProfile(state, user)
          : { data: {}, isAdmin: token?.claims?.admin === true };
        if (admin && !profile.isAdmin) {
          sessionStorage.setItem("blq_auth_notice", "Admin access is required for that page.");
          window.location.replace("dashboard.html?reason=admin");
          return;
        }
        const profileData = profile.data?.profile || {};
        const appUser = {
          uid: user.uid,
          email: user.email || profile.data?.email || "",
          displayName: profileData.displayName || user.displayName || profile.data?.displayName || "Language Learner",
          photoURL: profileData.photoURL || user.photoURL || "",
          role: profile.isAdmin ? "admin" : profile.data?.role || "student",
          isAdmin: profile.isAdmin
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
