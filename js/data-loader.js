import { LangManager } from "./language-manager.js";

async function getLessons() {
  if (LangManager.isHebrew()) {
    const { HEBREW_LESSONS } = await import("../data/hebrew-data.js?v=20260701-lessons");
    return HEBREW_LESSONS;
  }
  const { GREEK_LESSONS } = await import("../data/greek-data.js?v=20260701-lessons");
  return GREEK_LESSONS;
}

async function getVocab() {
  if (LangManager.isHebrew()) {
    const { HEBREW_VOCAB } = await import("../data/hebrew-vocab.js?v=20260701-lessons");
    return HEBREW_VOCAB;
  }
  const { GREEK_VOCAB } = await import("../data/greek-vocab.js?v=20260701-lessons");
  return GREEK_VOCAB;
}

async function getQuests() {
  if (LangManager.isHebrew()) {
    const { HEBREW_QUESTS } = await import("../data/hebrew-quests.js");
    return HEBREW_QUESTS;
  }
  const { GREEK_QUESTS } = await import("../data/greek-quests.js");
  return GREEK_QUESTS;
}

export { getLessons, getQuests, getVocab };
