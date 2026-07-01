import { getDemoUser, saveDemoUser } from "./app.js";

const firebaseOptions = window.BLQ_FIREBASE_CONFIG || null;
let firebaseApp = null;
let auth = null;
let db = null;
let initPromise = null;

function hasRealConfig() {
  return Boolean(firebaseOptions?.apiKey && !firebaseOptions.apiKey.startsWith("YOUR_"));
}

async function initFirebase() {
  if (initPromise) return initPromise;
  initPromise = (async () => {
    if (!hasRealConfig()) return { firebaseApp, auth, db, mode: "demo" };
    const appSdk = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js");
    const authSdk = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js");
    const storeSdk = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js");
    firebaseApp = appSdk.getApps().length ? appSdk.getApp() : appSdk.initializeApp(firebaseOptions);
    auth = authSdk.getAuth(firebaseApp);
    db = storeSdk.getFirestore(firebaseApp);
    try {
      await authSdk.setPersistence(auth, authSdk.browserLocalPersistence);
    } catch (error) {
      console.warn("Firebase auth persistence fallback:", error);
      await authSdk.setPersistence(auth, authSdk.browserSessionPersistence);
    }
    try {
      await storeSdk.enableMultiTabIndexedDbPersistence(db);
    } catch (error) {
      if (!["failed-precondition", "unimplemented"].includes(error?.code)) console.warn("Firestore persistence:", error);
    }
    return { firebaseApp, auth, db, mode: "firebase" };
  })();
  return initPromise;
}

function getFirebaseState() {
  return { firebaseApp, auth, db, mode: auth ? "firebase" : "demo" };
}

function updateDemoProfile(patch) {
  const user = { ...getDemoUser(), ...patch };
  saveDemoUser(user);
  return user;
}

export { db, auth, firebaseApp, getFirebaseState, hasRealConfig, initFirebase, updateDemoProfile };
