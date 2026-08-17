/* ══════════════════════════════════════════════════════════════
   CAPTAIN FUTURE — L'Encyclopédie Hyperréaliste
   FICHIER : js/parallax.js
   RÔLE   : Parallaxe au scroll (data-parallax + data-speed) et
            profondeur 3D au mouvement de souris (data-tilt).
   ══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Parallaxe au scroll ────────────────────────────────── */
  function initScrollParallax() {
    const layers = $$('[data-parallax]');
    if (!layers.length || REDUCED) return;

    let ticking = false;

    function update() {
      const scrollY = window.scrollY || 0;
      layers.forEach((el) => {
        const speed = parseFloat(el.dataset.speed) || 0.3;
        el.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
      });
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update();
  }

  /* ── Tilt 3D au mouvement de souris ──────────────────────── */
  function initMouseTilt() {
    const targets = $$('[data-tilt]');
    if (!targets.length || REDUCED || !window.matchMedia('(hover: hover)').matches) return;

    targets.forEach((el) => {
      const max = parseFloat(el.dataset.tilt) || 8;

      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)';
      });
    });
  }

  function init() {
    initScrollParallax();
    initMouseTilt();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
