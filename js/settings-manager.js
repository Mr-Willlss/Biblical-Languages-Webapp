import { initFirestore } from "./firebase-config.js?v=20260703-retention";

const SETTINGS_KEY = "blq_app_settings";

const DEFAULT_SETTINGS = {
  theme: "system",
  soundEffects: true,
  reducedMotion: false,
  autoplayVideos: false,
  lessonReminders: true,
  dailyGoal: 40
};

let activeUid = "";
let cloudReady = false;
let unsubscribeSettings = null;
let initPromise = null;

function cleanSettings(value = {}) {
  const next = { ...DEFAULT_SETTINGS, ...value };
  if (!["system", "light", "dark", "contrast"].includes(next.theme)) next.theme = DEFAULT_SETTINGS.theme;
  next.dailyGoal = [20, 40, 60, 100].includes(Number(next.dailyGoal)) ? Number(next.dailyGoal) : DEFAULT_SETTINGS.dailyGoal;
  next.soundEffects = next.soundEffects !== false;
  next.reducedMotion = Boolean(next.reducedMotion);
  next.autoplayVideos = Boolean(next.autoplayVideos);
  next.lessonReminders = next.lessonReminders !== false;
  return next;
}

function getSettings() {
  try { return cleanSettings(JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}")); }
  catch { return { ...DEFAULT_SETTINGS }; }
}

function resolvedTheme(theme) {
  if (theme !== "system") return theme;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applySettings(settings = getSettings()) {
  document.documentElement.dataset.theme = resolvedTheme(settings.theme);
  document.documentElement.dataset.themePreference = settings.theme;
  document.documentElement.classList.toggle("reduce-motion", Boolean(settings.reducedMotion));
  document.documentElement.style.colorScheme = ["dark", "contrast"].includes(resolvedTheme(settings.theme)) ? "dark" : "light";
  return settings;
}

function persistLocal(settings) {
  const next = cleanSettings(settings);
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
  applySettings(next);
  window.dispatchEvent(new CustomEvent("settingsChanged", { detail: next }));
  return next;
}

async function pushSettings(uid, settings) {
  if (!uid) return;
  try {
    const state = await initFirestore();
    if (state.mode !== "firebase") return;
    const sdk = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js");
    await sdk.setDoc(sdk.doc(state.db, "users", uid, "private", "settings"), {
      settings: cleanSettings(settings),
      updatedAt: sdk.serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.warn("Settings cloud sync skipped:", error);
  }
}

async function init(uid) {
  if (!uid) return getSettings();
  if (activeUid === uid && cloudReady) return getSettings();
  if (activeUid === uid && initPromise) return initPromise;
  activeUid = uid;
  cloudReady = false;
  if (unsubscribeSettings) {
    unsubscribeSettings();
    unsubscribeSettings = null;
  }
  initPromise = (async () => {
    try {
      const state = await initFirestore();
      if (state.mode !== "firebase") return getSettings();
      const sdk = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js");
      const ref = sdk.doc(state.db, "users", uid, "private", "settings");
      const snapshot = await sdk.getDoc(ref);
      if (snapshot.exists()) {
        persistLocal(snapshot.data().settings || {});
      } else {
        await pushSettings(uid, getSettings());
      }
      unsubscribeSettings = sdk.onSnapshot(ref, (nextSnapshot) => {
        if (!nextSnapshot.exists() || !cloudReady) return;
        persistLocal(nextSnapshot.data().settings || {});
      }, (error) => console.warn("Live settings sync unavailable:", error));
      cloudReady = true;
    } catch (error) {
      console.warn("Settings cloud sync unavailable:", error);
    } finally {
      initPromise = null;
    }
    return getSettings();
  })();
  return initPromise;
}

function saveSettings(patch, uid = activeUid) {
  const next = persistLocal({ ...getSettings(), ...patch });
  void pushSettings(uid, next);
  return next;
}

window.matchMedia?.("(prefers-color-scheme: dark)").addEventListener?.("change", () => {
  if (getSettings().theme === "system") applySettings();
});

const SettingsManager = { DEFAULT_SETTINGS, applySettings, getSettings, init, saveSettings };
applySettings();

export { SettingsManager };
