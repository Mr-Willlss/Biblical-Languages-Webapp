import { LangManager, LANG_CONFIGS } from "./language-manager.js";
import { SettingsManager } from "./settings-manager.js";
import { SoundManager } from "./sound-manager.js?v=20260703-sound";

SoundManager.installInteractionSounds();

const LEVEL_TITLES = [
  { level: 1, title: "Initiate", xpRequired: 0 },
  { level: 2, title: "Learner", xpRequired: 100 },
  { level: 3, title: "Scholar", xpRequired: 250 },
  { level: 4, title: "Novice Scribe", xpRequired: 500 },
  { level: 5, title: "Scribe", xpRequired: 900 },
  { level: 6, title: "Reader", xpRequired: 1400 },
  { level: 7, title: "Translator", xpRequired: 2100 },
  { level: 8, title: "Exegete", xpRequired: 3000 },
  { level: 9, title: "Theologian", xpRequired: 4200 },
  { level: 10, title: "Master", xpRequired: 6000 }
];

function icon(name, label = "") {
  return `<i data-lucide="${name}" aria-hidden="true"></i>${label ? `<span>${label}</span>` : ""}`;
}

function renderIcons() {
  if (window.lucide) window.lucide.createIcons();
}

function showToast(message, type = "info", duration = 3000) {
  let stack = document.querySelector(".toast-stack");
  if (!stack) {
    stack = document.createElement("div");
    stack.className = "toast-stack";
    document.body.appendChild(stack);
  }
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.setAttribute("role", "status");
  toast.textContent = message;
  stack.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
}

function showModal(title, body, buttons = ["Close"]) {
  return new Promise((resolve) => {
    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";
    backdrop.innerHTML = `
      <section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <h2 id="modal-title">${title}</h2>
        <div class="muted">${body}</div>
        <div class="top-actions modal-actions"></div>
      </section>`;
    const actions = backdrop.querySelector(".top-actions");
    buttons.forEach((label) => {
      const button = document.createElement("button");
      button.className = "btn btn-primary";
      button.type = "button";
      button.setAttribute("aria-label", label);
      button.textContent = label;
      button.addEventListener("click", () => {
        backdrop.remove();
        resolve(label);
      });
      actions.appendChild(button);
    });
    document.body.appendChild(backdrop);
  });
}

function closeModal() {
  document.querySelector(".modal-backdrop")?.remove();
}

function showXPPopup(amount, x = window.innerWidth / 2, y = window.innerHeight / 2) {
  const popup = document.createElement("div");
  popup.className = "xp-popup";
  popup.textContent = `+${amount} XP`;
  popup.style.left = `${x}px`;
  popup.style.top = `${y}px`;
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 1100);
}

function showCelebration(stars = 3) {
  SoundManager.play("complete");
  const colors = ["#fbbf24", "#22c55e", "#7c5cfc", "#3b82f6", "#f59e0b"];
  for (let i = 0; i < 38; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDelay = `${Math.random() * 0.25}s`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 1800);
  }
  showToast(`Lesson complete. ${"★".repeat(stars)} Keep up the momentum!`, "success", 3600);
}

function formatXP(n) {
  return `${Number(n || 0).toLocaleString()} XP`;
}

function formatStreak(n) {
  return `${Number(n || 0).toLocaleString()} 🔥`;
}

function getTimeAgo(ts) {
  const then = typeof ts === "number" ? ts : Date.parse(ts || new Date());
  const diff = Math.max(0, Date.now() - then);
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  return `${Math.floor(hours / 24)} days ago`;
}

function getLevelFromXP(xp = 0) {
  const current = [...LEVEL_TITLES].reverse().find((level) => xp >= level.xpRequired) || LEVEL_TITLES[0];
  const next = LEVEL_TITLES.find((level) => level.level === current.level + 1) || current;
  const span = Math.max(1, next.xpRequired - current.xpRequired);
  return {
    level: current.level,
    title: current.title,
    nextLevelXP: next.xpRequired,
    progress: current === next ? 1 : Math.min(1, (xp - current.xpRequired) / span)
  };
}

function defaultUserFields() {
  return {
    displayName: "Language Learner",
    email: "",
    role: "student",
    language: LangManager.get(),
    xp_greek: 140,
    xp_hebrew: 90,
    xp_total: 230,
    streak: 5,
    hearts: 5,
    createdAt: Date.now()
  };
}

function sidebarLink(href, page, iconName, label) {
  return `<a href="${href}" class="sb-link" data-page="${page}" aria-label="${label}">${icon(iconName, label)}</a>`;
}

