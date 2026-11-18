# Firebase activation

The browser Firebase configuration is public by design. Do not put service-account
JSON, private keys, or Admin SDK credentials in this repository.

## 1. Create or open the project

1. Open <https://console.firebase.google.com/>.
2. Create or select the project named `biblical-languages`.
3. In **Project settings > General > Your apps**, add a Web app.
4. Copy the `firebaseConfig` values into `js/firebase-env.js`.

## 2. Enable sign-in

1. Open **Authentication > Sign-in method**.
2. Enable **Google** and select a project support email.
3. Enable **Email/Password**.
4. Under **Authentication > Settings > Authorized domains**, add:
   - `mr-willlss.github.io`
   - `localhost`

## 3. Create Firestore

1. Open **Firestore Database**.
2. Create the database in Production mode.
3. Choose the region nearest the majority of learners.

## 4. Deploy backend configuration

Install Java 21 if Firestore emulator testing is required. Then run:

```powershell
firebase login
firebase use biblical-languages
firebase deploy --only firestore:rules,firestore:indexes,functions
```

Cloud Functions deployment requires the Firebase project to use the Blaze plan.

## 5. Verify

1. Open the deployed app and choose **Continue with Google**.
2. Complete one lesson.
3. In Firestore, confirm these documents exist:
   - `users/{uid}`
   - `users/{uid}/progress/greek` or `users/{uid}/progress/hebrew`
   - `users/{uid}/lessonCompletions/{language}_{lessonKey}`
4. Sign in on a second browser or device and confirm the completed lesson and XP appear.
5. Open **Community Feed**, post a short message, and confirm it appears in a second signed-in session.
6. Use **Friends** to search for another account, send a request, and accept it from that account.
7. Open **Study Rooms**, create a public room, then join it from a second account. Test private rooms using a friend invitation.

Social discovery is served by a callable function so private user documents and email addresses are not exposed to the browser. Feed rules allow signed-in learners to read public activity and limit post creation and deletion to the post author. Room membership changes are handled by callable functions.
