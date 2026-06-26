import { LangManager } from "./language-manager.js";
import { icon, renderAppShell, renderIcons, showToast } from "./app.js";
import { getQuests } from "./data-loader.js";

const { root } = renderAppShell({ page: "quests", title: "Quests" });
const quests = await getQuests();
const completed = new Set(JSON.parse(localStorage.getItem(`blq_quests:${LangManager.get()}`) || "[]"));
const sessions = new Map(quests.map((quest) => [quest.id, buildQuestSession(quest)]));

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildQuestSession(quest, count = 10) {
  return shuffleArray(quest.questions || []).slice(0, count);
}

root.innerHTML = `
  <div class="page-grid">
    <section class="hero-card"><h2><span data-lang-label></span> Quests</h2><p>Daily, lesson, mastery, and special challenges keep study momentum alive.</p></section>
    <section class="card-grid">
      ${quests.map((quest) => `<article class="card"><span class="pill">${quest.category}</span><h3>${quest.title}</h3><p class="muted">${quest.description || "Practice focused review questions."}</p><p class="tiny">${quest.xpReward || quest.xp || 0} XP · ${(sessions.get(quest.id) || []).length} questions</p><button class="btn ${completed.has(quest.id) ? "btn-ghost" : "btn-primary"}" data-quest="${quest.id}" type="button" aria-label="Complete quest">${icon(completed.has(quest.id) ? "check" : "swords", completed.has(quest.id) ? "Complete" : "Start")}</button></article>`).join("")}
    </section>
  </div>`;

document.querySelectorAll("[data-quest]").forEach((button) => button.addEventListener("click", () => {
  const quest = quests.find((item) => item.id === button.dataset.quest);
  const firstQuestion = sessions.get(button.dataset.quest)?.[0];
  completed.add(button.dataset.quest);
  localStorage.setItem(`blq_quests:${LangManager.get()}`, JSON.stringify([...completed]));
  showToast(firstQuestion ? `${quest.title}: ${firstQuestion.prompt}` : "Quest recorded. Keep up the momentum.", "success", 4500);
  window.location.reload();
}));

LangManager.applyTheme();
renderIcons();
