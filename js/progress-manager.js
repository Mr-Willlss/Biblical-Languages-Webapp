import { LangManager } from "./language-manager.js";
import { initFirebase, initFirestore } from "./firebase-config.js?v=20260703-retention";

const cache = new Map();
const listeners = new Map();

function emptyProgress() {
  return {
    completedLessons: {},
    perfectLessons: {},
    completedQuests: {},
    xp: 0,
    streak: 0,
    lastActive: null,
    lastStudyDay: "",
    activity: [],
    dailyXp: 0,
    dailyXpDay: "",
    updatedAtMs: 0
  };
}

function localKey(uid, lang = LangManager.get()) {
  const prefix = lang === "hebrew" ? "blq_hb_progress" : "blq_gk_progress";
  return `${prefix}:${uid}`;
}

function requireUid(uid) {
  if (!uid || typeof uid !== "string") {
    throw new Error("Authenticated user id is required for progress access.");
  }
  return uid;
}

function normalize(raw = {}) {
  return {
    ...emptyProgress(),
    ...raw,
    completedLessons: raw.completedLessons || {},
    perfectLessons: raw.perfectLessons || {},
    completedQuests: raw.completedQuests || {},
    activity: Array.isArray(raw.activity) ? raw.activity.slice(0, 20) : []
  };
}

function mergeProgress(local, remote) {
  if (!remote) return normalize(local);
  const left = normalize(local);
  const right = normalize(remote);
  return {
    ...left,
    ...right,
    completedLessons: { ...left.completedLessons, ...right.completedLessons },
    perfectLessons: { ...left.perfectLessons, ...right.perfectLessons },
    completedQuests: { ...left.completedQuests, ...right.completedQuests },
    xp: Math.max(left.xp || 0, right.xp || 0),
    streak: Math.max(left.streak || 0, right.streak || 0),
    activity: [...right.activity, ...left.activity]
      .filter((item, index, all) => all.findIndex((other) => other.id === item.id) === index)
      .sort((a, b) => (b.at || 0) - (a.at || 0))
      .slice(0, 20)
  };
}

