import { LangManager } from "./language-manager.js";
import { icon, renderAppShell, renderIcons, showToast } from "./app.js?v=20260710-mobile-admin";
import { getVocab } from "./data-loader.js";
import { requireAuth } from "./auth-guard.js?v=20260710-sync-all";
import { initFirestore } from "./firebase-config.js?v=20260703-retention";

const signedInUser = await requireAuth();
const { user, root } = renderAppShell({ page: "vocabulary", title: "Vocabulary", currentUser: signedInUser });
const vocab = await getVocab();
const cfg = LangManager.getConfig();
const favKey = `blq_favorites:${user.uid}`;
let query = "";
let type = "all";
let favoritesOnly = false;
let favoriteSet = new Set(readLocalFavorites());
let favoriteUnsubscribe = null;

function readLocalFavorites() {
  try { return JSON.parse(localStorage.getItem(favKey) || "[]"); }
  catch { return []; }
}

function favorites() {
  return [...favoriteSet];
}

function persistFavorites(nextSet) {
  favoriteSet = new Set(nextSet);
  localStorage.setItem(favKey, JSON.stringify([...favoriteSet]));
}

async function syncFavorites() {
  try {
    const state = await initFirestore();
    if (state.mode !== "firebase") return;
    const sdk = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js");
    await sdk.setDoc(sdk.doc(state.db, "users", user.uid, "private", "vocabulary"), {
      favorites: { [cfg.lang]: [...favoriteSet] },
      updatedAt: sdk.serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.warn("Vocabulary favorites cloud sync skipped:", error);
  }
}

async function initFavoriteSync() {
  try {
    const state = await initFirestore();
    if (state.mode !== "firebase") return;
    const sdk = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js");
    const ref = sdk.doc(state.db, "users", user.uid, "private", "vocabulary");
    const snapshot = await sdk.getDoc(ref);
    if (snapshot.exists()) {
      const cloudFavorites = snapshot.data().favorites?.[cfg.lang];
      if (Array.isArray(cloudFavorites)) {
        persistFavorites(cloudFavorites);
      } else if (favoriteSet.size) {
        await syncFavorites();
      }
    } else {
      await syncFavorites();
    }
    if (favoriteUnsubscribe) favoriteUnsubscribe();
    favoriteUnsubscribe = sdk.onSnapshot(ref, (nextSnapshot) => {
      if (!nextSnapshot.exists()) return;
      persistFavorites(nextSnapshot.data().favorites?.[cfg.lang] || []);
      renderWords();
    }, (error) => console.warn("Live vocabulary sync unavailable:", error));
  } catch (error) {
    console.warn("Vocabulary favorites cloud sync unavailable:", error);
  }
}

function toggleFavorite(id) {
  const set = new Set(favorites());
  if (set.has(id)) set.delete(id);
  else set.add(id);
  persistFavorites(set);
  void syncFavorites();
  showToast(set.has(id) ? "Saved to your words." : "Removed from saved words.", "success");
  renderWords();
}

function renderWords() {
  const favs = favorites();
  const words = vocab.filter((word) => {
    const matches = [word.script, word.english, word.transliteration].some((value) => value.toLowerCase().includes(query.toLowerCase()));
    return matches && (type === "all" || word.type === type) && (!favoritesOnly || favs.includes(word.id));
  });
  document.getElementById("word-list").innerHTML = words.map((word) => `
    <article class="list-row">
      <div>
        <div class="${cfg.lang === "hebrew" ? "hebrew-text" : "script-greek"} large-script">${word.script}</div>
        <strong>${word.transliteration}</strong>
        <p class="muted">${word.english} · ${word.type} · Lesson ${word.lesson}</p>
      </div>
      <button class="icon-btn" data-fav="${word.id}" type="button" aria-label="Toggle favorite">${icon(favs.includes(word.id) ? "bookmark-check" : "bookmark-plus")}</button>
    </article>`).join("") || `<p class="muted">No vocabulary saved yet. Start a lesson to collect your first words.</p>`;
  document.querySelectorAll("[data-fav]").forEach((button) => button.addEventListener("click", () => toggleFavorite(button.dataset.fav)));
  renderIcons();
}

root.innerHTML = `
  <div class="page-grid">
    <section class="hero-card"><h2><span data-lang-label></span> Vocabulary</h2><p>Search the lexicon, filter by form, and keep a personal review list.</p></section>
    <section class="card">
      <div class="section-title">
        <div class="field"><input id="vocab-search" aria-label="Search vocabulary" placeholder="Search script, transliteration, or English"></div>
        <select id="type-filter" aria-label="Filter word type"><option value="all">All types</option><option>noun</option><option>verb</option><option>adjective</option><option>preposition</option><option>conjunction</option></select>
        <button class="btn btn-ghost" id="my-words" type="button" aria-label="Show saved words">${icon("bookmark", "My Words")}</button>
      </div>
      <div class="list" id="word-list"></div>
    </section>
  </div>`;
document.getElementById("vocab-search").addEventListener("input", (event) => {
  query = event.target.value;
  renderWords();
});
document.getElementById("type-filter").addEventListener("change", (event) => {
  type = event.target.value;
  renderWords();
});
document.getElementById("my-words").addEventListener("click", () => {
  favoritesOnly = !favoritesOnly;
  document.getElementById("my-words").classList.toggle("btn-primary", favoritesOnly);
  renderWords();
});
LangManager.applyTheme();
renderWords();
void initFavoriteSync().then(renderWords);
