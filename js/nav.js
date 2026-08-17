/* ══════════════════════════════════════════════════════════════
   CAPTAIN FUTURE — L'Encyclopédie Hyperréaliste
   FICHIER : js/nav.js
   RÔLE   : Navigation holographique — état actif, tiroir mobile,
            tooltips, fermeture au clic extérieur.
   ══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  function initNav() {
    const nav = $('[data-nav]');
    if (!nav) return;

    const burger = $('#navBurger');
    const drawer = $('#navDrawer');
    const backdrop = $('#navBackdrop');
    const drawerClose = $('#drawerClose');
    const drawerLinks = $('.drawer-links', drawer);

    /* ── Page active détectée via <body data-page> ── */
    const currentPage = document.body.dataset.page || '';
    $$('.nav-link').forEach((link) => {
      const href = link.getAttribute('href');
      const isHome = currentPage === 'accueil' && href === 'index.html';
      const isPage = href.includes(`pages/${currentPage}.html`);
      if (isHome || isPage) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'page');
      }
    });

    /* ── Clonage des liens dans le tiroir mobile ── */
    if (drawerLinks) {
      $$('.nav-link').forEach((link) => {
        const clone = link.cloneNode(true);
        clone.classList.remove('is-active');
        if (link.classList.contains('is-active')) clone.classList.add('is-active');
        drawerLinks.appendChild(clone);
      });
    }

    /* ── Ouvre / ferme le tiroir ── */
    function openDrawer() {
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      backdrop.classList.add('visible');
      burger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    function closeDrawer() {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      backdrop.classList.remove('visible');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    burger.addEventListener('click', () => {
      drawer.classList.contains('open') ? closeDrawer() : openDrawer();
    });
    drawerClose.addEventListener('click', closeDrawer);
    backdrop.addEventListener('click', closeDrawer);
    drawerLinks.addEventListener('click', (e) => {
      if (e.target.closest('a')) closeDrawer();
    });

    // Échap ferme le tiroir
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
    });

    /* ── Tooltips simples (desktop) ── */
    $$('[data-tooltip]', nav).forEach((el) => {
      el.setAttribute('aria-label', el.dataset.tooltip);
    });

    /* ── API publique ── */
    window.CaptainFuture = window.CaptainFuture || {};
    window.CaptainFuture.nav = { open: openDrawer, close: closeDrawer };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }
})();
