/* ══════════════════════════════════════════════════════════════
   CAPTAIN FUTURE — L'Encyclopédie Hyperréaliste
   FICHIER : js/romans.js
   RÔLE   : Bibliothèque des 27 romans — rendu des cards, masonry,
            mode grille/timeline, favoris (localStorage), suivi de
            lecture, compteurs, recommandations.
   DÉPENDANCES : js/romans-data.js · js/search.js · js/filters.js
   ══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const NOVELS = window.CF_NOVELS || [];
  const LS_KEY_FAV = 'cf_favoris';
  const LS_KEY_READ = 'cf_lus';

  let gridEl = null;
  let timelineEl = null;
  let mode = 'grille';

  /* ────────────────────────────────────────────────
     STOCKAGE LOCAL
     ──────────────────────────────────────────────── */
  function loadLS(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; }
    catch (e) { return []; }
  }
  function saveLS(key, arr) {
    try { localStorage.setItem(key, JSON.stringify(arr)); } catch (e) {}
  }

  /* ────────────────────────────────────────────────
     FAVORIS & LECTURE
     ──────────────────────────────────────────────── */
  function toggleFav(id) {
    let favs = loadLS(LS_KEY_FAV);
    favs = favs.includes(id) ? favs.filter((x) => x !== id) : [...favs, id];
    saveLS(LS_KEY_FAV, favs);
    refreshFavButtons();
    updateStats();
  }
  function toggleRead(id) {
    let reads = loadLS(LS_KEY_READ);
    reads = reads.includes(id) ? reads.filter((x) => x !== id) : [...reads, id];
    saveLS(LS_KEY_READ, reads);
    updateStats();
  }
  function refreshFavButtons() {
    const favs = loadLS(LS_KEY_FAV);
    $$('[data-fav]').forEach((btn) => {
      const id = Number(btn.dataset.fav);
      btn.classList.toggle('is-fav', favs.includes(id));
      btn.setAttribute('aria-pressed', String(favs.includes(id)));
    });
  }

  /* ────────────────────────────────────────────────
     GÉNÉRATION DE LA CARD
     ──────────────────────────────────────────────── */
  function starsHTML(note) {
    let out = '<span class="rating" aria-label="' + note + ' / 5 étoiles">';
    for (let i = 1; i <= 5; i++) {
      const fill = note >= i ? 'full' : (note >= i - 0.5 ? 'half' : '');
      out += '<svg viewBox="0 0 24 24" aria-hidden="true" class="star ' + fill + '"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z"/></svg>';
    }
    out += '<span class="rating-num">' + note.toFixed(1) + '</span></span>';
    return out;
  }

  function themesHTML(themes) {
    return themes.map((t) => `<span class="tag tag-theme">${t}</span>`).join('');
  }
  function planetsHTML(planetes) {
    return planetes.map((p) => `<span class="tag tag-planet">🪐 ${p}</span>`).join('');
  }

  function cardHTML(n) {
    const favs = loadLS(LS_KEY_FAV);
    const reads = loadLS(LS_KEY_READ);
    const isFav = favs.includes(n.id);
    const isRead = reads.includes(n.id);
    const pseudo = n.pseudo ? ` <span class="t-xs muted">(as ${n.pseudo})</span>` : '';

    return `
    <article class="book-card" data-novel="${n.id}" data-mots="${n.mots}" data-note="${n.note}" data-annee="${n.annee}">
      <div class="book-cover-wrap">
        <span class="book-num display-title" aria-hidden="true">${String(n.id).padStart(2, '0')}</span>
        <img class="book-cover" src="${n.cover}" alt="Illustration de ${n.titre}" loading="lazy" width="400" height="600">
        <span class="book-type badge ${n.type === 'Roman complet' ? 'badge-gold' : 'badge-cyan'}">${n.type}</span>
        <span class="book-pd badge badge-green">✓ DP USA</span>
      </div>
      <div class="book-body">
        <p class="book-pub hud-label">${n.serie} · ${n.saison} ${n.annee}</p>
        <h3 class="book-title display-title">${n.titre.replace(/^Captain Future and the /, '').replace(/^Captain Future's /, '')}</h3>
        <p class="book-fulltitle t-xs muted" title="${n.titre}">${n.titre}</p>
        <p class="book-author t-sm muted">${n.auteur}${pseudo}</p>
        <p class="book-synopsis t-sm">${n.synopsis}</p>
        <div class="book-tags">${themesHTML(n.themes)}</div>
        <div class="book-tags">${planetsHTML(n.planetes)}</div>
        <p class="book-villain t-xs muted">🦹 Vilain : <span class="text-gold">${n.vilain}</span></p>
        <div class="book-meta">
          ${starsHTML(n.note)}
          <span class="book-mots data-readout" data-target="${n.mots}">0 mots</span>
        </div>
        <div class="book-potential">
          <span class="t-xs muted">Potentiel Roman Graphique</span>
          <div class="potential-track"><div class="potential-fill" style="width:0" data-width="${n.potential}"></div></div>
          <span class="potential-val hud-label" data-target="${n.potential}">0%</span>
        </div>
        <div class="book-actions">
          <a class="btn btn-sm btn-outline" href="${n.archive}" target="_blank" rel="noopener">Lire gratuitement ↗</a>
          <button class="btn btn-sm btn-ghost" data-fav="${n.id}" aria-pressed="${isFav}">${isFav ? '★ Dans ma liste' : '☆ Ajouter'}</button>
          <button class="btn btn-sm btn-ghost" data-read="${n.id}" aria-pressed="${isRead}">${isRead ? '✓ Lu' : 'Marquer lu'}</button>
        </div>
      </div>
    </article>`;
  }

  /* ────────────────────────────────────────────────
     TIMELINE
     ──────────────────────────────────────────────── */
  function timelineHTML(novels) {
    const items = novels.map((n) => {
      const reads = loadLS(LS_KEY_READ);
      const done = reads.includes(n.id);
      return `
      <li class="tl-item">
        <div class="tl-dot ${done ? 'done' : ''}" aria-hidden="true"></div>
        <div class="tl-content">
          <p class="tl-date hud-label">${n.saison} ${n.annee}</p>
          <h3 class="tl-title display-title t-sm">${n.titre}</h3>
          <p class="t-xs muted">${n.serie} · ${n.type} · ${n.vilain}</p>
          <div class="tl-actions">
            <button class="link-gold" data-read="${n.id}" aria-pressed="${done}">${done ? '✓ Marquée lue' : 'Marquer comme lue'}</button>
            <a href="${n.archive}" target="_blank" rel="noopener" class="link-gold">Lire ↗</a>
          </div>
        </div>
      </li>`;
    }).join('');
    return `<ol class="timeline">${items}</ol>`;
  }

  /* ────────────────────────────────────────────────
     RENDU PRINCIPAL
     ──────────────────────────────────────────────── */
  function render() {
    const filtered = window.CF_FILTERS.apply(NOVELS);

    if (gridEl) gridEl.innerHTML = filtered.map(cardHTML).join('');

    if (timelineEl) timelineEl.innerHTML = timelineHTML(filtered);

    updateCount(filtered.length);
    refreshFavButtons();
    animateMeta();
    bindCardActions();
    updateStats();
  }

  function updateCount(n) {
    const el = $('#bookCount');
    if (el) el.textContent = `${n} / ${NOVELS.length} aventures affichées`;
  }

  /* ────────────────────────────────────────────────
     ANIMATIONS (compteurs, jauges) une fois visibles
     ──────────────────────────────────────────────── */
  function animateMeta() {
    const counters = $$('.book-mots[data-target]');
    const potentials = $$('.potential-fill[data-width]');
    const vals = $$('.potential-val[data-target]');

    if (!('IntersectionObserver' in window)) {
      counters.forEach((c) => { c.textContent = new Intl.NumberFormat('fr-FR').format(Number(c.dataset.target)) + ' mots'; });
      potentials.forEach((p) => { p.style.width = p.dataset.width + '%'; });
      vals.forEach((v) => { v.textContent = v.dataset.target + '%'; });
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;

        if (el.classList.contains('book-mots')) {
          const target = Number(el.dataset.target);
          const start = performance.now();
          const dur = 1200;
          function tick(now) {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = new Intl.NumberFormat('fr-FR').format(Math.round(target * eased)) + ' mots';
            if (p < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        }

        if (el.classList.contains('potential-fill')) {
          el.style.width = el.dataset.width + '%';
        }

        if (el.classList.contains('potential-val')) {
          const target = Number(el.dataset.target);
          const start = performance.now();
          const dur = 1200;
          function tick(now) {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(target * eased) + '%';
            if (p < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        }

        io.unobserve(el);
      });
    }, { threshold: 0.2 });

    counters.forEach((c) => io.observe(c));
    potentials.forEach((p) => io.observe(p));
    vals.forEach((v) => io.observe(v));
  }

  /* ────────────────────────────────────────────────
     ACTIONS DES CARDS (délégation)
     ──────────────────────────────────────────────── */
  function bindCardActions() {
    $$('[data-fav]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleFav(Number(btn.dataset.fav));
      });
    });
    $$('[data-read]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleRead(Number(btn.dataset.read));
      });
    });
  }

  /* ────────────────────────────────────────────────
     STATS GLOBALES (compteurs header)
     ──────────────────────────────────────────────── */
  function updateStats() {
    const favs = loadLS(LS_KEY_FAV);
    const reads = loadLS(LS_KEY_READ);

    const elFav = $('#statFav');
    if (elFav) elFav.textContent = favs.length;

    const elRead = $('#statRead');
    if (elRead) elRead.textContent = reads.length;

    const pct = Math.round((reads.length / NOVELS.length) * 100);
    const elPct = $('#statPct');
    if (elPct) elPct.textContent = pct + '%';

    const bar = $('#progressBar');
    if (bar) bar.style.width = pct + '%';

    const next = NOVELS.find((n) => !reads.includes(n.id));
    const elNext = $('#statNext');
    if (elNext) elNext.textContent = next ? `${next.id}. ${next.titre}` : 'Série terminée ! 🏆';
  }

  /* ────────────────────────────────────────────────
     MODE GRILLE / TIMELINE
     ──────────────────────────────────────────────── */
  function setMode(m) {
    mode = m;
    const gridWrap = $('#gridWrap');
    const tlWrap = $('#timelineWrap');
    if (gridWrap) gridWrap.classList.toggle('hidden', mode !== 'grille');
    if (tlWrap) tlWrap.classList.toggle('hidden', mode !== 'timeline');

    $$('[data-mode-btn]').forEach((btn) => {
      const active = btn.dataset.modeBtn === mode;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    if (mode === 'timeline' && timelineEl) timelineEl.innerHTML = timelineHTML(window.CF_FILTERS.apply(NOVELS));
    bindCardActions();
  }

  /* ────────────────────────────────────────────────
     RECOMMANDATIONS (« Pour commencer »)
     ──────────────────────────────────────────────── */
  function renderRecommended() {
    const wrap = $('#recWrap');
    if (!wrap) return;
    const ids = [1, 2, 11, 10]; // Space Emperor · Calling CF · Comet Kings · Outlaws of the Moon
    const recs = ids.map((id) => NOVELS.find((n) => n.id === id)).filter(Boolean);
    wrap.innerHTML = recs.map((n) => `
      <article class="rec-card">
        <img src="${n.cover}" alt="${n.titre}" loading="lazy">
        <div class="rec-body">
          <span class="badge badge-gold">Saison ${n.saison} ${n.annee}</span>
          <h3 class="rec-title display-title t-sm">${n.titre}</h3>
          <p class="t-xs muted">${n.synopsis.slice(0, 110)}…</p>
          <button class="link-gold" data-fav="${n.id}">☆ Ajouter à ma liste</button>
        </div>
      </article>`).join('');
    bindCardActions();
  }

  /* ────────────────────────────────────────────────
     INIT
     ──────────────────────────────────────────────── */
  function init() {
    gridEl = $('#bookGrid');
    timelineEl = $('#timelineWrap');

    if (!gridEl && !timelineEl) return;

    // Remplit les selects de filtres
    const opts = window.CF_FILTERS.collectOptions(NOVELS);
    const selPlanete = $('#filterPlanete');
    const selVilain = $('#filterVilain');
    const selTheme = $('#filterTheme');

    if (selPlanete) opts.planetes.forEach((p) => selPlanete.insertAdjacentHTML('beforeend', `<option value="${p}">${p}</option>`));
    if (selVilain) opts.vilains.forEach((v) => selVilain.insertAdjacentHTML('beforeend', `<option value="${v}">${v}</option>`));
    if (selTheme) opts.themes.forEach((t) => selTheme.insertAdjacentHTML('beforeend', `<option value="${t}">${t}</option>`));

    // Lie les filtres
    const panel = $('#filterPanel');
    if (panel) window.CF_FILTERS.bind(panel, render);

    // Boutons de mode
    $$('[data-mode-btn]').forEach((btn) => {
      btn.addEventListener('click', () => setMode(btn.dataset.modeBtn));
    });

    // Boutons de tri rapide dans la timeline ?
    renderRecommended();
    render();
    setMode('grille');

    // Exposer
    window.CaptainFuture = window.CaptainFuture || {};
    window.CaptainFuture.library = { render, setMode, refreshFavButtons };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
