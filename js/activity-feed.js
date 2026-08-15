import { LangManager } from "./language-manager.js";
import { icon, renderAppShell, renderIcons, safeText, showToast } from "./app.js?v=20260710-mobile-admin";
import { requireAuth } from "./auth-guard.js?v=20260710-sync-all";
import { socialCall, socialInitials, timeAgo } from "./social-service.js";

const signedInUser = await requireAuth();
const { user, root } = renderAppShell({ page: "activity", title: "Feed", currentUser: signedInUser });

const state = {
  feed: [],
  loading: true
};

async function load() {
  state.loading = true;
  render();
  try {
    const data = await socialCall("getActivityFeed", { limit: 20 });
    state.feed = data.feed || [];
  } catch (error) {
    console.error("Activity feed load failed:", error);
    showToast("Feed could not load yet.", "error");
  } finally {
    state.loading = false;
    render();
  }
}

async function createPost(event) {
  event.preventDefault();
  const body = document.getElementById("post-body").value.trim();
  const visibility = document.getElementById("post-visibility").value;
  if (!body) return;
  await socialCall("createActivityPost", { body, visibility });
  document.getElementById("post-body").value = "";
  showToast("Post shared.", "success");
  await load();
}

async function likePost(activityId) {
  await socialCall("toggleActivityLike", { activityId });
  await load();
}

async function sharePost(activityId) {
  await socialCall("shareActivity", { activityId });
  showToast("Post shared.", "success");
  await load();
}

async function commentPost(activityId) {
  const input = document.getElementById(`comment-${activityId}`);
  const body = input?.value.trim();
  if (!body) return;
  await socialCall("commentOnActivity", { activityId, body });
  input.value = "";
  showToast("Comment added.", "success");
  await load();
}

function renderComment(comment) {
  return `
    <div class="feed-comment">
      <strong>${safeText(comment.user?.displayName || comment.uid)}</strong>
      <p>${safeText(comment.body)}</p>
      <small>${safeText(timeAgo(comment.createdAt))}</small>
    </div>`;
}

function renderFeedItem(item) {
  const comments = item.recentComments || [];
  return `
    <article class="card feed-post ${item.actorUid === user.uid ? "mine" : ""}">
      <div class="feed-head">
        <div class="social-avatar">${safeText(socialInitials(item.actor?.displayName))}</div>
        <div class="social-copy">
          <strong>${safeText(item.actor?.displayName || "Learner")}</strong>
          <small>${safeText(item.visibility || "public")} · ${safeText(item.lang === "hebrew" ? "Hebrew" : "Greek")} · ${safeText(timeAgo(item.createdAt))}</small>
        </div>
        <span class="pill">${safeText(item.type === "lesson" ? "Lesson" : "Post")}</span>
      </div>
      <h3>${safeText(item.title || "Study update")}</h3>
      <p>${safeText(item.message || "")}</p>
      <div class="feed-stats">
        <span>${icon(item.likedByMe ? "heart" : "heart", `${item.likesCount || 0} likes`)}</span>
        <span>${icon("messages-square", `${item.commentsCount || 0} comments`)}</span>
        <span>${icon("share-2", `${item.sharesCount || 0} shares`)}</span>
      </div>
      <div class="social-actions">
        <button class="btn btn-ghost" data-like-post="${item.id}" type="button">${icon("heart", item.likedByMe ? "Unlike" : "Like")}</button>
        <button class="btn btn-ghost" data-share-post="${item.id}" type="button">${icon("share-2", "Share")}</button>
      </div>
      <div class="feed-comments">
        ${comments.length ? comments.map(renderComment).join("") : `<div class="empty-state">No comments yet.</div>`}
      </div>
      <form class="feed-comment-form" data-comment-form="${item.id}">
        <input id="comment-${item.id}" maxlength="240" placeholder="Write a comment or encouragement" aria-label="Comment">
        <button class="btn btn-primary" type="submit">${icon("send", "Send")}</button>
      </form>
    </article>`;
}

function render() {
  root.innerHTML = `
    <div class="social-page">
      <section class="hero-card">
        <h2>Activity Feed</h2>
        <p>Share streak progress, lesson wins, gems, and accomplishments. Celebrate the real work learners are doing every day.</p>
      </section>

      <section class="social-toolbar card">
        <form id="post-form" class="feed-compose">
          <textarea id="post-body" rows="3" maxlength="500" placeholder="Share your streak progress, a lesson win, or a Scripture insight"></textarea>
          <div class="feed-compose-bar">
            <select id="post-visibility" aria-label="Post visibility">
              <option value="public">Public</option>
              <option value="friends">Friends</option>
              <option value="private">Private</option>
            </select>
            <button class="btn btn-primary" type="submit">${icon("send", "Post update")}</button>
          </div>
        </form>
      </section>

      <section class="feed-stream">
        ${state.loading ? `<div class="empty-state">Loading feed...</div>` : state.feed.length ? state.feed.map(renderFeedItem).join("") : `<div class="empty-state">No posts yet. Share your first progress update to start the community feed.</div>`}
      </section>
    </div>`;

  document.getElementById("post-form")?.addEventListener("submit", createPost);
  document.querySelectorAll("[data-like-post]").forEach((button) => button.addEventListener("click", () => likePost(button.dataset.likePost)));
  document.querySelectorAll("[data-share-post]").forEach((button) => button.addEventListener("click", () => sharePost(button.dataset.sharePost)));
  document.querySelectorAll("[data-comment-form]").forEach((form) => form.addEventListener("submit", (event) => {
    event.preventDefault();
    commentPost(form.dataset.commentForm);
  }));
  renderIcons();
}

await load();
LangManager.applyTheme();
