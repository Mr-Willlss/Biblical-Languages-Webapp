import { LangManager } from "./language-manager.js";
import { icon, renderAppShell, renderIcons, safeText, showCelebration } from "./app.js?v=20260710-mobile-admin";
import { requireAuth } from "./auth-guard.js?v=20260710-sync-all";
import { ProgressManager } from "./progress-manager.js?v=20260711-scale";
import { getQuests } from "./data-loader.js";

const signedInUser = await requireAuth();
const { user, root } = renderAppShell({ page: "quests", title: "Quests", currentUser: signedInUser });
await ProgressManager.init(user.uid);
const quests = await getQuests();
const progress = ProgressManager.getLocalProgress(user.uid);
let active = null;
let questions = [];
let index = 0;
let score = 0;
let selected = null;
let ordered = [];
let checked = false;

function shuffle(items) {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function normalizeAnswer(value) {
  if (Array.isArray(value)) return value.map((item) => normalizeAnswer(item)).join(" ");
  if (typeof value === "boolean") return value ? "true" : "false";
  return String(value ?? "").trim().toLowerCase().replace(/\s+/g, " ");
}

function expectedText(question) {
  if (Array.isArray(question.answer)) return question.answer.join(" ");
  if (typeof question.answer === "boolean") return question.answer ? "True" : "False";
  return String(question.answer ?? "");
}

function isTypedQuestion(question) {
  return question.type === "transliterate" || question.type === "typed" || question.type === "short_answer" || !question.options?.length && question.type !== "true_false" && question.type !== "ordering";
}

function answerMarkup(question, options) {
  if (question.type === "ordering") {
    return `<div class="ordering-game">
      <div class="order-preview" id="order-preview">Choose the words in order</div>
      <div class="answer-grid">${shuffle(question.items || []).map((item, i) => `<button class="game-answer order-word" data-order="${i}" data-word="${safeText(item)}" type="button">${safeText(item)}</button>`).join("")}</div>
    </div>`;
  }
  if (isTypedQuestion(question)) {
    return `<div class="typed-answer-wrap">
      <input class="typed-answer" id="quest-typed-answer" autocomplete="off" inputmode="text" aria-label="Type your answer" placeholder="${question.type === "transliterate" ? "Type the transliteration" : "Type your answer"}">
    </div>`;
  }
  return `<div class="answer-grid">${options.map((option, i) => `<button class="game-answer" data-option="${i}" type="button">${safeText(option)}</button>`).join("")}</div>`;
}

function renderList() {
  document.body.classList.remove("lesson-game-active", "lesson-game");
  root.innerHTML = `<div class="quest-page">
    <header class="path-page-head"><div><span class="mission-kicker">${LangManager.getConfig().label}</span><h1>Quests</h1><p class="muted">Focused challenges. Real questions. XP earned by mastery.</p></div></header>
    <div class="quest-list">${quests.map((quest) => {
      const done = progress.completedQuests[quest.id];
      return `<article class="quest-item">
        <span class="quest-emblem">${icon(done ? "check" : quest.category === "Daily" ? "flame" : "shield")}</span>
        <div><small>${safeText(quest.category)}</small><h2>${safeText(quest.title)}</h2><p>${safeText(quest.description)}</p></div>
        <div class="quest-reward"><strong>+${quest.xpReward || 30} XP</strong><button class="btn ${done ? "btn-ghost" : "btn-primary"}" data-start-quest="${quest.id}" type="button">${done ? "Practice" : "Start"}</button></div>
      </article>`;
    }).join("")}</div>
  </div>`;
  document.querySelectorAll("[data-start-quest]").forEach((button) => button.addEventListener("click", () => startQuest(button.dataset.startQuest)));
  renderIcons();
}

function startQuest(id) {
  active = quests.find((quest) => quest.id === id);
  questions = shuffle(active.questions || []).slice(0, 10);
  index = 0; score = 0; selected = null; checked = false;
  document.body.classList.add("lesson-game-active", "lesson-game");
  renderQuestion();
}

function renderQuestion() {
  const question = questions[index];
  selected = null; ordered = []; checked = false;
  const options = shuffle(question.type === "true_false" ? ["True", "False"] : question.options || []);
  root.innerHTML = `<div class="lesson-game-shell" style="--steps:${questions.length}">
    <header class="game-top">
      <button class="game-close" id="exit-quest" type="button" aria-label="Exit quest">${icon("x")}</button>
      <div class="game-progress">${questions.map((_, i) => `<span class="${i <= index ? "done" : ""}"></span>`).join("")}</div>
      <strong>${score} ✓</strong>
    </header>
    <main class="challenge-stage">
      <span class="challenge-count">${index + 1} of ${questions.length}</span>
      <span class="challenge-language">${safeText(active.title)}</span>
      <h1 class="challenge-prompt">${safeText(question.prompt)}</h1>
      ${answerMarkup(question, options)}
    </main>
    <footer class="game-footer"><div class="feedback" id="quest-feedback"></div><button class="btn btn-primary game-check" id="quest-check" disabled>Check</button></footer>
  </div>`;
  document.getElementById("exit-quest").addEventListener("click", renderList);
  const checkButton = document.getElementById("quest-check");
  document.querySelectorAll("[data-option]").forEach((button) => button.addEventListener("click", () => {
    if (checked) return;
    document.querySelectorAll(".game-answer").forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");
    const value = options[Number(button.dataset.option)];
    selected = question.type === "true_false" ? value === "True" : value;
    checkButton.disabled = false;
  }));
  document.querySelectorAll("[data-order]").forEach((button) => button.addEventListener("click", () => {
    if (checked || button.disabled) return;
    button.disabled = true;
    button.classList.add("selected");
    ordered.push(button.dataset.word);
    document.getElementById("order-preview").textContent = ordered.join(" · ");
    checkButton.disabled = ordered.length !== (question.items || []).length;
  }));
  const typed = document.getElementById("quest-typed-answer");
  typed?.addEventListener("input", () => {
    selected = typed.value;
    checkButton.disabled = !typed.value.trim();
  });
  typed?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && typed.value.trim() && !checked) check();
  });
  checkButton.addEventListener("click", check);
  renderIcons();
  typed?.focus();
}

