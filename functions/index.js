// functions/index.js — Biblical Languages Cloud Functions (Firebase v2)
// Merged from Learn-koine-Greek functions + new bilingual architecture

const admin = require("firebase-admin");
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { onDocumentUpdated } = require("firebase-functions/v2/firestore");
const { onSchedule } = require("firebase-functions/v2/scheduler");

admin.initializeApp();
const db = admin.firestore();
const { FieldValue } = admin.firestore;

// ── Constants ──────────────────────────────────────────────────────────────

const EXERCISE_COUNT = 8;
const EXERCISE_XP = 5;
const LESSON_GEM_REWARD = 250;
const HEART_GEM_COST = 140;
const HEART_MAX = 5;

// Greek lesson XP (keys: g1..g25)
const GREEK_LESSON_XP = {
  g1:15, g2:15, g3:20, g4:20, g5:25,
  g6:25, g7:25, g8:30, g9:30, g10:35,
  g11:35, g12:35, g13:40, g14:40, g15:40,
  g16:45, g17:45, g18:45, g19:45, g20:50,
  g21:50, g22:50, g23:55, g24:60, g25:65
};

// Hebrew lesson XP (keys: h1..h21 beginner, h22..h40 further)
const HEBREW_LESSON_XP = {
  h1:22, h2:22, h3:22, h4:24, h5:24,
  h6:27, h7:30, h8:30, h9:32, h10:32,
  h11:35, h12:35, h13:35, h14:35, h15:35,
  h16:38, h17:38, h18:40, h19:40, h20:40,
  h21:50,
  // Further track (Phase 2)
  h22:55, h23:55, h24:55, h25:60, h26:60,
  h27:65, h28:65, h29:70, h30:70,
  h31:80, h32:80, h33:80, h34:80, h35:80,
  h36:90, h37:90, h38:90, h39:90, h40:100
};

const ALL_LESSON_XP = { ...GREEK_LESSON_XP, ...HEBREW_LESSON_XP };

const RANK_TIERS = [
  { minXp: 0,    label: "Novice Scribe" },
  { minXp: 100,  label: "Letter Keeper" },
  { minXp: 250,  label: "Temple Reader" },
  { minXp: 500,  label: "Syntax Scout" },
  { minXp: 900,  label: "Covenant Scholar" },
  { minXp: 1400, label: "Logos Ranger" },
  { minXp: 2000, label: "Scripture Champion" },
  { minXp: 2800, label: "Golden Orator" },
  { minXp: 4000, label: "Master of Languages" }
];

const LEAGUE_TIERS = [
  { minXp: 0,   label: "Bronze" },
  { minXp: 60,  label: "Silver" },
  { minXp: 150, label: "Gold" },
  { minXp: 280, label: "Sapphire" },
  { minXp: 450, label: "Ruby" },
  { minXp: 700, label: "Diamond" }
];

// ── Helper functions ───────────────────────────────────────────────────────

function requireAuth(request) {
  if (!request.auth) throw new HttpsError("unauthenticated", "You must be signed in.");
  return request.auth.uid;
}

async function isAdminUid(uid) {
  if (!uid) return false;
  const authUser = await admin.auth().getUser(uid);
  if (authUser.customClaims?.admin === true) return true;
  const userDoc = await db.collection("users").doc(uid).get();
  const userData = userDoc.exists ? userDoc.data() : {};
  return userData?.isAdmin === true || userData?.role === "admin";
}

async function requireAdmin(request) {
  const uid = requireAuth(request);
  if (!(await isAdminUid(uid))) {
    throw new HttpsError("permission-denied", "Admin access is required.");
  }
  return uid;
}

