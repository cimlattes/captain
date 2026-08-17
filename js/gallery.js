/* ══════════════════════════════════════════════════════════════
   CAPTAIN FUTURE — L'Encyclopédie Hyperréaliste
   FICHIER : js/gallery.js
   RÔLE   : Galerie hyperréaliste — grille masonry, filtres,
            lightbox fullscreen (zoom + clavier), slideshow auto,
            téléchargement HD.
   ══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ── Catalogue des images (toutes celles du projet) ───────── */
  const ITEMS = [
    { src: '../images/characters/futuremen_group_shot_official.jpg', cat: 'personnages', titre: 'Les Quatre Futuremen — team shot', roman: 1 },
    { src: '../images/characters/captain_future_portrait_official.jpg', cat: 'personnages', titre: 'Captain Future — portrait officiel', roman: 1 },
    { src: '../images/characters/captain_future_action_pose.jpg', cat: 'personnages', titre: 'Captain Future — sur la coque du Comet', roman: 2 },
    { src: '../images/characters/captain_future_action_fight.jpg', cat: 'combats', titre: 'Captain Future — combat dans le dôme martien', roman: 7 },
    { src: '../images/characters/otho_android_portrait_official.jpg', cat: 'personnages', titre: 'Otho — portrait officiel', roman: 1 },
    { src: '../images/characters/otho_disguise_sequence.jpg', cat: 'personnages', titre: 'Otho — séquence de déguisement', roman: 2 },
    { src: '../images/characters/grag_robot_portrait_official.jpg', cat: 'personnages', titre: 'Grag — portrait officiel', roman: 1 },
    { src: '../images/characters/grag_robot_strength_scene.jpg', cat: 'combats', titre: 'Grag — la force colossale', roman: 1 },
    { src: '../images/characters/simon_wright_brain_portrait_official.jpg', cat: 'personnages', titre: 'Simon Wright — portrait officiel', roman: 1 },
    { src: '../images/characters/simon_wright_brain_computing.jpg', cat: 'personnages', titre: 'Simon Wright — calcul intensif', roman: 8 },
    { src: '../images/characters/joan_randall_portrait_official.jpg', cat: 'personnages', titre: 'Joan Randall — portrait officiel', roman: 2 },
    { src: '../images/characters/joan_randall_pilot_cockpit.jpg', cat: 'vaisseaux', titre: 'Joan Randall — aux commandes du Comet', roman: 10 },
    { src: '../images/characters/ul_quorn_villain_portrait_official.jpg', cat: 'personnages', titre: 'Ul Quorn — portrait officiel', roman: 5 },
    { src: '../images/characters/ul_quorn_lair_full_scene.jpg', cat: 'personnages', titre: 'Ul Quorn — le repaire', roman: 9 },
    { src: '../images/characters/captain_future_vs_ul_quorn_showdown.jpg', cat: 'combats', titre: 'Le face-à-face — CF vs Ul Quorn', roman: 9 },
    { src: '../images/characters/marshal_ezra_gurney_portrait_official.jpg', cat: 'personnages', titre: 'Marshal Ezra Gurney — portrait officiel', roman: 2 },
    { src: '../images/characters/doctor_zarro_villain_portrait.jpg', cat: 'personnages', titre: 'Docteur Zarro — portrait', roman: 2 },
    { src: '../images/characters/space_emperor_portrait.jpg', cat: 'personnages', titre: "L'Empereur de l'Espace — portrait", roman: 1 },
    { src: '../images/characters/magician_of_mars_portrait.jpg', cat: 'personnages', titre: 'Le Sorcier de Mars — portrait', roman: 7 },
    { src: '../images/characters/comet_kings_portrait.jpg', cat: 'personnages', titre: 'Un Roi des Comètes — portrait', roman: 11 },
    { src: '../images/characters/legion_of_peril_soldier.jpg', cat: 'personnages', titre: 'Soldat de la Légion du Péril', roman: 2 },
    { src: '../images/characters/planetary_parliament_session.jpg', cat: 'scenes', titre: 'Le Parlement Planétaire', roman: 4 },
    { src: '../images/characters/curt_newton_childhood_moon.jpg', cat: 'scenes', titre: 'Le jeune Curt sur la Lune', roman: 1 },
    { src: '../images/characters/space_emperor_throne_room.jpg', cat: 'scenes', titre: "La salle du trône de l'Empereur", roman: 1 },
    { src: '../images/characters/futuremen_mission_briefing.jpg', cat: 'scenes', titre: 'Briefing de mission', roman: 1 },
    { src: '../images/characters/gravity_belt_flight_demo.jpg', cat: 'combats', titre: 'Vol libre — le répulseur gravifique', roman: 2 },
    { src: '../images/ships/the_comet_ship_official.jpg', cat: 'vaisseaux', titre: 'The Comet — vue officielle', roman: 1 },
    { src: '../images/ships/the_comet_technical_cutaway.jpg', cat: 'vaisseaux', titre: 'The Comet — vue en coupe', roman: 1 },
    { src: '../images/planets/venus_jungle_surface.jpg', cat: 'planetes', titre: 'La jungle dorée de Vénus', roman: 7 },
    { src: '../images/planets/mars_city_dome_landscape.jpg', cat: 'planetes', titre: 'Ville-dôme de Mars', roman: 7 },
    { src: '../images/planets/saturn_rings_colony.jpg', cat: 'planetes', titre: 'Colonie des anneaux de Saturne', roman: 11 },
    { src: '../images/planets/jupiter_cloud_colonies.jpg', cat: 'planetes', titre: 'Colonies flottantes de Jupiter', roman: 11 },
    { src: '../images/planets/mercury_sun_outpost.jpg', cat: 'planetes', titre: 'Avant-poste de Mercure', roman: 9 },
    { src: '../images/planets/uranus_deep_ocean.jpg', cat: 'planetes', titre: 'Les océans d\'Uranus', roman: 13 },
    { src: '../images/planets/neptune_ice_outpost.jpg', cat: 'planetes', titre: "L'avant-poste de Neptune", roman: 15 },
    { src: '../images/planets/lunar_base_tycho_exterior.jpg', cat: 'planetes', titre: 'Base lunaire de Tycho', roman: 1 },
    { src: '../images/planets/solar_system_2940_overview.jpg', cat: 'planetes', titre: 'Le système solaire — 2940', roman: 1 },
    { src: '../images/planets/disintegrator_gun_blueprint_3d.jpg', cat: 'techno', titre: 'Le Désintégrateur — blueprint 3D', roman: 1 },
    { src: '../images/covers/cover_space_emperor_cinema.jpg', cat: 'couvertures', titre: 'The Space Emperor — couverture', roman: 1 },
    { src: '../images/covers/cover_calling_captain_future.jpg', cat: 'couvertures', titre: 'Calling Captain Future — couverture', roman: 2 },
    { src: '../images/covers/cover_comet_kings_cinema.jpg', cat: 'couvertures', titre: 'The Comet Kings — couverture', roman: 11 },
    { src: '../images/covers/cover_magician_of_mars_cinema.jpg', cat: 'couvertures', titre: 'The Magician of Mars — couverture', roman: 7 },
    { src: '../images/covers/cover_outlaws_moon_cinema.jpg', cat: 'couvertures', titre: 'Outlaws of the Moon — couverture', roman: 10 },
    { src: '../images/spreads/hero_banner_comet_space.jpg', cat: 'vaisseaux', titre: 'The Comet face à Jupiter — bannière', roman: 9 },
    { src: '../images/spreads/quote_background_stars.jpg', cat: 'scenes', titre: 'La Voie Lactée', roman: 6 },
    { src: '../images/spreads/library_overview_spread.jpg', cat: 'couvertures', titre: 'La bibliothèque galactique', roman: 0 },
    { src: '../images/spreads/reading_nook_atmospheric.jpg', cat: 'scenes', titre: 'Le coin lecture de la base', roman: 0 },
    { src: '../images/characters/venusian_reptile_beast.jpg', cat: 'creatures', titre: 'Reptilo-Géant de Vénus', roman: 7 },
    { src: '../images/characters/cosmic_whale_space.jpg', cat: 'creatures', titre: 'La Baleine Cosmique', roman: 9 },
    { src: '../images/characters/martian_sand_serpent.jpg', cat: 'creatures', titre: 'Sable-Serp de Mars', roman: 10 },
    { src: '../images/characters/jovian_cloud_entity.jpg', cat: 'creatures', titre: 'Être-de-Nuage jovien', roman: 11 },
    { src: '../images/spreads/graphic_novel_page_01.jpg', cat: 'roman-graphique', titre: 'Roman graphique — arrivée sur Mars', roman: 7 },
    { src: '../images/spreads/graphic_novel_page_02.jpg', cat: 'roman-graphique', titre: 'Roman graphique — séquence d\'action', roman: 1 },
    { src: '../images/spreads/graphic_novel_splash_page.jpg', cat: 'roman-graphique', titre: 'Roman graphique — splash page', roman: 9 }
  ];

  let filter = 'all';
  let slideshowTimer = null;
  let slideIndex = 0;
  let visibleItems = [];

  /* ── Rendu masonry ───────────────────────────── */
  function render() {
    const grid = $('#galleryGrid');
    if (!grid) return;

    visibleItems = ITEMS.filter((it) => filter === 'all' || it.cat === filter);
    grid.innerHTML = visibleItems.map((it, i) => `
      <figure class="gallery-item" data-index="${i}" data-cat="${it.cat}" data-reveal>
        <img src="${it.src}" alt="${it.titre}" loading="lazy" width="600" height="450">
        <figcaption class="gallery-caption">
          <span class="gallery-cat hud-label">${it.cat}</span>
          <span class="gallery-title t-sm">${it.titre}</span>
        </figcaption>
        <button class="gallery-zoom" aria-label="Agrandir : ${it.titre}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m16 16 5 5M8 11h6m-3-3v6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        </button>
      </figure>`).join('');

    // Reveal
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); } });
      }, { threshold: 0.08 });
      $$('.gallery-item', grid).forEach((el) => io.observe(el));
    } else {
      $$('.gallery-item', grid).forEach((el) => el.classList.add('in-view'));
    }

    updateCount();
    bindItems();
  }

  function updateCount() {
    const el = $('#galleryCount');
    if (el) el.textContent = `${visibleItems.length} / ${ITEMS.length} images`;
  }

  /* ── Clics ───────────────────────────────────── */
  function bindItems() {
    $$('.gallery-item').forEach((item) => {
      item.addEventListener('click', (e) => {
        if (e.target.closest('.gallery-zoom')) return;
        openLightbox(Number(item.dataset.index));
      });
      const zoom = $('.gallery-zoom', item);
      if (zoom) zoom.addEventListener('click', (e) => { e.stopPropagation(); openLightbox(Number(item.dataset.index)); });
    });
  }

  /* ── Lightbox ────────────────────────────────── */
  function openLightbox(index) {
    slideIndex = index;
    const lb = $('#lightbox');
    const img = $('#lightboxImg');
    img.src = visibleItems[slideIndex].src;
    img.alt = visibleItems[slideIndex].titre;
    $('#lightboxTitle').textContent = visibleItems[slideIndex].titre;
    $('#lightboxCat').textContent = visibleItems[slideIndex].cat;
    $('#lightboxCounter').textContent = `${slideIndex + 1} / ${visibleItems.length}`;
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => lb.classList.add('open'));
    stopSlideshow();
  }
  function closeLightbox() {
    const lb = $('#lightbox');
    lb.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { lb.hidden = true; }, 350);
  }
  function navLightbox(dir) {
    if (!visibleItems.length) return;
    slideIndex = (slideIndex + dir + visibleItems.length) % visibleItems.length;
    openLightbox(slideIndex);
  }

  function initLightbox() {
    const lb = $('#lightbox');
    if (!lb) return;
    $('#lightboxClose').addEventListener('click', closeLightbox);
    $('#lightboxPrev').addEventListener('click', () => navLightbox(-1));
    $('#lightboxNext').addEventListener('click', () => navLightbox(1));
    $('#lightboxDownload').addEventListener('click', () => {
      const a = document.createElement('a');
      a.href = visibleItems[slideIndex].src;
      a.download = visibleItems[slideIndex].src.split('/').pop();
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
    lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
      if (lb.hidden) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navLightbox(-1);
      if (e.key === 'ArrowRight') navLightbox(1);
    });
  }

  /* ── Slideshow ───────────────────────────────── */
  function startSlideshow() {
    stopSlideshow();
    if (!visibleItems.length) return;
    slideIndex = 0;
    openLightbox(0);
    slideshowTimer = setInterval(() => {
      navLightbox(1);
    }, 4000);
    $('#btnSlideshow').textContent = '■ Arrêter le diaporama';
    $('#btnSlideshow').classList.add('is-active');
  }
  function stopSlideshow() {
    if (slideshowTimer) clearInterval(slideshowTimer);
    slideshowTimer = null;
    const btn = $('#btnSlideshow');
    if (btn) { btn.textContent = '▶ Diaporama automatique'; btn.classList.remove('is-active'); }
  }

  /* ── Init ────────────────────────────────────── */
  function init() {
    if (!$('#galleryGrid')) return;

    // Filtres
    $$('[data-gallery-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        filter = btn.dataset.galleryFilter;
        $$('[data-gallery-filter]').forEach((b) => {
          const active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-pressed', String(active));
        });
        render();
      });
    });

    $('#btnSlideshow').addEventListener('click', () => {
      slideshowTimer ? stopSlideshow() : startSlideshow();
    });

    initLightbox();
    render();

    window.CaptainFuture = window.CaptainFuture || {};
    window.CaptainFuture.gallery = { open: openLightbox, close: closeLightbox, next: () => navLightbox(1), prev: () => navLightbox(-1) };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
