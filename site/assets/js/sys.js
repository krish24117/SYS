/* ==========================================================================
   SYS — Shared site behaviour

   Deliberately small and dependency-free. Every enhancement here is
   optional: if this file fails to load, every page still renders and every
   link still works.
   ========================================================================== */

(function () {
  'use strict';

  var cfg = window.SYS_CONFIG || {};
  var root = document.documentElement;

  /* Mark that JS is available, so CSS can opt into entrance animation.
     Without this class, .reveal elements are visible by default. */
  root.classList.add('js');

  /* ---- 1. Placeholder substitution ------------------------------------ */

  function fillPlaceholders() {
    document.querySelectorAll('[data-sys]').forEach(function (el) {
      var key = el.getAttribute('data-sys');
      if (key === 'designer' && cfg.designerName) el.textContent = cfg.designerName;
      if (key === 'city' && cfg.city) el.textContent = cfg.city;
      if (key === 'email' && cfg.email) {
        el.textContent = cfg.email;
        if (el.tagName === 'A') el.href = 'mailto:' + cfg.email;
      }
    });

    /* Any link marked data-wa becomes a WhatsApp deep link. A data-wa-message
       attribute overrides the default greeting. */
    document.querySelectorAll('[data-wa]').forEach(function (el) {
      if (typeof cfg.waLink !== 'function') return;
      el.href = cfg.waLink(el.getAttribute('data-wa-message') || null);
      el.target = '_blank';
      el.rel = 'noopener';
    });
  }

  /* ---- 2. Header ------------------------------------------------------- */

  function initHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;

    /* Compaction uses a wide threshold with hysteresis so the header never
       flaps at the boundary — the height change shifts layout, and flapping
       would make the whole page tremble on slow scrolls. */
    var compact = false;
    var onScroll = function () {
      var y = window.scrollY;
      if (!compact && y > 96) compact = true;
      else if (compact && y < 40) compact = false;
      header.setAttribute('data-scrolled', String(compact));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    var toggle = document.querySelector('.nav-toggle');
    var panel = document.getElementById('nav-panel');
    if (!toggle || !panel) return;

    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      panel.hidden = open;
    });

    /* Escape closes the panel and returns focus to the toggle. */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        toggle.setAttribute('aria-expanded', 'false');
        panel.hidden = true;
        toggle.focus();
      }
    });
  }

  /* ---- 3. Entrance reveal ---------------------------------------------- */

  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.setAttribute('data-shown', 'true'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute('data-shown', 'true');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ---- 4. Occasion chips on the homepage ------------------------------- */

  /* Selecting an occasion carries it into the guided flow rather than
     filtering a catalogue. "I don't know yet" is a valid answer and routes
     straight to the designer. */
  function initOccasionLinks() {
    document.querySelectorAll('[data-occasion]').forEach(function (el) {
      if (el.tagName !== 'A') return;
      var occasion = el.getAttribute('data-occasion');
      var base = el.getAttribute('href') || '';
      if (base.indexOf('?') === -1) {
        el.href = base + '?occasion=' + encodeURIComponent(occasion);
      }
    });
  }

  /* ---- 5. Current year -------------------------------------------------- */

  function initYear() {
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  function init() {
    fillPlaceholders();
    initHeader();
    initReveal();
    initOccasionLinks();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
