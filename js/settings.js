import { icon, renderAppShell, renderIcons, showToast } from "./app.js?v=20260703-sound";
import { requireAuth } from "./auth-guard.js?v=20260701-authfix2";
import { SettingsManager } from "./settings-manager.js";

const signedInUser = await requireAuth();
const { root } = renderAppShell({ page: "settings", title: "Settings", currentUser: signedInUser });
let settings = SettingsManager.getSettings();

const themes = [
  { id: "system", label: "System", description: "Follow this device" },
  { id: "light", label: "Light", description: "Bright and clear" },
  { id: "dark", label: "Dark", description: "Comfortable at night" },
  { id: "contrast", label: "High contrast", description: "Maximum separation" }
];

const tutorialSteps = [
  ["map", "Choose your path", "Switch between Greek and Hebrew, then follow lessons in order. Completed lessons unlock the next step."],
  ["play", "Watch first", "Each lesson begins with its teaching video. Watch for the main idea before reading the short explanation."],
  ["book-open", "Read the guide", "Move through focused teaching cards. Use Back whenever you want to review an idea."],
  ["rotate-ccw", "Master every question", "A missed question returns at the end. The lesson finishes only after every question is answered correctly."],
  ["sparkles", "Protect your accuracy", "Mistakes reduce accuracy, XP, and stars. Read feedback carefully before the next question appears."]
];

function toggleRow(id, title, description, checked) {
  return `<label class="setting-row"><span><strong>${title}</strong><small>${description}</small></span><input id="${id}" type="checkbox" ${checked ? "checked" : ""}></label>`;
}

function render() {
  root.innerHTML = `
    <div class="settings-page">
      <section class="settings-heading">
        <div><span class="path-label">Preferences</span><h2>Make the app yours</h2><p>These settings apply immediately on this device.</p></div>
      </section>

      <section class="settings-section">
        <div class="section-title"><div><span class="path-label">Appearance</span><h3>Theme</h3></div></div>
        <div class="theme-options">${themes.map((theme) => `<button class="theme-option ${settings.theme === theme.id ? "active" : ""}" data-theme-choice="${theme.id}" type="button"><span class="theme-preview theme-${theme.id}"><i></i><i></i><i></i></span><strong>${theme.label}</strong><small>${theme.description}</small></button>`).join("")}</div>
      </section>

      <section class="settings-section">
        <div class="section-title"><div><span class="path-label">Learning</span><h3>Lesson preferences</h3></div></div>
        <div class="settings-list">
          ${toggleRow("sound-effects", "Sound effects", "Play short confirmation sounds for answers and rewards.", settings.soundEffects)}
          ${toggleRow("autoplay-videos", "Autoplay lesson videos", "Start videos muted when a lesson opens.", settings.autoplayVideos)}
          ${toggleRow("lesson-reminders", "Study reminders", "Keep reminders enabled for your daily learning goal.", settings.lessonReminders)}
          ${toggleRow("reduced-motion", "Reduce motion", "Shorten animations and answer transitions.", settings.reducedMotion)}
          <label class="setting-row"><span><strong>Daily XP goal</strong><small>Choose a target that keeps your streak realistic.</small></span><select id="daily-goal" aria-label="Daily XP goal"><option value="20" ${settings.dailyGoal === 20 ? "selected" : ""}>20 XP</option><option value="40" ${settings.dailyGoal === 40 ? "selected" : ""}>40 XP</option><option value="60" ${settings.dailyGoal === 60 ? "selected" : ""}>60 XP</option><option value="100" ${settings.dailyGoal === 100 ? "selected" : ""}>100 XP</option></select></label>
        </div>
      </section>

      <section class="settings-section tutorial-section" id="tutorial">
        <div class="section-title"><div><span class="path-label">New here?</span><h3>How learning works</h3></div><a class="btn btn-primary" href="lessons.html">${icon("play", "Try a lesson")}</a></div>
        <div class="tutorial-steps">${tutorialSteps.map(([iconName, title, description], index) => `<div class="tutorial-step"><b>${index + 1}</b><span class="tutorial-icon">${icon(iconName)}</span><div><strong>${title}</strong><p>${description}</p></div></div>`).join("")}</div>
      </section>
    </div>`;

  document.querySelectorAll("[data-theme-choice]").forEach((button) => button.addEventListener("click", () => {
    settings = SettingsManager.saveSettings({ theme: button.dataset.themeChoice });
    render();
    showToast(`${themes.find((theme) => theme.id === settings.theme)?.label} theme applied.`, "success");
  }));
  [["sound-effects", "soundEffects"], ["autoplay-videos", "autoplayVideos"], ["lesson-reminders", "lessonReminders"], ["reduced-motion", "reducedMotion"]].forEach(([id, key]) => {
    document.getElementById(id).addEventListener("change", (event) => {
      settings = SettingsManager.saveSettings({ [key]: event.target.checked });
      showToast("Preference saved.", "success");
    });
  });
  document.getElementById("daily-goal").addEventListener("change", (event) => {
    settings = SettingsManager.saveSettings({ dailyGoal: Number(event.target.value) });
    showToast("Daily goal updated.", "success");
  });
  renderIcons();
}

render();
