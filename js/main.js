/**
 * Script global — tema claro/escuro e menu responsivo.
 * Carregado em todas as páginas do portfólio.
 */
(function () {
  "use strict";

  var STORAGE_KEY = "portfolio-theme";
  var mqMobile = window.matchMedia("(max-width: 768px)");

  /**
   * Aplica o tema no elemento raiz e persiste a escolha.
   * @param {"light" | "dark"} mode
   */
  function applyTheme(mode) {
    var root = document.documentElement;
    if (mode === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch (e) {
      /* localStorage indisponível (modo privado, etc.) — ignorar */
    }
  }

  /**
   * Lê preferência salva ou usa prefers-color-scheme na primeira visita.
   */
  function initTheme() {
    var saved = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      saved = null;
    }

    if (saved === "light" || saved === "dark") {
      applyTheme(saved);
      return;
    }

    var prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "dark" : "light");
  }

  function toggleTheme() {
    var isDark = document.documentElement.getAttribute("data-theme") === "dark";
    applyTheme(isDark ? "light" : "dark");
  }

  /**
   * Fecha o menu mobile (classe no body + ARIA).
   */
  function closeNav() {
    document.body.classList.remove("nav-open");
    var toggle = document.getElementById("navToggle");
    var overlay = document.getElementById("navOverlay");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
    }
    if (overlay) {
      overlay.setAttribute("aria-hidden", "true");
    }
  }

  /**
   * Abre o menu mobile.
   */
  function openNav() {
    document.body.classList.add("nav-open");
    var toggle = document.getElementById("navToggle");
    var overlay = document.getElementById("navOverlay");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "true");
    }
    if (overlay) {
      overlay.setAttribute("aria-hidden", "false");
    }
  }

  function toggleNav() {
    if (document.body.classList.contains("nav-open")) {
      closeNav();
    } else {
      openNav();
    }
  }

  function initNav() {
    var navToggle = document.getElementById("navToggle");
    var overlay = document.getElementById("navOverlay");
    var nav = document.getElementById("siteNav");

    if (navToggle) {
      navToggle.addEventListener("click", function () {
        toggleNav();
      });
    }

    if (overlay) {
      overlay.addEventListener("click", function () {
        closeNav();
      });
    }

    /* Fecha ao escolher um link (comportamento útil em mobile) */
    if (nav) {
      nav.addEventListener("click", function (e) {
        var t = e.target;
        if (t && t.tagName === "A" && mqMobile.matches) {
          closeNav();
        }
      });
    }

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("nav-open")) {
        closeNav();
      }
    });

    /* Ao redimensionar para desktop, garantir menu fechado */
    window.addEventListener("resize", function () {
      if (!mqMobile.matches) {
        closeNav();
      }
    });
  }

  function initThemeButton() {
    var btn = document.getElementById("themeToggle");
    if (btn) {
      btn.addEventListener("click", toggleTheme);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    initThemeButton();
    initNav();
  });
})();
