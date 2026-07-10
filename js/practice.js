import { LangManager } from "./language-manager.js";
import { icon, renderAppShell, renderIcons, showToast, showXPPopup } from "./app.js?v=20260710-mobile-admin";
import { getVocab } from "./data-loader.js";
import { requireAuth } from "./auth-guard.js?v=20260705-strict-auth";

const signedInUser = await requireAuth();
const { root } = renderAppShell({ page: "practice", title: "Practice", currentUser: signedInUser });
const vocab = await getVocab();
const cfg = LangManager.getConfig();
let cardIndex = 0;
let flipped = false;
let score = 0;

function currentWord() {
  return vocab[cardIndex % vocab.length];
}

function hebrewKeyboard() {
  if (!LangManager.isHebrew()) return "";
  return `<div class="hebrew-keyboard">${"אבגדהוזחטיכלמנסעפצקרשת".split("").map((letter) => `<button class="hebrew-key" type="button" aria-label="Type ${letter}">${letter}</button>`).join("")}</div>`;
}

function renderMode(mode = "flashcards") {
  const word = currentWord();
  const scriptClass = cfg.lang === "hebrew" ? "hebrew-text" : "script-greek";
  let html = "";
  if (mode === "flashcards") {
    html = `<div class="flashcard" id="flashcard" role="button" tabindex="0" aria-label="Flip flashcard"><div><div class="flashcard-front ${scriptClass}">${flipped ? word.english : word.script}</div><p class="muted">${flipped ? word.transliteration : "Click to reveal"}</p></div></div><button class="btn btn-primary" id="next-card" type="button" aria-label="Next flashcard">${icon("arrow-right", "Next")}</button>`;
  }
  if (mode === "speed") {
    const options = [word.english, ...vocab.filter((item) => item.id !== word.id).slice(0, 3).map((item) => item.english)].sort();
    html = `<p class="${scriptClass} script-mark">${word.script}</p><p class="muted">Choose the meaning. Score: ${score}</p><div class="list">${options.map((option) => `<button class="exercise-option" data-speed="${option}" type="button" aria-label="${option}">${option}</button>`).join("")}</div>`;
  }
  if (mode === "typer") {
    html = `<p>Type this form from memory:</p><div class="${scriptClass} script-mark">${word.script}</div><div class="field"><input id="typer-input" aria-label="Type transliteration" placeholder="Type transliteration"></div>${hebrewKeyboard()}<button class="btn btn-primary" id="check-type" type="button" aria-label="Check answer">${icon("check", "Check")}</button>`;
  }
  if (mode === "drill") {
    html = `<p class="muted">Conjugation and declension drill</p><div class="list-row"><div><strong>${word.type}</strong><p class="${scriptClass}">${word.script}</p><span class="muted">${word.transliteration}</span></div><button class="btn btn-primary" id="drill-pass" type="button" aria-label="Mark recalled">${icon("badge-check", "Recalled")}</button></div>`;
  }
  document.getElementById("practice-stage").innerHTML = html;
  document.querySelector("#flashcard")?.addEventListener("click", () => {
    flipped = !flipped;
    renderMode(mode);
  });
  document.querySelector("#next-card")?.addEventListener("click", () => {
    cardIndex += 1;
    flipped = false;
    renderMode(mode);
  });
  document.querySelectorAll("[data-speed]").forEach((button) => {
    button.addEventListener("click", () => {
      const ok = button.dataset.speed === word.english;
      score += ok ? 1 : 0;
      button.classList.add(ok ? "correct" : "incorrect");
      if (ok) showXPPopup(3);
      cardIndex += 1;
      setTimeout(() => renderMode(mode), 500);
    });
  });
  document.querySelector("#check-type")?.addEventListener("click", () => {
    const answer = document.getElementById("typer-input").value.trim().toLowerCase();
    const ok = answer === word.transliteration.toLowerCase() || answer === word.script;
    showToast(ok ? "Well recalled." : `Review: ${word.transliteration}`, ok ? "success" : "warning");
    if (ok) showXPPopup(4);
  });
  document.querySelector("#drill-pass")?.addEventListener("click", () => {
    showToast("Marked as recalled.", "success");
    cardIndex += 1;
    renderMode(mode);
  });
  document.querySelectorAll(".hebrew-key").forEach((key) => key.addEventListener("click", () => {
    const input = document.getElementById("typer-input");
    input.value += key.textContent;
  }));
  renderIcons();
}

root.innerHTML = `
  <div class="page-grid">
    <section class="hero-card"><h2>Practice <span data-lang-label></span></h2><p>Build recall through flashcards, timed choices, script typing, and form drills.</p></section>
    <section class="card">
      <div class="tabs" id="practice-tabs">
        <button class="tab-btn active" data-mode="flashcards" type="button" aria-label="Flashcards">Flashcards</button>
        <button class="tab-btn" data-mode="speed" type="button" aria-label="Speed Round">Speed Round</button>
        <button class="tab-btn" data-mode="typer" type="button" aria-label="Script Typer">Script Typer</button>
        <button class="tab-btn" data-mode="drill" type="button" aria-label="Conjugation drill">Form Drill</button>
      </div>
      <div id="practice-stage" class="stage-space"></div>
    </section>
  </div>`;
document.querySelectorAll("[data-mode]").forEach((button) => button.addEventListener("click", () => {
  document.querySelectorAll("[data-mode]").forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
  renderMode(button.dataset.mode);
}));
LangManager.applyTheme();
renderMode();