const MOBILE_NAV_ITEMS = [
  { href: "dashboard.html", page: "dashboard", iconName: "home", label: "Home" },
  { href: "lessons.html", page: "lessons", iconName: "map", label: "Path" },
  { href: "practice.html", page: "practice", iconName: "target", label: "Review" },
  { href: "quests.html", page: "quests", iconName: "sparkles", label: "Quests" },
  { href: "profile.html", page: "profile", iconName: "user-round", label: "Me" }
];

function renderAppShell({ page, title, mountId = "page-root", currentUser = null }) {
  const sourceUser = currentUser || window.BLQ_CURRENT_USER;
  if (!sourceUser?.uid) throw new Error("renderAppShell requires an authenticated Firebase user.");
  const defaults = defaultUserFields();
  const user = {
    ...defaults,
    ...sourceUser,
    displayName: sourceUser.displayName || defaults.displayName,
    role: sourceUser.role || defaults.role
  };
  const activeLang = LangManager.getConfig();
  const level = getLevelFromXP(user.xp_total);
  const adminSidebarLink = user.isAdmin || user.role === "admin"
    ? sidebarLink("admin.html", "admin", "shield-check", "Admin")
    : "";
  document.body.classList.add("has-app-shell");
  document.body.innerHTML = `
    <div class="app-shell">
      <aside class="sidebar" id="sidebar">
        <div class="sb-brand">
          <div class="sb-logo"><span data-lang-logo>${activeLang.logo}</span></div>
          <div class="sb-brand-text">
            <span class="sb-title" data-lang-label>${activeLang.label}</span>
            <span class="sb-sub">Biblical Languages</span>
          </div>
        </div>
        <nav class="sb-nav">
          ${sidebarLink("dashboard.html", "dashboard", "home", "Home")}
          ${sidebarLink("lessons.html", "lessons", "map", "Path")}
          ${sidebarLink("practice.html", "practice", "swords", "Practice")}
          ${sidebarLink("quests.html", "quests", "sparkles", "Quests")}
          ${sidebarLink("leaderboard.html", "leaderboard", "trophy", "League")}
          ${sidebarLink("profile.html", "profile", "user-round", "Profile")}
          ${sidebarLink("settings.html", "settings", "settings", "Settings")}
          ${adminSidebarLink}
        </nav>
        <div class="sb-lang-switcher">
          ${Object.values(LANG_CONFIGS).map((cfg) => `
            <button class="lang-btn" type="button" data-lang-button="${cfg.lang}" aria-label="Switch to ${cfg.label}">${cfg.logo} ${cfg.shortLabel}</button>
          `).join("")}
        </div>
      </aside>
      <header class="topbar">
        <div class="icon-row">
          <button class="icon-btn mobile-menu" type="button" aria-label="Open navigation">${icon("menu")}</button>
          <h1>${title}</h1>
        </div>
        <div class="top-actions">
          <span class="status-item">${icon("flame", formatStreak(user.streak))}</span>
          <span class="status-item">${icon("heart", user.hearts || 5)}</span>
          <span class="status-item gems-pill">${icon("gem", user.gems || 245)}</span>
          <a class="profile-pill" href="profile.html" aria-label="Open profile">${icon("circle-user-round", `${user.displayName} · L${level.level}`)}</a>
        </div>
      </header>
      <main class="main-content" id="${mountId}"></main>
      <nav class="mobile-tabbar" aria-label="Primary mobile navigation">
        ${MOBILE_NAV_ITEMS.map((item) => `<a class="mobile-tab ${item.page === page ? "active" : ""}" href="${item.href}" aria-label="${item.label}">${icon(item.iconName, item.label)}</a>`).join("")}
      </nav>
    </div>`;

  document.querySelectorAll(".sb-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.page === page);
  });
  document.querySelector(".mobile-menu")?.addEventListener("click", () => document.getElementById("sidebar")?.classList.toggle("open"));
  document.querySelectorAll("[data-lang-button]").forEach((button) => {
    button.addEventListener("click", () => LangManager.set(button.dataset.langButton));
  });
  LangManager.applyTheme();
  renderIcons();
  return { user, root: document.getElementById(mountId) };
}

function safeText(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

window.app = {
  LEVEL_TITLES,
  closeModal,
  formatStreak,
  formatXP,
  getLevelFromXP,
  getTimeAgo,
  icon,
  renderAppShell,
  renderIcons,
  safeText,
  showCelebration,
  showModal,
  showToast,
  showXPPopup
};

export {
  LEVEL_TITLES,
  closeModal,
  formatStreak,
  formatXP,
  getLevelFromXP,
  getTimeAgo,
  icon,
  renderAppShell,
  renderIcons,
  safeText,
  showCelebration,
  showModal,
  showToast,
  showXPPopup
};
