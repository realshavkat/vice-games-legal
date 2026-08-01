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
      "footer.copy": "© {year} Vice Games — Informational documents.",
      "footer.contact": "Contact:",
      "home.eyebrow": "Discord bot",
      "home.lede":
        "Legal documents for using the bot and for the Discord developer portal.",
      "home.cta.terms": "Terms of Service",
      "home.cta.privacy": "Privacy Policy",
      "home.card.terms.title": "Terms of Service",
      "home.card.terms.desc": "Bot usage rules, responsibilities, and limitations.",
      "home.card.terms.arrow": "Read →",
      "home.card.privacy.title": "Privacy Policy",
      "home.card.privacy.desc": "Data we process, retention, and your rights.",
      "home.card.privacy.arrow": "Read →",
      "meta.home.title": "Vice Games — Legal",
      "meta.home.desc":
        "Terms of Service and Privacy Policy for the Vice Games Discord bot.",
      "meta.terms.title": "Terms of Service — Vice Games",
      "meta.terms.desc": "Terms of Service for the Vice Games Discord bot.",
      "meta.privacy.title": "Privacy Policy — Vice Games",
      "meta.privacy.desc": "Privacy Policy for the Vice Games Discord bot.",
      "lang.label": "Language",
    },
    fr: {
      "nav.terms": "Conditions d'utilisation",
      "nav.privacy": "Confidentialité",
      "footer.home": "Accueil",
      "footer.terms": "Conditions d'utilisation",
      "footer.privacy": "Confidentialité",
      "footer.copy": "© {year} Vice Games — Documents à titre informatif.",
      "footer.contact": "Contact :",
      "home.eyebrow": "Bot Discord",
      "home.lede":
        "Documents légaux pour utiliser le bot et pour le portail développeur Discord.",
      "home.cta.terms": "Conditions d'utilisation",
      "home.cta.privacy": "Politique de confidentialité",
      "home.card.terms.title": "Conditions d'utilisation",
      "home.card.terms.desc":
        "Règles d'usage du bot, responsabilités et limitations.",
      "home.card.terms.arrow": "Lire →",
      "home.card.privacy.title": "Confidentialité",
      "home.card.privacy.desc": "Données traitées, conservation et vos droits.",
      "home.card.privacy.arrow": "Lire →",
      "meta.home.title": "Vice Games — Mentions légales",
      "meta.home.desc":
        "Conditions d'utilisation et politique de confidentialité du bot Discord Vice Games.",
      "meta.terms.title": "Conditions d'utilisation — Vice Games",
      "meta.terms.desc": "Conditions d'utilisation du bot Discord Vice Games.",
      "meta.privacy.title": "Politique de confidentialité — Vice Games",
      "meta.privacy.desc": "Politique de confidentialité du bot Discord Vice Games.",
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
