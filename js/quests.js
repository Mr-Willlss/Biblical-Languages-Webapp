import { LangManager } from "./language-manager.js";
import { icon, renderAppShell, renderIcons, safeText, showCelebration } from "./app.js";
import { requireAuth } from "./auth-guard.js";
import { ProgressManager } from "./progress-manager.js";
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
let checked = false;

function shuffle(items) {
  return [...items].sort(() => Math.random() - .5);
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
  selected = null; checked = false;
  const options = question.type === "true_false" ? ["True", "False"] : question.options || [];
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
      <div class="answer-grid">${options.map((option, i) => `<button class="game-answer" data-option="${i}" type="button">${safeText(option)}</button>`).join("")}</div>
    </main>
    <footer class="game-footer"><div class="feedback" id="quest-feedback"></div><button class="btn btn-primary game-check" id="quest-check" disabled>Check</button></footer>
  </div>`;
  document.getElementById("exit-quest").addEventListener("click", renderList);
  document.querySelectorAll("[data-option]").forEach((button) => button.addEventListener("click", () => {
    if (checked) return;
    document.querySelectorAll(".game-answer").forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");
    const value = options[Number(button.dataset.option)];
    selected = question.type === "true_false" ? value === "True" : value;
    document.getElementById("quest-check").disabled = false;
  }));
  document.getElementById("quest-check").addEventListener("click", () => checked ? advance() : check());
  renderIcons();
}

function check() {
  const question = questions[index];
  const correct = String(selected).toLowerCase() === String(question.answer).toLowerCase();
  checked = true;
  if (correct) score += 1;
  document.querySelector(".game-answer.selected")?.classList.add(correct ? "correct" : "incorrect");
  const feedback = document.getElementById("quest-feedback");
  feedback.className = `feedback ${correct ? "correct" : "incorrect"}`;
  feedback.textContent = correct ? "Correct" : `Answer: ${question.answer}`;
  document.getElementById("quest-check").textContent = index === questions.length - 1 ? "Finish" : "Continue";
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
