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
const totalXP = progress.xp + user.xp_total;
const lessonWindowStart = Math.max(currentWorld.lessons[0], nextLesson.lesson - 2);
const missionLessons = currentWorld.lessons.filter((lesson) => lesson >= lessonWindowStart).slice(0, 5);
const reviewCount = Math.min(12, Math.max(4, completedCount * 2 || 5));
const dailyGoal = Math.min(30, Math.max(10, 10 + completedCount * 2));
const dailyProgress = Math.min(100, Math.round(((totalXP % dailyGoal) / dailyGoal) * 100));
const dailyClass = dailyProgress >= 80 ? "w80" : dailyProgress >= 60 ? "w60" : dailyProgress >= 40 ? "w40" : dailyProgress >= 20 ? "w20" : "w0";
const leagueRank = Math.max(3, 18 - level.level - completedCount);
const firstActivity = (progress.activity || [])[0];
const passage = cfg.lang === "hebrew"
  ? { title: "Genesis 1:1", original: "בראשית ברא אלהים את השמים ואת הארץ", help: "Read the opening words with guided morphology." }
  : { title: "John 1:1", original: "En arche en ho logos", help: "Connect forms, meaning, and syntax in context." };

function pctClass(done, total) {
  const pct = Math.round((done / total) * 100);
  if (pct >= 100) return "w100";
  if (pct >= 80) return "w80";
  if (pct >= 75) return "w75";
  if (pct >= 60) return "w60";
  if (pct >= 50) return "w50";
  if (pct >= 40) return "w40";
  if (pct >= 25) return "w25";
  if (pct >= 20) return "w20";
  return "w0";
}

function lessonNode(n) {
  const key = LangManager.lessonKey(n);
  const complete = !!progress.completedLessons[key];
  const unlocked = ProgressManager.isLessonUnlocked(user.uid, n);
  const cls = complete ? "complete" : n === nextLesson.lesson ? "current" : unlocked ? "open" : "locked";
  const label = complete ? "Done" : n === nextLesson.lesson ? "Next" : unlocked ? "Open" : "Locked";
  const href = unlocked ? `lesson-player.html?lesson=${n}&lang=${cfg.lang}` : "#";
  return `<a class="path-node ${cls}" href="${href}" aria-label="Lesson ${n} ${label}"><span>${complete ? icon("check") : n}</span><small>${label}</small></a>`;
}