function timestampToMillis(value) {
  if (!value) return null;
  if (typeof value === "number") return value;
  if (typeof value.toMillis === "function") return value.toMillis();
  if (typeof value.toDate === "function") return value.toDate().getTime();
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function asNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function normalizeAdminUser(uid, firestoreData = {}, authUser = {}) {
  const profile = firestoreData.profile || {};
  const stats = firestoreData.stats || {};
  const social = firestoreData.social || {};
  const rewards = firestoreData.rewards || {};
  const xpGreek = asNumber(stats.xp_greek ?? firestoreData.xp_greek);
  const xpHebrew = asNumber(stats.xp_hebrew ?? firestoreData.xp_hebrew);
  const totalXp = asNumber(stats.totalXp ?? firestoreData.xp_total, xpGreek + xpHebrew);
  const activeLanguage = normalizeLanguage(firestoreData.activeLanguage || firestoreData.language || profile.activeLanguage);
  return {
    uid,
    displayName: profile.displayName || firestoreData.displayName || authUser.displayName || "Language Learner",
    username: profile.username || firestoreData.username || "",
    email: firestoreData.email || authUser.email || "",
    photoURL: profile.photoURL || firestoreData.photoURL || authUser.photoURL || "",
    activeLanguage,
    isAdmin: firestoreData.isAdmin === true || firestoreData.role === "admin" || authUser.customClaims?.admin === true,
    role: firestoreData.role || (authUser.customClaims?.admin === true ? "admin" : "student"),
    stats: {
      totalXp,
      xp_greek: xpGreek,
      xp_hebrew: xpHebrew,
      level: asNumber(stats.level, Math.max(1, Math.floor(totalXp / 50) + 1)),
      totalLessonsCompleted: asNumber(stats.totalLessonsCompleted),
      progressPercent: asNumber(stats.progressPercent),
      streakDays: asNumber(stats.streakDays ?? firestoreData.streak),
      accuracy: asNumber(stats.accuracy ?? firestoreData.accuracy, 0)
    },
    social: {
      league: social.league || getLeagueLabel(asNumber(social.weeklyXp)),
      rankTitle: social.rankTitle || getRankLabel(totalXp),
      weeklyXp: asNumber(social.weeklyXp),
      lastActiveAt: timestampToMillis(firestoreData.updatedAt || firestoreData.lastActiveAt || social.lastLessonCompletedAt)
    },
    rewards: {
      gems: asNumber(rewards.gems ?? firestoreData.gems),
      crowns: asNumber(rewards.crowns)
    },
    createdAt: timestampToMillis(firestoreData.createdAt)
  };
}

function summarizeAdminUsers(users) {
  return users.reduce((summary, user) => {
    summary.students += user.isAdmin ? 0 : 1;
    summary.admins += user.isAdmin ? 1 : 0;
    summary.totalXp += user.stats.totalXp;
    summary.greek.students += user.activeLanguage === "greek" ? 1 : 0;
    summary.hebrew.students += user.activeLanguage === "hebrew" ? 1 : 0;
    summary.greek.xp += user.stats.xp_greek;
    summary.hebrew.xp += user.stats.xp_hebrew;
    summary.greek.lessons += user.stats.totalLessonsCompleted && user.stats.xp_greek > 0 ? user.stats.totalLessonsCompleted : 0;
    summary.hebrew.lessons += user.stats.totalLessonsCompleted && user.stats.xp_hebrew > 0 ? user.stats.totalLessonsCompleted : 0;
    return summary;
  }, {
    students: 0,
    admins: 0,
    totalXp: 0,
    greek: { students: 0, xp: 0, lessons: 0 },
    hebrew: { students: 0, xp: 0, lessons: 0 }
  });
}

function cleanAdminInput(value, fallback = "") {
  return String(value || fallback).trim().slice(0, 80);
}

async function applyAdminStatus({ targetUser, makeAdmin, actorUid, username, displayName }) {
  const currentClaims = targetUser.customClaims || {};
  const nextClaims = { ...currentClaims, admin: makeAdmin === true };
  await admin.auth().setCustomUserClaims(targetUser.uid, nextClaims);
  const normalizedUsername = slugifyUsername(username || displayName || targetUser.displayName || targetUser.email || targetUser.uid);
  const profilePatch = {};
  if (displayName || targetUser.displayName) profilePatch.displayName = cleanAdminInput(displayName, targetUser.displayName);
  if (normalizedUsername) {
    profilePatch.username = cleanAdminInput(username || normalizedUsername);
    profilePatch.usernameLower = normalizedUsername;
  }
  await db.collection("users").doc(targetUser.uid).set({
    uid: targetUser.uid,
    email: targetUser.email || "",
    photoURL: targetUser.photoURL || "",
    profile: profilePatch,
    role: makeAdmin ? "admin" : "student",
    isAdmin: makeAdmin === true,
    adminUpdatedAt: FieldValue.serverTimestamp(),
    adminUpdatedBy: actorUid,
    updatedAt: FieldValue.serverTimestamp()
  }, { merge: true });
  await db.collection("admin_audit").add({
    action: makeAdmin ? "grant_admin" : "revoke_admin",
    actorUid,
    targetUid: targetUser.uid,
    targetEmail: targetUser.email || "",
    createdAt: FieldValue.serverTimestamp()
  });
  return { uid: targetUser.uid, email: targetUser.email || "", isAdmin: makeAdmin === true };
}

function getRankLabel(totalXp = 0) {
  let active = RANK_TIERS[0].label;
  RANK_TIERS.forEach((t) => { if (totalXp >= t.minXp) active = t.label; });
  return active;
}

function getLeagueLabel(weeklyXp = 0) {
  let active = LEAGUE_TIERS[0].label;
  LEAGUE_TIERS.forEach((t) => { if (weeklyXp >= t.minXp) active = t.label; });
  return active;
}

function isoDayKey(date) { return date.toISOString().slice(0, 10); }

function isoWeekKey(date) {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}

function normalizeLanguage(lang) {
  return String(lang || "greek").trim().toLowerCase() === "hebrew" ? "hebrew" : "greek";
}

function slugifyUsername(value) {
  return String(value || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "").slice(0, 20);
}

function friendshipIdFor(uidA, uidB) { return [uidA, uidB].sort().join("_"); }

function baseUserDocument(uid, data = {}) {
  const totalXp = Number.isFinite(data?.stats?.totalXp) ? data.stats.totalXp : 0;
  const weeklyXp = Number.isFinite(data?.social?.weeklyXp) ? data.social.weeklyXp : 0;
  return {
    uid,
    profile: {
      displayName: data?.profile?.displayName || "Language Learner",
      username: data?.profile?.username || `learner${uid.slice(0, 4).toLowerCase()}`,
      usernameLower: data?.profile?.usernameLower || `learner${uid.slice(0, 4).toLowerCase()}`,
      bio: data?.profile?.bio || "Learning the languages of Scripture.",
      photoURL: data?.profile?.photoURL || "",
      isProfilePublic: data?.profile?.isProfilePublic !== false
    },
    stats: {
      totalXp,
      level: Math.max(1, Math.floor(totalXp / 50) + 1),
      totalLessonsCompleted: Number.isFinite(data?.stats?.totalLessonsCompleted) ? data.stats.totalLessonsCompleted : 0,
      progressPercent: Number.isFinite(data?.stats?.progressPercent) ? data.stats.progressPercent : 0,
      streakDays: Number.isFinite(data?.stats?.streakDays) ? data.stats.streakDays : 0,
      totalFriends: Number.isFinite(data?.stats?.totalFriends) ? data.stats.totalFriends : 0,
      xp_greek: Number.isFinite(data?.stats?.xp_greek) ? data.stats.xp_greek : 0,
      xp_hebrew: Number.isFinite(data?.stats?.xp_hebrew) ? data.stats.xp_hebrew : 0
    },
    social: {
      weeklyXp,
      weekKey: data?.social?.weekKey || "",
      league: data?.social?.league || getLeagueLabel(weeklyXp),
      rankTitle: data?.social?.rankTitle || getRankLabel(totalXp),
      lastLessonDay: data?.social?.lastLessonDay || "",
      lastLessonCompletedAt: data?.social?.lastLessonCompletedAt || null
    },
    rewards: {
      gems: Number.isFinite(data?.rewards?.gems) ? data.rewards.gems : 0,
      heartPasses: Number.isFinite(data?.rewards?.heartPasses) ? data.rewards.heartPasses : 0,
      crowns: Number.isFinite(data?.rewards?.crowns) ? data.rewards.crowns : 0
    }
  };
}

function sanitizeUserForClient(user) {
  return { profile: user.profile, stats: user.stats, social: user.social, rewards: user.rewards };
}

// ── Leaderboard sync (v2 Firestore trigger) ───────────────────────────────

exports.onUserXPChange = onDocumentUpdated("users/{uid}", async (event) => {
  const before = event.data.before.data();
  const after = event.data.after.data();
  if (before?.stats?.totalXp === after?.stats?.totalXp) return;
  await db.collection("leaderboard").doc(event.params.uid).set({
    displayName: after?.profile?.displayName || "Student Scholar",
    photoURL: after?.profile?.photoURL || "",
    level: after?.stats?.level || 1,
    xp_greek: after?.stats?.xp_greek || 0,
    xp_hebrew: after?.stats?.xp_hebrew || 0,
    xp_total: after?.stats?.totalXp || 0,
    rankTitle: getRankLabel(after?.stats?.totalXp || 0),
    updatedAt: FieldValue.serverTimestamp()
  }, { merge: true });
});

// ── XP validation (lightweight, for client-side confirmation) ─────────────

exports.validateLessonXP = onCall(async (request) => {
  if (!request.auth) throw new HttpsError("unauthenticated", "Sign in to save progress.");
  const { lang, lessonKey, xp } = request.data || {};
  const normalizedLang = normalizeLanguage(lang);
  const normalizedKey = String(lessonKey || "").trim();
  const allowedXP = ALL_LESSON_XP[normalizedKey];
  if (!allowedXP) throw new HttpsError("invalid-argument", "Unknown lesson key.");
  if (!normalizedKey.startsWith(normalizedLang === "hebrew" ? "h" : "g")) {
    throw new HttpsError("invalid-argument", "Lesson key does not match the language.");
  }
  if (typeof xp !== "number" || xp < 0 || xp > allowedXP + EXERCISE_COUNT * EXERCISE_XP) {
    throw new HttpsError("invalid-argument", "XP amount out of range.");
  }
  return { ok: true, allowedXP };
});

// ── Full lesson XP award with streaks, leaderboard, and activity ──────────

exports.awardLessonXP = onCall(async (request) => {
  const uid = requireAuth(request);
  const lang = normalizeLanguage(request.data?.lang);
  const lessonKey = String(request.data?.lessonKey || "").trim();
  const xpFromClient = Number(request.data?.xp) || 0;

  const allowedXP = ALL_LESSON_XP[lessonKey];
  if (!allowedXP) throw new HttpsError("invalid-argument", "Unknown lesson.");
  if (!lessonKey.startsWith(lang === "hebrew" ? "h" : "g")) {
    throw new HttpsError("invalid-argument", "Lesson key does not match the language.");
  }
  if (!Number.isFinite(xpFromClient) || xpFromClient < 0) {
    throw new HttpsError("invalid-argument", "XP amount out of range.");
  }

  const userRef = db.collection("users").doc(uid);
  const completionRef = userRef.collection("lessonCompletions").doc(`${lang}_${lessonKey}`);
  const activityRef = db.collection("activities").doc();
  const awardedXp = Math.min(xpFromClient, allowedXP + EXERCISE_COUNT * EXERCISE_XP);
  const now = new Date();
  const todayKey = isoDayKey(now);
  const weekKey = isoWeekKey(now);

  const result = await db.runTransaction(async (transaction) => {
    const [userDoc, completionDoc] = await Promise.all([
      transaction.get(userRef),
      transaction.get(completionRef)
    ]);

    const current = baseUserDocument(uid, userDoc.exists ? userDoc.data() : {});
    if (completionDoc.exists) return { alreadyAwarded: true, user: current };

    const totalXp = current.stats.totalXp + awardedXp;
    const langXpKey = lang === "hebrew" ? "xp_hebrew" : "xp_greek";
    const langXp = (current.stats[langXpKey] || 0) + awardedXp;
    const previousWeekXp = current.social.weekKey === weekKey ? current.social.weeklyXp : 0;
    const weeklyXp = previousWeekXp + awardedXp;
    const totalLessonsCompleted = current.stats.totalLessonsCompleted + 1;
    const level = Math.max(1, Math.floor(totalXp / 50) + 1);

    let streakDays = current.stats.streakDays || 0;
    if (!current.social.lastLessonDay) {
      streakDays = 1;
    } else {
      const prev = new Date(`${current.social.lastLessonDay}T00:00:00Z`);
      const curr = new Date(`${todayKey}T00:00:00Z`);
      const diff = Math.round((curr - prev) / 86400000);
      if (diff === 1) streakDays += 1;
      else if (diff > 1) streakDays = 1;
    }

    const merged = {
      ...current,
      stats: {
        ...current.stats,
        totalXp, level, totalLessonsCompleted, streakDays,
        [langXpKey]: langXp
      },
      social: {
        ...current.social,
        weeklyXp, weekKey,
        league: getLeagueLabel(weeklyXp),
        rankTitle: getRankLabel(totalXp),
        lastLessonDay: todayKey,
        lastLessonCompletedAt: FieldValue.serverTimestamp()
      },
      rewards: {
        gems: (current.rewards?.gems || 0) + LESSON_GEM_REWARD,
        heartPasses: (current.rewards?.heartPasses || 0),
        crowns: (current.rewards?.crowns || 0)
      },
      updatedAt: FieldValue.serverTimestamp()
    };

    transaction.set(userRef, merged, { merge: true });
    transaction.set(completionRef, {
      lessonKey, lang, awardedXp, createdAt: FieldValue.serverTimestamp()
    });
    transaction.set(activityRef, {
      actorUid: uid,
      visibility: merged.profile.isProfilePublic ? "public" : "private",
      title: `Completed ${lessonKey.toUpperCase()} (${lang === "hebrew" ? "Hebrew" : "Greek"})`,
      message: `Earned ${awardedXp} XP and reached rank ${merged.social.rankTitle}.`,
      lessonKey, lang, awardedXp,
      createdAt: FieldValue.serverTimestamp()
    });

    return { alreadyAwarded: false, awardedXp, user: merged };
  });

  return {
    alreadyAwarded: result.alreadyAwarded,
    awardedXp: result.alreadyAwarded ? 0 : result.awardedXp,
    user: sanitizeUserForClient(result.user)
  };
});

// ── Profile management ─────────────────────────────────────────────────────

exports.syncUserProfile = onCall(async (request) => {
  const uid = requireAuth(request);
  const userRef = db.collection("users").doc(uid);
  const result = await db.runTransaction(async (transaction) => {
    const doc = await transaction.get(userRef);
    const current = baseUserDocument(uid, doc.exists ? doc.data() : {});
    const displayName = String(request.data?.displayName || current.profile.displayName).trim().slice(0, 40);
    const photoURL = String(request.data?.photoURL || current.profile.photoURL).trim().slice(0, 500);
    const merged = { ...current, profile: { ...current.profile, displayName, photoURL }, updatedAt: FieldValue.serverTimestamp() };
    transaction.set(userRef, merged, { merge: true });
    return merged;
  });
  return { user: sanitizeUserForClient(result) };
});

exports.updateUserProfile = onCall(async (request) => {
  const uid = requireAuth(request);
  const userRef = db.collection("users").doc(uid);
  const result = await db.runTransaction(async (transaction) => {
    const doc = await transaction.get(userRef);
    const current = baseUserDocument(uid, doc.exists ? doc.data() : {});
    const displayName = String(request.data?.displayName || current.profile.displayName).trim().slice(0, 40);
    const bio = String(request.data?.bio || "").trim().slice(0, 180);
    const isProfilePublic = typeof request.data?.isProfilePublic === "boolean" ? request.data.isProfilePublic : current.profile.isProfilePublic;
    const merged = { ...current, profile: { ...current.profile, displayName, bio, isProfilePublic }, updatedAt: FieldValue.serverTimestamp() };
    transaction.set(userRef, merged, { merge: true });
    return merged;
  });
  return { user: sanitizeUserForClient(result) };
});

// Admin portal

exports.getAdminDashboard = onCall(async (request) => {
  await requireAdmin(request);
  const pageSize = Math.min(Math.max(asNumber(request.data?.pageSize, 50), 10), 100);
  const search = cleanAdminInput(request.data?.search).toLowerCase();
  const snapshot = await db.collection("users").limit(2000).get();
  const userDocs = snapshot.docs;
  const authIdentifiers = userDocs.slice(0, 100).map((doc) => ({ uid: doc.id }));
  const authLookup = authIdentifiers.length
    ? await admin.auth().getUsers(authIdentifiers)
    : { users: [] };
  const authByUid = new Map(authLookup.users.map((user) => [user.uid, user]));
  let users = userDocs.map((doc) => normalizeAdminUser(doc.id, doc.data(), authByUid.get(doc.id) || {}));
  users.sort((a, b) => b.stats.totalXp - a.stats.totalXp || a.displayName.localeCompare(b.displayName));
  const totals = summarizeAdminUsers(users);
  if (search) {
    users = users.filter((user) => [
      user.displayName,
      user.username,
      user.email,
      user.uid,
      user.activeLanguage
    ].some((value) => String(value || "").toLowerCase().includes(search)));
  }
  return {
    generatedAt: Date.now(),
    totals,
    courses: {
      greek: {
        label: "Koine Greek",
        students: totals.greek.students,
        xp: totals.greek.xp,
        lessons: totals.greek.lessons,
        averageXp: totals.greek.students ? Math.round(totals.greek.xp / totals.greek.students) : 0
      },
      hebrew: {
        label: "Biblical Hebrew",
        students: totals.hebrew.students,
        xp: totals.hebrew.xp,
        lessons: totals.hebrew.lessons,
        averageXp: totals.hebrew.students ? Math.round(totals.hebrew.xp / totals.hebrew.students) : 0
      }
    },
    users: users.slice(0, pageSize)
  };
});

exports.setUserAdmin = onCall(async (request) => {
  const actorUid = await requireAdmin(request);
  const email = cleanAdminInput(request.data?.email).toLowerCase();
  const targetUid = cleanAdminInput(request.data?.targetUid);
  const makeAdmin = request.data?.makeAdmin !== false;
  if (!email && !targetUid) {
    throw new HttpsError("invalid-argument", "Provide a user email or uid.");
  }
  if (targetUid && targetUid === actorUid && makeAdmin === false) {
    throw new HttpsError("failed-precondition", "You cannot remove your own admin access.");
  }
  const targetUser = targetUid
    ? await admin.auth().getUser(targetUid)
    : await admin.auth().getUserByEmail(email);
  const result = await applyAdminStatus({
    targetUser,
    makeAdmin,
    actorUid,
    username: cleanAdminInput(request.data?.username),
    displayName: cleanAdminInput(request.data?.displayName)
  });
  return { ok: true, user: result };
});

exports.claimInitialAdmin = onCall(async (request) => {
  const uid = requireAuth(request);
  const existingAdmin = await db.collection("users").where("isAdmin", "==", true).limit(1).get();
  if (!existingAdmin.empty) {
    throw new HttpsError("permission-denied", "Initial admin has already been claimed.");
  }
  const targetUser = await admin.auth().getUser(uid);
  if (!targetUser.email) {
    throw new HttpsError("failed-precondition", "Your account needs an email address before it can become admin.");
  }
  const result = await applyAdminStatus({
    targetUser,
    makeAdmin: true,
    actorUid: uid,
    username: cleanAdminInput(request.data?.username, "Sammie"),
    displayName: cleanAdminInput(request.data?.displayName, targetUser.displayName || "Sammie")
  });
  return { ok: true, user: result };
});

// ── Friend system ──────────────────────────────────────────────────────────

exports.sendFriendRequest = onCall(async (request) => {
  const uid = requireAuth(request);
  const targetUid = String(request.data?.targetUid || "").trim();
  if (!targetUid || targetUid === uid) throw new HttpsError("invalid-argument", "Choose another learner.");
  const requestRef = db.collection("friendRequests").doc(`${uid}_${targetUid}`);
  const reverseRef = db.collection("friendRequests").doc(`${targetUid}_${uid}`);
  const friendshipRef = db.collection("friendships").doc(friendshipIdFor(uid, targetUid));
  const targetRef = db.collection("users").doc(targetUid);
  await db.runTransaction(async (transaction) => {
    const [targetDoc, requestDoc, reverseDoc, friendshipDoc] = await Promise.all([
      transaction.get(targetRef), transaction.get(requestRef),
      transaction.get(reverseRef), transaction.get(friendshipRef)
    ]);
    if (!targetDoc.exists) throw new HttpsError("not-found", "That learner does not exist.");
    if (friendshipDoc.exists || requestDoc.exists) return;
    if (reverseDoc.exists) {
      transaction.delete(reverseRef);
      transaction.set(friendshipRef, { members: [uid, targetUid].sort(), createdAt: FieldValue.serverTimestamp() });
    } else {
      transaction.set(requestRef, { fromUid: uid, toUid: targetUid, status: "pending", createdAt: FieldValue.serverTimestamp() });
    }
  });
  return { ok: true };
});

exports.respondToFriendRequest = onCall(async (request) => {
  const uid = requireAuth(request);
  const requestId = String(request.data?.requestId || "").trim();
  const action = String(request.data?.action || "").trim();
  const requestRef = db.collection("friendRequests").doc(requestId);
  await db.runTransaction(async (transaction) => {
    const requestDoc = await transaction.get(requestRef);
    if (!requestDoc.exists) return;
    const req = requestDoc.data();
    if (!["accept","decline","cancel"].includes(action)) throw new HttpsError("invalid-argument", "Unknown action.");
    const canRespond = ["accept", "decline"].includes(action) && req.toUid === uid;
    const canCancel = action === "cancel" && req.fromUid === uid;
    if (!canRespond && !canCancel) {
      throw new HttpsError("permission-denied", "You cannot modify this friend request.");
    }
    if (action === "accept") {
      transaction.set(db.collection("friendships").doc(friendshipIdFor(req.fromUid, req.toUid)), {
        members: [req.fromUid, req.toUid].sort(), createdAt: FieldValue.serverTimestamp()
      });
    }
    transaction.delete(requestRef);
  });
  return { ok: true };
});

exports.removeFriend = onCall(async (request) => {
  const uid = requireAuth(request);
  const targetUid = String(request.data?.targetUid || "").trim();
  const friendshipRef = db.collection("friendships").doc(friendshipIdFor(uid, targetUid));
  await db.runTransaction(async (transaction) => {
    const friendshipDoc = await transaction.get(friendshipRef);
    if (!friendshipDoc.exists) return;
    transaction.delete(friendshipRef);
  });
  return { ok: true };
});

// ── Study rooms ────────────────────────────────────────────────────────────

exports.createStudyRoom = onCall(async (request) => {
  const uid = requireAuth(request);
  const lessonKey = String(request.data?.lessonKey || "").trim();
  const lang = normalizeLanguage(request.data?.lang);
  const invitedUid = String(request.data?.invitedUid || "").trim();
  if (!ALL_LESSON_XP[lessonKey] || !lessonKey.startsWith(lang === "hebrew" ? "h" : "g")) {
    throw new HttpsError("invalid-argument", "Choose a valid lesson for this language.");
  }
  const roomRef = db.collection("study_rooms").doc();
  const hostRef = db.collection("users").doc(uid);
  await db.runTransaction(async (transaction) => {
    const hostDoc = await transaction.get(hostRef);
    const host = baseUserDocument(uid, hostDoc.exists ? hostDoc.data() : {});
    if (invitedUid) {
      const friendshipDoc = await transaction.get(db.collection("friendships").doc(friendshipIdFor(uid, invitedUid)));
      if (!friendshipDoc.exists) throw new HttpsError("failed-precondition", "You can only invite a friend.");
    }
    transaction.set(roomRef, {
      lessonKey, lang, hostUid: uid,
      hostDisplayName: host.profile.displayName,
      memberUids: [uid], invitedUids: invitedUid ? [invitedUid] : [],
      createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp()
    });
  });
  return { ok: true, roomId: roomRef.id };
});

// ── Gems / hearts ──────────────────────────────────────────────────────────

exports.redeemHeartPass = onCall(async (request) => {
  const uid = requireAuth(request);
  const userRef = db.collection("users").doc(uid);
  const result = await db.runTransaction(async (transaction) => {
    const userDoc = await transaction.get(userRef);
    const user = baseUserDocument(uid, userDoc.exists ? userDoc.data() : {});
    if ((user.rewards?.heartPasses || 0) <= 0) throw new HttpsError("failed-precondition", "No heart gift to use.");
    const merged = { ...user, rewards: { ...user.rewards, heartPasses: (user.rewards.heartPasses || 1) - 1 }, updatedAt: FieldValue.serverTimestamp() };
    transaction.set(userRef, merged, { merge: true });
    return merged;
  });
  return { ok: true, user: sanitizeUserForClient(result) };
});

// ── Scheduled jobs ─────────────────────────────────────────────────────────

exports.resetDailyQuests = onSchedule("0 0 * * *", async () => {
  const snapshot = await db.collection("users").limit(500).get();
  const batch = db.batch();
  snapshot.forEach((doc) => batch.set(doc.ref, {
    dailyQuests: {}, dailyQuestsResetAt: FieldValue.serverTimestamp()
  }, { merge: true }));
  await batch.commit();
});

exports.sendStreakReminder = onSchedule("0 18 * * *", async () => {
  const cutoff = admin.firestore.Timestamp.fromMillis(Date.now() - 20 * 60 * 60 * 1000);
  const snapshot = await db.collection("users").where("updatedAt", "<", cutoff).limit(500).get();
  const batch = db.batch();
  snapshot.forEach((doc) => {
    batch.set(doc.ref.collection("notifications").doc(), {
      type: "streak", message: "A short review today will keep your streak going.",
      read: false, createdAt: FieldValue.serverTimestamp()
    });
  });
  await batch.commit();
});
