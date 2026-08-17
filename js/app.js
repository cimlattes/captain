/* ══════════════════════════════════════════════════════════════
   CAPTAIN FUTURE — L'Encyclopédie Hyperréaliste
   FICHIER : js/app.js
   RÔLE   : Initialisation générale — preloader, révélation au
            scroll, compteurs animés, carrousel, retour en haut,
            easter egg Konami, année automatique.
   ══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ────────────────────────────────────────────────
     PRELOADER
     ──────────────────────────────────────────────── */
  function initPreloader() {
    const preloader = $('#preloader');
    if (!preloader) return;

    const hide = () => preloader.classList.add('hidden');
    // Sûreté : on ne dépasse jamais 2.8s
    const fallback = setTimeout(hide, 2800);

    if (document.readyState === 'complete') {
      clearTimeout(fallback);
      setTimeout(hide, 400);
    } else {
      window.addEventListener('load', () => {
        clearTimeout(fallback);
        setTimeout(hide, 400);
      }, { once: true });
    }
  }

  /* ────────────────────────────────────────────────
     RÉVÉLATION AU SCROLL (IntersectionObserver)
     ──────────────────────────────────────────────── */
  function initReveal() {
    const els = $$('[data-reveal]');
    if (!els.length) return;

    // Application du délai individuel
    els.forEach((el) => {
      const delay = el.getAttribute('data-delay');
      if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`);
    });

    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in-view'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach((el) => io.observe(el));
  }

  /* ────────────────────────────────────────────────
     COMPTEURS ANIMÉS
     ──────────────────────────────────────────────── */
  function animateCounter(el, target, duration = 1800) {
    const format = el.dataset.format;
    const start = performance.now();

    const formatValue = (v) => {
      if (format === 'fr') return new Intl.NumberFormat('fr-FR').format(Math.round(v));
      return String(Math.round(v));
    };

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      el.textContent = formatValue(target * eased);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initCounters() {
    const counters = $$('[data-counter]');
    if (!counters.length) return;

    const run = (el) => {
      const target = parseFloat(el.dataset.counter) || 0;
      animateCounter(el, target);
    };

    if (!('IntersectionObserver' in window)) {
      counters.forEach(run);
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          run(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach((el) => io.observe(el));
  }

  /* ────────────────────────────────────────────────
     CARROUSEL DES ROMANS
     ──────────────────────────────────────────────── */
  function initCarousel() {
    const carousel = $('[data-carousel]');
    if (!carousel) return;

    const track = $('#carTrack');
    const slides = $$('.car-slide', carousel);
    const prev = $('#carPrev');
    const next = $('#carNext');
    const dotsWrap = $('#carDots');
    const count = slides.length;

    let index = 0;
    let autoTimer = null;
    const AUTO_MS = 6500;

    // Construction des points de navigation
    if (dotsWrap) {
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'car-dot';
        dot.setAttribute('aria-label', `Aller au roman ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
      });
    }
    const dots = $$('.car-dot', dotsWrap);

    function goTo(i) {
      index = (i + count) % count;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, di) => {
        d.classList.toggle('is-active', di === index);
        d.setAttribute('aria-current', di === index ? 'true' : 'false');
      });
      slides.forEach((s, si) => {
        s.setAttribute('aria-hidden', si === index ? 'false' : 'true');
      });
    }

    const nextSlide = () => goTo(index + 1);
    const prevSlide = () => goTo(index - 1);

    prev.addEventListener('click', () => { prevSlide(); restartAuto(); });
    next.addEventListener('click', () => { nextSlide(); restartAuto(); });

    // Touches clavier
    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { nextSlide(); restartAuto(); }
      if (e.key === 'ArrowLeft') { prevSlide(); restartAuto(); }
    });

    // Auto-défilement (pause au survol)
    function startAuto() {
      autoTimer = setInterval(nextSlide, AUTO_MS);
    }
    function stopAuto() {
      if (autoTimer) clearInterval(autoTimer);
      autoTimer = null;
    }
    function restartAuto() { stopAuto(); startAuto(); }

    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);
    carousel.addEventListener('focusin', stopAuto);
    carousel.addEventListener('focusout', startAuto);

    // Défilement tactile
    let touchX = null;
    carousel.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; stopAuto(); }, { passive: true });
    carousel.addEventListener('touchend', (e) => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 40) (dx < 0 ? nextSlide() : prevSlide());
      touchX = null;
      startAuto();
    }, { passive: true });

    goTo(0);
    startAuto();
  }

  /* ────────────────────────────────────────────────
     DÉFILEMENT DOUX DES LIENS [data-scroll]
     ──────────────────────────────────────────────── */
  function initSmoothScroll() {
    $$('[data-scroll]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const target = link.getAttribute('href');
        if (!target || !target.startsWith('#')) return;
        const el = $(target);
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  /* ────────────────────────────────────────────────
     RETOUR EN HAUT
     ──────────────────────────────────────────────── */
  function initBackToTop() {
    const btn = $('#backToTop');
    if (!btn) return;

    const onScroll = () => {
      const visible = (window.scrollY || 0) > 700;
      btn.classList.toggle('visible', visible);
      btn.setAttribute('aria-hidden', visible ? 'false' : 'true');
    };

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ────────────────────────────────────────────────
     EASTER EGG KONAMI → mode VINTAGE PULP (amorcé)
     Complété à l'étape 8 (filtres, texture papier, son).
     ──────────────────────────────────────────────── */
  function initKonami() {
    const SEQUENCE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let progress = 0;

    window.addEventListener('keydown', (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === SEQUENCE[progress]) {
        progress += 1;
        if (progress === SEQUENCE.length) {
          progress = 0;
          document.body.classList.toggle('vintage-pulp');
          const active = document.body.classList.contains('vintage-pulp');
          window.CaptainFuture = window.CaptainFuture || {};
          window.CaptainFuture.vintageMode = active;
        }
      } else {
        progress = (key === SEQUENCE[0]) ? 1 : 0;
      }
    });
  }

  /* ────────────────────────────────────────────────
     ANNÉE AUTOMATIQUE (data-year)
     ──────────────────────────────────────────────── */
  function initYear() {
    $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
  }

  /* ────────────────────────────────────────────────
     INIT
     ──────────────────────────────────────────────── */
  function init() {
    initPreloader();
    initReveal();
    initCounters();
    initCarousel();
    initSmoothScroll();
    initBackToTop();
    initKonami();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
