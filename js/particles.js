/* ══════════════════════════════════════════════════════════════
   CAPTAIN FUTURE — L'Encyclopédie Hyperréaliste
   FICHIER : js/particles.js
   RÔLE   : Poussière d'étoile dorée flottant dans le hero —
            particules cosmiques légères (Canvas API).
   DÉPENDANCE : <canvas id="particles" class="hero-particles">
   ══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const canvas = document.getElementById('particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  const PARTICLES = {
    count: 60,
    colors: ['rgba(255, 184, 48, ALPHA)', 'rgba(255, 226, 154, ALPHA)', 'rgba(255, 255, 255, ALPHA)'],
    sizeRange: [0.8, 2.6],
    speedRange: [0.08, 0.4],
    driftRange: [0.05, 0.2]
  };

  let width = 0;
  let height = 0;
  let particles = [];
  let rafId = null;

  function rand(min, max) { return min + Math.random() * (max - min); }

  function build() {
    particles = Array.from({ length: PARTICLES.count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: rand(PARTICLES.sizeRange[0], PARTICLES.sizeRange[1]),
      speedY: rand(PARTICLES.speedRange[0], PARTICLES.speedRange[1]),
      drift: rand(PARTICLES.driftRange[0], PARTICLES.driftRange[1]),
      phase: rand(0, Math.PI * 2),
      color: PARTICLES.colors[Math.floor(Math.random() * PARTICLES.colors.length)],
      alpha: rand(0.25, 0.9)
    }));
  }

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * DPR);
    canvas.height = Math.round(height * DPR);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    if (!particles.length) build();
  }

  let time = 0;
  let last = 0;

  function draw(ts) {
    if (REDUCED_MOTION) return;
    rafId = requestAnimationFrame(draw);

    const dt = Math.min((ts - last) / 16.667, 3);
    last = ts;
    time += dt * 0.016;

    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      // Montée lente + dérive sinusoïdale
      p.y -= p.speedY * dt;
      p.x += Math.sin(time * p.drift * 2 + p.phase) * 0.25 * dt;

      // Rebouclage
      if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      const twinkle = 0.6 + 0.4 * Math.sin(time * 1.4 + p.phase * 3);
      const alpha = p.alpha * twinkle;
      const color = p.color.replace('ALPHA', alpha.toFixed(3));

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      // Halo doux pour les plus grosses
      if (p.size > 1.8) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = color.replace(')', ', 0.08)').replace('rgba', 'rgba');
        ctx.fill();
      }
    }
  }

  function init() {
    resize();
    window.addEventListener('resize', resize, { passive: true });

    if (REDUCED_MOTION) return;
    last = performance.now();
    rafId = requestAnimationFrame(draw);

    window.CaptainFuture = window.CaptainFuture || {};
    window.CaptainFuture.particles = {
      destroy() {
        if (rafId) cancelAnimationFrame(rafId);
        window.removeEventListener('resize', resize);
      }
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
