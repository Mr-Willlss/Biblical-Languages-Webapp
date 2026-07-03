import { LangManager } from "./language-manager.js";
import { getDemoUser, icon, renderAppShell, renderIcons, saveDemoUser, showToast } from "./app.js?v=20260703-sound";
import { getLessons, getQuests } from "./data-loader.js";

const page = document.body.dataset.page;
const titles = {
  leaderboard: "Leaderboard",
  rewards: "Rewards",
  friends: "Friends",
  "study-room": "Study Room",
  profile: "Profile",
  admin: "Admin"
};
const { user, root } = renderAppShell({ page, title: titles[page] || "Biblical Languages" });
const cfg = LangManager.getConfig();

function leaderboard() {
  const rows = [
    { name: "Miriam Cohen", xp: 780, level: 6 },
    { name: "Ezra Thomas", xp: 650, level: 5 },
    { name: user.displayName, xp: 520, level: 4 },
    { name: "Phoebe Allen", xp: 410, level: 4 }
  ];
  root.innerHTML = `<div class="page-grid"><section class="hero-card"><h2>Leaderboard</h2><p>Compare weekly, global, and friend progress without losing the study-first spirit.</p></section><section class="card"><div class="tabs"><button class="tab-btn active" aria-label="Global leaderboard">Global</button><button class="tab-btn" aria-label="Friends leaderboard">Friends</button><button class="tab-btn" aria-label="Weekly leaderboard">Weekly</button></div><div class="list section-gap">${rows.map((row, i) => `<div class="list-row"><span>${i + 1}. ${row.name}</span><strong>${row.xp} XP · L${row.level}</strong></div>`).join("")}</div></section></div>`;
}

function rewards() {
  const badges = ["Alphabet Steward", "Faithful Reader", "Five-Day Streak", "Perfect Lesson", "Vocabulary Keeper", "World Complete", "Study Companion", "Master Scribe"];
  root.innerHTML = `<div class="page-grid"><section class="hero-card"><h2>Rewards</h2><p>Badges mark steady, meaningful progress through the language.</p></section><section class="card-grid">${badges.map((badge, i) => `<article class="card"><div class="brand-mark">${i + 1}</div><h3>${badge}</h3><p class="muted">${i < 3 ? "Unlocked" : "Keep studying to unlock this milestone."}</p></article>`).join("")}</section></div>`;
}

function friends() {
  root.innerHTML = `<div class="page-grid"><section class="hero-card"><h2>Friends</h2><p>Study alongside classmates, invite friends, and keep one another moving.</p></section><section class="card"><div class="section-title"><div class="field"><input id="friend-email" aria-label="Friend email" placeholder="classmate@example.com"></div><button class="btn btn-primary" id="add-friend" type="button" aria-label="Add friend">${icon("user-plus", "Add")}</button></div><div class="list"><div class="list-row"><span>Miriam Cohen</span><span class="pill">Accepted</span></div><div class="list-row"><span>Ezra Thomas</span><span class="pill">Study Room</span></div></div></section></div>`;
  document.getElementById("add-friend").addEventListener("click", () => showToast("Friend request prepared.", "success"));
}

function studyRoom() {
  root.innerHTML = `<div class="page-grid"><section class="hero-card"><h2>Study Room</h2><p>Coordinate lesson focus and shared notes in real time when Firebase is connected.</p></section><section class="two-col"><article class="card"><h3>Room Messages</h3><div class="list" id="messages"><div class="list-row"><span>Miriam</span><p class="muted">The ancient scribes wrote it. Now we can read it.</p></div></div><div class="field"><input id="room-message" aria-label="Room message" placeholder="Write a study note"></div><button class="btn btn-primary" id="send-message" type="button" aria-label="Send message">${icon("send", "Send")}</button></article><aside class="card"><h3>Active Lesson</h3><p class="muted"><span data-lang-label></span> · Lesson 1</p><a class="btn btn-primary" href="lesson-player.html?lesson=1&lang=${cfg.lang}" aria-label="Open active lesson">${icon("play", "Open")}</a></aside></section></div>`;
  document.getElementById("send-message").addEventListener("click", () => {
    const input = document.getElementById("room-message");
    document.getElementById("messages").insertAdjacentHTML("beforeend", `<div class="list-row"><span>${user.displayName}</span><p class="muted">${input.value || "Ready to study."}</p></div>`);
    input.value = "";
  });
}

