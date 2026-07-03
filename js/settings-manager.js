const SETTINGS_KEY = "blq_app_settings";

const DEFAULT_SETTINGS = {
  theme: "system",
  soundEffects: true,
  reducedMotion: false,
  autoplayVideos: false,
  lessonReminders: true,
  dailyGoal: 40
};

function getSettings() {
  try { return { ...DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}") }; }
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

function saveSettings(patch) {
  const next = { ...getSettings(), ...patch };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
  applySettings(next);
  window.dispatchEvent(new CustomEvent("settingsChanged", { detail: next }));
  return next;
}

window.matchMedia?.("(prefers-color-scheme: dark)").addEventListener?.("change", () => {
  if (getSettings().theme === "system") applySettings();
});

const SettingsManager = { DEFAULT_SETTINGS, applySettings, getSettings, saveSettings };
applySettings();

export { SettingsManager };
