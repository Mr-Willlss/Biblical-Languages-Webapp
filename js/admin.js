import { requireAuth } from "./auth-guard.js?v=20260710-admin";
import { initFirebase } from "./firebase-config.js?v=20260701-authfix2";
import {
  formatXP,
  icon,
  renderAppShell,
  renderIcons,
  safeText,
  showToast
} from "./app.js?v=20260710-admin";

const state = {
  calls: null,
  data: null,
  loading: false
};

function number(value) {
  return Number(value || 0).toLocaleString();
}

function percent(value) {
  const numeric = Number(value || 0);
  return `${Math.round(numeric)}%`;
}

function formatDate(value) {
  if (!value) return "Not recorded";
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));
}

function getCourseProgress(course) {
  const students = Number(course?.students || 0);
  const lessons = Number(course?.lessons || 0);
  if (!students) return 0;
  return Math.min(100, Math.round((lessons / (students * 25)) * 100));
}

function renderMetric(label, value, iconName) {
  return `
    <article class="admin-metric">
      <div class="admin-metric-icon">${icon(iconName)}</div>
      <div>
        <span>${safeText(label)}</span>
        <strong>${safeText(value)}</strong>
      </div>
    </article>`;
}

function renderCourseCard(key, course) {
  const progress = getCourseProgress(course);
  return `
    <article class="admin-course">
      <div class="admin-course-head">
        <div>
          <span class="eyebrow">${key === "greek" ? "Greek path" : "Hebrew path"}</span>
          <h3>${safeText(course.label)}</h3>
        </div>
        <strong>${number(course.students)} students</strong>
      </div>
      <div class="progress-bar" aria-label="${safeText(course.label)} progress">
        <span style="width:${progress}%"></span>
      </div>
      <dl class="admin-course-stats">
        <div><dt>Total XP</dt><dd>${formatXP(course.xp)}</dd></div>
        <div><dt>Average XP</dt><dd>${formatXP(course.averageXp)}</dd></div>
        <div><dt>Lesson momentum</dt><dd>${percent(progress)}</dd></div>
      </dl>
    </article>`;
}

