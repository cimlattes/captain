/* ══════════════════════════════════════════════════════════════
   CAPTAIN FUTURE — L'Encyclopédie Hyperréaliste
   FICHIER : js/slideshow.js
   RÔLE   : API de diaporama automatique de la galerie.
            Délègue au moteur central (js/gallery.js).
   ══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // Délégation : le bouton #btnSlideshow est géré par gallery.js.
  // Ce module expose une API + le raccourci clavier « S » pour lancer.
  document.addEventListener('keydown', (e) => {
    const target = e.target;
    if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;
    if (e.key === 's' || e.key === 'S') {
      const btn = document.getElementById('btnSlideshow');
      if (btn) btn.click();
    }
  });

  window.CaptainFuture = window.CaptainFuture || {};
  window.CaptainFuture.slideshow = {
    toggle: () => {
      const btn = document.getElementById('btnSlideshow');
      if (btn) btn.click();
    }
  };
})();
