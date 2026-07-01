import { LangManager } from "./language-manager.js";
import { icon, renderAppShell, renderIcons, safeText, showCelebration, showModal, showXPPopup } from "./app.js";
import { requireAuth } from "./auth-guard.js?v=20260701-authfix2";
import { ProgressManager } from "./progress-manager.js?v=20260701-syncfix";
import { getLessons } from "./data-loader.js";

const url = new URL(window.location.href);
const requestedLang = url.searchParams.get("lang");
if (requestedLang && requestedLang !== LangManager.get()) LangManager.set(requestedLang, false);
const lessonNum = Number(url.searchParams.get("lesson") || 1);
const signedInUser = await requireAuth();
const { user, root } = renderAppShell({ page: "lessons", title: "Lesson", currentUser: signedInUser });
await ProgressManager.init(user.uid);
const lessons = await getLessons();
const lesson = lessons.find((item) => item.lesson === lessonNum) || lessons[0];
const cfg = LangManager.getConfig();
const exercises = buildSession(lesson);
let hearts = 5;
let current = 0;
let correct = 0;
let selected = null;
let ordered = [];
let answered = false;
let learnStep = 0;

const theorySteps = splitTheory(lesson.description || lesson.summary || "");
const learnSteps = ["overview", ...theorySteps.map((_, index) => `theory-${index}`), "media"];

document.body.classList.add("lesson-game-active", "lesson-game");

