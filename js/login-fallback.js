(function () {
  const firebaseConfig = window.BLQ_FIREBASE_CONFIG;
  const form = document.getElementById("auth-form");
  if (!form) return;

  let mode = "login";
  let app = null;
  let auth = null;
  let db = null;

  function showNotice(message, type = "error") {
    const notice = document.getElementById("auth-notice");
    if (!notice) return;
    notice.textContent = message || "";
    notice.className = `auth-notice ${type}`;
    notice.hidden = !message;
  }

  function setError(name, message) {
    const wrapper = document.querySelector(`[data-field="${name}"]`);
    wrapper?.classList.toggle("invalid", Boolean(message));
    const error = wrapper?.querySelector(".field-error");
    if (error) error.textContent = message || "";
  }

  function field(name, label, type = "text", extra = "") {
    return `<div class="field" data-field="${name}"><label for="${name}">${label}</label><input id="${name}" name="${name}" type="${type}" aria-label="${label}" ${extra}><span class="field-error"></span></div>`;
  }

  function getFirebase() {
    if (!firebaseConfig || !window.firebase?.initializeApp) {
      throw new Error("Firebase is still loading. Check your connection and try again.");
    }
    app ||= window.firebase.apps?.length ? window.firebase.app() : window.firebase.initializeApp(firebaseConfig);
    auth ||= window.firebase.auth(app);
    db ||= window.firebase.firestore(app);
    return { auth, db };
  }

  function renderForm() {
    if (window.__BLQ_LOGIN_MODULE_READY) return;
    if (mode === "register") {
      form.innerHTML = `
        ${field("displayName", "Full Name", "text", "required")}
        ${field("email", "Email", "email", "required")}
        ${field("password", "Password", "password", "required minlength='6'")}
        ${field("confirmPassword", "Confirm Password", "password", "required")}
        <button class="btn btn-primary" type="submit" aria-label="Create account">Create Account</button>`;
    } else {
      form.innerHTML = `
        ${field("email", "Email", "email", "required")}
        ${field("password", "Password", "password", "required")}
        <button class="btn btn-primary" type="submit" aria-label="Sign in">Sign In</button>
        <button class="btn btn-ghost" id="google-auth" type="button" aria-label="Continue with Google">Continue with Google</button>`;
    }
    bindGoogle();
  }

  async function syncUserDocument(user, extra = {}) {
    const { db } = getFirebase();
    await db.collection("users").doc(user.uid).set({
      uid: user.uid,
      displayName: user.displayName || extra.displayName || "Language Learner",
      email: user.email || "",
      photoURL: user.photoURL || "",
      activeLanguage: localStorage.getItem("blq_active_lang") || "greek",
      role: "student",
      lastActiveAt: window.firebase.firestore.FieldValue.serverTimestamp(),
      createdAt: window.firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
  }

  function bindGoogle() {
    document.getElementById("google-auth")?.addEventListener("click", async () => {
      try {
        showNotice("Opening Google sign-in...", "success");
        const { auth } = getFirebase();
        const provider = new window.firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });
        const credential = await auth.signInWithPopup(provider);
        await syncUserDocument(credential.user);
        window.location.replace("dashboard.html");
      } catch (error) {
        showNotice(`${error.message || "Google sign-in failed."} (${error.code || "auth/unknown"})`);
      }
    }, { once: true });
  }

  document.querySelectorAll("[data-auth-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      if (window.__BLQ_LOGIN_MODULE_READY) return;
      mode = button.dataset.authTab || "login";
      document.querySelectorAll("[data-auth-tab]").forEach((tab) => tab.classList.toggle("active", tab === button));
      renderForm();
    });
  });

  form.addEventListener("submit", async (event) => {
    if (window.__BLQ_LOGIN_MODULE_READY) return;
    event.preventDefault();
    ["displayName", "email", "password", "confirmPassword"].forEach((name) => setError(name, ""));
    const data = Object.fromEntries(new FormData(form));
    if (!data.email) return setError("email", "Enter your email address.");
    if (!data.password) return setError("password", "Enter your password.");
    if (mode === "register" && data.password !== data.confirmPassword) return setError("confirmPassword", "Passwords must match.");
    try {
      const { auth } = getFirebase();
      const credential = mode === "register"
        ? await auth.createUserWithEmailAndPassword(data.email, data.password)
        : await auth.signInWithEmailAndPassword(data.email, data.password);
      if (mode === "register" && data.displayName) await credential.user.updateProfile({ displayName: data.displayName });
      await syncUserDocument(credential.user, data);
      window.location.replace("dashboard.html");
    } catch (error) {
      showNotice(`${error.message || "Something went wrong signing in."} (${error.code || "auth/unknown"})`);
    }
  });

  window.setTimeout(() => {
    if (!window.__BLQ_LOGIN_MODULE_READY) {
      renderForm();
      bindGoogle();
    }
  }, 900);
}());