const ProgressManager = {
  async init(uid, lang = LangManager.get()) {
    const userId = requireUid(uid);
    const id = `${userId}:${lang}`;
    const local = this.getLocalProgress(userId, lang);
    cache.set(id, local);
    return this.syncFromCloud(userId, lang, local);
  },

  async syncFromCloud(uid, lang, local = this.getLocalProgress(uid, lang)) {
    try {
      const id = `${uid}:${lang}`;
      const state = await initFirestore();
      if (state.mode !== "firebase") return local;
      const sdk = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js");
      const ref = sdk.doc(state.db, "users", uid, "progress", lang);
      const snapshot = await sdk.getDoc(ref);
      const merged = mergeProgress(local, snapshot.exists() ? snapshot.data() : null);
      this.saveLocalProgress(uid, merged, lang, false);
      if (!snapshot.exists()) await this.sync(uid, merged, lang);
      if (!listeners.has(id)) {
        listeners.set(id, sdk.onSnapshot(ref, (docSnap) => {
          if (!docSnap.exists()) return;
          const next = mergeProgress(this.getLocalProgress(uid, lang), docSnap.data());
          this.saveLocalProgress(uid, next, lang, false);
          window.dispatchEvent(new CustomEvent("progressSynced", { detail: { uid, lang, progress: next } }));
        }, (error) => console.warn("Live progress sync unavailable; using local progress:", error)));
      }
      return merged;
    } catch (error) {
      console.warn("Cloud progress unavailable; using local progress:", error);
      window.dispatchEvent(new CustomEvent("progressSyncUnavailable", { detail: { uid, lang } }));
      return local;
    }
  },

  getLocalProgress(uid, lang = LangManager.get()) {
    const userId = requireUid(uid);
    const id = `${userId}:${lang}`;
    if (cache.has(id)) return cache.get(id);
    try {
      return normalize(JSON.parse(localStorage.getItem(localKey(userId, lang)) || "{}"));
    } catch {
      return emptyProgress();
    }
  },

  saveLocalProgress(uid, progress, lang = LangManager.get(), cloud = true) {
    const userId = requireUid(uid);
    const next = normalize({ ...progress, updatedAtMs: Date.now() });
    cache.set(`${userId}:${lang}`, next);
    localStorage.setItem(localKey(userId, lang), JSON.stringify(next));
    if (cloud) this.sync(userId, next, lang);
    return next;
  },

  async sync(uid, progress, lang = LangManager.get()) {
    const userId = requireUid(uid);
    try {
      const state = await initFirestore();
      if (state.mode !== "firebase") return false;
      const sdk = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js");
      const userRef = sdk.doc(state.db, "users", userId);
      const userSnapshot = await sdk.getDoc(userRef);
      const userData = userSnapshot.exists() ? userSnapshot.data() : {};
      const profile = userData.profile || {};
      const otherLang = lang === "hebrew" ? "greek" : "hebrew";
      const currentXp = Number(progress.xp || 0);
      const otherXp = Number(userData?.stats?.[`xp_${otherLang}`] ?? userData[`xp_${otherLang}`] ?? 0);
      const xpGreek = lang === "greek" ? currentXp : otherXp;
      const xpHebrew = lang === "hebrew" ? currentXp : otherXp;
      const completedCount = Object.keys(progress.completedLessons || {}).length;
      const otherCompleted = Number(userData?.stats?.[`lessons_${otherLang}`] || 0);
      const totalLessonsCompleted = completedCount + otherCompleted;
      const totalXp = xpGreek + xpHebrew;
      const level = Math.max(1, Math.floor(totalXp / 50) + 1);
      const displayName = profile.displayName || userData.displayName || "Language Learner";
      const photoURL = profile.photoURL || userData.photoURL || "";
      const batch = sdk.writeBatch(state.db);
      batch.set(sdk.doc(state.db, "users", userId, "progress", lang), {
        ...normalize(progress),
        lang,
        updatedAt: sdk.serverTimestamp()
      }, { merge: true });
      batch.set(userRef, {
        activeLanguage: lang,
        lastActiveAt: sdk.serverTimestamp(),
        [`xp_${lang}`]: currentXp,
        xp_total: totalXp,
        stats: {
          [`xp_${lang}`]: currentXp,
          [`lessons_${lang}`]: completedCount,
          xp_greek: xpGreek,
          xp_hebrew: xpHebrew,
          totalXp,
          totalLessonsCompleted,
          level,
          streakDays: Number(progress.streak || 0)
        }
      }, { merge: true });
      batch.set(sdk.doc(state.db, "leaderboard", userId), {
        uid: userId,
        displayName,
        photoURL,
        activeLanguage: lang,
        xp_greek: xpGreek,
        xp_hebrew: xpHebrew,
        xp_total: totalXp,
        level,
        streakDays: Number(progress.streak || 0),
        lessonsCompleted: totalLessonsCompleted,
        weeklyXp: Number(progress.dailyXp || 0),
        updatedAt: sdk.serverTimestamp()
      }, { merge: true });
      await batch.commit();
      return true;
    } catch (error) {
      console.warn("Progress saved locally; cloud sync will retry later:", error);
      return false;
    }
  },

  completeLesson(uid, lessonNum, { xp = 20, stars = 2, title = "Lesson" } = {}) {
    const lang = LangManager.get();
    const progress = this.getLocalProgress(uid, lang);
    const lessonKey = LangManager.lessonKey(lessonNum);
    const firstCompletion = !progress.completedLessons[lessonKey];
    const now = Date.now();
    const today = new Date(now).toISOString().slice(0, 10);
    progress.completedLessons[lessonKey] = { lessonNum, completedAt: now, stars: Math.max(stars, progress.completedLessons[lessonKey]?.stars || 0), xp: firstCompletion ? xp : 0 };
    if (stars === 3) progress.perfectLessons[lessonKey] = true;
    if (firstCompletion) progress.xp += xp;
    if (progress.dailyXpDay !== today) progress.dailyXp = 0;
    progress.dailyXpDay = today;
    progress.dailyXp += firstCompletion ? xp : 0;
    progress.streak = this.calculateStreak(progress.lastStudyDay, progress.streak, today);
    progress.lastStudyDay = today;
    progress.activity = [{ id: `${lessonKey}-${now}`, type: "lesson", title, xp: firstCompletion ? xp : 0, at: now }, ...progress.activity].slice(0, 20);
    this.saveLocalProgress(uid, progress, lang);
    if (firstCompletion) this.awardLessonXP(lang, lessonKey, xp);
    return { progress, firstCompletion };
  },

  async awardLessonXP(lang, lessonKey, xp) {
    try {
      const state = await initFirebase();
      if (state.mode !== "firebase") return;
      const appSdk = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js");
      const fnSdk = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-functions.js");
      const callable = fnSdk.httpsCallable(fnSdk.getFunctions(appSdk.getApp()), "awardLessonXP");
      await callable({ lang, lessonKey, xp });
    } catch (error) {
      console.warn("XP award will retry through progress sync:", error);
    }
  },

  completeQuest(uid, questId, { xp = 30, score = 0, title = "Quest" } = {}) {
    const progress = this.getLocalProgress(uid);
    const firstCompletion = !progress.completedQuests[questId];
    const now = Date.now();
    progress.completedQuests[questId] = { completedAt: now, score, xp: firstCompletion ? xp : 0 };
    if (firstCompletion) progress.xp += xp;
    progress.activity = [{ id: `${questId}-${now}`, type: "quest", title, xp: firstCompletion ? xp : 0, at: now }, ...progress.activity].slice(0, 20);
    this.saveLocalProgress(uid, progress);
    return { progress, firstCompletion };
  },

  calculateStreak(lastDay, current, today) {
    if (!lastDay) return 1;
    if (lastDay === today) return Math.max(1, current || 1);
    const diff = Math.round((Date.parse(today) - Date.parse(lastDay)) / 86400000);
    return diff === 1 ? Math.max(1, current || 0) + 1 : 1;
  },

  isLessonUnlocked(uid, lessonNum) {
    if (lessonNum === 1) return true;
    return Boolean(this.getLocalProgress(uid).completedLessons[LangManager.lessonKey(lessonNum - 1)]);
  },

  isWorldUnlocked(uid, worldId) {
    if (worldId === 1) return true;
    const worlds = [...LangManager.getConfig().worlds, ...(LangManager.getConfig().furtherWorlds || [])];
    const previous = worlds.find((world) => world.id === worldId - 1);
    return !previous || previous.lessons.every((n) => this.getLocalProgress(uid).completedLessons[LangManager.lessonKey(n)]);
  },

  getNextLesson(uid) {
    const max = LangManager.getMaxLesson();
    const progress = this.getLocalProgress(uid);
    for (let n = 1; n <= max; n += 1) if (!progress.completedLessons[LangManager.lessonKey(n)]) return n;
    return max;
  }
};

window.ProgressManager = ProgressManager;
export { ProgressManager };
