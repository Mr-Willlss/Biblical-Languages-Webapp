import { getDemoUser } from "./app.js";
import { initFirebase } from "./firebase-config.js";

async function requireAuth({ admin = false } = {}) {
  const state = await initFirebase();
  if (state.mode === "firebase") {
    const { onAuthStateChanged } = await import("https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js");
    return new Promise((resolve) => {
      onAuthStateChanged(state.auth, (user) => {
        if (!user) window.location.href = "login.html";
        resolve(user);
      });
    });
  }
  const user = getDemoUser();
  if (admin && user.role !== "admin") window.location.href = "dashboard.html";
  return user;
}

export { requireAuth };
