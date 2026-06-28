import { getDemoUser, saveDemoUser } from "./app.js";

const firebaseOptions = window.BLQ_FIREBASE_CONFIG || null;
let firebaseApp = null;
let auth = null;
let db = null;

async function initFirebase() {
  if (!firebaseOptions?.apiKey || firebaseOptions.apiKey.startsWith("YOUR_")) {
    return { firebaseApp, auth, db, mode: "demo" };
  }
  const { initializeApp } = await import("https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js");
  const { getAuth } = await import("https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js");
  const { getFirestore } = await import("https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js");
  firebaseApp = initializeApp(firebaseOptions);
  auth = getAuth(firebaseApp);
  db = getFirestore(firebaseApp);
  return { firebaseApp, auth, db, mode: "firebase" };
}

function getFirebaseState() {
  return { firebaseApp, auth, db, mode: auth ? "firebase" : "demo" };
}

function updateDemoProfile(patch) {
  const user = { ...getDemoUser(), ...patch };
  saveDemoUser(user);
  return user;
}

export { db, auth, firebaseApp, getFirebaseState, initFirebase, updateDemoProfile };
