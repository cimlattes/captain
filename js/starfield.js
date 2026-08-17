/* ══════════════════════════════════════════════════════════════
   CAPTAIN FUTURE — L'Encyclopédie Hyperréaliste
   FICHIER : js/starfield.js
   RÔLE   : Moteur de fond étoilé animé — 3 couches de parallaxe
            sur canvas (taille, opacité, vitesse variables),
            twinkle, dérive de nébuleuses, réactivité à la souris,
            respect de prefers-reduced-motion, DPR-aware.
   DÉPENDANCE : <canvas id="starfield" aria-hidden="true"></canvas>
   ══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const canvas = document.getElementById('starfield');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  /* ── Configuration des 3 couches de parallaxe ────────────── */
  const LAYERS = [
    {
      name: 'arriere',
      count: 110,
      speed: 0.08,            // dérive au scroll (facteur)
      mouseFactor: 0.012,     // parallaxe souris
      sizeRange: [0.4, 1.0],
      opacityRange: [0.2, 0.55],
      color: '#9fb4cc',
      twinkleSpeed: [0.3, 1.1]
    },
    {
      name: 'intermediaire',
      count: 160,
      speed: 0.3,
      mouseFactor: 0.03,
      sizeRange: [0.6, 1.6],
      opacityRange: [0.35, 0.85],
      color: '#cfe0f5',
      twinkleSpeed: [0.5, 1.6]
    },
    {
      name: 'premier-plan',
      count: 70,
      speed: 0.75,
      mouseFactor: 0.06,
      sizeRange: [1.2, 2.8],
      opacityRange: [0.55, 1],
      color: '#ffffff',
      twinkleSpeed: [0.8, 2.2]
    }
  ];

  /* ── Nébuleuses (dégradés radiaux diffus) ────────────────── */
  const NEBULAE = [
    { x: 0.12, y: 0.25, r: 0.42, color: 'rgba(123, 47, 190, 0.16)' },
    { x: 0.85, y: 0.15, r: 0.36, color: 'rgba(0, 130, 220, 0.12)' },
    { x: 0.65, y: 0.8, r: 0.5, color: 'rgba(232, 98, 26, 0.08)' },
    { x: 0.3, y: 0.9, r: 0.34, color: 'rgba(255, 184, 48, 0.07)' }
  ];

  /* ── État interne ────────────────────────────────────────── */
  let width = 0;
  let height = 0;
  let scrollOffset = 0;
  let mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
  let time = 0;
  let lastFrame = 0;
  let stars = [];
  let nebulaCanvas = null;
  let rafId = null;

  /* ── Génération aléatoire ────────────────────────────────── */
  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function buildStars() {
    stars = LAYERS.map((layer) => {
      const layerStars = [];
      for (let i = 0; i < layer.count; i++) {
        layerStars.push({
          x: Math.random(),
          y: Math.random(),
          size: rand(layer.sizeRange[0], layer.sizeRange[1]),
          baseOpacity: rand(layer.opacityRange[0], layer.opacityRange[1]),
          twinkleSpeed: rand(layer.twinkleSpeed[0], layer.twinkleSpeed[1]),
          phase: rand(0, Math.PI * 2)
        });
      }
      return layerStars;
    });
  }

  /* ── Canvas des nébuleuses (pré-rendu) ───────────────────── */
  function renderNebulae() {
    nebulaCanvas = document.createElement('canvas');
    nebulaCanvas.width = width;
    nebulaCanvas.height = height;
    const nctx = nebulaCanvas.getContext('2d');

    NEBULAE.forEach((neb) => {
      const x = neb.x * width;
      const y = neb.y * height;
      const r = neb.r * Math.max(width, height);
      const grad = nctx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, neb.color);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      nctx.fillStyle = grad;
      nctx.fillRect(0, 0, width, height);
    });
  }

  /* ── Resize ──────────────────────────────────────────────── */
  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * DPR);
    canvas.height = Math.round(height * DPR);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    renderNebulae();
  }

  /* ── Boucle d'animation ──────────────────────────────────── */
  function draw(timestamp) {
    if (REDUCED_MOTION) return;

    rafId = requestAnimationFrame(draw);
    const dt = Math.min((timestamp - lastFrame) / 16.667, 3);
    lastFrame = timestamp;
    time += dt * 0.016;

    // Lissage du parallaxe souris
    mouse.x += (mouse.tx - mouse.x) * 0.04;
    mouse.y += (mouse.ty - mouse.y) * 0.04;

    ctx.clearRect(0, 0, width, height);

    // Nébuleuses (léger déplacement vertical au scroll)
    const nebShift = scrollOffset * 0.02;
    ctx.save();
    ctx.globalAlpha = 1;
    ctx.drawImage(nebulaCanvas, 0, nebShift % height);
    if (nebShift % height !== 0) {
      ctx.drawImage(nebulaCanvas, 0, (nebShift % height) - height);
    }
    ctx.restore();

    // Étoiles par couches
    LAYERS.forEach((layer, li) => {
      ctx.save();
      ctx.fillStyle = layer.color;

      const shift = (scrollOffset * layer.speed) % height;
      const mx = (mouse.x - 0.5) * layer.mouseFactor * width;
      const my = (mouse.y - 0.5) * layer.mouseFactor * height;

      for (let i = 0; i < stars[li].length; i++) {
        const s = stars[li][i];

        // Position avec parallaxe + wrap
        let y = (s.y * height + shift + my) % height;
        if (y < 0) y += height;
        let x = (s.x * width + mx) % width;
        if (x < 0) x += width;

        // Scintillement
        const twinkle = 0.65 + 0.35 * Math.sin(time * s.twinkleSpeed * 2 + s.phase);
        const opacity = s.baseOpacity * twinkle;

        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.arc(x, y, s.size, 0, Math.PI * 2);
        ctx.fill();

        // Halo subtil sur les plus grosses étoiles
        if (s.size > 1.9) {
          ctx.globalAlpha = opacity * 0.22;
          ctx.beginPath();
          ctx.arc(x, y, s.size * 3.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    });
  }

  /* ── Écouteurs d'événements ──────────────────────────────── */
  function onScroll() {
    scrollOffset = window.scrollY || window.pageYOffset || 0;
  }

  function onMouseMove(e) {
    mouse.tx = e.clientX / window.innerWidth;
    mouse.ty = e.clientY / window.innerHeight;
  }

  function onReducedMotionChange(e) {
    const wasReduced = REDUCED_MOTION;
    if (e.matches) {
      // Passage en mode réduit : on fige une frame statique
      if (rafId) cancelAnimationFrame(rafId);
      drawStaticFrame();
    } else if (wasReduced && !e.matches) {
      lastFrame = performance.now();
      rafId = requestAnimationFrame(draw);
    }
  }

  /* ── Frame statique (mode mouvement réduit) ──────────────── */
  function drawStaticFrame() {
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(nebulaCanvas, 0, 0);
    LAYERS.forEach((layer, li) => {
      ctx.save();
      ctx.fillStyle = layer.color;
      for (let i = 0; i < stars[li].length; i++) {
        const s = stars[li][i];
        ctx.globalAlpha = s.baseOpacity;
        ctx.beginPath();
        ctx.arc(s.x * width, s.y * height, s.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });
  }

  /* ── Initialisation ──────────────────────────────────────── */
  function init() {
    buildStars();
    resize();
    onScroll();

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.matchMedia('(prefers-reduced-motion: reduce)')
      .addEventListener('change', onReducedMotionChange);

    if (REDUCED_MOTION) {
      drawStaticFrame();
    } else {
      lastFrame = performance.now();
      rafId = requestAnimationFrame(draw);
    }

    // Exposer l'API pour d'éventuels contrôles externes
    window.CaptainFuture = window.CaptainFuture || {};
    window.CaptainFuture.starfield = {
      destroy() {
        if (rafId) cancelAnimationFrame(rafId);
        window.removeEventListener('resize', resize);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('mousemove', onMouseMove);
      },
      pause() { if (rafId) cancelAnimationFrame(rafId); rafId = null; },
      resume() {
        if (!rafId && !REDUCED_MOTION) {
          lastFrame = performance.now();
          rafId = requestAnimationFrame(draw);
        }
      }
    };
  }

  // Attendre que le DOM soit prêt
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
