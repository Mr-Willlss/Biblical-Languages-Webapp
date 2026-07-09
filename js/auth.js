import { LangManager } from "./language-manager.js";
import { initFirebase, initFirestore } from "./firebase-config.js?v=20260703-retention";

async function ensureUserDocument(user, extra = {}) {
  const state = await initFirestore();
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
    void syncUserDocument(credential.user);
    return credential;
  }
  throw Object.assign(new Error("Firebase sign-in is unavailable."), { code: "auth/configuration-unavailable" });
}

async function registerWithEmail({ displayName, email, password, language }) {
  const state = await initFirebase();
  LangManager.set(language, false);
  if (state.mode === "firebase") {
    const sdk = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js");
    const credential = await sdk.createUserWithEmailAndPassword(state.auth, email, password);
    await sdk.updateProfile(credential.user, { displayName });
    void syncUserDocument(credential.user, { displayName, language });
    return credential;
  }
  throw Object.assign(new Error("Firebase registration is unavailable."), { code: "auth/configuration-unavailable" });
}

async function signInWithGoogle() {
  const state = await initFirebase();
  if (state.mode === "firebase") {
    const sdk = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js");
    const provider = new sdk.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    const credential = await sdk.signInWithPopup(state.auth, provider);
    await credential.user.getIdToken(true);
    await state.auth.authStateReady();
    if (!state.auth.currentUser?.uid || state.auth.currentUser.uid !== credential.user.uid) {
      throw Object.assign(new Error("Your browser did not retain the Google session. Allow site storage and try again."), {
        code: "auth/session-not-retained"
      });
    }
    void syncUserDocument(credential.user);
    return credential;
  }
  throw Object.assign(new Error("Google sign-in is unavailable."), { code: "auth/configuration-unavailable" });
}

async function syncUserDocument(user, extra = {}) {
  try {
    await ensureUserDocument(user, extra);
  } catch (error) {
    console.warn("Signed in, but profile sync will retry later:", error);
  }
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