function shuffle(array) {
  const next = [...array];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function splitTheory(text) {
  const paragraphs = String(text).split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
  const chunks = [];
  let currentChunk = "";
  paragraphs.forEach((paragraph) => {
    const parts = paragraph.length <= 900 ? [paragraph] : paragraph.split("\n").filter(Boolean);
    parts.forEach((part) => {
      const combined = currentChunk ? `${currentChunk}\n\n${part}` : part;
      if (combined.length <= 1000) currentChunk = combined;
      else {
        if (currentChunk) chunks.push(currentChunk);
        currentChunk = part;
      }
    });
  });
  if (currentChunk) chunks.push(currentChunk);
  return chunks.length ? chunks : ["Review the lesson focus, then continue to practice."];
}

function youtubeEmbed(urlValue) {
  const match = String(urlValue || "").match(/(?:youtu\.be\/|v=|embed\/)([\w-]{6,})/);
  return match ? `https://www.youtube-nocookie.com/embed/${match[1]}` : "";
}

function renderLearn() {
  const step = learnSteps[learnStep];
  const isOverview = step === "overview";
  const isMedia = step === "media";
  const theoryIndex = step.startsWith("theory-") ? Number(step.split("-")[1]) : -1;
  const embed = youtubeEmbed(lesson.videoUrl);
  const progress = learnSteps.map((_, index) => `<span class="${index <= learnStep ? "done" : ""}"></span>`).join("");
  const words = lesson.vocabulary.slice(0, 6).map((word) => `
    <div class="learn-word ${word.lang === "hebrew" ? "hebrew-text" : ""}">
      <strong>${safeText(word.script)}</strong><span>${safeText(word.transliteration || word.english)}</span><small>${safeText(word.english)}</small>
    </div>`).join("");

  root.innerHTML = `
    <div class="lesson-game-shell learn-shell" style="--steps:${learnSteps.length}">
      <header class="game-top">
        <a class="game-close" href="dashboard.html" aria-label="Exit lesson">${icon("x")}</a>
        <div class="game-progress" aria-label="Learning progress">${progress}</div>
        <span class="learn-counter">${learnStep + 1}/${learnSteps.length}</span>
      </header>
      <main class="learn-stage">
        ${isOverview ? `<span class="challenge-language">${cfg.label} · Lesson ${lesson.lesson}</span><h1>${safeText(lesson.title)}</h1><p class="learn-objective">${safeText(lesson.grammarNote || lesson.summary)}</p><div class="learn-callout"><strong>Goal</strong><span>${safeText(lesson.objectives?.[0] || lesson.summary)}</span></div>` : ""}
        ${theoryIndex >= 0 ? `<span class="challenge-language">Learn the pattern · ${theoryIndex + 1} of ${theorySteps.length}</span><h1>${safeText(lesson.title)}</h1><div class="theory-panel ${lesson.lang === "hebrew" ? "hebrew-text" : ""}">${safeText(theorySteps[theoryIndex]).replace(/\n/g, "<br>")}</div>` : ""}
        ${isMedia ? `<span class="challenge-language">Watch and recall</span><h1>Ready to put it together?</h1>${embed ? `<div class="learn-video"><iframe src="${embed}" title="${safeText(lesson.title)} video lesson" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>` : `<div class="learn-callout"><strong>Reading lesson</strong><span>This lesson has no video in the original course.</span></div>`}<div class="learn-words">${words}</div>` : ""}
      </main>
      <footer class="game-footer learn-footer">
        <button class="btn btn-ghost" id="learn-skip" type="button">Skip to practice</button>
        <button class="btn btn-primary game-check" id="learn-next" type="button">${isMedia ? "Start practice" : "Continue"}</button>
      </footer>
    </div>`;
  document.getElementById("learn-skip").addEventListener("click", render);
  document.getElementById("learn-next").addEventListener("click", () => {
    if (learnStep < learnSteps.length - 1) { learnStep += 1; renderLearn(); }
    else render();
  });
  renderIcons();
}

function buildSession(source) {
  return shuffle(source.exercises).map((exercise) => {
    if (!exercise.pool?.length) return exercise;
    return { ...exercise, ...exercise.pool[Math.floor(Math.random() * exercise.pool.length)] };
  });
}

function expectedText(exercise) {
  if (Array.isArray(exercise.answer)) return exercise.answer.join(" ");
  if (typeof exercise.answer === "boolean") return exercise.answer ? "True" : "False";
  return String(exercise.answer ?? "Review the model answer.");
}

function isCorrect(value, expected) {
  if (Array.isArray(expected)) return JSON.stringify(value) === JSON.stringify(expected);
  return String(value).trim().toLocaleLowerCase() === String(expected).trim().toLocaleLowerCase();
}

function heartIcons() {
  return Array.from({ length: 5 }, (_, index) => index < hearts ? icon("heart") : icon("heart-off")).join("");
}

function progressBars() {
  return exercises.map((_, index) => `<span class="${index <= current ? "done" : ""}"></span>`).join("");
}

function choiceMarkup(exercise) {
  if (exercise.options?.length) {
    return `<div class="answer-grid">${exercise.options.map((option, index) => `
      <button class="game-answer" type="button" data-choice="${index}" aria-label="Answer ${safeText(option)}">
        <span class="answer-script">${safeText(option)}</span>
      </button>`).join("")}</div>`;
  }
  if (exercise.type === "true_false") {
    return `<div class="answer-grid">
      <button class="game-answer" type="button" data-value="true">True</button>
      <button class="game-answer" type="button" data-value="false">False</button>
    </div>`;
  }
  if (exercise.type === "ordering") {
    return `<div class="ordering-game">
      <div class="order-preview" id="order-preview">Choose words in order</div>
      <div class="answer-grid">${shuffle(exercise.items).map((item, index) => `<button class="game-answer order-word" type="button" data-order="${index}" data-word="${safeText(item)}">${safeText(item)}</button>`).join("")}</div>
    </div>`;
  }
  if (exercise.type === "matching") {
    return `<div class="answer-grid">${exercise.pairs.map(([left, right]) => `<div class="game-answer"><span class="answer-script">${safeText(left)}</span>${safeText(right)}</div>`).join("")}</div>`;
  }
  return `<input class="typed-answer" id="typed-answer" autocomplete="off" aria-label="Type your answer" placeholder="Type your answer">`;
}

function render() {
  const exercise = exercises[current];
  selected = null;
  ordered = [];
  answered = false;
  root.innerHTML = `
    <div class="lesson-game-shell" style="--steps:${exercises.length}">
      <header class="game-top">
        <a class="game-close" href="dashboard.html" aria-label="Exit lesson">${icon("x")}</a>
        <div class="game-progress" aria-label="Lesson progress">${progressBars()}</div>
        <div class="game-hearts" aria-label="${hearts} hearts">${heartIcons()}</div>
      </header>
      <main class="challenge-stage">
        <span class="challenge-count">${current + 1} of ${exercises.length}</span>
        <span class="challenge-language">${cfg.label}</span>
        <h1 class="challenge-prompt ${exercise.rtl ? "hebrew-text" : ""}">${safeText(exercise.prompt)}</h1>
        ${choiceMarkup(exercise)}
      </main>
      <footer class="game-footer">
        <div class="feedback" id="feedback" role="status"></div>
        <button class="btn btn-primary game-check" id="game-check" type="button" disabled>Check</button>
      </footer>
    </div>
    <button class="icon-btn guide-button" id="guide-button" type="button" aria-label="Open lesson guide">${icon("book-open")}</button>`;

  const check = document.getElementById("game-check");
  document.querySelectorAll("[data-choice]").forEach((button) => button.addEventListener("click", () => {
    if (answered) return;
    document.querySelectorAll(".game-answer").forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");
    selected = exercise.options[Number(button.dataset.choice)];
    check.disabled = false;
  }));
  document.querySelectorAll("[data-value]").forEach((button) => button.addEventListener("click", () => {
    if (answered) return;
    document.querySelectorAll(".game-answer").forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");
    selected = button.dataset.value === "true";
    check.disabled = false;
  }));
  document.querySelectorAll("[data-order]").forEach((button) => button.addEventListener("click", () => {
    if (answered || button.disabled) return;
    button.disabled = true;
    button.classList.add("selected");
    ordered.push(button.dataset.word);
    document.getElementById("order-preview").textContent = ordered.join(" · ");
    check.disabled = ordered.length !== exercise.items.length;
  }));
  const typed = document.getElementById("typed-answer");
  typed?.addEventListener("input", () => { check.disabled = !typed.value.trim(); });
  if (exercise.type === "matching") {
    selected = true;
    check.disabled = false;
  }
  check.addEventListener("click", () => answered ? advance() : checkAnswer());
  document.getElementById("guide-button").addEventListener("click", openGuide);
  renderIcons();
}

function checkAnswer() {
  const exercise = exercises[current];
  const value = exercise.type === "ordering" ? ordered : document.getElementById("typed-answer")?.value ?? selected;
  const expected = exercise.type === "matching" && exercise.answer == null ? true : exercise.answer;
  const result = isCorrect(value, expected);
  answered = true;
  if (result) {
    correct += 1;
    showXPPopup(5);
  } else {
    hearts = Math.max(0, hearts - 1);
  }
  document.querySelectorAll(".game-answer.selected").forEach((button) => button.classList.add(result ? "correct" : "incorrect"));
  const feedback = document.getElementById("feedback");
  feedback.className = `feedback ${result ? "correct" : "incorrect"}`;
  feedback.innerHTML = `<strong>${result ? "Correct. +5 XP" : `Answer: ${safeText(expectedText({ ...exercise, answer: expected }))}`}</strong>${exercise.explanation ? `<span>${safeText(exercise.explanation)}</span>` : ""}`;
  const check = document.getElementById("game-check");
  check.disabled = false;
  check.textContent = current === exercises.length - 1 ? "Finish" : "Continue";
}

function advance() {
  if (hearts === 0) {
    hearts = 5;
    current = 0;
    correct = 0;
    render();
    return;
  }
  if (current < exercises.length - 1) {
    current += 1;
    render();
    return;
  }
  finish();
}

function finish() {
  const score = Math.round((correct / exercises.length) * 100);
  const stars = score >= 90 ? 3 : score >= 70 ? 2 : 1;
  const result = ProgressManager.completeLesson(user.uid, lesson.lesson, { xp: lesson.xp, stars, title: lesson.title });
  showCelebration(stars);
  root.innerHTML = `
    <div class="lesson-game-shell completion-screen">
      <main class="challenge-stage">
        <span class="challenge-language">Lesson complete</span>
        <h1 class="challenge-prompt">${score}% mastery</h1>
        <div class="completion-stars">${"★".repeat(stars)}${"☆".repeat(3 - stars)}</div>
        <p>${result.firstCompletion ? `+${lesson.xp} XP earned` : "Practice complete · XP already awarded"}</p>
        <a class="btn btn-primary game-check" href="dashboard.html">${icon("home", "Back home")}</a>
      </main>
    </div>`;
  renderIcons();
}

function openGuide() {
  const summary = safeText(lesson.summary || lesson.description || "").split("\n").slice(0, 3).join("<br>");
  const words = (lesson.examples || lesson.vocabulary || []).slice(0, 4)
    .map((item) => `<div class="list-row"><strong>${safeText(item.script)}</strong><span>${safeText(item.english)}</span></div>`).join("");
  showModal(lesson.title, `<div class="lesson-guide"><p>${summary}</p><div class="list section-gap">${words}</div></div>`, ["Return to game"]);
}

renderLearn();
