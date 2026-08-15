import { icon, renderAppShell, renderIcons, safeText, showToast } from "./app.js?v=20260710-mobile-admin";
import { requireAuth } from "./auth-guard.js?v=20260710-sync-all";
import { socialBadge, socialCall, socialInitials, timeAgo } from "./social-service.js";

const signedInUser = await requireAuth();
const { user, root } = renderAppShell({ page: "friends", title: "Friends", currentUser: signedInUser });

const state = {
  query: "",
  friends: [],
  incomingRequests: [],
  outgoingRequests: [],
  blockedUsers: [],
  suggestions: []
};

let selectedPeer = null;
let conversation = null;
let loading = true;

function friendCard(userData, relation, actions = "") {
  return `
    <article class="social-row">
      <div class="social-avatar">${safeText(socialInitials(userData.displayName))}</div>
      <div class="social-copy">
        <strong>${safeText(userData.displayName)}</strong>
        <small>@${safeText(userData.username || userData.email || userData.uid.slice(0, 6))} · ${safeText(userData.activeLanguage === "hebrew" ? "Hebrew" : "Greek")} · ${safeText(socialBadge(relation))}</small>
      </div>
      ${actions}
    </article>`;
}

async function load(search = state.query) {
  loading = true;
  render();
  try {
    const data = await socialCall("getSocialDashboard", { search, limit: 12 });
    state.query = search;
    state.friends = data.friends || [];
    state.incomingRequests = data.incomingRequests || [];
    state.outgoingRequests = data.outgoingRequests || [];
    state.blockedUsers = data.blockedUsers || [];
    state.suggestions = data.suggestions || [];
    if (selectedPeer) {
      const refreshed = state.friends.find((friend) => friend.uid === selectedPeer.uid)
        || state.suggestions.find((friend) => friend.uid === selectedPeer.uid)
        || null;
      selectedPeer = refreshed || selectedPeer;
      if (selectedPeer?.uid) {
        conversation = await socialCall("getConversation", { peerUid: selectedPeer.uid });
      }
    } else if (state.friends.length) {
      selectedPeer = state.friends[0];
      conversation = await socialCall("getConversation", { peerUid: selectedPeer.uid });
    }
  } catch (error) {
    console.error("Friends load failed:", error);
    showToast("Friends data could not load yet.", "error");
  } finally {
    loading = false;
    render();
  }
}

async function openConversation(peer) {
  selectedPeer = peer;
  try {
    conversation = await socialCall("getConversation", { peerUid: peer.uid });
  } catch (error) {
    console.error("Conversation load failed:", error);
    showToast("Chat could not open yet.", "error");
  }
  render();
}

async function sendConversationMessage(event) {
  event.preventDefault();
  const input = document.getElementById("conversation-message");
  const body = input?.value.trim();
  if (!selectedPeer || !body) return;
  await socialCall("sendDirectMessage", { peerUid: selectedPeer.uid, body });
  input.value = "";
  conversation = await socialCall("getConversation", { peerUid: selectedPeer.uid });
  showToast("Message sent.", "success");
  render();
}

async function sendRequest(targetUid) {
  await socialCall("sendFriendRequest", { targetUid });
  showToast("Friend request sent.", "success");
  await load(state.query);
}

async function answerRequest(requestId, action) {
  await socialCall("respondToFriendRequest", { requestId, action });
  showToast(action === "accept" ? "Friend request accepted." : "Friend request updated.", "success");
  await load(state.query);
}

async function removeFriend(targetUid) {
  await socialCall("removeFriend", { targetUid });
  if (selectedPeer?.uid === targetUid) selectedPeer = null;
  showToast("Friend removed.", "info");
  await load(state.query);
}

async function blockLearner(targetUid) {
  await socialCall("blockUser", { targetUid });
  if (selectedPeer?.uid === targetUid) selectedPeer = null;
  showToast("Learner blocked.", "info");
  await load(state.query);
}

async function unblockLearner(targetUid) {
  await socialCall("unblockUser", { targetUid });
  showToast("Learner unblocked.", "success");
  await load(state.query);
}

