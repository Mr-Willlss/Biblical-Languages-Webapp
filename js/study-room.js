import { LangManager } from "./language-manager.js";
import { ProgressManager } from "./progress-manager.js?v=20260711-scale";
import { icon, renderAppShell, renderIcons, safeText, showToast } from "./app.js?v=20260710-mobile-admin";
import { requireAuth } from "./auth-guard.js?v=20260710-sync-all";
import { socialCall, socialInitials, timeAgo } from "./social-service.js";

const signedInUser = await requireAuth();
const { user, root } = renderAppShell({ page: "study-room", title: "Study Room", currentUser: signedInUser });
const cfg = LangManager.getConfig();
await ProgressManager.init(user.uid);

const state = {
  rooms: [],
  friends: [],
  selectedRoomId: "",
  loading: true
};

async function load() {
  state.loading = true;
  render();
  try {
    const [roomsData, socialData] = await Promise.all([
      socialCall("getStudyRooms", { limit: 12 }),
      socialCall("getSocialDashboard", { limit: 12 })
    ]);
    state.rooms = roomsData.rooms || [];
    state.friends = socialData.friends || [];
    if (!state.selectedRoomId && state.rooms.length) state.selectedRoomId = state.rooms[0].id;
    if (state.selectedRoomId && !state.rooms.find((room) => room.id === state.selectedRoomId)) {
      state.selectedRoomId = state.rooms[0]?.id || "";
    }
  } catch (error) {
    console.error("Study room load failed:", error);
    showToast("Study rooms could not load yet.", "error");
  } finally {
    state.loading = false;
    render();
  }
}

async function createRoom(event) {
  event.preventDefault();
  const title = document.getElementById("room-title").value.trim();
  const prompt = document.getElementById("room-prompt").value.trim();
  const lessonKey = document.getElementById("room-lesson-key").value.trim();
  const invitedUid = document.getElementById("room-invite").value.trim();
  if (!lessonKey) return showToast("Pick a lesson key first.", "error");
  const lang = cfg.lang;
  const result = await socialCall("createStudyRoom", {
    title,
    prompt,
    lessonKey,
    lang,
    invitedUid
  });
  state.selectedRoomId = result.roomId;
  showToast("Study room created.", "success");
  await load();
}

async function joinRoom(roomId) {
  await socialCall("joinStudyRoom", { roomId });
  state.selectedRoomId = roomId;
  showToast("Joined study room.", "success");
  await load();
}

async function leaveRoom(roomId) {
  await socialCall("leaveStudyRoom", { roomId });
  if (state.selectedRoomId === roomId) state.selectedRoomId = "";
  showToast("Left study room.", "info");
  await load();
}

async function inviteFriend(roomId) {
  const invitedUid = document.getElementById("invite-friend").value.trim();
  if (!invitedUid) return;
  await socialCall("inviteToStudyRoom", { roomId, invitedUid });
  showToast("Friend invited.", "success");
  await load();
}

async function sendRoomMessage(event) {
  event.preventDefault();
  const roomId = state.selectedRoomId;
  const body = document.getElementById("room-message").value.trim();
  if (!roomId || !body) return;
  await socialCall("sendStudyRoomMessage", { roomId, body });
  document.getElementById("room-message").value = "";
  showToast("Message posted to the room.", "success");
  await load();
}

function activeRoom() {
  return state.rooms.find((room) => room.id === state.selectedRoomId) || state.rooms[0] || null;
}

function renderRoomList() {
  if (state.loading) return `<div class="empty-state">Loading rooms...</div>`;
  if (!state.rooms.length) return `<div class="empty-state">No study rooms yet. Create one around your next lesson.</div>`;
  return state.rooms.map((room) => `
    <article class="social-row ${room.id === state.selectedRoomId ? "selected" : ""}">
      <div class="social-avatar">${safeText(socialInitials(room.hostDisplayName || room.title))}</div>
      <div class="social-copy">
        <strong>${safeText(room.title)}</strong>
        <small>${safeText(room.lang === "hebrew" ? "Hebrew" : "Greek")} · ${safeText(room.lessonKey.toUpperCase())} · ${room.memberUids.length} members · ${safeText(timeAgo(room.updatedAt))}</small>
      </div>
      <div class="social-actions">
        <button class="btn btn-primary" data-open-room="${room.id}" type="button">${icon("door-open", "Open")}</button>
        <button class="btn btn-ghost" data-join-room="${room.id}" type="button">${icon("user-round-plus", "Join")}</button>
        <button class="btn btn-ghost" data-leave-room="${room.id}" type="button">${icon("log-out", "Leave")}</button>
      </div>
    </article>`).join("");
}

