import { getDemoUser } from "./app.js?v=20260703-sound";
import { initFirebase } from "./firebase-config.js?v=20260701-authfix2";

async function requireAuth({ admin = false } = {}) {
  const state = await initFirebase();
  if (state.mode === "firebase") {
    const { onAuthStateChanged } = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js");
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(state.auth, (user) => {
        unsubscribe();
        if (!user) {
          sessionStorage.setItem("blq_auth_notice", "Your sign-in session was not retained. Allow cookies and site storage for this site, then try again.");
          window.location.replace("login.html?reason=session");
          return;
        }
        window.BLQ_CURRENT_USER = user;
        localStorage.setItem("blq_last_uid", user.uid);
        resolve(user);
      }, (error) => {
        console.error("Firebase auth state failed:", error);
        window.location.replace("login.html");
      });
    });
  }
  const user = getDemoUser();
  if (admin && user.role !== "admin") window.location.href = "dashboard.html";
  return user;
}

export { requireAuth };
