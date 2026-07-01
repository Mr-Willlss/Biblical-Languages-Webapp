import { LangManager } from "./language-manager.js";
import { getDemoUser, saveDemoUser, showToast } from "./app.js";
import { initFirebase } from "./firebase-config.js";

async function ensureUserDocument(user, extra = {}) {
  const state = await initFirebase();
  if (state.mode !== "firebase") return;
  const sdk = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js");
  await sdk.setDoc(sdk.doc(state.db, "users", user.uid), {
    uid: user.uid,
    displayName: user.displayName || extra.displayName || "Language Learner",
    email: user.email || "",
    photoURL: user.photoURL || "",
    activeLanguage: extra.language || LangManager.get(),
    role: "student",
    lastActiveAt: sdk.serverTimestamp(),
    createdAt: sdk.serverTimestamp()
  }, { merge: true });
}

async function signInWithEmail(email, password) {
  const state = await initFirebase();
  if (state.mode === "firebase") {
    const sdk = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js");
    const credential = await sdk.signInWithEmailAndPassword(state.auth, email, password);
    await ensureUserDocument(credential.user);
    return credential;
  }
  const user = { ...getDemoUser(), email };
  saveDemoUser(user);
  return { user };
}

async function registerWithEmail({ displayName, email, password, language }) {
  const state = await initFirebase();
  LangManager.set(language, false);
  if (state.mode === "firebase") {
    const sdk = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js");
    const credential = await sdk.createUserWithEmailAndPassword(state.auth, email, password);
    await sdk.updateProfile(credential.user, { displayName });
    await ensureUserDocument(credential.user, { displayName, language });
    return credential;
  }
  const user = { ...getDemoUser(), displayName, email, language };
  saveDemoUser(user);
  return { user };
}

async function signInWithGoogle() {
  const state = await initFirebase();
  if (state.mode === "firebase") {
    const sdk = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js");
    const provider = new sdk.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    const credential = await sdk.signInWithPopup(state.auth, provider);
    await ensureUserDocument(credential.user);
    return credential;
  }
  showToast("Demo mode is active until Firebase web credentials are added.", "info");
  return { user: getDemoUser() };
}

async function signOutUser() {
  const state = await initFirebase();
  if (state.mode === "firebase") {
    const sdk = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js");
    await sdk.signOut(state.auth);
  }
  window.location.href = "login.html";
}

window.BLQAuth = { registerWithEmail, signInWithEmail, signInWithGoogle, signOutUser };
export { ensureUserDocument, registerWithEmail, signInWithEmail, signInWithGoogle, signOutUser };
