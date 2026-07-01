const LANG_CONFIGS = {
  greek: {
    lang: "greek",
    label: "Koine Greek",
    shortLabel: "Greek",
    logo: "Ω",
    icon: "landmark",
    accentPrimary: "#7c5cfc",
    accentSecondary: "#3b82f6",
    gradient: "linear-gradient(135deg, #7c5cfc 0%, #3b82f6 100%)",
    dir: "ltr",
    totalBeginner: 25,
    totalFurther: 0,
    corpus: "New Testament",
    worlds: [
      { id: 1, name: "The Alphabet Temple", lessons: [1, 2, 3, 4, 5] },
      { id: 2, name: "First Words", lessons: [6, 7, 8, 9, 10] },
      { id: 3, name: "Grammar Foundations", lessons: [11, 12, 13, 14, 15] },
      { id: 4, name: "Expanding Grammar", lessons: [16, 17, 18, 19, 20] },
      { id: 5, name: "Advanced Structures", lessons: [21, 22, 23, 24, 25] }
    ]
  },
  hebrew: {
    lang: "hebrew",
    label: "Biblical Hebrew",
    shortLabel: "Hebrew",
    logo: "א",
    icon: "scroll-text",
    accentPrimary: "#d97706",
    accentSecondary: "#f59e0b",
    gradient: "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)",
    dir: "rtl",
    totalBeginner: 24,
    totalFurther: 0,
    corpus: "Old Testament",
    worlds: [
      { id: 1, name: "The Aleph-Bet", lessons: [1, 2, 3, 4, 5] },
      { id: 2, name: "Sounds & Vowels", lessons: [6, 7, 8, 9, 10] },
      { id: 3, name: "Words & Grammar", lessons: [11, 12, 13, 14, 15] },
      { id: 4, name: "Verbs & Sentences", lessons: [16, 17, 18, 19, 20] },
      { id: 5, name: "Review & Mastery", lessons: [21, 22, 23, 24] }
    ]
  }
};

const LangManager = {
  STORAGE_KEY: "blq_active_lang",

  get() {
    return localStorage.getItem(this.STORAGE_KEY) || "greek";
  },

  set(lang, reload = true) {
    if (!LANG_CONFIGS[lang]) return;
    localStorage.setItem(this.STORAGE_KEY, lang);
    this.applyTheme();
    window.dispatchEvent(new CustomEvent("langChanged", { detail: lang }));
    if (reload) window.location.href = "dashboard.html";
  },

  isHebrew() {
    return this.get() === "hebrew";
  },

  isGreek() {
    return this.get() === "greek";
  },

  getConfig() {
    return LANG_CONFIGS[this.get()];
  },

  getProgressKey(uid) {
    const prefix = this.isHebrew() ? "blq_hb_progress" : "blq_gk_progress";
    return `${prefix}:${uid}`;
  },

  getMaxLesson() {
    return this.isHebrew() ? 24 : 25;
  },

  lessonKey(n) {
    return (this.isHebrew() ? "h" : "g") + n;
  },

  applyTheme() {
    const cfg = this.getConfig();
    document.documentElement.style.setProperty("--lang-primary", cfg.accentPrimary);
    document.documentElement.style.setProperty("--lang-secondary", cfg.accentSecondary);
    document.documentElement.style.setProperty("--lang-gradient", cfg.gradient);
    document.querySelectorAll("[data-lang-label]").forEach((el) => {
      el.textContent = cfg.label;
    });
    document.querySelectorAll("[data-lang-short]").forEach((el) => {
      el.textContent = cfg.shortLabel;
    });
    document.querySelectorAll("[data-lang-logo]").forEach((el) => {
      el.textContent = cfg.logo;
    });
    document.querySelectorAll("[data-lang-corpus]").forEach((el) => {
      el.textContent = cfg.corpus;
    });
    document.querySelectorAll("[data-lang-button]").forEach((el) => {
      el.classList.toggle("active", el.dataset.langButton === cfg.lang);
    });
  }
};

window.LangManager = LangManager;
window.LANG_CONFIGS = LANG_CONFIGS;
LangManager.applyTheme();

export { LangManager, LANG_CONFIGS };
