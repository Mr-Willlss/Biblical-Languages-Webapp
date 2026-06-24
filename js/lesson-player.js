import { LangManager } from "./language-manager.js";
import { icon, renderAppShell, renderIcons, showCelebration, showToast, showXPPopup } from "./app.js";
import { ProgressManager } from "./progress-manager.js";
import { getLessons } from "./data-loader.js";

const url = new URL(window.location.href);
const requestedLang = url.searchParams.get("lang");
if (requestedLang && requestedLang !== LangManager.get()) LangManager.set(requestedLang, false);
const lessonNum = Number(url.searchParams.get("lesson") || 1);
const { user, root } = renderAppShell({ page: "lessons", title: "Lesson Player" });
const lessons = await getLessons();
const lesson = lessons.find((item) => item.lesson === lessonNum) || lessons[0];
const cfg = LangManager.getConfig();
let hearts = 5;
let current = 0;
let correct = 0;

function extractYouTubeId(value) {
  const match = value.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^&?/\\s]{11})/);
  return match ? match[1] : null;
}

function renderVideo() {
  if (lesson.videoUrl?.trim()) {
    const videoId = extractYouTubeId(lesson.videoUrl);
    return `<div class="video-wrapper"><iframe src="https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1" title="${lesson.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
  }
  return `<div class="video-placeholder"><div><span class="video-icon">${icon("clapperboard")}</span><p>Video lesson coming soon</p><span class="muted">Proceed to the exercises below to practise this lesson.</span></div></div>`;
}

function renderKeyboard() {
  if (!LangManager.isHebrew()) return "";
  return `<div class="hebrew-keyboard" aria-label="On-screen script keyboard">${"אבגדהוזחטיכלמנסעפצקרשת".split("").map((letter) => `<button class="hebrew-key" type="button" aria-label="Type ${letter}">${letter}</button>`).join("")}</div>`;
}

function answerExercise(value, button) {
  const exercise = lesson.exercises[current];
  const expected = exercise.answer;
  const isCorrect = Array.isArray(expected) ? JSON.stringify(value) === JSON.stringify(expected) : String(value).toLowerCase() === String(expected).toLowerCase();
  if (isCorrect) {
    correct += 1;
    button?.classList.add("correct");
    showXPPopup(5, window.innerWidth / 2, window.innerHeight / 2);
  } else {
    hearts -= 1;
    button?.classList.add("incorrect");
    showToast("Not quite. Read the form once more and try the next one.", "warning");
  }
  setTimeout(() => {
    if (hearts <= 0) {
      showToast("The lesson reset. Review the notes and begin again.", "error");
      hearts = 5;
      current = 0;
      correct = 0;
    } else if (current < lesson.exercises.length - 1) current += 1;
    else completeLesson();
    renderPractice();
  }, 650);
}

function completeLesson() {
  const stars = hearts >= 5 ? 3 : hearts >= 3 ? 2 : 1;
  const result = ProgressManager.completeLesson(user.uid, lesson.lesson, { xp: lesson.xp, stars, title: lesson.title });
  showCelebration(stars);
  if (result.firstCompletion) showToast(`${lesson.xp} XP awarded for first completion.`, "success");
}

function renderPractice() {
  const exercise = lesson.exercises[current];
  const mount = document.getElementById("exercise-mount");
  if (!mount) return;
  const promptClass = exercise.rtl ? "exercise-hebrew" : "";
  let body = "";
  if (exercise.options) {
    body = exercise.options.map((option) => `<button class="exercise-option" type="button" data-answer="${option}" aria-label="Answer ${option}">${option}</button>`).join("");
  } else if (exercise.type === "matching") {
    body = exercise.pairs.map(([a, b]) => `<div class="list-row"><span class="${exercise.rtl ? "hebrew-text" : ""}">${a}</span><strong>${b}</strong></div>`).join("") + `<button class="btn btn-primary" type="button" data-answer="matched" aria-label="Submit matching">${icon("check", "Submit")}</button>`;
  } else if (exercise.type === "ordering") {
    body = `<p class="muted">${exercise.items.join(" · ")}</p><button class="btn btn-primary" type="button" data-answer='${JSON.stringify(exercise.answer)}' aria-label="Submit ordering">${icon("check", "Submit")}</button>`;
  } else if (exercise.type === "true_false") {
    body = `<button class="exercise-option" type="button" data-answer="true" aria-label="True">True</button><button class="exercise-option" type="button" data-answer="false" aria-label="False">False</button>`;
  } else {
    body = `<div class="field"><input id="typed-answer" aria-label="Typed answer" placeholder="Type your answer"></div>${renderKeyboard()}<button class="btn btn-primary" type="button" id="submit-typed" aria-label="Submit typed answer">${icon("check", "Submit")}</button>`;
  }
  mount.innerHTML = `
    <div class="section-title"><h3>Exercise ${current + 1} of ${lesson.exercises.length}</h3><span class="pill">${icon("heart", hearts)}</span></div>
    <p class="${promptClass}">${exercise.prompt}</p>
    <div class="list">${body}</div>`;
  mount.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.answer === "matched" ? exercise.answer || true : button.dataset.answer.startsWith("[") ? JSON.parse(button.dataset.answer) : button.dataset.answer;
      answerExercise(value, button);
    });
  });
  mount.querySelector("#submit-typed")?.addEventListener("click", () => answerExercise(mount.querySelector("#typed-answer").value, mount.querySelector("#submit-typed")));
  mount.querySelectorAll(".hebrew-key").forEach((key) => {
    key.addEventListener("click", () => {
      const input = mount.querySelector("#typed-answer");
      input.value += key.textContent;
      input.focus();
    });
  });
  renderIcons();
}

root.innerHTML = `
  <div class="page-grid">
    <section class="hero-card"><p class="muted"><span data-lang-label></span> · Lesson ${lesson.lesson}</p><h2>${lesson.title}</h2><p>${lesson.summary}</p></section>
    <section class="two-col">
      <article class="card">
        <div class="section-title"><h2>Learn</h2><span class="pill">${lesson.xp} XP</span></div>
        ${renderVideo()}
        <h3>Objectives</h3>
        <div class="list">${lesson.objectives.map((objective) => `<div class="list-row">${icon("check-circle", objective)}</div>`).join("")}</div>
        <h3>Examples</h3>
        <div class="list">${lesson.examples.map((example) => `<div class="list-row"><div><div class="${cfg.lang === "hebrew" ? "hebrew-text" : "script-greek"}">${example.script}</div><strong>${example.transliteration}</strong><p class="muted">${example.english}</p></div></div>`).join("")}</div>
      </article>
      <article class="card" id="exercise-mount"></article>
    </section>
  </div>`;
LangManager.applyTheme();
renderPractice();
renderIcons();
