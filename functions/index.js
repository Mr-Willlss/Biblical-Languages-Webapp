const admin = require("firebase-admin");
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { onDocumentUpdated } = require("firebase-functions/v2/firestore");
const { onSchedule } = require("firebase-functions/v2/scheduler");

admin.initializeApp();
const db = admin.firestore();

exports.onUserXPChange = onDocumentUpdated("users/{uid}", async (event) => {
  const before = event.data.before.data();
  const after = event.data.after.data();
  if (before.xp_total === after.xp_total) return;
  await db.collection("leaderboard").doc(event.params.uid).set({
    displayName: after.displayName || "Student Scholar",
    photoURL: after.photoURL || "",
    level: after.level || 1,
    xp_greek: after.xp_greek || 0,
    xp_hebrew: after.xp_hebrew || 0,
    xp_total: after.xp_total || 0,
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  }, { merge: true });
});

exports.validateLessonXP = onCall(async (request) => {
  if (!request.auth) throw new HttpsError("unauthenticated", "Sign in to save progress.");
  const { lang, lessonNum, xp } = request.data || {};
  const maxLesson = lang === "hebrew" ? 40 : 25;
  const maxXP = lessonNum > 21 ? 45 : 35;
  if (!["greek", "hebrew"].includes(lang) || lessonNum < 1 || lessonNum > maxLesson || xp < 0 || xp > maxXP) {
    throw new HttpsError("invalid-argument", "Lesson progress did not validate.");
  }
  return { ok: true, allowedXP: xp };
});

exports.resetDailyQuests = onSchedule("0 0 * * *", async () => {
  const snapshot = await db.collection("users").limit(500).get();
  const batch = db.batch();
  snapshot.forEach((doc) => batch.set(doc.ref, { dailyQuests: {}, dailyQuestsResetAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true }));
  await batch.commit();
});

exports.sendStreakReminder = onSchedule("0 18 * * *", async () => {
  const cutoff = admin.firestore.Timestamp.fromMillis(Date.now() - 20 * 60 * 60 * 1000);
  const snapshot = await db.collection("users").where("lastActive", "<", cutoff).limit(500).get();
  const batch = db.batch();
  snapshot.forEach((doc) => {
    batch.set(doc.ref.collection("notifications").doc(), {
      type: "streak",
      message: "A short review today can preserve your study rhythm.",
      read: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
  });
  await batch.commit();
});
