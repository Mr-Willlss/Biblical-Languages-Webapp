import { initFirestore } from "./firebase-config.js";

let firestoreSdkPromise = null;

async function getFirestoreSdk() {
  if (!firestoreSdkPromise) {
    firestoreSdkPromise = import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js");
  }
  return firestoreSdkPromise;
}

async function socialDb() {
  const state = await initFirestore();
  if (state.mode !== "firebase") throw new Error("Firebase is not configured.");
  const sdk = await getFirestoreSdk();
  return { state, sdk, db: state.db };
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

function timestamp(value) {
  if (!value) return 0;
  if (typeof value === "number") return value;
  if (typeof value.toMillis === "function") return value.toMillis();
  if (typeof value.toDate === "function") return value.toDate().getTime();
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function publicUserRecord(id, data = {}) {
  const profile = data.profile || {};
  const stats = data.stats || {};
  const social = data.social || {};
  const rewards = data.rewards || {};
  const totalXp = Number(stats.totalXp ?? data.xp_total ?? 0);
  return {
    uid: data.uid || id,
    displayName: profile.displayName || data.displayName || "Language Learner",
    username: profile.username || data.username || "",
    email: data.email || "",
    photoURL: profile.photoURL || data.photoURL || "",
    activeLanguage: data.activeLanguage || profile.activeLanguage || "greek",
    stats: {
      totalXp,
      level: Number(stats.level || Math.max(1, Math.floor(totalXp / 50) + 1)),
      streakDays: Number(stats.streakDays || data.streak || 0),
      totalLessonsCompleted: Number(stats.totalLessonsCompleted || 0),
      totalFriends: Number(stats.totalFriends || 0)
    },
    social: {
      weeklyXp: Number(social.weeklyXp || 0),
      league: social.league || "Bronze",
      rankTitle: social.rankTitle || "Novice Scribe",
      lastActiveAt: timestamp(data.updatedAt || data.lastActiveAt || social.lastLessonCompletedAt)
    },
    rewards: {
      gems: Number(rewards.gems || data.gems || 0),
      crowns: Number(rewards.crowns || 0)
    }
  };
}

function relationForUser(uid, relationships, targetUid) {
  if (!targetUid || targetUid === uid) return "self";
  if (relationships.blockedIds.has(targetUid)) return "blocked";
  if (relationships.friendIds.has(targetUid)) return "friend";
  if (relationships.incoming.some((item) => item.fromUid === targetUid)) return "incoming";
  if (relationships.outgoing.some((item) => item.toUid === targetUid)) return "outgoing";
  return "suggested";
}

function conversationIdFor(uidA, uidB) {
  return [uidA, uidB].sort().join("_");
}

async function loadPublicUsers(db, sdk, limit = 1000) {
  const snapshot = await sdk.getDocs(sdk.query(sdk.collection(db, "users"), sdk.limit(limit)));
  return snapshot.docs.map((docSnap) => publicUserRecord(docSnap.id, docSnap.data()));
}

async function loadRelationships(db, sdk, uid) {
  const [friendshipsSnap, incomingSnap, outgoingSnap, blocksSnap] = await Promise.all([
    sdk.getDocs(sdk.query(sdk.collection(db, "friendships"), sdk.where("members", "array-contains", uid))),
    sdk.getDocs(sdk.query(sdk.collection(db, "friendRequests"), sdk.where("toUid", "==", uid))),
    sdk.getDocs(sdk.query(sdk.collection(db, "friendRequests"), sdk.where("fromUid", "==", uid))),
    sdk.getDocs(sdk.query(sdk.collection(db, "blocks"), sdk.where("blockerUid", "==", uid)))
  ]);
  const friendIds = new Set();
  friendshipsSnap.forEach((docSnap) => {
    const members = Array.isArray(docSnap.data()?.members) ? docSnap.data().members : [];
    members.forEach((memberUid) => { if (memberUid !== uid) friendIds.add(memberUid); });
  });
  return {
    friendIds,
    incoming: incomingSnap.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })),
    outgoing: outgoingSnap.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })),
    blockedIds: new Set(blocksSnap.docs.map((docSnap) => docSnap.data()?.blockedUid).filter(Boolean))
  };
}

