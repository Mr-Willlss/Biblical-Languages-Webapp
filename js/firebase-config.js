const firebaseOptions = window.BLQ_FIREBASE_CONFIG || null;
let firebaseApp = null;
let auth = null;
let db = null;
let initPromise = null;
let firestorePromise = null;

function hasRealConfig() {
  return Boolean(firebaseOptions?.apiKey && !firebaseOptions.apiKey.startsWith("YOUR_"));
}

async function initFirebase() {
  if (initPromise) return initPromise;
  initPromise = (async () => {
    if (!hasRealConfig()) return { firebaseApp, auth, db, mode: "unavailable" };
    const appSdk = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js");
    const authSdk = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js");
    firebaseApp = appSdk.getApps().length ? appSdk.getApp() : appSdk.initializeApp(firebaseOptions);
    try {
      auth = authSdk.initializeAuth(firebaseApp, {
        persistence: [
          authSdk.browserLocalPersistence,
          authSdk.browserSessionPersistence,
          authSdk.indexedDBLocalPersistence
        ],
        popupRedirectResolver: authSdk.browserPopupRedirectResolver
      });
    } catch (error) {
      if (error?.code !== "auth/already-initialized") throw error;
      auth = authSdk.getAuth(firebaseApp);
    }
    return { firebaseApp, auth, db, mode: "firebase" };
  })();
  return initPromise;
}

async function initFirestore() {
  if (firestorePromise) return firestorePromise;
  firestorePromise = (async () => {
    const state = await initFirebase();
    if (state.mode !== "firebase") return state;
    const storeSdk = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js");
    db = storeSdk.getFirestore(firebaseApp);
    try {
      await storeSdk.enableMultiTabIndexedDbPersistence(db);
    } catch (error) {
      if (!["failed-precondition", "unimplemented"].includes(error?.code)) console.warn("Firestore persistence:", error);
    }
    return { firebaseApp, auth, db, mode: "firebase" };
  })();
  return firestorePromise;
}

function getFirebaseState() {
  return { firebaseApp, auth, db, mode: auth ? "firebase" : "unavailable" };
}

export { db, auth, firebaseApp, getFirebaseState, hasRealConfig, initFirebase, initFirestore };