async function admin() {
  if (user.role !== "admin") {
    root.innerHTML = `<div class="page-grid"><section class="hero-card"><h2>Admin Portal</h2><p>This area is reserved for authorized school administrators.</p></section><section class="card"><h3>Access restricted</h3><p class="muted">Your student account can continue learning from the dashboard, lessons, practice, and vocabulary pages.</p><a class="btn btn-primary" href="dashboard.html" aria-label="Return to dashboard">${icon("arrow-left", "Return to Dashboard")}</a></section></div>`;
    return;
  }
  const lessons = await getLessons();
  const quests = await getQuests();
  root.innerHTML = `<div class="page-grid"><section class="hero-card"><h2>Admin Portal</h2><p>Manage lessons, users, quests, and platform health. Demo mode exposes the interface; Firestore rules protect production data.</p></section><section class="stat-grid"><article class="card stat-card"><strong>${lessons.length}</strong><span class="muted">Lessons</span></article><article class="card stat-card"><strong>${quests.length}</strong><span class="muted">Quests</span></article><article class="card stat-card"><strong>4</strong><span class="muted">Users</span></article><article class="card stat-card"><strong>99%</strong><span class="muted">Healthy</span></article></section><section class="two-col"><article class="card"><h3>Lesson Manager</h3><div class="list">${lessons.slice(0, 8).map((lesson) => `<div class="list-row"><span>Lesson ${lesson.lesson}: ${lesson.title}</span><button class="btn btn-ghost" type="button" aria-label="Edit lesson">${icon("pencil", "Edit")}</button></div>`).join("")}</div></article><article class="card"><h3>User Manager</h3><div class="list"><div class="list-row"><span>Student Scholar</span><button class="btn btn-ghost" type="button" aria-label="Award XP">${icon("plus", "Award XP")}</button></div><div class="list-row"><span>Miriam Cohen</span><button class="btn btn-ghost" type="button" aria-label="View progress">${icon("chart-no-axes-column", "Progress")}</button></div></div></article></section><section class="card"><h3>Quest Manager</h3><div class="list">${quests.map((quest) => `<div class="list-row"><span>${quest.category}: ${quest.title}</span><button class="btn btn-ghost" type="button" aria-label="Edit quest">${icon("pencil", "Edit")}</button></div>`).join("")}</div></section></div>`;
}

function profile() {
  root.innerHTML = `<div class="page-grid"><section class="hero-card"><h2>Profile</h2><p>Set your display name, primary language, and study preferences.</p></section><section class="card"><div class="form-grid"><div class="field"><label for="display-name">Display name</label><input id="display-name" value="${user.displayName}" aria-label="Display name"></div><div class="tabs">${Object.values(window.LANG_CONFIGS).map((lang) => `<button class="tab-btn" data-profile-lang="${lang.lang}" type="button" aria-label="${lang.label}">${lang.logo} ${lang.shortLabel}</button>`).join("")}</div><button class="btn btn-primary" id="save-profile" type="button" aria-label="Save profile">${icon("save", "Save Profile")}</button></div></section></div>`;
  document.querySelectorAll("[data-profile-lang]").forEach((button) => {
    button.classList.toggle("active", button.dataset.profileLang === LangManager.get());
    button.addEventListener("click", () => LangManager.set(button.dataset.profileLang, false));
  });
  document.getElementById("save-profile").addEventListener("click", () => {
    saveDemoUser({ ...getDemoUser(), displayName: document.getElementById("display-name").value, language: LangManager.get() });
    showToast("Profile saved.", "success");
  });
}

if (page === "leaderboard") leaderboard();
if (page === "rewards") rewards();
if (page === "friends") friends();
if (page === "study-room") studyRoom();
if (page === "profile") profile();
if (page === "admin") await admin();
LangManager.applyTheme();
renderIcons();
