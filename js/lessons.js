import { LangManager } from "./language-manager.js";
import { icon, renderAppShell, renderIcons } from "./app.js?v=20260710-mobile-admin";
import { requireAuth } from "./auth-guard.js?v=20260705-strict-auth";
import { ProgressManager } from "./progress-manager.js?v=20260709-strict-auth";
import { getLessons } from "./data-loader.js?v=20260703-hebrewvideos";

const signedInUser = await requireAuth();
const { user, root } = renderAppShell({ page: "lessons", title: "Path", currentUser: signedInUser });
await ProgressManager.init(user.uid);
const lessons = await getLessons();
const cfg = LangManager.getConfig();
const progress = ProgressManager.getLocalProgress(user.uid);
const worlds = [...cfg.worlds, ...(cfg.furtherWorlds || [])];

function worldMarkup(world) {
  const unlocked = ProgressManager.isWorldUnlocked(user.uid, world.id);
  const done = world.lessons.filter((n) => progress.completedLessons[LangManager.lessonKey(n)]).length;
  return `<section class="path-world ${unlocked ? "" : "locked"}">
    <header class="path-world-head">
      <div><span>World ${world.id}</span><h2>${world.name}</h2></div>
      <strong>${done}/${world.lessons.length}</strong>
    </header>
    <div class="vertical-path">
      ${world.lessons.map((number) => {
        const lesson = lessons.find((item) => item.lesson === number);
        const complete = Boolean(progress.completedLessons[LangManager.lessonKey(number)]);
        const open = unlocked && ProgressManager.isLessonUnlocked(user.uid, number);
        const state = complete ? "complete" : open ? "current" : "locked";
        return `<a class="path-row ${state}" href="${open ? `lesson-player.html?lang=${cfg.lang}&lesson=${number}` : "#"}">
          <b>${complete ? icon("check") : open ? number : icon("lock")}</b>
          <span><strong>${lesson?.title || `Lesson ${number}`}</strong><small>${complete ? "Mastered" : open ? `Start · +${lesson?.xp || 20} XP` : "Complete the previous lesson"}</small></span>
          ${open ? icon("chevron-right") : ""}
        </a>`;
      }).join("")}
    </div>
  </section>`;
}

root.innerHTML = `
  <div class="path-page">
    <header class="path-page-head">
      <div><span class="mission-kicker">${cfg.label}</span><h1>Learning path</h1></div>
      <div class="tabs">${Object.values(window.LANG_CONFIGS).map((lang) => `<button class="tab-btn ${lang.lang === cfg.lang ? "active" : ""}" data-path-lang="${lang.lang}" type="button">${lang.logo} ${lang.shortLabel}</button>`).join("")}</div>
    </header>
    ${worlds.map(worldMarkup).join("")}
  </div>`;

document.querySelectorAll("[data-path-lang]").forEach((button) => button.addEventListener("click", () => LangManager.set(button.dataset.pathLang)));
renderIcons();
