/* ══════════════════════════════════════════════════════════════
   CAPTAIN FUTURE — L'Encyclopédie Hyperréaliste
   FICHIER : js/antagonistes.js
   RÔLE   : Page Antagonistes — rendu des fiches vilains, niveaux
            de menace, navigation, filtres, timeline des apparitions.
   DÉPENDANCE : js/antagonistes-data.js
   ══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const VILLAINS = window.CF_VILLAINS || [];

  /* ── Niveau de menace ─────────────────────────── */
  const MENACE_LEVELS = {
    'OMEGA': { label: 'Omega — Menace systémique', color: '#E52B2B' },
    'ÉLEVÉE': { label: 'Élevée — Danger planétaire', color: '#F87171' },
    'MOYENNE': { label: 'Moyenne — Danger localisé', color: '#FBBF24' }
  };

  function menaceBadge(level) {
    const info = MENACE_LEVELS[level] || MENACE_LEVELS['MOYENNE'];
    return `<span class="menace-badge" style="--menace-color:${info.color}">
      <span class="menace-dot" aria-hidden="true"></span>${info.label}
    </span>`;
  }

  /* ── Card de vilain ───────────────────────────── */
  function villainCardHTML(v) {
    const scene = v.scene ? `<img class="vil-scene" src="${v.scene}" alt="Scène — ${v.nom}" loading="lazy">` : '';
    const image = v.image ? v.image : '../images/characters/space_emperor_portrait.jpg';

    return `
    <article class="vil-card" data-villain="${v.id}">
      <div class="vil-head">
        <figure class="vil-portrait">
          <img src="${image}" alt="Portrait de ${v.nom}" loading="lazy">
        </figure>
        <div class="vil-head-info">
          <span class="vil-num hud-label">Menace n°${String(v.id).padStart(2, '0')}</span>
          <h2 class="vil-name display-title">${v.nom}</h2>
          <p class="vil-epithet heading-sub">${v.epithete}</p>
          ${menaceBadge(v.menace)}
        </div>
      </div>

      <div class="vil-body">
        <p class="vil-origine body-copy"><strong>Origine :</strong> ${v.origine}</p>
        <p class="vil-desc body-copy">${v.description}</p>
        <p class="vil-cap body-copy"><strong>Capacités :</strong> ${v.capacites}</p>
        <p class="vil-arc body-copy"><strong>Arc :</strong> ${v.arc}</p>
        <blockquote class="pulp-quote">${v.citation}<footer>— ${v.nom}</footer></blockquote>
        <p class="data-readout">Apparition principale : ${v.roman_principal}</p>
        <div class="vil-romans">
          <span class="hud-label">Dans ${v.romans.length} aventure${v.romans.length > 1 ? 's' : ''}</span>
          <div class="vil-roman-chips">${v.romans.map((r) => `<span class="chip">#${r}</span>`).join('')}</div>
        </div>
      </div>

      ${scene ? `<figure class="vil-scene-wrap">${scene}<figcaption class="hud-label">Scène — ${v.nom}</figcaption></figure>` : ''}
    </article>`;
  }

  /* ── Rendu ────────────────────────────────────── */
  function render(filter) {
    const wrap = $('#villainsGrid');
    if (!wrap) return;

    let list = VILLAINS;
    if (filter && filter !== 'all') {
      list = VILLAINS.filter((v) => v.menace === filter);
    }
    // Tri par niveau de menace (Omega d'abord)
    const order = { 'OMEGA': 0, 'ÉLEVÉE': 1, 'MOYENNE': 2 };
    list = [...list].sort((a, b) => (order[a.menace] || 3) - (order[b.menace] || 3) || a.id - b.id);

    wrap.innerHTML = list.map(villainCardHTML).join('') || '<p class="t-md muted">Aucun vilain ne correspond à ce filtre… pour l\'instant.</p>';
  }

  /* ── Statistiques ─────────────────────────────── */
  function updateStats() {
    const elOmega = $('#statOmega');
    const elTotal = $('#statTotal');
    if (elOmega) elOmega.textContent = VILLAINS.filter((v) => v.menace === 'OMEGA').length;
    if (elTotal) elTotal.textContent = VILLAINS.length;
  }

  /* ── Init ─────────────────────────────────────── */
  function init() {
    if (!$('#villainsGrid')) return;

    const filterSel = $('#filterMenace');
    if (filterSel) {
      filterSel.addEventListener('change', () => render(filterSel.value));
    }

    render('all');
    updateStats();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
