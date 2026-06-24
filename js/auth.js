import { LangManager } from "./language-manager.js";
import { getDemoUser, saveDemoUser, showToast } from "./app.js";
import { initFirebase } from "./firebase-config.js";

async function signInWithEmail(email, password) {
  const state = await initFirebase();
  if (state.mode === "firebase") {
    const { signInWithEmailAndPassword } = await import("https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js");
    return signInWithEmailAndPassword(state.auth, email, password);
  }
  const user = { ...getDemoUser(), email };
  saveDemoUser(user);
  return { user };
}

async function registerWithEmail({ displayName, email, password, language }) {
  const state = await initFirebase();
  LangManager.set(language, false);
  if (state.mode === "firebase") {
    const { createUserWithEmailAndPassword, updateProfile } = await import("https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js");
    const { doc, serverTimestamp, setDoc } = await import("https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js");
    const credential = await createUserWithEmailAndPassword(state.auth, email, password);
    await updateProfile(credential.user, { displayName });
    await setDoc(doc(state.db, "users", credential.user.uid), {
      displayName,
      email,
      language,
      role: "student",
      xp_greek: 0,
      xp_hebrew: 0,
      xp_total: 0,
      streak: 0,
      level: 1,
      createdAt: serverTimestamp()
    });
    return credential;
  }
  const user = { ...getDemoUser(), displayName, email, language };
  saveDemoUser(user);
  return { user };
}

async function signInWithGoogle() {
  const state = await initFirebase();
  if (state.mode === "firebase") {
    const { GoogleAuthProvider, signInWithPopup } = await import("https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js");
    return signInWithPopup(state.auth, new GoogleAuthProvider());
  }
  showToast("Demo sign-in is active. Connect Firebase config when you deploy.", "info");
  return { user: getDemoUser() };
}

async function signOutUser() {
  const state = await initFirebase();
  if (state.mode === "firebase") {
    const { signOut } = await import("https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js");
    await signOut(state.auth);
  }
  window.location.href = "login.html";
}

window.BLQAuth = { registerWithEmail, signInWithEmail, signInWithGoogle, signOutUser };
export { registerWithEmail, signInWithEmail, signInWithGoogle, signOutUser };
