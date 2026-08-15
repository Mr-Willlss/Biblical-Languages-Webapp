import { LangManager } from "./language-manager.js";
import { renderAppShell, renderIcons, safeText } from "./app.js?v=20260710-mobile-admin";
import { requireAuth } from "./auth-guard.js?v=20260710-sync-all";
import { getQuests } from "./data-loader.js";

const page = document.body.dataset.page;
const signedInUser = await requireAuth({ admin: page === "admin" });
const { root } = renderAppShell({ page, title: "Rewards", currentUser: signedInUser });

async function rewards() {
  const quests = await getQuests();
  root.innerHTML = `<div class="page-grid"><section class="hero-card"><h2>Rewards</h2><p>Badges mark steady, meaningful progress through the language.</p></section><section class="card-grid">${quests.slice(0, 8).map((quest, i) => `<article class="card"><div class="brand-mark">${i + 1}</div><h3>${safeText(quest.title)}</h3><p class="muted">${i < 3 ? "Unlocked" : "Keep studying to unlock this milestone."}</p></article>`).join("")}</section></div>`;
}

if (page === "rewards") await rewards();
LangManager.applyTheme();
renderIcons();