function render() {
  const requestInput = safeText(state.query);
  const conversationMessages = conversation?.messages || [];
  root.innerHTML = `
    <div class="social-page">
      <section class="hero-card social-hero">
        <div class="social-hero-copy">
          <span class="mission-kicker">Study circle</span>
          <h2>Friends</h2>
          <p>Search, connect, and study together.</p>
        </div>
        <div class="social-hero-art" aria-hidden="true">
          <span class="social-orb orb-a">${socialInitials(user.displayName)}</span>
          <span class="social-orb orb-b">+</span>
          <span class="social-orb orb-c">✦</span>
        </div>
        <div class="social-mini-stats">
          <div class="mini-stat"><strong>${state.friends.length}</strong><span>Friends</span></div>
          <div class="mini-stat"><strong>${state.incomingRequests.length}</strong><span>Requests</span></div>
          <div class="mini-stat"><strong>${state.blockedUsers.length}</strong><span>Safe list</span></div>
        </div>
      </section>

      <section class="social-toolbar card">
        <form id="friend-search-form" class="social-search">
          <input id="friend-search" value="${requestInput}" placeholder="Search email, username, or display name" aria-label="Search learners">
          <button class="btn btn-primary" type="submit">${icon("search", "Search")}</button>
        </form>
        <a class="btn btn-ghost" href="study-room.html">${icon("messages-square", "Rooms")}</a>
      </section>

      <section class="social-grid">
        <article class="card social-panel">
          <div class="section-title"><div><span class="path-label">Suggestions</span><h3>Study partners</h3></div></div>
          ${loading ? `<div class="empty-state">Loading learners...</div>` : state.suggestions.length ? state.suggestions.map((person) => `
            ${friendCard(person, person.relation, `
              <div class="social-actions">
                <button class="btn btn-primary" data-send-request="${person.uid}" type="button">${icon("user-plus", "Add")}</button>
                <button class="btn btn-ghost" data-open-chat="${person.uid}" type="button">${icon("messages-square", "Chat")}</button>
                <button class="btn btn-ghost" data-block-user="${person.uid}" type="button">${icon("ban", "Block")}</button>
              </div>`)}
          `).join("") : `<div class="empty-state">No matches yet. Try a different email, username, or display name.</div>`}
        </article>

        <article class="card social-panel">
          <div class="section-title"><div><span class="path-label">Requests</span><h3>Inbox</h3></div></div>
          ${state.incomingRequests.length ? state.incomingRequests.map((request) => `
            ${friendCard(request.from, "incoming", `
              <div class="social-actions">
                <button class="btn btn-primary" data-answer-request="${request.id}" data-action="accept" type="button">${icon("check", "Accept")}</button>
                <button class="btn btn-ghost" data-answer-request="${request.id}" data-action="decline" type="button">${icon("x", "Decline")}</button>
              </div>`)}
          `).join("") : `<div class="empty-state">No pending requests.</div>`}
          <div class="section-gap"></div>
          <div class="section-title"><div><span class="path-label">Outgoing</span><h3>Sent requests</h3></div></div>
          ${state.outgoingRequests.length ? state.outgoingRequests.map((request) => `
            ${friendCard(request.to, "outgoing", `
              <div class="social-actions">
                <button class="btn btn-ghost" data-answer-request="${request.id}" data-action="cancel" type="button">${icon("x", "Cancel")}</button>
              </div>`)}
          `).join("") : `<div class="empty-state">No sent requests.</div>`}
        </article>

        <article class="card social-panel">
          <div class="section-title"><div><span class="path-label">Friends</span><h3>Current circle</h3></div></div>
          ${state.friends.length ? state.friends.map((person) => `
            ${friendCard(person, "friend", `
              <div class="social-actions">
                <button class="btn btn-primary" data-open-chat="${person.uid}" type="button">${icon("messages-square", "Chat")}</button>
                <button class="btn btn-ghost" data-remove-friend="${person.uid}" type="button">${icon("user-minus", "Remove")}</button>
                <button class="btn btn-ghost" data-block-user="${person.uid}" type="button">${icon("ban", "Block")}</button>
              </div>`)}
          `).join("") : `<div class="empty-state">Add your first study partner to start building a circle.</div>`}
          <div class="section-gap"></div>
          <div class="section-title"><div><span class="path-label">Blocked</span><h3>Safety list</h3></div></div>
          ${state.blockedUsers.length ? state.blockedUsers.map((person) => `
            ${friendCard(person, "blocked", `
              <div class="social-actions">
                <button class="btn btn-ghost" data-unblock-user="${person.uid}" type="button">${icon("shield-check", "Unblock")}</button>
              </div>`)}
          `).join("") : `<div class="empty-state">No blocked learners.</div>`}
        </article>

        <article class="card social-panel social-chat">
          <div class="section-title"><div><span class="path-label">Chat</span><h3>${safeText(conversation?.peer?.displayName || selectedPeer?.displayName || "Choose a friend")}</h3></div></div>
          ${selectedPeer ? `
            <p class="muted">Private conversation with ${safeText(conversation?.peer?.displayName || selectedPeer.displayName)}.</p>
            <div class="chat-thread">
              ${conversationMessages.length ? conversationMessages.map((message) => `
                <div class="chat-bubble ${message.uid === user.uid ? "mine" : ""}">
                  <strong>${safeText(message.user?.displayName || message.uid)}</strong>
                  <p>${safeText(message.body)}</p>
                  <small>${safeText(timeAgo(message.createdAt))}</small>
                </div>
              `).join("") : `<div class="empty-state">No messages yet. Say hello and start studying together.</div>`}
            </div>
            <form id="conversation-form" class="conversation-form">
              <input id="conversation-message" maxlength="280" placeholder="Write a note or study prompt" aria-label="Message">
              <button class="btn btn-primary" type="submit">${icon("send", "Send")}</button>
            </form>
          ` : `<div class="empty-state">Pick a friend to open a private chat.</div>`}
        </article>
      </section>
    </div>`;

  document.getElementById("friend-search-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const value = document.getElementById("friend-search").value.trim();
    await load(value);
  });
  document.getElementById("conversation-form")?.addEventListener("submit", sendConversationMessage);
  document.querySelectorAll("[data-send-request]").forEach((button) => button.addEventListener("click", () => sendRequest(button.dataset.sendRequest)));
  document.querySelectorAll("[data-answer-request]").forEach((button) => button.addEventListener("click", () => answerRequest(button.dataset.answerRequest, button.dataset.action)));
  document.querySelectorAll("[data-remove-friend]").forEach((button) => button.addEventListener("click", () => removeFriend(button.dataset.removeFriend)));
  document.querySelectorAll("[data-block-user]").forEach((button) => button.addEventListener("click", () => blockLearner(button.dataset.blockUser)));
  document.querySelectorAll("[data-unblock-user]").forEach((button) => button.addEventListener("click", () => unblockLearner(button.dataset.unblockUser)));
  document.querySelectorAll("[data-open-chat]").forEach((button) => button.addEventListener("click", async () => {
    const peer = [...state.friends, ...state.suggestions, ...state.blockedUsers].find((person) => person.uid === button.dataset.openChat);
    if (peer) await openConversation(peer);
  }));
  renderIcons();
}

await load();
LangManager.applyTheme();
