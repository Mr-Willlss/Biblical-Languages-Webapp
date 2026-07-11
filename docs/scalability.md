# Scalability Target

Biblical Languages is designed to support at least 1,500 concurrent signed-in learners when Firebase is configured for production billing and monitoring.

## Current Architecture

- Static frontend assets are served by GitHub Pages.
- Authentication, profile sync, settings, vocabulary favorites, progress, and leaderboard records are stored in Cloud Firestore.
- User progress writes are per-user documents, which avoids shared hot documents.
- Leaderboard reads use a bounded Firestore query of the top 50 records.
- Admin user analytics page through Firestore users in batches instead of relying on device-local state.

## Required Production Firebase Setup

The Firebase Spark plan is not enough for 1,500 active learners. Spark includes daily free quotas such as 50,000 document reads and 20,000 document writes. A normal active learner can use multiple reads and writes per session, so production usage should use the Blaze plan with budget alerts.

Recommended production controls:

- Enable Blaze billing with budget alerts and quota monitoring.
- Monitor Firestore reads, writes, listener connections, failed requests, and authentication sign-ins.
- Keep lesson/video content on external CDNs such as YouTube instead of embedding large media in the app.
- Keep global analytics and counters out of single frequently-written documents unless sharded counters are introduced.

## Load-Sensitive Rules

- Do not add unbounded Firestore reads on learner-facing pages.
- Do not add realtime listeners for global lists unless live updates are required.
- Prefer `getDocs(query(..., limit(n)))` for leaderboards and searchable lists.
- Keep per-user sync under `users/{uid}` or `users/{uid}/private/{docId}`.
- Use Cloud Functions or Cloud Run only after billing is enabled, and keep them stateless.
