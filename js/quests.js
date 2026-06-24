import { LangManager } from "./language-manager.js";
import { icon, renderAppShell, renderIcons, showToast } from "./app.js";
import { getQuests } from "./data-loader.js";

const { root } = renderAppShell({ page: "quests", title: "Quests" });
const quests = await getQuests();
const completed = new Set(JSON.parse(localStorage.getItem(`blq_quests:${LangManager.get()}`) || "[]"));

root.innerHTML = `
  <div class="page-grid">
    <section class="hero-card"><h2><span data-lang-label></span> Quests</h2><p>Daily, lesson, mastery, and special challenges keep study momentum alive.</p></section>
    <section class="card-grid">
      ${quests.map((quest) => `<article class="card"><span class="pill">${quest.category}</span><h3>${quest.title}</h3><p class="muted">${quest.xp} XP · target ${quest.target}</p><button class="btn ${completed.has(quest.id) ? "btn-ghost" : "btn-primary"}" data-quest="${quest.id}" type="button" aria-label="Complete quest">${icon(completed.has(quest.id) ? "check" : "swords", completed.has(quest.id) ? "Complete" : "Claim")}</button></article>`).join("")}
    </section>
  </div>`;
document.querySelectorAll("[data-quest]").forEach((button) => button.addEventListener("click", () => {
  completed.add(button.dataset.quest);
  localStorage.setItem(`blq_quests:${LangManager.get()}`, JSON.stringify([...completed]));
  showToast("Quest recorded. Keep up the momentum.", "success");
  window.location.reload();
}));
LangManager.applyTheme();
renderIcons();