root.innerHTML = `
  <div class="dashboard-home">
    <section class="daily-brief card">
      <div class="daily-copy">
        <div class="section-title compact-title">
          <span class="pill">${icon(cfg.icon, '<span data-lang-label></span>')}</span>
          <div class="tabs language-tabs">
            ${Object.values(window.LANG_CONFIGS).map((lang) => `<button class="tab-btn" type="button" data-dash-lang="${lang.lang}" aria-label="Switch to ${lang.label}">${lang.logo} ${lang.shortLabel}</button>`).join("")}
          </div>
        </div>
        <p class="tiny">Today's mission</p>
        <h2>Lesson ${nextLesson.lesson}: ${nextLesson.title}</h2>
        <p>${nextLesson.summary}</p>
        <div class="progress daily-progress" aria-label="Daily XP goal"><span class="${dailyClass}"></span></div>
        <p class="tiny">${totalXP % dailyGoal} of ${dailyGoal} XP toward today's goal</p>
        <div class="quick-actions">
          <a class="btn btn-primary" href="lesson-player.html?lesson=${nextLesson.lesson}&lang=${cfg.lang}" aria-label="Continue lesson">${icon("play", "Start")}</a>
          <a class="btn btn-ghost" href="practice.html" aria-label="Review vocabulary">${icon("rotate-ccw", "Review")}</a>
        </div>
      </div>
      <div class="daily-meter" aria-label="Study stats">
        <div><strong>${progress.streak || user.streak}</strong><span>day streak</span></div>
        <div><strong>${user.hearts || 5}</strong><span>hearts</span></div>
        <div><strong>#${leagueRank}</strong><span>league</span></div>
      </div>
    </section>

    <section class="learning-path card">
      <div class="section-title">
        <div><h2>${currentWorld.name}</h2><p class="tiny">${worldDone} of ${currentWorld.lessons.length} complete</p></div>
        <a class="btn btn-ghost" href="lessons.html" aria-label="Open lesson map">${icon("map", "Map")}</a>
      </div>
      <div class="path-track" aria-label="Compact lesson path">
        ${missionLessons.map(lessonNode).join("")}
      </div>
    </section>

    <section class="motivation-grid">
      <article class="card stat-card compact-stat"><span class="tiny">Total XP</span><strong>${formatXP(totalXP)}</strong></article>
      <article class="card stat-card compact-stat"><span class="tiny">Level</span><strong>${level.level}</strong><span class="muted">${level.title}</span></article>
      <article class="card stat-card compact-stat"><span class="tiny">Words due</span><strong>${reviewCount}</strong><span class="muted">Review now</span></article>
      <article class="card stat-card compact-stat"><span class="tiny">Lessons</span><strong>${completedCount}</strong><span class="muted">Completed</span></article>
    </section>

    <section class="app-home-grid">
      <article class="card action-panel">
        <div class="section-title"><h2>Fast Practice</h2><a class="btn btn-ghost" href="practice.html">${icon("arrow-right", "Open")}</a></div>
        <div class="review-strip">
          <a href="practice.html" class="review-chip">${icon("layers", "Flashcards")}</a>
          <a href="practice.html" class="review-chip">${icon("timer", "Speed")}</a>
          <a href="practice.html" class="review-chip">${icon("keyboard", "Type")}</a>
        </div>
      </article>

      <article class="card action-panel">
        <div class="section-title"><h2>Daily Quest</h2><a class="btn btn-ghost" href="quests.html">${icon("sparkles", "Quests")}</a></div>
        <div class="quest-row">
          <span class="quest-icon">${icon("flame")}</span>
          <div><strong>Earn ${dailyGoal} XP</strong><p class="tiny">A short session keeps the streak alive.</p></div>
        </div>
      </article>

      <article class="card action-panel passage-panel">
        <div class="section-title"><h2>Study Passage</h2><a class="btn btn-ghost" href="study-room.html">${icon("book-open", "Open")}</a></div>
        <p class="tiny">${passage.title}</p>
        <p class="${cfg.lang === "hebrew" ? "hebrew-text" : "script-greek"} passage-line">${passage.original}</p>
        <p class="muted">${passage.help}</p>
      </article>

      <article class="card action-panel leaderboard-mini">
        <div class="section-title"><h2>League</h2><a class="btn btn-ghost" href="leaderboard.html">${icon("trophy", "View")}</a></div>
        <div class="mini-ranks">
          ${["Miriam", "Ezra", user.displayName].map((name, i) => `<div class="rank-row"><span>${i + 1}</span><strong>${name}</strong><em>${420 - i * 90} XP</em></div>`).join("")}
        </div>
      </article>

      <article class="card action-panel">
        <div class="section-title"><h2>Friend Quest</h2><a class="btn btn-ghost" href="friends.html">${icon("users", "Invite")}</a></div>
        <div class="quest-row">
          <span class="quest-icon">${icon("handshake")}</span>
          <div><strong>Pair review</strong><p class="tiny">Team up for a weekly translation challenge.</p></div>
        </div>
      </article>

      <article class="card action-panel word-card">
        <div class="section-title"><h2>Word of the Day</h2><button class="icon-btn" id="favorite-word" type="button" aria-label="Add word to favorites">${icon("bookmark-plus")}</button></div>
        <div class="word-preview">
          <div class="${cfg.lang === "hebrew" ? "hebrew-text" : "script-greek"} script-mark">${word.script}</div>
          <div><strong>${word.transliteration}</strong><p class="muted">${word.english} · Lesson ${word.lesson}</p></div>
        </div>
      </article>
    </section>

    <section class="world-rail card">
      <div class="section-title"><h2>Worlds</h2><a class="btn btn-ghost" href="lessons.html" aria-label="View lessons">${icon("arrow-right", "All")}</a></div>
      <div class="world-scroll">
        ${cfg.worlds.map((world) => {
          const done = world.lessons.filter((n) => progress.completedLessons[LangManager.lessonKey(n)]).length;
          return `<article class="world-pill"><strong>${world.name}</strong><span class="tiny">${done}/${world.lessons.length}</span><div class="progress mini-progress"><span class="${pctClass(done, world.lessons.length)}"></span></div></article>`;
        }).join("")}
      </div>
    </section>

    <section class="activity-rail card">
      <div class="section-title"><h2>Latest</h2></div>
      ${firstActivity ? `<div class="list-row"><span>${firstActivity.title}</span><span class="tiny">${firstActivity.xp} XP · ${getTimeAgo(firstActivity.at)}</span></div>` : `<p class="muted">No activity yet. Start a lesson or review to build your record.</p>`}
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
