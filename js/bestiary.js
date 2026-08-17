/* ══════════════════════════════════════════════════════════════
   CAPTAIN FUTURE — L'Encyclopédie Hyperréaliste
   FICHIER : js/bestiary.js
   RÔLE   : Page Bestiaire — rendu des fiches naturalistes,
            jauges de danger, échelle de taille, navigation.
   DÉPENDANCE : js/bestiary-data.js
   ══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const CREATURES = window.CF_BESTIARY || [];

  /* ── Jauge de danger ─────────────────────────── */
  function dangerMeter(level) {
    let out = '<span class="danger-meter" role="img" aria-label="Danger niveau ' + level + ' sur 5">';
    for (let i = 1; i <= 5; i++) {
      out += `<span class="danger-pip ${i <= level ? 'on' : ''}" style="--pip-delay:${i * 80}ms" aria-hidden="true"></span>`;
    }
    out += '<span class="danger-label hud-label">Danger ' + level + '/5</span></span>';
    return out;
  }

  /* ── Carte de créature ───────────────────────── */
  function creatureHTML(c) {
    const image = c.image
      ? `<figure class="beast-figure"><img src="${c.image}" alt="${c.nom}" loading="lazy"></figure>`
      : `<figure class="beast-figure beast-figure-placeholder">
          <span class="beast-placeholder-icon" aria-hidden="true">🪐</span>
          <p class="t-sm muted">Illustration à venir — archive cryptée</p>
        </figure>`;

    const scale = c.image ? null : '';

    return `
    <article class="beast-card" id="creature-${c.id}" data-beast="${c.id}">
      ${image}
      <div class="beast-body">
        <div class="beast-head">
          <div>
            <p class="hud-label beast-planet">🪐 ${c.planete} · ${c.classification}</p>
            <h2 class="display-title beast-name">${c.nom}</h2>
          </div>
          ${dangerMeter(c.danger)}
        </div>

        <dl class="beast-specs">
          <div class="beast-spec"><dt>Taille</dt><dd>${c.taille} <span class="beast-scale">(${c.scale})</span></dd></div>
          <div class="beast-spec"><dt>Anatomie</dt><dd>${c.anatomie}</dd></div>
          <div class="beast-spec"><dt>Comportement</dt><dd>${c.comportement}</dd></div>
          <div class="beast-spec"><dt>Alimentation</dt><dd>${c.alimentation}</dd></div>
          <div class="beast-spec"><dt>Reproduction</dt><dd>${c.reproduction}</dd></div>
        </dl>

        <p class="beast-desc body-copy">${c.description}</p>
        <div class="beast-encounter">
          <p class="hud-label">Rencontres</p>
          <p class="t-sm">${c.rencontre_detail}</p>
          <div class="beast-tags">${c.rencontres.map((r) => `<span class="tag tag-theme">📖 ${r}</span>`).join('')}</div>
        </div>
      </div>
    </article>`;
  }

  /* ── Barre d'échelle comparée ─────────────────── */
  function scaleBar() {
    const wrap = $('#scaleLegend');
    if (!wrap) return;
    const refs = [
      { name: 'Humain', size: 34, color: 'var(--color-text-secondary)' },
      { name: 'Grag (robot)', size: 60, color: 'var(--color-futuremen-robot)' },
      { name: 'Cristaloïde (15 m)', size: 110, color: 'var(--color-accent-cyan)' },
      { name: 'Reptilo-Géant (8 m)', size: 140, color: 'var(--color-accent-gold)' },
      { name: 'Sable-Serp (20 m)', size: 200, color: 'var(--color-accent-orange)' },
      { name: 'Être-de-Nuage (50 m)', size: 240, color: 'var(--color-accent-purple-soft)' },
      { name: 'Baleine Cosmique (500 m)', size: 280, color: 'var(--color-futuremen-brain)' }
    ];
    wrap.innerHTML = `
      <div class="scale-legend">
        ${refs.map((r) => `<div class="scale-row"><span class="scale-bar" style="width:${r.size}px;background:${r.color}"></span><span class="scale-name t-xs muted">${r.name}</span></div>`).join('')}
      </div>`;
  }

  /* ── Navigation par créature ──────────────────── */
  let current = null;
  function navTo(id) {
    current = id;
    $$('.beast-nav-btn').forEach((btn) => {
      const active = Number(btn.dataset.beastNav) === id;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
    const card = $(`[data-beast="${id}"]`);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      card.classList.remove('flash');
      void card.offsetWidth;
      card.classList.add('flash');
    }
  }

  function initNav() {
    $$('.beast-nav-btn').forEach((btn) => {
      btn.addEventListener('click', () => navTo(Number(btn.dataset.beastNav)));
    });
  }

  /* ── Init ─────────────────────────────────────── */
  function init() {
    const grid = $('#beastsGrid');
    if (!grid) return;

    grid.innerHTML = CREATURES.map(creatureHTML).join('');
    scaleBar();
    initNav();

    window.CaptainFuture = window.CaptainFuture || {};
    window.CaptainFuture.bestiary = { navTo };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
