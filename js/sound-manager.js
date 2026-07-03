import { SettingsManager } from "./settings-manager.js";

let context = null;

const PATTERNS = {
  tap: [[420, 0.035, 0.035]],
  select: [[520, 0.045, 0.045]],
  correct: [[660, 0.06, 0.07], [880, 0.05, 0.08]],
  wrong: [[240, 0.055, 0.09], [190, 0.04, 0.1]],
  reward: [[520, 0.05, 0.06], [700, 0.055, 0.07], [940, 0.05, 0.1]],
  complete: [[520, 0.05, 0.08], [660, 0.055, 0.08], [880, 0.06, 0.16]]
};

function getContext() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  context ||= new AudioContext();
  if (context.state === "suspended") void context.resume();
  return context;
}

function play(name = "tap") {
  if (!SettingsManager.getSettings().soundEffects) return;
  const audio = getContext();
  const pattern = PATTERNS[name] || PATTERNS.tap;
  if (!audio) return;
  let offset = 0;
  pattern.forEach(([frequency, volume, duration]) => {
    const start = audio.currentTime + offset;
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(volume, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
    oscillator.connect(gain).connect(audio.destination);
    oscillator.start(start);
    oscillator.stop(start + duration);
    offset += duration * 0.72;
  });
}

function installInteractionSounds() {
  document.addEventListener("click", (event) => {
    const control = event.target.closest("[data-choice], [data-value], [data-order], .theme-option, .tab-btn, .btn, .icon-btn, .nav-item, .mobile-tab");
    if (!control || control.disabled || control.matches("#game-check")) return;
    play(control.matches("[data-choice], [data-value], [data-order], .theme-option, .tab-btn") ? "select" : "tap");
  });
}

const SoundManager = { installInteractionSounds, play };

export { SoundManager };