async function socialCall(name, data = {}) {
  const { db, sdk } = await socialDb();
  const auth = (await initFirestore()).auth;
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Sign in first.");

  switch (name) {
    case "searchUsers":
    case "getSocialDashboard": {
      const search = String(data.search || "").trim().toLowerCase();
      const limit = Math.min(Math.max(Number(data.limit || 12), 1), 50);
      const [users, relationships, roomsSnap, feedSnap] = await Promise.all([
        loadPublicUsers(db, sdk, 1000),
        loadRelationships(db, sdk, uid),
        sdk.getDocs(sdk.query(sdk.collection(db, "study_rooms"), sdk.where("memberUids", "array-contains", uid), sdk.limit(limit))),
        sdk.getDocs(sdk.query(sdk.collection(db, "activities"), sdk.orderBy("createdAt", "desc"), sdk.limit(limit)))
      ]);
      const byUid = new Map(users.map((user) => [user.uid, user]));
      const filtered = users
        .filter((user) => user.uid !== uid)
        .filter((user) => !relationships.blockedIds.has(user.uid))
        .filter((user) => !search || [user.displayName, user.username, user.email, user.activeLanguage].some((value) => String(value || "").toLowerCase().includes(search)))
        .sort((a, b) => (b.social.lastActiveAt || 0) - (a.social.lastActiveAt || 0) || b.stats.totalXp - a.stats.totalXp || a.displayName.localeCompare(b.displayName))
        .slice(0, limit)
        .map((user) => ({ ...user, relation: relationForUser(uid, relationships, user.uid) }));
      if (name === "searchUsers") return { users: filtered };
      return {
        friends: [...relationships.friendIds].map((friendUid) => byUid.get(friendUid)).filter(Boolean),
        incomingRequests: relationships.incoming.map((item) => ({ id: item.id, fromUid: item.fromUid, from: byUid.get(item.fromUid) || publicUserRecord(item.fromUid, {}) })),
        outgoingRequests: relationships.outgoing.map((item) => ({ id: item.id, toUid: item.toUid, to: byUid.get(item.toUid) || publicUserRecord(item.toUid, {}) })),
        blockedUsers: [...relationships.blockedIds].map((blockedUid) => byUid.get(blockedUid) || publicUserRecord(blockedUid, {})),
        suggestions: filtered,
        rooms: roomsSnap.docs.map((docSnap) => {
          const room = docSnap.data();
          return {
            id: docSnap.id,
            lessonKey: room.lessonKey,
            lang: room.lang,
            hostUid: room.hostUid,
            hostDisplayName: room.hostDisplayName || byUid.get(room.hostUid)?.displayName || "Study Room",
            title: room.title || `${room.lang === "hebrew" ? "Hebrew" : "Greek"} Study Room`,
            prompt: room.prompt || "",
            memberUids: Array.isArray(room.memberUids) ? room.memberUids : [],
            invitedUids: Array.isArray(room.invitedUids) ? room.invitedUids : [],
            recentMessages: Array.isArray(room.recentMessages) ? room.recentMessages : [],
            updatedAt: timestamp(room.updatedAt || room.lastMessageAt || room.createdAt)
          };
        }),
        feed: feedSnap.docs.map((docSnap) => {
          const post = docSnap.data();
          return {
            id: docSnap.id,
            actorUid: post.actorUid,
            actor: byUid.get(post.actorUid) || publicUserRecord(post.actorUid, {}),
            type: post.type || "lesson",
            title: post.title || "",
            message: post.message || post.body || "",
            visibility: post.visibility || "public",
            lessonKey: post.lessonKey || "",
            lang: post.lang || "",
            likesCount: Number(post.likesCount || 0),
            commentsCount: Number(post.commentsCount || 0),
            sharesCount: Number(post.sharesCount || 0),
            recentComments: Array.isArray(post.recentComments) ? post.recentComments : [],
            createdAt: timestamp(post.createdAt)
          };
        })
      };
    }
    case "getConversation": {
      const peerUid = String(data.peerUid || "").trim();
      if (!peerUid || peerUid === uid) throw new Error("Choose another learner.");
      const byUid = new Map((await loadPublicUsers(db, sdk, 1000)).map((user) => [user.uid, user]));
      const conversationId = conversationIdFor(uid, peerUid);
      const snap = await sdk.getDoc(sdk.doc(db, "conversations", conversationId));
      const convo = snap.exists() ? snap.data() : { recentMessages: [] };
      return {
        conversationId,
        peer: byUid.get(peerUid) || publicUserRecord(peerUid, {}),
        messages: (Array.isArray(convo.recentMessages) ? convo.recentMessages : []).map((message) => ({
          uid: message.uid,
          user: byUid.get(message.uid) || publicUserRecord(message.uid, {}),
          body: message.body || "",
          createdAt: timestamp(message.createdAt)
        }))
      };
    }
    case "sendDirectMessage": {
      const peerUid = String(data.peerUid || "").trim();
      const body = String(data.body || "").trim().slice(0, 280);
      if (!peerUid || peerUid === uid || !body) throw new Error("Choose a friend and write a message.");
      const conversationId = conversationIdFor(uid, peerUid);
      const conversationRef = sdk.doc(db, "conversations", conversationId);
      await sdk.runTransaction(db, async (transaction) => {
        const snap = await transaction.get(conversationRef);
        const current = snap.exists() ? snap.data() : { recentMessages: [] };
        transaction.set(conversationRef, {
          members: [uid, peerUid].sort(),
          recentMessages: [{ uid, body, createdAt: Date.now() }, ...(Array.isArray(current.recentMessages) ? current.recentMessages : [])].slice(0, 30),
          updatedAt: sdk.serverTimestamp(),
          lastMessage: body,
          lastMessageAt: sdk.serverTimestamp()
        }, { merge: true });
      });
      return { ok: true };
    }
    case "sendFriendRequest": {
      const targetUid = String(data.targetUid || "").trim();
      if (!targetUid || targetUid === uid) throw new Error("Choose another learner.");
      const requestRef = sdk.doc(db, "friendRequests", `${uid}_${targetUid}`);
      const reverseRef = sdk.doc(db, "friendRequests", `${targetUid}_${uid}`);
      const friendshipRef = sdk.doc(db, "friendships", conversationIdFor(uid, targetUid));
      await sdk.runTransaction(db, async (transaction) => {
        const [targetDoc, requestDoc, reverseDoc, friendshipDoc] = await Promise.all([
          transaction.get(sdk.doc(db, "users", targetUid)),
          transaction.get(requestRef),
          transaction.get(reverseRef),
          transaction.get(friendshipRef)
        ]);
        if (!targetDoc.exists()) throw new Error("That learner does not exist.");
        if (friendshipDoc.exists() || requestDoc.exists()) return;
        if (reverseDoc.exists()) {
          transaction.delete(reverseRef);
          transaction.set(friendshipRef, { members: [uid, targetUid].sort(), createdAt: sdk.serverTimestamp() });
        } else {
          transaction.set(requestRef, { fromUid: uid, toUid: targetUid, status: "pending", createdAt: sdk.serverTimestamp() });
        }
      });
      return { ok: true };
    }
    case "respondToFriendRequest": {
      const requestId = String(data.requestId || "").trim();
      const action = String(data.action || "").trim();
      if (!requestId) throw new Error("Choose a request first.");
      const requestRef = sdk.doc(db, "friendRequests", requestId);
      await sdk.runTransaction(db, async (transaction) => {
        const requestDoc = await transaction.get(requestRef);
        if (!requestDoc.exists()) return;
        const req = requestDoc.data();
        if (!["accept", "decline", "cancel"].includes(action)) throw new Error("Unknown action.");
        const canRespond = ["accept", "decline"].includes(action) && req.toUid === uid;
        const canCancel = action === "cancel" && req.fromUid === uid;
        if (!canRespond && !canCancel) throw new Error("You cannot modify this friend request.");
        if (action === "accept") {
          transaction.set(sdk.doc(db, "friendships", conversationIdFor(req.fromUid, req.toUid)), {
            members: [req.fromUid, req.toUid].sort(),
            createdAt: sdk.serverTimestamp()
          });
        }
        transaction.delete(requestRef);
      });
      return { ok: true };
    }
    case "removeFriend": {
      const targetUid = String(data.targetUid || "").trim();
      await sdk.deleteDoc(sdk.doc(db, "friendships", conversationIdFor(uid, targetUid))).catch(() => {});
      return { ok: true };
    }
    case "blockUser": {
      const targetUid = String(data.targetUid || "").trim();
      if (!targetUid || targetUid === uid) throw new Error("Choose another learner.");
      await sdk.runTransaction(db, async (transaction) => {
        const targetDoc = await transaction.get(sdk.doc(db, "users", targetUid));
        if (!targetDoc.exists()) throw new Error("That learner does not exist.");
        transaction.set(sdk.doc(db, "blocks", `${uid}_${targetUid}`), {
          blockerUid: uid,
          blockedUid: targetUid,
          createdAt: sdk.serverTimestamp()
        });
        transaction.delete(sdk.doc(db, "friendships", conversationIdFor(uid, targetUid)));
        transaction.delete(sdk.doc(db, "friendRequests", `${uid}_${targetUid}`));
        transaction.delete(sdk.doc(db, "friendRequests", `${targetUid}_${uid}`));
      });
      return { ok: true };
    }
    case "unblockUser": {
      const targetUid = String(data.targetUid || "").trim();
      await sdk.deleteDoc(sdk.doc(db, "blocks", `${uid}_${targetUid}`)).catch(() => {});
      return { ok: true };
    }
    case "getStudyRooms": {
      const limit = Math.min(Math.max(Number(data.limit || 12), 1), 30);
      const [users, roomsSnap] = await Promise.all([
        loadPublicUsers(db, sdk, 1000),
        sdk.getDocs(sdk.query(sdk.collection(db, "study_rooms"), sdk.where("memberUids", "array-contains", uid), sdk.limit(limit)))
      ]);
      const byUid = new Map(users.map((user) => [user.uid, user]));
      return {
        rooms: roomsSnap.docs.map((docSnap) => {
          const room = docSnap.data();
          return {
            id: docSnap.id,
            title: room.title || `${room.lang === "hebrew" ? "Hebrew" : "Greek"} Study Room`,
            prompt: room.prompt || "",
            lessonKey: room.lessonKey || "",
            lang: room.lang || "greek",
            hostUid: room.hostUid || "",
            hostDisplayName: room.hostDisplayName || byUid.get(room.hostUid)?.displayName || "Study Room",
            memberUids: Array.isArray(room.memberUids) ? room.memberUids : [],
            invitedUids: Array.isArray(room.invitedUids) ? room.invitedUids : [],
            recentMessages: Array.isArray(room.recentMessages) ? room.recentMessages : [],
            messagesCount: Number(room.messagesCount || 0),
            updatedAt: timestamp(room.updatedAt || room.lastMessageAt || room.createdAt)
          };
        })
      };
    }
    case "createStudyRoom": {
      const lessonKey = String(data.lessonKey || "").trim();
      const lang = String(data.lang || "greek").trim().toLowerCase() === "hebrew" ? "hebrew" : "greek";
      const invitedUid = String(data.invitedUid || "").trim();
      const title = String(data.title || "").trim().slice(0, 60);
      const prompt = String(data.prompt || "").trim().slice(0, 240);
      if (!lessonKey || !lessonKey.startsWith(lang === "hebrew" ? "h" : "g")) throw new Error("Choose a valid lesson for this language.");
      if (invitedUid) {
        const friendshipDoc = await sdk.getDoc(sdk.doc(db, "friendships", conversationIdFor(uid, invitedUid)));
        if (!friendshipDoc.exists()) throw new Error("You can only invite a friend.");
      }
      const newRef = sdk.doc(sdk.collection(db, "study_rooms"));
      await sdk.setDoc(newRef, {
        lessonKey,
        lang,
        hostUid: uid,
        hostDisplayName: (await sdk.getDoc(sdk.doc(db, "users", uid))).data()?.profile?.displayName || "Study Room",
        title: title || `${lang === "hebrew" ? "Hebrew" : "Greek"} Study Room`,
        prompt: prompt || "Study together, share notes, and keep one another encouraged.",
        memberUids: [uid],
        invitedUids: invitedUid ? [invitedUid] : [],
        recentMessages: [],
        messagesCount: 0,
        createdAt: sdk.serverTimestamp(),
        updatedAt: sdk.serverTimestamp()
      });
      return { ok: true, roomId: newRef.id };
    }
    case "joinStudyRoom":
    case "leaveStudyRoom": {
      const roomId = String(data.roomId || "").trim();
      if (!roomId) throw new Error("Choose a room first.");
      const roomRef = sdk.doc(db, "study_rooms", roomId);
      await sdk.runTransaction(db, async (transaction) => {
        const roomSnap = await transaction.get(roomRef);
        if (!roomSnap.exists()) throw new Error("That room does not exist.");
        const room = roomSnap.data();
        const members = new Set(Array.isArray(room.memberUids) ? room.memberUids : []);
        if (name === "joinStudyRoom") members.add(uid);
        else members.delete(uid);
        transaction.set(roomRef, { memberUids: [...members], updatedAt: sdk.serverTimestamp() }, { merge: true });
      });
      return { ok: true };
    }
    case "inviteToStudyRoom": {
      const roomId = String(data.roomId || "").trim();
      const invitedUid = String(data.invitedUid || "").trim();
      if (!roomId || !invitedUid || invitedUid === uid) throw new Error("Choose a valid study partner.");
      const friendshipDoc = await sdk.getDoc(sdk.doc(db, "friendships", conversationIdFor(uid, invitedUid)));
      if (!friendshipDoc.exists()) throw new Error("Invite a friend to this room.");
      const roomRef = sdk.doc(db, "study_rooms", roomId);
      await sdk.runTransaction(db, async (transaction) => {
        const roomSnap = await transaction.get(roomRef);
        if (!roomSnap.exists()) throw new Error("That room does not exist.");
        const room = roomSnap.data();
        const invited = new Set(Array.isArray(room.invitedUids) ? room.invitedUids : []);
        invited.add(invitedUid);
        transaction.set(roomRef, { invitedUids: [...invited], updatedAt: sdk.serverTimestamp() }, { merge: true });
      });
      return { ok: true };
    }
    case "sendStudyRoomMessage": {
      const roomId = String(data.roomId || "").trim();
      const body = String(data.body || "").trim().slice(0, 280);
      if (!roomId || !body) throw new Error("Write a message first.");
      const roomRef = sdk.doc(db, "study_rooms", roomId);
      await sdk.runTransaction(db, async (transaction) => {
        const roomSnap = await transaction.get(roomRef);
        if (!roomSnap.exists()) throw new Error("That room does not exist.");
        const room = roomSnap.data();
        if (!Array.isArray(room.memberUids) || !room.memberUids.includes(uid)) throw new Error("Join the room before chatting.");
        const nextMessage = { uid, body, createdAt: Date.now() };
        transaction.set(roomRef, {
          recentMessages: [nextMessage, ...(Array.isArray(room.recentMessages) ? room.recentMessages : [])].slice(0, 20),
          messagesCount: Number(room.messagesCount || 0) + 1,
          updatedAt: sdk.serverTimestamp(),
          lastMessage: body,
          lastMessageAt: sdk.serverTimestamp()
        }, { merge: true });
      });
      return { ok: true };
    }
    case "getActivityFeed": {
      const limit = Math.min(Math.max(Number(data.limit || 20), 1), 50);
      const [users, likesSnap, commentsSnap, feedSnap] = await Promise.all([
        loadPublicUsers(db, sdk, 1000),
        sdk.getDocs(sdk.query(sdk.collection(db, "activityLikes"), sdk.where("uid", "==", uid))),
        sdk.getDocs(sdk.query(sdk.collection(db, "activityComments"), sdk.orderBy("createdAt", "desc"), sdk.limit(limit * 3))),
        sdk.getDocs(sdk.query(sdk.collection(db, "activities"), sdk.orderBy("createdAt", "desc"), sdk.limit(limit)))
      ]);
      const byUid = new Map(users.map((user) => [user.uid, user]));
      const likedIds = new Set(likesSnap.docs.map((docSnap) => docSnap.data().activityId).filter(Boolean));
      const commentsByActivity = new Map();
      commentsSnap.docs.forEach((docSnap) => {
        const item = docSnap.data();
        const list = commentsByActivity.get(item.activityId) || [];
        list.push({ id: docSnap.id, uid: item.uid, user: byUid.get(item.uid) || publicUserRecord(item.uid, {}), body: item.body || "", createdAt: timestamp(item.createdAt) });
        commentsByActivity.set(item.activityId, list);
      });
      return {
        feed: feedSnap.docs.map((docSnap) => {
          const post = docSnap.data();
          return {
            id: docSnap.id,
            actorUid: post.actorUid,
            actor: byUid.get(post.actorUid) || publicUserRecord(post.actorUid, {}),
            title: post.title || "",
            message: post.message || post.body || "",
            lessonKey: post.lessonKey || "",
            lang: post.lang || "",
            visibility: post.visibility || "public",
            likesCount: Number(post.likesCount || 0),
            commentsCount: Number(post.commentsCount || 0),
            sharesCount: Number(post.sharesCount || 0),
            likedByMe: likedIds.has(docSnap.id),
            recentComments: commentsByActivity.get(docSnap.id) || [],
            createdAt: timestamp(post.createdAt)
          };
        })
      };
    }
    case "createActivityPost": {
      const body = String(data.body || "").trim().slice(0, 500);
      const visibility = ["public", "friends", "private"].includes(String(data.visibility || "")) ? String(data.visibility) : "public";
      if (!body) throw new Error("Write something to post.");
      const userSnap = await sdk.getDoc(sdk.doc(db, "users", uid));
      const displayName = userSnap.data()?.profile?.displayName || "Language Learner";
      const postRef = sdk.doc(sdk.collection(db, "activities"));
      await sdk.setDoc(postRef, {
        actorUid: uid,
        visibility,
        type: "post",
        title: `${displayName} shared an update`,
        message: body,
        body,
        likesCount: 0,
        commentsCount: 0,
        sharesCount: 0,
        recentComments: [],
        createdAt: sdk.serverTimestamp()
      });
      return { ok: true, activityId: postRef.id };
    }
    case "toggleActivityLike": {
      const activityId = String(data.activityId || "").trim();
      if (!activityId) throw new Error("Choose a post to like.");
      const activityRef = sdk.doc(db, "activities", activityId);
      const likeRef = sdk.doc(db, "activityLikes", `${activityId}_${uid}`);
      await sdk.runTransaction(db, async (transaction) => {
        const [activityDoc, likeDoc] = await Promise.all([transaction.get(activityRef), transaction.get(likeRef)]);
        if (!activityDoc.exists()) throw new Error("That post does not exist.");
        const liked = likeDoc.exists();
        if (liked) {
          transaction.delete(likeRef);
          transaction.set(activityRef, { likesCount: Math.max(0, Number(activityDoc.data().likesCount || 0) - 1) }, { merge: true });
        } else {
          transaction.set(likeRef, { activityId, uid, createdAt: sdk.serverTimestamp() });
          transaction.set(activityRef, { likesCount: Number(activityDoc.data().likesCount || 0) + 1 }, { merge: true });
        }
      });
      return { ok: true };
    }
    case "commentOnActivity": {
      const activityId = String(data.activityId || "").trim();
      const body = String(data.body || "").trim().slice(0, 240);
      if (!activityId || !body) throw new Error("Add a comment first.");
      const activityRef = sdk.doc(db, "activities", activityId);
      const commentRef = sdk.doc(sdk.collection(db, "activityComments"));
      await sdk.runTransaction(db, async (transaction) => {
        const activityDoc = await transaction.get(activityRef);
        if (!activityDoc.exists()) throw new Error("That post does not exist.");
        transaction.set(commentRef, { activityId, uid, body, createdAt: sdk.serverTimestamp() });
        const current = activityDoc.data();
        transaction.set(activityRef, {
          commentsCount: Number(current.commentsCount || 0) + 1,
          recentComments: [{ uid, body, createdAt: Date.now() }, ...(Array.isArray(current.recentComments) ? current.recentComments : [])].slice(0, 4)
        }, { merge: true });
      });
      return { ok: true };
    }
    case "shareActivity": {
      const activityId = String(data.activityId || "").trim();
      if (!activityId) throw new Error("Choose a post to share.");
      const activityRef = sdk.doc(db, "activities", activityId);
      await sdk.runTransaction(db, async (transaction) => {
        const activityDoc = await transaction.get(activityRef);
        if (!activityDoc.exists()) throw new Error("That post does not exist.");
        transaction.set(activityRef, { sharesCount: Number(activityDoc.data().sharesCount || 0) + 1 }, { merge: true });
        transaction.set(sdk.doc(sdk.collection(db, "activityShares")), {
          activityId,
          uid,
          createdAt: sdk.serverTimestamp()
        });
      });
      return { ok: true };
    }
    default:
      throw new Error(`Unknown social action: ${name}`);
  }
}

export { socialBadge, socialCall, socialInitials, timeAgo };
