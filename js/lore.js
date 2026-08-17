/* ══════════════════════════════════════════════════════════════
   CAPTAIN FUTURE — L'Encyclopédie Hyperréaliste
   FICHIER : js/lore.js
   RÔLE   : Page Lore — onglets de sections, timeline
            chronologique animée, révélation au scroll.
   ══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ── Onglets de sections ──────────────────────── */
  function initTabs() {
    const tabs = $$('[data-lore-tab]');
    if (!tabs.length) return;

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.loreTab;

        tabs.forEach((t) => {
          const active = t === tab;
          t.classList.toggle('is-active', active);
          t.setAttribute('aria-selected', String(active));
          t.setAttribute('tabindex', active ? '0' : '-1');
        });

        $$('[data-lore-panel]').forEach((panel) => {
          const active = panel.dataset.lorePanel === target;
          panel.classList.toggle('is-active', active);
          panel.hidden = !active;
        });
      });
    });
  }

  /* ── Timeline animée ──────────────────────────── */
  function initTimeline() {
    const items = $$('.lore-tl-item');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach((i) => i.classList.add('in-view'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    items.forEach((item, i) => {
      item.style.transitionDelay = `${Math.min(i % 4, 3) * 90}ms`;
      io.observe(item);
    });
  }

  /* ── Navigation par ancres ────────────────────── */
  function initAnchorTabs() {
    const hash = location.hash.replace('#', '');
    if (hash) {
      const tab = $(`[data-lore-tab="${hash}"]`);
      if (tab) tab.click();
    }
  }

  function init() {
    initTabs();
    initTimeline();
    initAnchorTabs();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