function renderRoomDetail(room) {
  if (!room) return `<div class="empty-state">Select a room to see the shared lesson space.</div>`;
  const members = room.memberUids || [];
  const recentMessages = room.recentMessages || [];
  return `
    <div class="card social-room-detail">
      <div class="section-title">
        <div>
          <span class="path-label">Room</span>
          <h3>${safeText(room.title)}</h3>
        </div>
        <div class="social-actions">
          <button class="btn btn-ghost" data-leave-room="${room.id}" type="button">${icon("log-out", "Leave")}</button>
        </div>
      </div>
      <p class="muted">${safeText(room.prompt || "Study together, share notes, and keep a shared pace.")}</p>
      <div class="room-meta">
        <span class="pill">${safeText(room.lang === "hebrew" ? "Hebrew" : "Greek")}</span>
        <span class="pill">${safeText(room.lessonKey.toUpperCase())}</span>
        <span class="pill">${members.length} members</span>
        <span class="pill">${room.messagesCount || recentMessages.length} updates</span>
      </div>
      <div class="room-members">
        ${members.map((memberUid) => `<span class="pill">${safeText(memberUid.slice(0, 6).toUpperCase())}</span>`).join("")}
      </div>
      <div class="chat-thread room-thread">
        ${recentMessages.length ? recentMessages.map((message) => `
          <div class="chat-bubble ${message.uid === user.uid ? "mine" : ""}">
            <strong>${safeText(message.uid === user.uid ? user.displayName : message.uid.slice(0, 8))}</strong>
            <p>${safeText(message.body)}</p>
            <small>${safeText(timeAgo(message.createdAt))}</small>
          </div>
        `).join("") : `<div class="empty-state">No room messages yet.</div>`}
      </div>
      <form id="room-message-form" class="conversation-form">
        <input id="room-message" maxlength="280" placeholder="Share a note, verse, or encouragement" aria-label="Room message">
        <button class="btn btn-primary" type="submit">${icon("send", "Send")}</button>
      </form>
      <div class="section-gap"></div>
      <div class="section-title"><div><span class="path-label">Invite</span><h3>Study partner</h3></div></div>
      <div class="social-toolbar">
        <select id="invite-friend" aria-label="Invite a friend">
          <option value="">Choose a friend</option>
          ${state.friends.map((friend) => `<option value="${safeText(friend.uid)}">${safeText(friend.displayName)}</option>`).join("")}
        </select>
        <button class="btn btn-ghost" id="invite-friend-btn" type="button">${icon("user-plus", "Invite")}</button>
      </div>
    </div>`;
}

function render() {
  const room = activeRoom();
  root.innerHTML = `
    <div class="social-page">
      <section class="hero-card">
        <h2>Study Rooms</h2>
        <p>Create a shared lesson space, invite your friends, chat while you study, and keep the room moving together.</p>
      </section>

      <section class="social-toolbar card">
        <form id="room-create-form" class="room-create-grid">
          <input id="room-title" maxlength="60" placeholder="Room title" aria-label="Room title" value="${safeText(room?.title || `${cfg.shortLabel} Study Room`)}">
          <input id="room-prompt" maxlength="240" placeholder="Room goal or prompt" aria-label="Room goal" value="${safeText(room?.prompt || "Study together and keep each other accountable.")}">
          <input id="room-lesson-key" maxlength="10" placeholder="Lesson key e.g. h12" aria-label="Lesson key" value="${safeText(LangManager.lessonKey(ProgressManager.getNextLesson(user.uid)))}">
          <select id="room-invite" aria-label="Invite a friend">
            <option value="">Invite a friend now</option>
            ${state.friends.map((friend) => `<option value="${safeText(friend.uid)}">${safeText(friend.displayName)}</option>`).join("")}
          </select>
          <button class="btn btn-primary" type="submit">${icon("plus", "Create room")}</button>
        </form>
      </section>

      <section class="social-grid">
        <article class="card social-panel">
          <div class="section-title"><div><span class="path-label">Rooms</span><h3>Your spaces</h3></div></div>
          ${renderRoomList()}
        </article>

        <article class="card social-panel">
          <div class="section-title"><div><span class="path-label">Room chat</span><h3>${safeText(room?.title || "No room selected")}</h3></div></div>
          ${renderRoomDetail(room)}
        </article>
      </section>
    </div>`;

  document.getElementById("room-create-form")?.addEventListener("submit", createRoom);
  document.getElementById("room-message-form")?.addEventListener("submit", sendRoomMessage);
  document.getElementById("invite-friend-btn")?.addEventListener("click", () => inviteFriend(room?.id || ""));
  document.querySelectorAll("[data-open-room]").forEach((button) => button.addEventListener("click", () => {
    state.selectedRoomId = button.dataset.openRoom;
    render();
  }));
  document.querySelectorAll("[data-join-room]").forEach((button) => button.addEventListener("click", () => joinRoom(button.dataset.joinRoom)));
  document.querySelectorAll("[data-leave-room]").forEach((button) => button.addEventListener("click", () => leaveRoom(button.dataset.leaveRoom)));
  renderIcons();
}

await load();
LangManager.applyTheme();
