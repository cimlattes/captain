/* ══════════════════════════════════════════════════════════════
   CAPTAIN FUTURE — L'Encyclopédie Hyperréaliste
   FICHIER : js/search.js
   RÔLE   : Moteur de recherche floue (fuzzy) dans le site.
            Score de pertinence : préfixes, sous-chaînes, diacritiques
            ignorées, correspondances partielles de mots.
   API    : window.CFSearch.score(query, target) → nombre
            window.CFSearch.match(query, target) → booléen
   ══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Normalisation : minuscules + diacritiques ─────────── */
  const MAP = {
    'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a',
    'ç': 'c', 'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',
    'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
    'ñ': 'n', 'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o',
    'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u', 'ý': 'y', 'ÿ': 'y',
    'œ': 'oe', 'æ': 'ae', '\'': ' ', '’': ' '
  };

  function normalize(str) {
    return String(str || '')
      .toLowerCase()
      .replace(/[àáâãäåçèéêëìíîïñòóôõöùúûüýÿœæ'’]/g, (ch) => MAP[ch] || ch)
      .replace(/[^a-z0-9\s-]/g, ' ')
      .trim();
  }

  /* ── Score de pertinence ─────────────────────────────────── */
  function score(query, target) {
    const q = normalize(query);
    const t = normalize(target);
    if (!q) return 0;
    if (t === q) return 100;
    if (t.startsWith(q)) return 90;
    if (t.includes(q)) return 80;

    // Correspondance de tous les mots (ordre flexible)
    const qWords = q.split(/\s+/).filter(Boolean);
    const tWords = t.split(/\s+/).filter(Boolean);
    if (qWords.length > 1 && qWords.every((w) => tWords.some((tw) => tw.includes(w)))) {
      return 70;
    }

    // Correspondance partielle de mots (au moins un mot ≥ 3 lettres)
    let best = 0;
    qWords.forEach((w) => {
      if (w.length < 2) return;
      tWords.forEach((tw) => {
        if (tw.startsWith(w)) best = Math.max(best, 50);
        else if (tw.includes(w)) best = Math.max(best, 40);
      });
    });
    return best;
  }

  function match(query, target) {
    return score(query, target) > 0;
  }

  window.CFSearch = { score, match, normalize };
})();
