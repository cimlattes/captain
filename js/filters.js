/* ══════════════════════════════════════════════════════════════
   CAPTAIN FUTURE — L'Encyclopédie Hyperréaliste
   FICHIER : js/filters.js
   RÔLE   : Filtres interactifs de la bibliothèque — période,
            planète, vilain, thème + tri (chronologique / note /
            longueur) + recherche. Publie l'état courant.
   ══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const state = {
    query: '',
    periode: 'all',
    planete: 'all',
    vilain: 'all',
    theme: 'all',
    sort: 'chrono'
  };

  /* ── Extraction des options depuis les données ────────────── */
  function collectOptions(novels) {
    const planetes = new Set();
    const vilains = new Set();
    const themes = new Set();

    novels.forEach((n) => {
      n.planetes.forEach((p) => planetes.add(p));
      if (n.vilain) vilains.add(n.vilain);
      n.themes.forEach((t) => themes.add(t));
    });

    return {
      planetes: [...planetes].sort((a, b) => a.localeCompare(b, 'fr')),
      vilains: [...vilains].sort((a, b) => a.localeCompare(b, 'fr')),
      themes: [...themes].sort((a, b) => a.localeCompare(b, 'fr'))
    };
  }

  /* ── Application des filtres + tri ────────────────────────── */
  function apply(novels) {
    const q = state.query.trim();
    let out = novels.filter((n) => {
      // Période
      if (state.periode === 'cfmag' && n.serie !== 'Captain Future Magazine') return false;
      if (state.periode === 'startling' && n.serie !== 'Startling Stories') return false;
      if (state.periode === '1940-41' && n.annee > 1941) return false;
      if (state.periode === '1942-44' && (n.annee < 1942 || n.annee > 1944)) return false;
      if (state.periode === '1945-51' && n.annee < 1945) return false;

      // Planète
      if (state.planete !== 'all' && !n.planetes.includes(state.planete)) return false;

      // Vilain
      if (state.vilain !== 'all' && n.vilain !== state.vilain) return false;

      // Thème
      if (state.theme !== 'all' && !n.themes.includes(state.theme)) return false;

      // Recherche floue sur plusieurs champs
      if (q) {
        const haystack = [n.titre, n.serie, n.auteur, n.pseudo, n.vilain, n.synopsis, n.saison, n.planetes.join(' '), n.themes.join(' ')].join(' | ');
        if (!window.CFSearch.match(q, haystack)) return false;
      }
      return true;
    });

    // Tri
    switch (state.sort) {
      case 'note': out = [...out].sort((a, b) => b.note - a.note); break;
      case 'longueur': out = [...out].sort((a, b) => b.mots - a.mots); break;
      case 'titre': out = [...out].sort((a, b) => a.titre.localeCompare(b.titre, 'fr')); break;
      case 'chrono':
      default: out = [...out].sort((a, b) => a.annee - b.annee || a.id - b.id);
    }
    return out;
  }

  /* ── Écouteurs sur le panneau de filtres ──────────────────── */
  function bind(rootEl, onChange) {
    const selects = rootEl.querySelectorAll('select[data-filter]');
    selects.forEach((sel) => {
      sel.addEventListener('change', () => {
        state[sel.dataset.filter] = sel.value;
        onChange();
      });
    });

    const sortSel = rootEl.querySelector('select[data-sort]');
    if (sortSel) {
      sortSel.addEventListener('change', () => {
        state.sort = sortSel.value;
        onChange();
      });
    }

    const search = rootEl.querySelector('input[data-search]');
    if (search) {
      let debounce = null;
      search.addEventListener('input', () => {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
          state.query = search.value;
          onChange();
        }, 140);
      });
    }

    const reset = rootEl.querySelector('[data-reset-filters]');
    if (reset) {
      reset.addEventListener('click', () => {
        selects.forEach((sel) => { sel.value = 'all'; state[sel.dataset.filter] = 'all'; });
        if (sortSel) { sortSel.value = 'chrono'; state.sort = 'chrono'; }
        if (search) { search.value = ''; state.query = ''; }
        onChange();
      });
    }
  }

  function setFilter(key, value) {
    state[key] = value;
  }

  window.CF_FILTERS = { state, collectOptions, apply, bind, setFilter };
})();
