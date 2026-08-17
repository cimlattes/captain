/* ══════════════════════════════════════════════════════════════
   CAPTAIN FUTURE — L'Encyclopédie Hyperréaliste
   FICHIER : js/futuremen.js
   RÔLE   : Page Futuremen — navigation entre fiches, stats animées,
            radar charts SVG, graphe des relations interactif,
            easter egg « Simon parle ».
   ══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const CHARS = ['captain-future', 'otho', 'grag', 'simon-wright', 'joan-randall', 'ezra-gurney'];
  const RADAR_AXES = 5;

  /* ────────────────────────────────────────────────
     OUTILS RADAR
     ──────────────────────────────────────────────── */
  function radarPoints(values, cx, cy, r) {
    return values.map((v, i) => {
      const angle = (i * 2 * Math.PI / RADAR_AXES) - Math.PI / 2;
      const radius = (v / 100) * r;
      return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)];
    });
  }

  function buildRadar(svg, values, labels) {
    const NS = 'http://www.w3.org/2000/svg';
    const cx = 110, cy = 110, r = 78;

    svg.setAttribute('viewBox', '0 0 220 220');
    svg.innerHTML = '';

    // Glow
    const defs = document.createElementNS(NS, 'defs');
    const filter = document.createElementNS(NS, 'filter');
    filter.setAttribute('id', 'radarGlow');
    const blur = document.createElementNS(NS, 'feGaussianBlur');
    blur.setAttribute('stdDeviation', '3');
    const merge = document.createElementNS(NS, 'feMerge');
    const m1 = document.createElementNS(NS, 'feMergeNode');
    const m2 = document.createElementNS(NS, 'feMergeNode');
    merge.append(m1, m2);
    filter.append(blur, merge);
    defs.appendChild(filter);
    svg.appendChild(defs);

    // Grilles concentriques
    for (let ring = 1; ring <= 3; ring++) {
      const rr = (ring / 3) * r;
      const pts = Array.from({ length: RADAR_AXES }, (_, i) => {
        const a = (i * 2 * Math.PI / RADAR_AXES) - Math.PI / 2;
        return `${cx + rr * Math.cos(a)},${cy + rr * Math.sin(a)}`;
      }).join(' ');
      const poly = document.createElementNS(NS, 'polygon');
      poly.setAttribute('points', pts);
      poly.setAttribute('class', 'radar-grid-line');
      svg.appendChild(poly);
    }

    // Axes + labels
    labels.forEach((label, i) => {
      const a = (i * 2 * Math.PI / RADAR_AXES) - Math.PI / 2;
      const x2 = cx + r * Math.cos(a);
      const y2 = cy + r * Math.sin(a);
      const line = document.createElementNS(NS, 'line');
      line.setAttribute('x1', cx); line.setAttribute('y1', cy);
      line.setAttribute('x2', x2); line.setAttribute('y2', y2);
      line.setAttribute('class', 'radar-axis-line');
      svg.appendChild(line);

      const lx = cx + (r + 22) * Math.cos(a);
      const ly = cy + (r + 22) * Math.sin(a);
      const text = document.createElementNS(NS, 'text');
      text.setAttribute('x', lx); text.setAttribute('y', ly + 3);
      text.setAttribute('class', 'radar-axis-label');
      text.textContent = label;
      svg.appendChild(text);

      // Valeur sur l'axe
      const vx = cx + (r * (values[i] / 100) * 0.62) * Math.cos(a);
      const vy = cy + (r * (values[i] / 100) * 0.62) * Math.sin(a) + 3;
      const val = document.createElementNS(NS, 'text');
      val.setAttribute('x', vx); val.setAttribute('y', vy);
      val.setAttribute('class', 'radar-value-label');
      val.textContent = values[i];
      svg.appendChild(val);
    });

    // Polygone des valeurs
    const pts = radarPoints(values, cx, cy, r)
      .map((p) => p.join(',')).join(' ');
    const poly = document.createElementNS(NS, 'polygon');
    poly.setAttribute('points', pts);
    poly.setAttribute('class', 'radar-fill');
    svg.appendChild(poly);
  }

  /* ────────────────────────────────────────────────
     STATS BARRES
     ──────────────────────────────────────────────── */
  function buildStats(barsEl, values) {
    const LABELS = ['Force', 'Intelligence', 'Agilité', 'Technologie', 'Loyauté'];
    barsEl.innerHTML = '';
    values.forEach((v, i) => {
      const row = document.createElement('div');
      row.className = 'stat-bar-row';

      const label = document.createElement('span');
      label.className = 'stat-bar-label';
      label.textContent = LABELS[i];

      const track = document.createElement('div');
      track.className = 'stat-bar-track';
      const fill = document.createElement('div');
      fill.className = 'stat-bar-fill';
      fill.setAttribute('data-fill', v);
      track.appendChild(fill);

      const val = document.createElement('span');
      val.className = 'stat-bar-value';
      val.textContent = '0';
      val.setAttribute('data-value-target', v);

      row.append(label, track, val);
      barsEl.appendChild(row);
    });
  }

  function animateStats(fiche) {
    const fills = $$('.stat-bar-fill', fiche);
    fills.forEach((fill, i) => {
      const target = parseFloat(fill.dataset.fill);
      setTimeout(() => { fill.style.width = target + '%'; }, i * 90);
    });

    const values = $$('.stat-bar-value', fiche);
    values.forEach((valEl, i) => {
      const target = parseFloat(valEl.dataset.valueTarget);
      const start = performance.now();
      const duration = 1400;
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        valEl.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(tick);
      }
      setTimeout(() => requestAnimationFrame(tick), i * 90);
    });
  }

  /* ────────────────────────────────────────────────
     NAVIGATION ENTRE FICHES
     ──────────────────────────────────────────────── */
  let current = 'captain-future';

  function switchCharacter(id, { scroll = true } = {}) {
    if (!CHARS.includes(id) || id === current) return;
    current = id;

    // Onglets
    $$('.char-tab').forEach((tab) => {
      const active = tab.dataset.target === id;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-pressed', String(active));
    });

    // Fiches
    $$('.char-fiche').forEach((fiche) => {
      const active = fiche.dataset.character === id;
      fiche.classList.toggle('is-active', active);
      fiche.setAttribute('aria-hidden', String(!active));
      if (active) runFicheEffects(fiche);
    });

    // Graphe
    $$('.graph-node').forEach((node) => {
      node.classList.toggle('is-active', node.dataset.node === id);
    });

    // Hash + titre
    if (history.replaceState) history.replaceState(null, '', `#${id}`);
    if (scroll) {
      const stage = $('#charStage');
      if (stage) stage.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /* ────────────────────────────────────────────────
     EFFETS D'UNE FICHE (stats + radar, une fois)
     ──────────────────────────────────────────────── */
  const animatedSet = new Set();

  function runFicheEffects(fiche) {
    const key = fiche.dataset.character;
    if (animatedSet.has(key)) return;

    // Stats
    const statsEl = $('[data-stats]', fiche);
    if (statsEl && !statsEl.dataset.built) {
      const values = statsEl.dataset.values.split(',').map(Number);
      buildStats(statsEl, values);
      statsEl.dataset.built = '1';
    }
    animateStats(fiche);

    // Radar
    const radarEl = $('[data-radar]', fiche);
    if (radarEl && !radarEl.dataset.built) {
      const values = radarEl.dataset.values.split(',').map(Number);
      const labels = radarEl.dataset.labels.split(',');
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      radarEl.appendChild(svg);
      buildRadar(svg, values, labels);
      radarEl.dataset.built = '1';
    }
    if (radarEl) {
      radarEl.classList.remove('animated');
      requestAnimationFrame(() => requestAnimationFrame(() => radarEl.classList.add('animated')));
    }

    animatedSet.add(key);
  }

  /* ────────────────────────────────────────────────
     GRAPHE DES RELATIONS
     ──────────────────────────────────────────────── */
  function initGraph() {
    const graph = $('#relationsGraph');
    if (!graph) return;

    // Clic sur nœud → fiche
    $$('.graph-node', graph).forEach((node) => {
      node.addEventListener('click', () => switchCharacter(node.dataset.node));
      node.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          switchCharacter(node.dataset.node);
        }
      });
      node.setAttribute('tabindex', '0');
      node.setAttribute('role', 'button');
    });

    // Survol nœud → met en évidence ses arêtes
    const edgeByNodes = {};
    $$('line[data-edge]', graph).forEach((line) => {
      const [a, b] = line.dataset.edge.split('-');
      // normalisation des ids de nœuds (othograg etc.)
      edgeByNodes[a] = edgeByNodes[a] || [];
      edgeByNodes[b] = edgeByNodes[b] || [];
      // Les edges du graphe utilisent les ids courts : cf, otho, grag, simon, joan, gurney
      // On remappe vers les data-node complets au moment du survol.
      line.dataset.nodes = JSON.stringify([a, b]);
    });

    const nodeIds = {
      'captain-future': 'cf',
      otho: 'otho',
      grag: 'grag',
      'simon-wright': 'simon',
      'joan-randall': 'joan',
      'ezra-gurney': 'gurney'
    };

    $$('.graph-node', graph).forEach((node) => {
      const id = node.dataset.node;
      const short = nodeIds[id];

      node.addEventListener('mouseenter', () => {
        $$('line[data-edge]', graph).forEach((line) => {
          const [a, b] = JSON.parse(line.dataset.nodes);
          line.classList.toggle('highlight', a === short || b === short);
        });
      });
      node.addEventListener('mouseleave', () => {
        $$('line[data-edge]', graph).forEach((line) => line.classList.remove('highlight'));
      });
    });

    // État initial
    $$('.graph-node', graph).forEach((node) => {
      node.classList.toggle('is-active', node.dataset.node === current);
    });
  }

  /* ────────────────────────────────────────────────
     TOAST / EASTER EGG « SIMON PARLE »
     ──────────────────────────────────────────────── */
  function initSimonEasterEgg() {
    const portrait = $('#fiche-simon-wright .fiche-hero img');
    if (!portrait) return;

    const toast = $('#simonToast');
    let clicks = 0;
    let toastTimer = null;

    portrait.addEventListener('click', () => {
      clicks += 1;
      if (clicks < 5) return;

      clicks = 0;
      toast.hidden = false;
      requestAnimationFrame(() => toast.classList.add('show'));
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => { toast.hidden = true; }, 450);
      }, 5200);
    });

    // Message d'aide discret
    portrait.title = 'Cliquez cinq fois…';
  }

  /* ────────────────────────────────────────────────
     CLAVIER ◄ ► + HASH INITIAL
     ──────────────────────────────────────────────── */
  function initKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      const target = e.target;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;

      const idx = CHARS.indexOf(current);
      const next = e.key === 'ArrowRight'
        ? CHARS[(idx + 1) % CHARS.length]
        : CHARS[(idx - 1 + CHARS.length) % CHARS.length];
      switchCharacter(next);
    });
  }

  function initFromHash() {
    const hash = location.hash.replace('#', '');
    if (CHARS.includes(hash)) {
      current = 'captain-future'; // force switch
      switchCharacter(hash, { scroll: false });
    }
  }

  /* ────────────────────────────────────────────────
     INIT
     ──────────────────────────────────────────────── */
  function init() {
    // Construit stats + radar de la fiche initiale
    const activeFiche = $('.char-fiche.is-active');
    if (activeFiche) runFicheEffects(activeFiche);

    // Onglets
    $$('.char-tab').forEach((tab) => {
      tab.addEventListener('click', () => switchCharacter(tab.dataset.target));
    });

    initGraph();
    initSimonEasterEgg();
    initKeyboard();
    initFromHash();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
