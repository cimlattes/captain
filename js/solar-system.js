/* ══════════════════════════════════════════════════════════════
   CAPTAIN FUTURE — L'Encyclopédie Hyperréaliste
   FICHIER : js/solar-system.js
   RÔLE   : Atlas solaire 3D interactif (Three.js r128, embarqué
            localement dans js/vendor/) avec fallback 2D canvas.
            — Soleil + orbites + planètes + labels holographiques
            — Clic sur planète → panneau latéral d'infos
            — Drag pour tourner, molette pour zoomer
            — The Comet animé + mode « voyages de Captain Future »
   ══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const $ = (sel) => document.querySelector(sel);
  const canvas = $('#solarGlobe');
  if (!canvas) return;

  /* ═══════════════════════════════════════════════
     DONNÉES PLANÉTAIRES (universe hamiltonien)
     ═══════════════════════════════════════════════ */
  const PLANETS = [
    {
      id: 'mercure', name: 'Mercure', type: 'Avant-poste scientifique',
      color: 0xb06048, radius: 0.55, orbit: 13, speed: 0.9,
      image: '../images/planets/mercury_sun_outpost.jpg',
      desc: "Le monde le plus proche du Soleil : des roches de feu, des rivières de lave et un avant-poste d'observation permanent. Peu d'habitants — uniquement des scientifiques et des techniciens qui étudient l'étoile de près.",
      specs: { Population: 'Avant-poste (~500)', Gouvernement: 'Parlement Planétaire', Ressources: 'Données solaires', Particularité: 'Roches de feu' }
    },
    {
      id: 'venus', name: 'Vénus', type: 'Monde-jungle',
      color: 0xe8b860, radius: 0.8, orbit: 18, speed: 0.75,
      image: '../images/planets/venus_jungle_surface.jpg',
      desc: "Une jungle tropicale dorée et éternelle, peuplée d'une faune géante. La civilisation vénusienne, des êtres semi-reptiliens avancés, vit en harmonie avec cette nature luxuriante. Minéraux rares et plantes médicinales.",
      specs: { Population: 'Des millions', Gouvernement: 'Conseils vénusiens', Ressources: 'Minéraux rares, plantes médicinales', Particularité: 'Jungle dorée' }
    },
    {
      id: 'terre', name: 'Terre', type: 'Monde-mère',
      color: 0x3a6ea5, radius: 0.85, orbit: 23, speed: 0.65,
      image: '../images/planets/lunar_base_tycho_exterior.jpg',
      desc: "Le monde-mère de l'humanité, capitale politique du système avec le Parlement Planétaire. Berceau de la civilisation humaine, elle reste le cœur symbolique des sept mondes habités.",
      specs: { Population: 'Plusieurs milliards', Gouvernement: 'Parlement Planétaire', Ressources: 'Industrie, agriculture', Particularité: 'Capitale politique' }
    },
    {
      id: 'mars', name: 'Mars', type: 'Monde ancien',
      color: 0xc05030, radius: 0.75, orbit: 29, speed: 0.55,
      image: '../images/planets/mars_city_dome_landscape.jpg',
      desc: "La planète rouge, partiellement terraformée, abrite les Martiens : un peuple grand et fin, ancien et sage, en déclin lent. Villes-dômes dans les canyons, culture martiale et philosophique, mystères millénaires.",
      specs: { Population: 'Des centaines de millions', Gouvernement: 'Conseils martiens', Ressources: 'Minerais, technologies anciennes', Particularité: 'Villes-dômes dans les canyons' }
    },
    {
      id: 'jupiter', name: 'Jupiter', type: 'Colonies flottantes',
      color: 0xd8a860, radius: 1.7, orbit: 40, speed: 0.4,
      image: '../images/planets/jupiter_cloud_colonies.jpg',
      desc: "Géante gazeuse aux colonies flottantes dans les couches supérieures des nuages. Les êtres de nuage, entités de plasma non-solides, y vivent en paix — et les stations orbitales humaines sont gigantesques.",
      specs: { Population: 'Colonies flottantes', Gouvernement: 'Guildes joviennes', Ressources: 'Hélium, énergie', Particularité: 'Êtres de nuage luminescents' }
    },
    {
      id: 'saturne', name: 'Saturne', type: 'Civilisation des anneaux',
      color: 0xe0c890, radius: 1.4, orbit: 52, speed: 0.32,
      image: '../images/planets/saturn_rings_colony.jpg',
      desc: "Les anneaux sont habités ! La civilisation des Anneliers a bâti des cités dans les glaces orbitales. Titan abrite une base scientifique avancée, et les cristaux énergétiques de Saturne alimentent le système.",
      specs: { Population: 'Anneliers + colons', Gouvernement: 'Conseil des Anneaux', Ressources: 'Cristaux énergétiques', Particularité: 'Anneaux habités' }
    },
    {
      id: 'uranus', name: 'Uranus', type: 'Monde océanique',
      color: 0x50c8c0, radius: 1.0, orbit: 64, speed: 0.22,
      image: '../images/planets/uranus_deep_ocean.jpg',
      desc: "Monde océanique et glacial, mystérieux et peu visité. Des créatures aquatiques intelligentes glissent dans ses abysses, gardiennes d'une sagesse que la civilisation humaine commence à peine à soupçonner.",
      specs: { Population: 'Peu visité', Gouvernement: 'Inconnu', Ressources: 'Océans, mystères', Particularité: 'Créatures aquatiques intelligentes' }
    },
    {
      id: 'neptune', name: 'Neptune', type: 'Avant-poste des confins',
      color: 0x5060c0, radius: 0.95, orbit: 76, speed: 0.16,
      image: '../images/planets/neptune_ice_outpost.jpg',
      desc: "L'extrême froid du système. Des créatures de glace cristallines hantent ces plaines gelées, et un avant-poste humain veille aux confins du monde habité — la dernière porte avant l'inconnu.",
      specs: { Population: 'Avant-poste', Gouvernement: 'Parlement Planétaire', Ressources: 'Glaces rares', Particularité: 'Créatures de glace cristallines' }
    }
  ];

  const SUN_COLOR = 0xffb030;
  const SUN_GLOW = 0xffd080;
  const ORBIT_COLOR = 0x2a3a5c;

  /* ═══════════════════════════════════════════════
     HELPERS
     ═══════════════════════════════════════════════ */
  function makeLabelSprite(text, color) {
    const c = document.createElement('canvas');
    const ctx = c.getContext('2d');
    c.width = 512; c.height = 128;
    ctx.font = '700 42px "Rajdhani", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(255,184,48,.9)';
    ctx.shadowBlur = 24;
    ctx.fillStyle = color || '#FFB830';
    ctx.fillText(text, 256, 64);

    const tex = new THREE.CanvasTexture(c);
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(7, 1.75, 1);
    return sprite;
  }

  function makePlanetTexture(colors) {
    const c = document.createElement('canvas');
    const ctx = c.getContext('2d');
    c.width = 256; c.height = 128;
    const bands = colors || ['#888888'];
    for (let y = 0; y < 128; y++) {
      const col = bands[Math.floor(y / (128 / bands.length))];
      ctx.fillStyle = col;
      ctx.fillRect(0, y, 256, 1);
    }
    // Légères variations verticales (bruit)
    for (let i = 0; i < 900; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 128;
      const v = Math.random() * 26 - 13;
      const r = parseInt(ctx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data[0], 10);
      ctx.fillStyle = `rgba(${Math.max(0, Math.min(255, r + v))},${Math.max(0, Math.min(255, r + v - 8))},${Math.max(0, Math.min(255, r + v - 12))},0.35)`;
      ctx.fillRect(x, y, 1.5, 1.5);
    }
    return new THREE.CanvasTexture(c);
  }

  /* ═══════════════════════════════════════════════
     MOTEUR 3D (Three.js)
     ═══════════════════════════════════════════════ */
  function init3D() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 2000);
    camera.position.set(0, 42, 105);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    // Lumières
    const ambient = new THREE.AmbientLight(0x404860, 0.6);
    scene.add(ambient);
    const dir = new THREE.DirectionalLight(0xffe0b0, 1.0);
    dir.position.set(30, 20, 40);
    scene.add(dir);

    // Étoiles de fond
    const starGeo = new THREE.BufferGeometry();
    const starCount = 1400;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      const r = 180 + Math.random() * 300;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      positions[i] = r * Math.sin(ph) * Math.cos(th);
      positions[i + 1] = r * Math.sin(ph) * Math.sin(th) * 0.6;
      positions[i + 2] = r * Math.cos(ph);
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0x9fb4cc, size: 0.5, transparent: true, opacity: 0.8 })));

    // Soleil
    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(3, 32, 32),
      new THREE.MeshBasicMaterial({ color: SUN_COLOR })
    );
    scene.add(sun);
    const glowTex = makeLabelSprite('', SUN_GLOW); // sprite vide pour le glow
    const glowCanvas = document.createElement('canvas');
    glowCanvas.width = 256; glowCanvas.height = 256;
    const gctx = glowCanvas.getContext('2d');
    const grad = gctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, 'rgba(255,190,90,1)');
    grad.addColorStop(0.4, 'rgba(255,150,50,.45)');
    grad.addColorStop(1, 'rgba(255,150,50,0)');
    gctx.fillStyle = grad;
    gctx.fillRect(0, 0, 256, 256);
    const sunGlow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture(glowCanvas), transparent: true, depthWrite: false
    }));
    sunGlow.scale.set(26, 26, 1);
    scene.add(sunGlow);

    // Groupe rotatif global (drag)
    const rotGroup = new THREE.Group();
    scene.add(rotGroup);

    // Orbites + planètes
    const planetMeshes = [];
    const planetLabels = [];

    PLANETS.forEach((p, i) => {
      // Orbite
      const pts = [];
      for (let a = 0; a <= 128; a++) {
        const th = (a / 128) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(th) * p.orbit, 0, Math.sin(th) * p.orbit));
      }
      const orbitGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const orbit = new THREE.Line(orbitGeo, new THREE.LineBasicMaterial({ color: ORBIT_COLOR, transparent: true, opacity: 0.55 }));
      scene.add(orbit);

      // Planète
      const textureColors = p.id === 'jupiter' ? ['#e8c088', '#d8a860', '#c89050', '#e8b878', '#d0a058'] :
        p.id === 'saturne' ? ['#e8d8a8', '#d8c890'] :
        p.id === 'venus' ? ['#f0d088', '#e0b860'] :
        p.id === 'terre' ? ['#3a6ea5', '#4a7ab0', '#2a5a88', '#3a6ea5'] :
        p.id === 'neptune' ? ['#5060c0', '#6070d0'] :
        [new THREE.Color(p.color).getStyle()];

      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(p.radius, 28, 28),
        new THREE.MeshPhongMaterial({ map: makePlanetTexture(textureColors), shininess: 8 })
      );
      mesh.userData = { planetId: p.id };

      // Anneaux de Saturne
      if (p.id === 'saturne') {
        const ring = new THREE.Mesh(
          new THREE.RingGeometry(p.radius * 1.5, p.radius * 2.6, 48),
          new THREE.MeshBasicMaterial({ color: 0xd8c8a0, side: THREE.DoubleSide, transparent: true, opacity: 0.75 })
        );
        ring.rotation.x = -Math.PI / 2;
        mesh.add(ring);
      }

      const holder = new THREE.Group();
      const angle = (i / PLANETS.length) * Math.PI * 2;
      holder.position.set(Math.cos(angle) * p.orbit, 0, Math.sin(angle) * p.orbit);
      holder.add(mesh);
      rotGroup.add(holder);

      // Label
      const label = makeLabelSprite(p.name.toUpperCase(), '#FFB830');
      label.position.y = p.radius + 1.8;
      holder.add(label);

      planetMeshes.push({ holder, mesh, planet: p, angle });
      planetLabels.push(label);
    });

    // The Comet
    const comet = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.34, 1.7, 8), new THREE.MeshPhongMaterial({ color: 0xf0e8d8 }));
    body.rotation.z = Math.PI / 2;
    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.7, 8), new THREE.MeshPhongMaterial({ color: 0xffb830 }));
    nose.rotation.z = Math.PI / 2;
    nose.position.x = 1.15;
    const wingL = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.05, 1.1), new THREE.MeshPhongMaterial({ color: 0xd8d0c0 }));
    wingL.position.set(-0.15, 0, 1.0);
    const wingR = wingL.clone();
    wingR.position.z = -1.0;
    comet.add(body, nose, wingL, wingR);
    comet.scale.setScalar(1.6);
    const cometTrail = new THREE.Sprite(new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture((function () {
        const c = document.createElement('canvas'); c.width = 128; c.height = 32;
        const x = c.getContext('2d');
        const g = x.createLinearGradient(0, 0, 128, 0);
        g.addColorStop(0, 'rgba(0,212,255,0)'); g.addColorStop(1, 'rgba(0,212,255,.8)');
        x.fillStyle = g; x.fillRect(0, 0, 128, 32);
        return c;
      })()), transparent: true, depthWrite: false
    }));
    cometTrail.scale.set(4, 0.7, 1);
    cometTrail.position.x = -2;
    comet.add(cometTrail);
    rotGroup.add(comet);

    // Caméra / interaction
    let rotX = 0.35, rotY = 0, targetRotY = 0, targetRotX = 0.35;
    let zoom = 1, targetZoom = 1;
    let dragging = false, lastX = 0, lastY = 0;
    let selectedId = null;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onPointerDown(e) {
      dragging = true;
      lastX = e.clientX; lastY = e.clientY;
    }
    function onPointerMove(e) {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX; lastY = e.clientY;
      targetRotY += dx * 0.005;
      targetRotX = Math.max(-0.9, Math.min(0.9, targetRotX + dy * 0.004));
    }
    function onPointerUp(e) {
      if (!dragging) return;
      dragging = false;
      // Détection de clic (pas un drag) via raycaster
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const meshes = planetMeshes.map((m) => m.mesh);
      const hits = raycaster.intersectObjects(meshes, true);
      if (hits.length) {
        let mesh = hits[0].object;
        while (mesh && !mesh.userData.planetId) mesh = mesh.parent;
        if (mesh) selectPlanet(mesh.userData.planetId);
      }
    }
    function onWheel(e) {
      e.preventDefault();
      targetZoom = Math.max(0.55, Math.min(2.4, targetZoom + e.deltaY * 0.0016));
    }

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('wheel', onWheel, { passive: false });

    // Touches
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') targetRotY += 0.08;
      if (e.key === 'ArrowRight') targetRotY -= 0.08;
    });

    /* ── Sélection ── */
    function selectPlanet(id) {
      selectedId = id;
      const data = PLANETS.find((p) => p.id === id);
      if (!data) return;

      const panel = $('#planetPanel');
      panel.hidden = false;
      $('#panelImg').src = data.image;
      $('#panelImg').alt = data.name;
      $('#panelType').textContent = data.type;
      $('#panelName').textContent = data.name;
      $('#panelDesc').textContent = data.desc;

      const specsEl = $('#panelSpecs');
      specsEl.innerHTML = Object.entries(data.specs)
        .map(([k, v]) => `<div class="spec"><dt>${k}</dt><dd>${v}</dd></div>`)
        .join('');

      // Zoom caméra vers la planète
      const holder = planetMeshes.find((m) => m.planet.id === id);
      if (holder) {
        const pos = holder.holder.position;
        camera.position.set(pos.x * 1.35, pos.y + 8, pos.z * 1.35);
        camera.lookAt(pos.x, 0, pos.z);
      }
      $('#globeStatus').textContent = `✓ ${data.name} sélectionnée`;
    }

    $('#planetPanelClose').addEventListener('click', () => { $('#planetPanel').hidden = true; });
    $('#btnReset').addEventListener('click', () => {
      camera.position.set(0, 42, 105);
      camera.lookAt(0, 0, 0);
      targetZoom = 1; zoom = 1;
      $('#planetPanel').hidden = true;
      $('#globeStatus').textContent = '✋ Glisser pour tourner · Molette pour zoomer';
    });

    /* ── Voyages de Captain Future ── */
    let journeyMode = false;
    let journeyIndex = 0;
    let journeyT = 0;
    const JOURNEY_ROUTE = ['terre', 'mars', 'jupiter', 'saturne', 'uranus', 'neptune', 'mercure', 'venus'];

    $('#btnJourneys').addEventListener('click', () => {
      journeyMode = !journeyMode;
      journeyIndex = 0; journeyT = 0;
      $('#btnJourneys').classList.toggle('btn-primary', journeyMode);
      $('#btnJourneys').classList.toggle('btn-ghost', !journeyMode);
      $('#btnJourneys').textContent = journeyMode ? '■ Arrêter le voyage' : '🚀 Voir les voyages de Captain Future';
      if (journeyMode) {
        $('#globeStatus').textContent = '🚀 En route pour ' + PLANETS.find((p) => p.id === JOURNEY_ROUTE[0]).name;
      }
    });

    /* ── Boucle d'animation ── */
    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const dt = clock.getDelta();
      const time = clock.elapsedTime;

      // Planètes en orbite
      planetMeshes.forEach((m) => {
        m.angle += dt * 0.05 * m.planet.speed;
        m.holder.position.set(Math.cos(m.angle) * m.planet.orbit, 0, Math.sin(m.angle) * m.planet.orbit);
        m.mesh.rotation.y += dt * 0.3;
      });

      // The Comet
      if (journeyMode) {
        const fromId = JOURNEY_ROUTE[journeyIndex % JOURNEY_ROUTE.length];
        const toId = JOURNEY_ROUTE[(journeyIndex + 1) % JOURNEY_ROUTE.length];
        const from = planetMeshes.find((m) => m.planet.id === fromId).holder.position;
        const to = planetMeshes.find((m) => m.planet.id === toId).holder.position;
        journeyT += dt * 0.18;
        if (journeyT >= 1) { journeyT = 0; journeyIndex++; $('#globeStatus').textContent = '🚀 En route pour ' + PLANETS.find((p) => p.id === JOURNEY_ROUTE[(journeyIndex + 1) % JOURNEY_ROUTE.length]).name; }
        const t = journeyT;
        const eased = t * t * (3 - 2 * t);
        comet.position.lerpVectors(from, to, eased);
        comet.lookAt(to);
      } else {
        comet.position.set(Math.cos(time * 0.25) * 33, 2, Math.sin(time * 0.25) * 33);
        comet.rotation.y = -time * 0.25;
      }

      // Caméra : lissage + zoom
      rotY += (targetRotY - rotY) * 0.06;
      rotX += (targetRotX - rotX) * 0.06;
      zoom += (targetZoom - zoom) * 0.08;
      rotGroup.rotation.y = rotY;
      rotGroup.rotation.x = rotX;

      const dist = 105 * zoom;
      const dir = camera.position.clone().normalize();
      camera.position.copy(dir.multiplyScalar(dist));
      camera.lookAt(0, 0, 0);

      // Labels face à la caméra
      planetLabels.forEach((l) => l.lookAt(camera.position));

      renderer.render(scene, camera);
    }
    animate();

    /* ── Resize ── */
    function resize() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', resize);

    window.CaptainFuture = window.CaptainFuture || {};
    window.CaptainFuture.solarSystem = { selectPlanet, destroy: () => { window.removeEventListener('resize', resize); } };
  }

  /* ═══════════════════════════════════════════════
     FALLBACK 2D (si Three.js indisponible)
     ═══════════════════════════════════════════════ */
  function init2D() {
    const ctx = canvas.getContext('2d');
    let W, H;
    let viewAngle = 0, zoom = 1, targetZoom = 1;
    let dragging = false, lastX = 0;
    let time = 0;

    function resize() {
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W; canvas.height = H;
    }
    resize();
    window.addEventListener('resize', resize);

    // Positions projetées des planètes (orbites elliptiques fausse-3D)
    function planetPos(p, angle) {
      const x = Math.cos(angle) * p.orbit * zoom;
      const z = Math.sin(angle) * p.orbit * zoom;
      // projection isométrique
      const px = W / 2 + x;
      const py = H / 2 + z * 0.5;
      return { x: px, y: py, z };
    }

    canvas.addEventListener('pointerdown', (e) => { dragging = true; lastX = e.clientX; });
    window.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      viewAngle += (e.clientX - lastX) * 0.005;
      lastX = e.clientX;
    });
    window.addEventListener('pointerup', (e) => {
      if (!dragging) return;
      dragging = false;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      PLANETS.forEach((p, i) => {
        const pos = planetPos(p, time * 0.05 * p.speed + i * 1.3 + viewAngle);
        const d = Math.hypot(mx - pos.x, my - pos.y);
        if (d < 26 * zoom) selectPlanet(p.id);
      });
    });
    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      targetZoom = Math.max(0.5, Math.min(2.5, targetZoom + e.deltaY * 0.0016));
    }, { passive: false });

    function selectPlanet(id) {
      const data = PLANETS.find((p) => p.id === id);
      const panel = $('#planetPanel');
      panel.hidden = false;
      $('#panelImg').src = data.image;
      $('#panelImg').alt = data.name;
      $('#panelType').textContent = data.type;
      $('#panelName').textContent = data.name;
      $('#panelDesc').textContent = data.desc;
      $('#panelSpecs').innerHTML = Object.entries(data.specs)
        .map(([k, v]) => `<div class="spec"><dt>${k}</dt><dd>${v}</dd></div>`).join('');
      $('#globeStatus').textContent = `✓ ${data.name} sélectionnée`;
    }
    $('#planetPanelClose').addEventListener('click', () => { $('#planetPanel').hidden = true; });
    $('#btnReset').addEventListener('click', () => {
      targetZoom = 1; zoom = 1; viewAngle = 0;
      $('#planetPanel').hidden = true;
      $('#globeStatus').textContent = '✋ Glisser pour tourner · Molette pour zoomer';
    });
    $('#btnJourneys').addEventListener('click', () => {
      $('#globeStatus').textContent = '🚀 Mode voyage : The Comet suit sa route à travers le système !';
    });

    function draw() {
      requestAnimationFrame(draw);
      time += 0.016;
      zoom += (targetZoom - zoom) * 0.08;
      ctx.clearRect(0, 0, W, H);

      // Soleil
      const sx = W / 2, sy = H / 2;
      const sunR = 14 * zoom;
      const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, sunR * 4);
      g.addColorStop(0, 'rgba(255,200,100,1)');
      g.addColorStop(0.25, 'rgba(255,160,60,.55)');
      g.addColorStop(1, 'rgba(255,160,60,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
      ctx.beginPath();
      ctx.arc(sx, sy, sunR, 0, Math.PI * 2);
      ctx.fillStyle = '#ffb030';
      ctx.shadowColor = 'rgba(255,176,48,.9)';
      ctx.shadowBlur = 30;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Orbites + planètes
      PLANETS.forEach((p, i) => {
        const steps = 96;
        ctx.beginPath();
        for (let s = 0; s <= steps; s++) {
          const a = (s / steps) * Math.PI * 2;
          const pos = planetPos(p, a + viewAngle);
          if (s === 0) ctx.moveTo(pos.x, pos.y); else ctx.lineTo(pos.x, pos.y);
        }
        ctx.strokeStyle = 'rgba(122,139,160,.25)';
        ctx.lineWidth = 1;
        ctx.stroke();

        const pos = planetPos(p, time * 0.05 * p.speed + i * 1.3 + viewAngle);
        const r = p.radius * 9 * zoom;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
        const col = p.color.toString(16).padStart(6, '0');
        ctx.fillStyle = '#' + col;
        ctx.shadowColor = 'rgba(255,184,48,.5)';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Anneaux de Saturne
        if (p.id === 'saturne') {
          ctx.beginPath();
          ctx.ellipse(pos.x, pos.y, r * 2.2, r * 0.6, -0.4, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(216,200,160,.6)';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Label
        ctx.font = '600 11px "Rajdhani", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#FFB830';
        ctx.shadowColor = 'rgba(255,184,48,.9)';
        ctx.shadowBlur = 8;
        ctx.fillText(p.name.toUpperCase(), pos.x, pos.y - r - 8);
        ctx.shadowBlur = 0;
      });
    }
    draw();
  }

  /* ═══════════════════════════════════════════════
     RENDU DES CARTES PLANÈTES (bas de page)
     ═══════════════════════════════════════════════ */
  function renderPlanetCards() {
    const grid = $('#planetsCards');
    if (!grid) return;
    grid.innerHTML = PLANETS.map((p) => `
      <article class="planet-card" data-planet-card="${p.id}">
        <figure class="planet-card-img">
          <img src="${p.image}" alt="${p.name} — ${p.type}" loading="lazy">
          <span class="planet-card-type hud-label">${p.type}</span>
        </figure>
        <div class="planet-card-body">
          <h3 class="display-title">${p.name}</h3>
          <p class="t-sm muted">${p.desc}</p>
        </div>
      </article>`).join('');

    // Clic sur une carte → sélectionne sur le globe si possible
    grid.querySelectorAll('[data-planet-card]').forEach((card) => {
      card.addEventListener('click', () => {
        const id = card.dataset.planetCard;
        const api = window.CaptainFuture && window.CaptainFuture.solarSystem;
        if (api && api.selectPlanet) api.selectPlanet(id);
        else {
          // fallback : remplir le panneau
          const data = PLANETS.find((p) => p.id === id);
          const panel = $('#planetPanel');
          panel.hidden = false;
          $('#panelImg').src = data.image;
          $('#panelType').textContent = data.type;
          $('#panelName').textContent = data.name;
          $('#panelDesc').textContent = data.desc;
          $('#panelSpecs').innerHTML = Object.entries(data.specs)
            .map(([k, v]) => `<div class="spec"><dt>${k}</dt><dd>${v}</dd></div>`).join('');
        }
      });
    });
  }

  /* ═══════════════════════════════════════════════
     INIT
     ═══════════════════════════════════════════════ */
  function init() {
    renderPlanetCards();
    if (typeof THREE !== 'undefined') {
      try { init3D(); return; } catch (e) { console.warn('Three.js 3D indisponible, fallback 2D :', e); }
    }
    init2D();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
