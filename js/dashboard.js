import { LangManager } from "./language-manager.js";
import { formatXP, icon, renderAppShell, renderIcons } from "./app.js";
import { requireAuth } from "./auth-guard.js?v=20260701-authfix";
import { ProgressManager } from "./progress-manager.js";
import { getLessons } from "./data-loader.js";

const signedInUser = await requireAuth();
const { user, root } = renderAppShell({ page: "dashboard", title: "Home", currentUser: signedInUser });
await ProgressManager.init(user.uid);
const lessons = await getLessons();
const progress = ProgressManager.getLocalProgress(user.uid);
const cfg = LangManager.getConfig();
const nextNumber = ProgressManager.getNextLesson(user.uid);
const nextLesson = lessons.find((item) => item.lesson === nextNumber) || lessons[0];
const completed = Object.keys(progress.completedLessons).length;
const world = [...cfg.worlds, ...(cfg.furtherWorlds || [])].find((item) => item.lessons.includes(nextNumber)) || cfg.worlds[0];
const pathNumbers = world.lessons.slice(0, 5);
const dailyGoal = 40;
const dailyXp = progress.dailyXpDay === new Date().toISOString().slice(0, 10) ? progress.dailyXp : 0;
const reviewDue = Math.max(4, Math.min(24, completed * 2));
const leagueRank = Math.max(1, 14 - Math.floor(progress.xp / 120));
const missionTitle = nextLesson.title
  .replace(/^The /, "")
  .replace(" — ", " · ")
  .replace(/\s*\([^)]*\)$/, "");

function node(number) {
  const key = LangManager.lessonKey(number);
  const item = lessons.find((lesson) => lesson.lesson === number);
  const done = Boolean(progress.completedLessons[key]);
  const unlocked = ProgressManager.isLessonUnlocked(user.uid, number);
  const state = done ? "complete" : number === nextNumber ? "current" : unlocked ? "open" : "locked";
  const title = item?.title || `Lesson ${number}`;
  const compact = title.includes("Alphabet") ? `Alphabet ${number}`
    : title.includes("Vowels") ? "Vowels & Accents"
    : title.includes("First Greek") ? "First Words"
    : title.includes("Cases") ? "Greek Cases"
    : title.replace(/^The /, "").split("—")[0].slice(0, 16);
  return `<a class="game-node ${state}" href="${unlocked ? `lesson-player.html?lang=${cfg.lang}&lesson=${number}` : "#"}" aria-label="Lesson ${number}: ${title}">
    <b>${done ? icon("check") : state === "locked" ? icon("lock") : number}</b>
    <span>${compact}</span>
  </a>`;
}

root.innerHTML = `
  <div class="game-home">
    <section class="game-main">
      <article class="card mission-panel">
        <div class="mission-copy">
          <span class="mission-kicker">Continue lesson</span>
          <h2>${missionTitle}</h2>
          <div class="mission-meta">
            <span>${icon("clock-3")} 8 min</span>
            <span>${icon(cfg.icon)} ${cfg.shortLabel}</span>
            <span>${icon("book-open")} Reading</span>
            <span>${icon("volume-2")} Pronunciation</span>
          </div>
          <strong>Reward · +${nextLesson.xp} XP</strong>
        </div>
        <div class="mission-glyph" aria-hidden="true">${cfg.lang === "hebrew" ? "א" : "β"}</div>
        <div class="mission-action">
          <a class="btn btn-primary" href="lesson-player.html?lang=${cfg.lang}&lesson=${nextNumber}" aria-label="Start lesson">
            ${icon("play", `Start +${nextLesson.xp} XP`)}
          </a>
        </div>
      </article>

      <article class="card path-panel">
        <div class="path-head">
          <div><span class="path-label">Path</span><h3>${world.name}</h3></div>
          <a href="lessons.html" class="btn btn-ghost">${icon("map", "View path")}</a>
        </div>
        <div class="game-path">${pathNumbers.map(node).join("")}</div>
      </article>

      <section class="quest-strip">
        <a class="card strip-action" href="quests.html">
          <span class="strip-icon">${icon("shield-check")}</span>
          <span><strong>Daily quest</strong><small>Score 80% in one lesson · +30 XP</small></span>
          ${icon("arrow-right")}
        </a>
        <a class="card strip-action" href="practice.html">
          <span class="strip-icon">${icon("scroll-text")}</span>
          <span><strong>Scripture challenge</strong><small>${cfg.lang === "hebrew" ? "Genesis 1:1" : "John 1:1"} · +40 XP</small></span>
          ${icon("arrow-right")}
        </a>
      </section>
    </section>

    <aside class="game-rail">
      <article class="card">
        <span class="rail-title">Today's goal</span>
        <div class="goal-ring">${dailyXp}<small>/${dailyGoal}</small></div>
      </article>
      <a class="card" href="practice.html">
        <span class="rail-title">Review due</span>
        <div class="rail-stat">${icon("book-open")}<div><strong>${reviewDue}</strong><small>items</small></div></div>
      </a>
      <a class="card" href="leaderboard.html">
        <span class="rail-title">Silver league</span>
        <div class="rail-stat">${icon("trophy")}<div><strong>#${leagueRank}</strong><small>Top 20 advance</small></div></div>
      </a>
    </aside>
  </div>`;

LangManager.applyTheme();
renderIcons();
