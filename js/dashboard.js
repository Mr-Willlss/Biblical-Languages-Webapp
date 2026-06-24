import { LangManager } from "./language-manager.js";
import { formatXP, getLevelFromXP, getTimeAgo, icon, renderAppShell, renderIcons } from "./app.js";
import { ProgressManager } from "./progress-manager.js";
import { getLessons, getVocab } from "./data-loader.js";

const { user, root } = renderAppShell({ page: "dashboard", title: "Dashboard" });
const lessons = await getLessons();
const vocab = await getVocab();
const progress = ProgressManager.getLocalProgress(user.uid);
const nextLessonNum = ProgressManager.getNextLesson(user.uid);
const nextLesson = lessons.find((lesson) => lesson.lesson === nextLessonNum) || lessons[0];
const cfg = LangManager.getConfig();
const completedCount = Object.keys(progress.completedLessons).length;
const level = getLevelFromXP(progress.xp + user.xp_total);
const word = vocab[(new Date().getDate() + completedCount) % vocab.length];
const currentWorld = [...cfg.worlds, ...(cfg.furtherWorlds || [])].find((world) => world.lessons.includes(nextLesson.lesson)) || cfg.worlds[0];
const worldDone = currentWorld.lessons.filter((n) => progress.completedLessons[LangManager.lessonKey(n)]).length;
const pctClass = (done, total) => `w${Math.round((done / total) * 4) * 25 === 25 || Math.round((done / total) * 4) * 25 === 75 ? Math.round((done / total) * 4) * 25 : Math.round((done / total) * 5) * 20}`;

root.innerHTML = `
  <div class="page-grid">
    <section class="hero-card">
      <div class="section-title">
        <span class="pill">${icon(cfg.icon, '<span data-lang-label></span>')}</span>
        <div class="tabs">
          ${Object.values(window.LANG_CONFIGS).map((lang) => `<button class="tab-btn" type="button" data-dash-lang="${lang.lang}" aria-label="Switch to ${lang.label}">${lang.logo} ${lang.shortLabel}</button>`).join("")}
        </div>
      </div>
      <p class="muted">Continue Learning</p>
      <h2>Lesson ${nextLesson.lesson}: ${nextLesson.title}</h2>
      <p>${nextLesson.summary}</p>
      <div class="progress" aria-label="World progress"><span class="${pctClass(worldDone, currentWorld.lessons.length)}"></span></div>
      <p class="tiny">${currentWorld.name} · ${worldDone} of ${currentWorld.lessons.length} complete</p>
      <a class="btn btn-primary" href="lesson-player.html?lesson=${nextLesson.lesson}&lang=${cfg.lang}" aria-label="Continue lesson">${icon("play", "Continue Lesson")}</a>
    </section>

    <section class="stat-grid">
      <article class="card stat-card"><strong>${formatXP(progress.xp + user.xp_total)}</strong><span class="muted">Total XP</span></article>
      <article class="card stat-card"><strong>${progress.streak || user.streak}</strong><span class="muted">Current Streak</span></article>
      <article class="card stat-card"><strong>${completedCount}</strong><span class="muted">Lessons Completed</span></article>
      <article class="card stat-card"><strong>${level.level}</strong><span class="muted">${level.title}</span></article>
    </section>

    <section class="two-col">
      <article class="card">
        <div class="section-title"><h2>World Progress Map</h2><a class="btn btn-ghost" href="lessons.html" aria-label="View lessons">${icon("arrow-right", "View")}</a></div>
        <div class="list">
          ${cfg.worlds.map((world) => {
            const done = world.lessons.filter((n) => progress.completedLessons[LangManager.lessonKey(n)]).length;
            return `<div class="list-row"><div><strong>World ${world.id}: ${world.name}</strong><div class="tiny">${done} of ${world.lessons.length} complete</div></div><div class="progress mini-progress"><span class="${pctClass(done, world.lessons.length)}"></span></div></div>`;
          }).join("")}
        </div>
      </article>
      <aside class="page-grid">
        <article class="card">
          <div class="section-title"><h3>Recent Activity</h3></div>
          <div class="list">
            ${(progress.activity || []).slice(0, 5).map((item) => `<div class="list-row"><span>${item.title}</span><span class="tiny">${item.xp} XP · ${getTimeAgo(item.at)}</span></div>`).join("") || `<p class="muted">No activity yet. Every word learned brings you closer to the original text.</p>`}
          </div>
        </article>
        <article class="card">
          <div class="section-title"><h3>Leaderboard Snapshot</h3></div>
          <div class="list">
            ${["Miriam", "Ezra", user.displayName].map((name, i) => `<div class="list-row"><span>${i + 1}. ${name}</span><strong>${420 - i * 90} XP</strong></div>`).join("")}
          </div>
        </article>
      </aside>
    </section>

    <section class="card">
      <div class="section-title"><h2>Vocabulary Word of the Day</h2><button class="btn btn-ghost" id="favorite-word" type="button" aria-label="Add word to favorites">${icon("bookmark-plus", "Add to Favorites")}</button></div>
      <div class="list-row">
        <div>
          <div class="${cfg.lang === "hebrew" ? "hebrew-text" : "script-greek"} script-mark">${word.script}</div>
          <strong>${word.transliteration}</strong>
          <p class="muted">${word.english} · Lesson ${word.lesson} · ${word.type}</p>
        </div>
      </div>
    </section>
  </div>`;

document.querySelectorAll("[data-dash-lang]").forEach((button) => {
  button.classList.toggle("active", button.dataset.dashLang === cfg.lang);
  button.addEventListener("click", () => LangManager.set(button.dataset.dashLang));
});
document.getElementById("favorite-word")?.addEventListener("click", () => {
  const key = `blq_favorites:${user.uid}`;
  const favorites = JSON.parse(localStorage.getItem(key) || "[]");
  if (!favorites.includes(word.id)) favorites.push(word.id);
  localStorage.setItem(key, JSON.stringify(favorites));
  window.app.showToast("Saved to your words.", "success");
});
LangManager.applyTheme();
renderIcons();
