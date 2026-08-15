import { initFirebase } from "./firebase-config.js";

async function getFunctionsSdk() {
  const state = await initFirebase();
  if (state.mode !== "firebase") throw new Error("Firebase is not configured.");
  const sdk = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-functions.js");
  return { state, sdk };
}

async function socialCall(name, data = {}) {
  const { state, sdk } = await getFunctionsSdk();
  const fn = sdk.httpsCallable(sdk.getFunctions(state.firebaseApp), name);
  const result = await fn(data);
  return result.data || {};
}

function timeAgo(value) {
  if (!value) return "just now";
  const ts = typeof value === "number" ? value : Date.parse(value);
  if (!Number.isFinite(ts)) return "just now";
  const minutes = Math.floor((Date.now() - ts) / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  return `${Math.floor(hours / 24)} days ago`;
}

function socialBadge(relation) {
  const map = {
    friend: "Friend",
    incoming: "Incoming",
    outgoing: "Sent",
    blocked: "Blocked",
    suggested: "Suggested",
    self: "You"
  };
  return map[relation] || "Suggested";
}

function socialInitials(name = "") {
  return String(name || "L").trim().slice(0, 1).toUpperCase();
}

export { socialBadge, socialCall, socialInitials, timeAgo };