function check() {
  if (checked) return;
  const question = questions[index];
  const value = question.type === "ordering" ? ordered : selected;
  const correct = normalizeAnswer(value) === normalizeAnswer(question.answer);
  checked = true;
  if (correct) score += 1;
  document.querySelectorAll(".game-answer, .typed-answer").forEach((control) => { control.disabled = true; });
  document.querySelectorAll(".game-answer.selected").forEach((button) => button.classList.add(correct ? "correct" : "incorrect"));
  document.getElementById("quest-typed-answer")?.classList.add(correct ? "correct" : "incorrect");
  const feedback = document.getElementById("quest-feedback");
  feedback.className = `feedback ${correct ? "correct" : "incorrect"}`;
  feedback.textContent = correct ? "Correct" : `Answer: ${expectedText(question)}`;
  const checkButton = document.getElementById("quest-check");
  checkButton.disabled = true;
  checkButton.textContent = index === questions.length - 1 ? "Finishing..." : "Next question...";
  window.setTimeout(advance, correct ? 850 : 1500);
}

function advance() {
  if (index < questions.length - 1) {
    index += 1;
    renderQuestion();
    return;
  }
  const percent = Math.round((score / questions.length) * 100);
  const result = ProgressManager.completeQuest(user.uid, active.id, { xp: active.xpReward || 30, score: percent, title: active.title });
  if (percent >= 70) showCelebration(percent >= 90 ? 3 : 2);
  root.innerHTML = `<div class="lesson-game-shell"><main class="challenge-stage">
    <span class="challenge-language">Quest complete</span>
    <h1 class="challenge-prompt">${percent}%</h1>
    <p>${result.firstCompletion ? `+${active.xpReward || 30} XP earned` : "Practice complete"}</p>
    <button class="btn btn-primary game-check" id="quest-home" type="button">Back to quests</button>
  </main></div>`;
  document.getElementById("quest-home").addEventListener("click", () => location.reload());
}

renderList();
