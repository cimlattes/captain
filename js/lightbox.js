/* ══════════════════════════════════════════════════════════════
   CAPTAIN FUTURE — L'Encyclopédie Hyperréaliste
   FICHIER : js/lightbox.js
   RÔLE   : API Lightbox de la galerie — délègue au moteur
            central (js/gallery.js). Navigation clavier, zoom.
   ══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  function api() {
    return (window.CaptainFuture && window.CaptainFuture.gallery) || null;
  }

  document.addEventListener('keydown', (e) => {
    const lb = document.getElementById('lightbox');
    if (!lb || lb.hidden) return;
    const g = api();
    if (!g) return;
    if (e.key === 'Escape') g.close();
    if (e.key === 'ArrowLeft') g.prev();
    if (e.key === 'ArrowRight') g.next();
  });

  // Expose une API légère
  window.CaptainFuture = window.CaptainFuture || {};
  window.CaptainFuture.lightbox = {
    open: (i) => api() && api().open(i),
    close: () => api() && api().close(),
    next: () => api() && api().next(),
    prev: () => api() && api().prev()
  };
})();
