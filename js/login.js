import { LangManager, LANG_CONFIGS } from "./language-manager.js";
import { icon, renderIcons, showToast } from "./app.js?v=20260703-sound";
import { registerWithEmail, signInWithEmail, signInWithGoogle } from "./auth.js?v=20260701-authfix2";
import { initFirebase } from "./firebase-config.js?v=20260701-authfix2";

let mode = "login";
const form = document.getElementById("auth-form");

function field(name, label, type = "text", extra = "") {
  return `<div class="field" data-field="${name}"><label for="${name}">${label}</label><input id="${name}" name="${name}" type="${type}" aria-label="${label}" ${extra}><span class="field-error"></span></div>`;
}

function setError(name, message) {
  const wrapper = document.querySelector(`[data-field="${name}"]`);
  wrapper?.classList.toggle("invalid", !!message);
  const error = wrapper?.querySelector(".field-error");
  if (error) error.textContent = message || "";
}

function showAuthNotice(message, type = "error") {
  const notice = document.getElementById("auth-notice");
  if (!notice) return;
  notice.textContent = message || "";
  notice.className = `auth-notice ${type}`;
  notice.hidden = !message;
}

function renderForm() {
  if (mode === "login") {
    form.innerHTML = `
      ${field("email", "Email", "email", "required")}
      ${field("password", "Password", "password", "required")}
      <button class="btn btn-primary" type="submit" aria-label="Sign in">${icon("log-in", "Sign In")}</button>
      <button class="btn btn-ghost" id="google-auth" type="button" aria-label="Continue with Google">${icon("globe", "Continue with Google")}</button>`;
  } else {
    form.innerHTML = `
      ${field("displayName", "Full Name", "text", "required")}
      ${field("email", "Email", "email", "required")}
      ${field("password", "Password", "password", "required minlength='6'")}
      ${field("confirmPassword", "Confirm Password", "password", "required")}
      <div class="tabs">${Object.values(LANG_CONFIGS).map((cfg) => `<button class="tab-btn" data-register-lang="${cfg.lang}" type="button" aria-label="${cfg.label}">${cfg.logo} ${cfg.shortLabel}</button>`).join("")}</div>
      <button class="btn btn-primary" type="submit" aria-label="Create account">${icon("user-plus", "Create Account")}</button>`;
  }
  document.querySelectorAll("[data-register-lang]").forEach((button) => {
    button.classList.toggle("active", button.dataset.registerLang === LangManager.get());
    button.addEventListener("click", () => {
      LangManager.set(button.dataset.registerLang, false);
      renderForm();
    });
  });
  document.getElementById("google-auth")?.addEventListener("click", async () => {
    try {
      await signInWithGoogle();
      window.location.replace("dashboard.html");
    } catch (error) {
      const message = error.code === "auth/popup-closed-by-user"
        ? "Google sign-in was cancelled."
        : (error.message || "Google sign-in failed.");
      showAuthNotice(`${message} (${error.code || "auth/unknown"})`);
      showToast(message, "error");
    }
  });
  LangManager.applyTheme();
  renderIcons();
}

document.querySelectorAll("[data-auth-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    mode = button.dataset.authTab;
    document.querySelectorAll("[data-auth-tab]").forEach((tab) => tab.classList.toggle("active", tab === button));
    renderForm();
  });
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  ["displayName", "email", "password", "confirmPassword"].forEach((name) => setError(name, ""));
  const data = Object.fromEntries(new FormData(form));
  if (!data.email) return setError("email", "Enter your email address.");
  if (!data.password) return setError("password", "Enter your password.");
  if (mode === "register" && data.password !== data.confirmPassword) return setError("confirmPassword", "Passwords must match.");
  try {
    if (mode === "login") await signInWithEmail(data.email, data.password);
    else await registerWithEmail({ ...data, language: LangManager.get() });
    showToast("Welcome. Your study path is ready.", "success");
    window.location.replace("dashboard.html");
  } catch (error) {
    showToast(error.message || "Something went wrong signing in. Try again?", "error");
  }
});

renderForm();
showAuthNotice(sessionStorage.getItem("blq_auth_notice"));
sessionStorage.removeItem("blq_auth_notice");

async function resumeExistingSession() {
  try {
    const state = await initFirebase();
    if (state.mode !== "firebase") return;
    await state.auth.authStateReady();
    if (state.auth.currentUser) window.location.replace("dashboard.html");
  } catch (error) {
    console.warn("Could not restore the previous sign-in session:", error);
  }
}

resumeExistingSession();
