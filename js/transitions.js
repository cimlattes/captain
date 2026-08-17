/* ══════════════════════════════════════════════════════════════
   CAPTAIN FUTURE — L'Encyclopédie Hyperréaliste
   FICHIER : js/transitions.js
   RÔLE   : Transition « warp speed » entre pages internes —
            overlay radial animé 600ms, puis navigation.
   ══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const WARP_MS = 600;

  function initTransitions() {
    const overlay = $('#warpOverlay');
    if (!overlay) return;

    let leaving = false;

    function navigate(href) {
      if (leaving) return;
      leaving = true;

      // Bloque les clics répétés
      overlay.classList.add('active');

      setTimeout(() => {
        window.location.href = href;
      }, REDUCED ? 50 : WARP_MS);
    }

    // Liens internes marqués data-warp
    $$('a[data-warp]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href) return;
        // Lien interne uniquement
        const isExternal = /^https?:\/\//i.test(href) || link.target === '_blank';
        if (isExternal) return;
        e.preventDefault();
        navigate(href);
      });
    });

    // Toutes les autres ancres internes (sécurité)
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link || leaving) return;
      const href = link.getAttribute('href');
      if (!href || link.hasAttribute('data-warp')) return;
      if (/^https?:\/\//i.test(href) || link.target === '_blank') return;
      if (href.startsWith('#')) return;
      if (href.endsWith('.html') || href.endsWith('/')) {
        e.preventDefault();
        navigate(href);
      }
    });

    // API
    window.CaptainFuture = window.CaptainFuture || {};
    window.CaptainFuture.transitions = { navigate };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTransitions);
  } else {
    initTransitions();
  }
})();
