(function () {
  var STORAGE_KEY = "vg-legal-lang";
  var DEFAULT_LANG = "en";
  var SUPPORTED = { en: true, fr: true };

  var UI = {
    en: {
      "nav.terms": "Terms of Service",
      "nav.privacy": "Privacy Policy",
      "footer.home": "Home",
      "footer.terms": "Terms of Service",
      "footer.privacy": "Privacy Policy",
      "footer.copy": "© {year} Vice — Discord bots by the Vice team.",
      "footer.contact": "Contact:",
      "home.lede":
        "Play music in your Discord voice channels. Queues, skip votes, loops, and 24/7 radio — free for your server.",
      "home.cta.invite": "Add to Discord",
      "home.cta.user": "Add to my apps",
      "home.cta.support": "Support server",
      "home.cta.terms": "Terms of Service",
      "home.cta.privacy": "Privacy Policy",
      "home.legal.note":
        "Terms & privacy cover all Vice Discord bots (Music, Games, and future apps).",
      "meta.home.title": "Vice Music — Add to Discord",
      "meta.home.desc":
        "Add Vice Music to your Discord server. Free multi-source music bot with queues, 24/7 radio, and more.",
      "meta.terms.title": "Terms of Service — Vice Bots",
      "meta.terms.desc":
        "Terms of Service for all Vice Discord bots (Vice Music, Vice Games, and future apps).",
      "meta.privacy.title": "Privacy Policy — Vice Bots",
      "meta.privacy.desc":
        "Privacy Policy for all Vice Discord bots (Vice Music, Vice Games, and future apps).",
      "lang.label": "Language",
    },
    fr: {
      "nav.terms": "Conditions d'utilisation",
      "nav.privacy": "Confidentialité",
      "footer.home": "Accueil",
      "footer.terms": "Conditions d'utilisation",
      "footer.privacy": "Confidentialité",
      "footer.copy": "© {year} Vice — Bots Discord par l'équipe Vice.",
      "footer.contact": "Contact :",
      "home.lede":
        "Écoutez de la musique dans vos salons vocaux Discord. Files, votes skip, boucles et radio 24/7 — gratuit pour votre serveur.",
      "home.cta.invite": "Ajouter à Discord",
      "home.cta.user": "Ajouter à mes apps",
      "home.cta.support": "Serveur support",
      "home.cta.terms": "Conditions d'utilisation",
      "home.cta.privacy": "Politique de confidentialité",
      "home.legal.note":
        "Les CGU et la confidentialité couvrent tous les bots Vice (Music, Games, et apps futures).",
      "meta.home.title": "Vice Music — Ajouter à Discord",
      "meta.home.desc":
        "Ajoutez Vice Music à votre serveur Discord. Bot musique multi-sources, files, radio 24/7, et plus.",
      "meta.terms.title": "Conditions d'utilisation — Bots Vice",
      "meta.terms.desc":
        "Conditions d'utilisation de tous les bots Discord Vice (Vice Music, Vice Games, et apps futures).",
      "meta.privacy.title": "Politique de confidentialité — Bots Vice",
      "meta.privacy.desc":
        "Politique de confidentialité de tous les bots Discord Vice (Vice Music, Vice Games, et apps futures).",
      "lang.label": "Langue",
    },
  };

  function detectLang() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED[stored]) return stored;
    } catch (_) {}
    return DEFAULT_LANG;
  }

  function t(lang, key, vars) {
    var dict = UI[lang] || UI.en;
    var value = dict[key] || UI.en[key] || key;
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        value = value.replace(new RegExp("\\{" + k + "\\}", "g"), vars[k]);
      });
    }
    return value;
  }

  function applyLang(lang) {
    if (!SUPPORTED[lang]) lang = DEFAULT_LANG;
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-lang]").forEach(function (el) {
      el.hidden = el.getAttribute("data-lang") !== lang;
    });

    var year = String(new Date().getFullYear());
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!key) return;
      el.textContent = t(lang, key, { year: year });
    });

    var page = document.body.getAttribute("data-page") || "home";
    var titleKey = "meta." + page + ".title";
    var descKey = "meta." + page + ".desc";
    document.title = t(lang, titleKey);
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t(lang, descKey));

    document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
      var active = btn.getAttribute("data-set-lang") === lang;
      btn.setAttribute("aria-pressed", active ? "true" : "false");
      btn.classList.toggle("is-active", active);
    });

    var group = document.querySelector(".lang-switch");
    if (group) group.setAttribute("aria-label", t(lang, "lang.label"));

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (_) {}
  }

  function init() {
    var yearEl = document.getElementById("y");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyLang(btn.getAttribute("data-set-lang"));
      });
    });

    applyLang(detectLang());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
