import { getDemoUser } from "./app.js";
import { initFirebase } from "./firebase-config.js?v=20260701-authfix";

async function requireAuth({ admin = false } = {}) {
  const state = await initFirebase();
  if (state.mode === "firebase") {
    const { onAuthStateChanged } = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js");
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(state.auth, (user) => {
        unsubscribe();
        if (!user) {
          window.location.replace("login.html");
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
