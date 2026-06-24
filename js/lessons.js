import { LangManager } from "./language-manager.js";
import { icon, renderAppShell, renderIcons } from "./app.js";
import { ProgressManager } from "./progress-manager.js";

const { user, root } = renderAppShell({ page: "lessons", title: "Lessons" });
const cfg = LangManager.getConfig();
const progress = ProgressManager.getLocalProgress(user.uid);
const allWorlds = [...cfg.worlds, ...(cfg.furtherWorlds || [])];
const pctClass = (done, total) => {
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
};

function renderWorld(world) {
  const unlocked = ProgressManager.isWorldUnlocked(user.uid, world.id);
  const done = world.lessons.filter((n) => progress.completedLessons[LangManager.lessonKey(n)]).length;
  return `
    <article class="world-card card">
      <div class="section-title">
        <div><h2>World ${world.id} · ${world.name}</h2><p class="muted">${world.lessons.length} lessons · ${done} complete · ${Math.round((done / world.lessons.length) * 100)}%</p></div>
        <span class="pill">${unlocked ? icon("unlock", "Open") : icon("lock", "Locked")}</span>
      </div>
      <div class="progress"><span class="${pctClass(done, world.lessons.length)}"></span></div>
      <div class="lesson-dots section-gap">
        ${world.lessons.map((n) => {
          const key = LangManager.lessonKey(n);
          const complete = !!progress.completedLessons[key];
          const isUnlocked = unlocked && ProgressManager.isLessonUnlocked(user.uid, n);
          const cls = complete ? "complete" : isUnlocked ? "current" : "locked";
          const href = isUnlocked ? `lesson-player.html?lesson=${n}&lang=${cfg.lang}` : "#";
          return `<a class="lesson-dot ${cls}" href="${href}" aria-label="Lesson ${n}">${complete ? "✓" : isUnlocked ? n : "🔒"}</a>`;
        }).join("")}
      </div>
    </article>`;
}

root.innerHTML = `
  <div class="page-grid">
    <section class="hero-card"><h2><span data-lang-label></span> Lesson Map</h2><p>Move world by world through the language of Scripture. Complete every lesson in a world to open the next section.</p></section>
    ${cfg.worlds.map(renderWorld).join("")}
    ${cfg.furtherWorlds ? `<div class="section-title"><h2>Further Studies · Lessons 22-40</h2></div>${cfg.furtherWorlds.map(renderWorld).join("")}` : ""}
  </div>`;
LangManager.applyTheme();
renderIcons();