function renderUsers(users = []) {
  if (!users.length) {
    return `<div class="empty-state">No students match this search.</div>`;
  }
  return `
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Course</th>
            <th>Greek</th>
            <th>Hebrew</th>
            <th>Accuracy</th>
            <th>Last active</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          ${users.map((user) => `
            <tr>
              <td>
                <strong>${safeText(user.displayName)}</strong>
                <span>${safeText(user.username || user.email || user.uid)}</span>
              </td>
              <td>${safeText(user.activeLanguage === "hebrew" ? "Hebrew" : "Greek")}</td>
              <td>${formatXP(user.stats.xp_greek)}</td>
              <td>${formatXP(user.stats.xp_hebrew)}</td>
              <td>${user.stats.accuracy ? percent(user.stats.accuracy) : "New"}</td>
              <td>${safeText(formatDate(user.social.lastActiveAt))}</td>
              <td><span class="role-pill ${user.isAdmin ? "admin" : ""}">${user.isAdmin ? "Admin" : "Student"}</span></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>`;
}

function renderDashboard() {
  const root = document.getElementById("page-root");
  const data = state.data;
  if (!data) return;
  root.innerHTML = `
    <section class="admin-page">
      <div class="admin-hero">
        <div>
          <span class="eyebrow">Protected portal</span>
          <h2>Student progress and admin control</h2>
          <p>Monitor Greek and Hebrew learning activity, inspect essential student records, and manage who can access this portal.</p>
        </div>
        <button class="btn btn-secondary" type="button" id="refresh-admin">${icon("refresh-cw", "Refresh")}</button>
      </div>

      <section class="admin-metrics" aria-label="Platform totals">
        ${renderMetric("Students", number(data.totals.students), "users")}
        ${renderMetric("Admins", number(data.totals.admins), "shield-check")}
        ${renderMetric("Greek learners", number(data.courses.greek.students), "omega")}
        ${renderMetric("Hebrew learners", number(data.courses.hebrew.students), "languages")}
      </section>

      <section class="admin-courses" aria-label="Course statistics">
        ${renderCourseCard("greek", data.courses.greek)}
        ${renderCourseCard("hebrew", data.courses.hebrew)}
      </section>

      <section class="admin-panel">
        <div class="section-head">
          <div>
            <span class="eyebrow">Students</span>
            <h2>Student information</h2>
          </div>
          <form id="student-search" class="admin-search">
            <input id="student-search-input" type="search" placeholder="Search name, email, uid, or course" autocomplete="off">
            <button class="btn btn-primary" type="submit">${icon("search", "Search")}</button>
          </form>
        </div>
        ${renderUsers(data.users)}
      </section>

      <section class="admin-panel admin-form-panel">
        <div>
          <span class="eyebrow">Permissions</span>
          <h2>Add or remove an admin</h2>
          <p>Use the user email or uid from Firebase Authentication. Changes are written to both Firebase custom claims and the user profile document.</p>
        </div>
        <form id="admin-member-form" class="admin-member-form">
          <label>Email<input name="email" type="email" placeholder="student@example.com"></label>
          <label>UID<input name="targetUid" type="text" placeholder="Optional if email is known"></label>
          <label>Display name<input name="displayName" type="text" placeholder="Optional"></label>
          <label>Username<input name="username" type="text" placeholder="Optional"></label>
          <label class="checkbox-row"><input name="makeAdmin" type="checkbox" checked> Grant admin access</label>
          <button class="btn btn-primary" type="submit">${icon("shield-plus", "Save admin")}</button>
        </form>
      </section>
    </section>`;
  bindDashboardEvents();
  renderIcons();
}

function renderDenied(errorMessage = "Admin access is required for this page.") {
  const root = document.getElementById("page-root");
  root.innerHTML = `
    <section class="admin-denied">
      <div class="admin-denied-card">
        <span class="denied-icon">${icon("lock-keyhole")}</span>
        <span class="eyebrow">Admin only</span>
        <h2>This portal is hidden from students.</h2>
        <p>${safeText(errorMessage)}</p>
        <div class="admin-bootstrap-box">
          <h3>First admin setup</h3>
          <p>If no admin exists yet, claim the first admin account for your signed-in profile. Your username will be set to Sammie.</p>
          <button class="btn btn-primary" type="button" id="claim-admin">${icon("shield-check", "Claim initial admin")}</button>
        </div>
        <a class="btn btn-secondary" href="dashboard.html">${icon("arrow-left", "Back to home")}</a>
      </div>
    </section>`;
  document.getElementById("claim-admin")?.addEventListener("click", claimInitialAdmin);
  renderIcons();
}

function bindDashboardEvents() {
  document.getElementById("refresh-admin")?.addEventListener("click", () => loadDashboard());
  document.getElementById("student-search")?.addEventListener("submit", (event) => {
    event.preventDefault();
    loadDashboard(document.getElementById("student-search-input")?.value || "");
  });
  document.getElementById("admin-member-form")?.addEventListener("submit", saveAdminMember);
}

async function loadCalls() {
  if (state.calls) return state.calls;
  const firebaseState = await initFirebase();
  if (firebaseState.mode !== "firebase") throw new Error("Firebase is not configured.");
  const { getFunctions, httpsCallable } = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-functions.js");
  const functions = getFunctions(firebaseState.firebaseApp);
  state.calls = {
    auth: firebaseState.auth,
    getAdminDashboard: httpsCallable(functions, "getAdminDashboard"),
    setUserAdmin: httpsCallable(functions, "setUserAdmin"),
    claimInitialAdmin: httpsCallable(functions, "claimInitialAdmin")
  };
  return state.calls;
}

async function loadDashboard(search = "") {
  if (state.loading) return;
  state.loading = true;
  const root = document.getElementById("page-root");
  root.innerHTML = `<section class="loading-panel"><span class="spinner"></span><strong>Loading admin portal...</strong></section>`;
  try {
    const calls = await loadCalls();
    const result = await calls.getAdminDashboard({ pageSize: 50, search });
    state.data = result.data;
    renderDashboard();
  } catch (error) {
    console.error("Admin dashboard failed:", error);
    if (error?.code === "functions/permission-denied" || error?.code === "permission-denied") {
      renderDenied(error.message);
    } else {
      root.innerHTML = `<section class="empty-state">Admin data could not load. ${safeText(error.message || "Try again shortly.")}</section>`;
    }
  } finally {
    state.loading = false;
  }
}

async function saveAdminMember(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const email = String(form.get("email") || "").trim();
  const targetUid = String(form.get("targetUid") || "").trim();
  if (!email && !targetUid) {
    showToast("Add an email or uid first.", "warning");
    return;
  }
  try {
    const calls = await loadCalls();
    await calls.setUserAdmin({
      email,
      targetUid,
      displayName: String(form.get("displayName") || "").trim(),
      username: String(form.get("username") || "").trim(),
      makeAdmin: form.get("makeAdmin") === "on"
    });
    showToast("Admin permissions updated.", "success");
    event.currentTarget.reset();
    loadDashboard();
  } catch (error) {
    console.error("Admin permission update failed:", error);
    showToast(error.message || "Could not update admin permissions.", "error", 5000);
  }
}

async function claimInitialAdmin() {
  try {
    const calls = await loadCalls();
    await calls.claimInitialAdmin({ username: "Sammie", displayName: "Sammie" });
    await calls.auth.currentUser?.getIdToken(true);
    showToast("Initial admin claimed. Reloading portal.", "success");
    setTimeout(() => window.location.reload(), 700);
  } catch (error) {
    console.error("Initial admin claim failed:", error);
    showToast(error.message || "Initial admin claim failed.", "error", 6000);
  }
}

async function init() {
  const signedInUser = await requireAuth();
  renderAppShell({ page: "admin", title: "Admin", currentUser: signedInUser });
  await loadDashboard();
}

init();
