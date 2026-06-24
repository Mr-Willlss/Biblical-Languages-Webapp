import { LangManager } from "./language-manager.js";

const ProgressManager = {
  getLocalProgress(uid = "demo-user") {
    const key = LangManager.getProgressKey(uid);
    const saved = localStorage.getItem(key);
    if (saved) return JSON.parse(saved);
    return {
      completedLessons: {},
      perfectLessons: {},
      xp: 0,
      streak: 0,
      lastActive: null,
      activity: []
    };
  },

  saveLocalProgress(uid = "demo-user", progress) {
    progress.lastActive = Date.now();
    localStorage.setItem(LangManager.getProgressKey(uid), JSON.stringify(progress));
  },

  completeLesson(uid, lessonNum, { xp = 20, stars = 2, title = "Lesson" } = {}) {
    const progress = this.getLocalProgress(uid);
    const lessonKey = LangManager.lessonKey(lessonNum);
    const firstCompletion = !progress.completedLessons[lessonKey];
    progress.completedLessons[lessonKey] = {
      lessonNum,
      completedAt: Date.now(),
      stars,
      xp: firstCompletion ? xp : 0
    };
    if (stars === 3) progress.perfectLessons[lessonKey] = true;
    if (firstCompletion) progress.xp += xp;
    progress.activity = [
      { type: "lesson", title, xp: firstCompletion ? xp : 0, at: Date.now() },
      ...(progress.activity || [])
    ].slice(0, 12);
    this.saveLocalProgress(uid, progress);
    return { progress, firstCompletion };
  },

  updateStreak(uid) {
    const progress = this.getLocalProgress(uid);
    const now = Date.now();
    const last = progress.lastActive;
    const oneDayMs = 86400000;
    if (!last) progress.streak = 1;
    else if (now - last < oneDayMs * 2 && now - last > oneDayMs * 0.6) progress.streak += 1;
    else if (now - last >= oneDayMs * 2) progress.streak = 1;
    this.saveLocalProgress(uid, progress);
    return progress.streak;
  },

  isLessonUnlocked(uid, lessonNum) {
    if (lessonNum === 1) return true;
    const progress = this.getLocalProgress(uid);
    const prevKey = LangManager.lessonKey(lessonNum - 1);
    return !!progress.completedLessons[prevKey];
  },

  isWorldUnlocked(uid, worldId) {
    if (worldId === 1) return true;
    const cfg = LangManager.getConfig();
    const allWorlds = [...cfg.worlds, ...(cfg.furtherWorlds || [])];
    const prevWorld = allWorlds.find((world) => world.id === worldId - 1);
    if (!prevWorld) return false;
    const progress = this.getLocalProgress(uid);
    return prevWorld.lessons.every((n) => !!progress.completedLessons[LangManager.lessonKey(n)]);
  },

  getNextLesson(uid) {
    const max = LangManager.isHebrew() ? 40 : 25;
    for (let n = 1; n <= max; n += 1) {
      if (!this.getLocalProgress(uid).completedLessons[LangManager.lessonKey(n)]) return n;
    }
    return max;
  }
};

window.ProgressManager = ProgressManager;
export { ProgressManager };
