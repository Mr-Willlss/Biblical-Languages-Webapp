import { LangManager } from "./language-manager.js";
import { formatXP, icon, renderAppShell, renderIcons, safeText } from "./app.js?v=20260710-mobile-admin";
import { requireAuth } from "./auth-guard.js?v=20260710-sync-all";
import { initFirestore } from "./firebase-config.js?v=20260701-authfix2";

const signedInUser = await requireAuth();
const { user, root } = renderAppShell({ page: "leaderboard", title: "League", currentUser: signedInUser });
const cfg = LangManager.getConfig();

function timestamp(value) {
  if (!value) return 0;
  if (typeof value === "number") return value;
  if (typeof value.toMillis === "function") return value.toMillis();
  if (typeof value.toDate === "function") return value.toDate().getTime();
  return Date.parse(value) || 0;
}

function formatUpdated(value) {
  const updated = timestamp(value);
  if (!updated) return "No sync yet";
  const minutes = Math.floor((Date.now() - updated) / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  return `${Math.floor(hours / 24)} days ago`;
}

function normalizeRow(id, data = {}) {
  const xpGreek = Number(data.xp_greek || 0);
  const xpHebrew = Number(data.xp_hebrew || 0);
  const xpTotal = Number(data.xp_total || xpGreek + xpHebrew);
  return {
    uid: data.uid || id,
    displayName: data.displayName || "Language Learner",
    photoURL: data.photoURL || "",
    activeLanguage: data.activeLanguage || "greek",
    xpGreek,
    xpHebrew,
    xpTotal,
    level: Number(data.level || Math.max(1, Math.floor(xpTotal / 50) + 1)),
    streakDays: Number(data.streakDays || 0),
    lessonsCompleted: Number(data.lessonsCompleted || 0),
    updatedAt: data.updatedAt
  };
}

function sortRows(rows) {
  return rows.sort((a, b) => b.xpTotal - a.xpTotal || b.streakDays - a.streakDays || a.displayName.localeCompare(b.displayName));
}

function renderRows(rows) {
  const sorted = sortRows(rows);
  const currentIndex = sorted.findIndex((row) => row.uid === user.uid);
  const currentRank = currentIndex >= 0 ? currentIndex + 1 : null;
  const leader = sorted[0];
  root.innerHTML = `
    <div class="leaderboard-page">
      <section class="leaderboard-hero">
        <div>
          <span class="mission-kicker">Real synced progress</span>
          <h2>${safeText(cfg.shortLabel)} League</h2>
          <p>Only signed-in learners with saved Firebase progress appear here. No sample users, no placeholder XP.</p>
        </div>
        <div class="leaderboard-rank-card">
          <span>Your rank</span>
          <strong>${currentRank ? `#${currentRank}` : "New"}</strong>
          <small>${currentIndex >= 0 ? formatXP(sorted[currentIndex].xpTotal) : "Complete a synced lesson"}</small>
        </div>
      </section>

      <section class="leaderboard-grid">
        <article class="card">
          <span class="rail-title">Top learner</span>
          <div class="rail-stat">${icon("trophy")}<div><strong>${safeText(leader?.displayName || "No learners yet")}</strong><small>${leader ? formatXP(leader.xpTotal) : "Complete a lesson to start"}</small></div></div>
        </article>
        <article class="card">
          <span class="rail-title">Synced learners</span>
          <div class="rail-stat">${icon("users")}<div><strong>${sorted.length}</strong><small>Firebase records</small></div></div>
        </article>
        <article class="card">
          <span class="rail-title">Your streak</span>
          <div class="rail-stat">${icon("flame")}<div><strong>${currentIndex >= 0 ? sorted[currentIndex].streakDays : 0}</strong><small>database days</small></div></div>
        </article>
      </section>

      <section class="card leaderboard-panel">
        <div class="section-title">
          <div><span class="path-label">Global</span><h3>Leaderboard</h3></div>
          <button class="btn btn-ghost" id="refresh-leaderboard" type="button">${icon("refresh-cw", "Refresh")}</button>
        </div>
        ${sorted.length ? `<div class="leaderboard-list">
          ${sorted.map((row, index) => `
            <article class="leaderboard-row ${row.uid === user.uid ? "me" : ""}">
              <span class="leader-rank">${index + 1}</span>
              <div class="leader-avatar">${safeText(row.displayName.slice(0, 1).toUpperCase())}</div>
              <div class="leader-main">
                <strong>${safeText(row.displayName)}</strong>
                <small>${safeText(row.activeLanguage === "hebrew" ? "Hebrew" : "Greek")} · L${row.level} · ${row.lessonsCompleted} lessons · synced ${safeText(formatUpdated(row.updatedAt))}</small>
              </div>
              <div class="leader-xp">
                <strong>${formatXP(row.xpTotal)}</strong>
                <small>G ${row.xpGreek.toLocaleString()} · H ${row.xpHebrew.toLocaleString()}</small>
              </div>
            </article>`).join("")}
        </div>` : `<div class="empty-state">No synced leaderboard records yet. Complete a lesson and this page will create your first real entry.</div>`}
      </section>
    </div>`;
  document.getElementById("refresh-leaderboard")?.addEventListener("click", loadLeaderboard);
  renderIcons();
}

async function loadLeaderboard() {
  root.innerHTML = `<section class="loading-panel"><span class="spinner"></span><strong>Loading synced leaderboard...</strong></section>`;
  try {
    const state = await initFirestore();
    if (state.mode !== "firebase") throw new Error("Firebase is not configured.");
    const sdk = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js");
    const queryRef = sdk.query(sdk.collection(state.db, "leaderboard"), sdk.orderBy("xp_total", "desc"), sdk.limit(50));
    const snapshot = await sdk.getDocs(queryRef);
    const rows = snapshot.docs.map((docSnap) => normalizeRow(docSnap.id, docSnap.data()));
    renderRows(rows);
  } catch (error) {
    console.error("Leaderboard load failed:", error);
    root.innerHTML = `<section class="empty-state">Leaderboard data could not load from Firebase. Try again shortly.</section>`;
  }
}

await loadLeaderboard();
LangManager.applyTheme();
