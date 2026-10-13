// Beach dressing: colorful props + Kenney CC0 GLBs (textured ships/palms).
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { LAYOUT, GY, SEA, WZ } from './world/World.js';
import { B } from './world/blocks.js';
import { solidEntityMaterial, mapEntityMaterial, setEntityLight } from './world/materials.js';

const ASSET = (name) => `./assets/beach/${name}`;

function mat(hex, shade = 0.95) {
  return solidEntityMaterial(hex, { shade });
}

function box(parent, mats, w, h, d, x, y, z, m) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
  mesh.position.set(x, y, z);
  parent.add(mesh);
  mats.push(m);
  return mesh;
}

/** Keep Kenney colormap textures — without the map everything renders pure white. */
function adaptGltf(root, mats) {
  root.traverse((o) => {
    if (!o.isMesh) return;
    const srcs = Array.isArray(o.material) ? o.material : [o.material];
    const next = srcs.map((src) => {
      const map = src?.map || null;
      const hex = src?.color ? src.color.getHex() : 0xffffff;
      const m = map
        ? mapEntityMaterial(map, { colorHex: hex, shade: 1.05 })
        : solidEntityMaterial(hex === 0xffffff ? 0xb0b8c0 : hex, { shade: 1.0 });
      mats.push(m);
      return m;
    });
    o.material = next.length === 1 ? next[0] : next;
    o.castShadow = false;
    o.receiveShadow = false;
  });
}

/* ─── Procedural colorful props (match farm voxel look, guaranteed color) ─── */

function makeUmbrella(mats, color = 0xe85a4a) {
  const g = new THREE.Group();
  const pole = mat(0xe8d8a8, 1.0);
  const cloth = mat(color, 1.08);
  const tip = mat(0xf5e6b0, 1.1);
  const stripe = mat(0xfff8ee, 1.12);
  box(g, mats, 0.1, 2.5, 0.1, 0, 1.25, 0, pole);
  box(g, mats, 2.8, 0.1, 2.8, 0, 2.5, 0, cloth);
  box(g, mats, 2.0, 0.08, 2.0, 0, 2.6, 0, cloth);
  box(g, mats, 1.2, 0.06, 1.2, 0, 2.68, 0, cloth);
  box(g, mats, 0.3, 0.22, 0.3, 0, 2.82, 0, tip);
  box(g, mats, 2.85, 0.04, 0.28, 0, 2.52, 0, stripe);
  box(g, mats, 0.28, 0.04, 2.85, 0, 2.52, 0, stripe);
  // Sand base
  box(g, mats, 0.35, 0.12, 0.35, 0, 0.06, 0, mat(0xd2b48c, 1.0));
  return g;
}

function makeLounger(mats, clothHex = 0x3a7ec8) {
  const g = new THREE.Group();
  const wood = mat(0xc4a060, 1.0);
  const cloth = mat(clothHex, 1.08);
  // Frame
  box(g, mats, 0.9, 0.08, 2.0, 0, 0.28, 0.1, wood);
  box(g, mats, 0.08, 0.28, 0.08, -0.38, 0.14, 0.9, wood);
  box(g, mats, 0.08, 0.28, 0.08, 0.38, 0.14, 0.9, wood);
  box(g, mats, 0.08, 0.4, 0.08, -0.38, 0.2, -0.8, wood);
  box(g, mats, 0.08, 0.4, 0.08, 0.38, 0.2, -0.8, wood);
  // Cushion + backrest
  box(g, mats, 0.85, 0.1, 1.35, 0, 0.38, 0.25, cloth);
  box(g, mats, 0.85, 0.85, 0.12, 0, 0.85, -0.75, cloth);
  box(g, mats, 0.85, 0.08, 0.35, 0, 0.42, -0.45, cloth);
  return g;
}

function makeTowel(mats, hex) {
  const g = new THREE.Group();
  box(g, mats, 1.15, 0.04, 1.9, 0, 0.03, 0, mat(hex, 1.08));
  box(g, mats, 1.15, 0.03, 0.18, 0, 0.045, -0.88, mat(0xffffff, 1.12));
  box(g, mats, 0.15, 0.035, 1.9, -0.45, 0.04, 0, mat(0xffffff, 1.1));
  return g;
}

function makeCooler(mats) {
  const g = new THREE.Group();
  box(g, mats, 0.75, 0.55, 0.55, 0, 0.3, 0, mat(0x2a80d0, 1.05));
  box(g, mats, 0.78, 0.08, 0.58, 0, 0.6, 0, mat(0xf0f0f0, 1.1));
  box(g, mats, 0.22, 0.12, 0.14, 0.28, 0.64, 0, mat(0xe05040, 1.1));
  return g;
}

function makeBall(mats) {
  const g = new THREE.Group();
  box(g, mats, 0.48, 0.48, 0.48, 0, 0.26, 0, mat(0xf0a020, 1.12));
  box(g, mats, 0.5, 0.12, 0.5, 0, 0.26, 0, mat(0xffffff, 1.15));
  box(g, mats, 0.12, 0.5, 0.5, 0, 0.26, 0, mat(0xe05040, 1.1));
  return g;
}

function makePalm(mats, bend = 0) {
  const g = new THREE.Group();
  const trunk = mat(0xa86f3c, 1.0);
  const leaf = mat(0x2f9e4a, 1.1);
  const leaf2 = mat(0x3cb85a, 1.08);
  box(g, mats, 0.38, 2.6, 0.38, bend * 0.15, 1.3, 0, trunk);
  box(g, mats, 0.32, 1.0, 0.32, bend * 0.35, 2.6, bend * 0.1, trunk);
  // Fronds
  box(g, mats, 2.4, 0.12, 0.55, 0.9, 3.15, 0, leaf);
  box(g, mats, 2.4, 0.12, 0.55, -0.9, 3.1, 0.1, leaf2);
  box(g, mats, 0.55, 0.12, 2.2, 0.1, 3.2, 0.85, leaf);
  box(g, mats, 0.55, 0.12, 2.2, -0.1, 3.05, -0.85, leaf2);
  box(g, mats, 1.8, 0.1, 0.45, 0.5, 3.25, 0.5, leaf);
  box(g, mats, 1.8, 0.1, 0.45, -0.55, 3.18, -0.4, leaf2);
  // Coconuts
  box(g, mats, 0.28, 0.28, 0.28, 0.35, 2.95, 0.2, mat(0x6b3f1a, 1.0));
  box(g, mats, 0.24, 0.24, 0.24, -0.25, 2.9, 0.15, mat(0x7a4a22, 1.0));
  return g;
}

function makeVolleyballNet(mats) {
  const g = new THREE.Group();
  const post = mat(0xe8d8a8, 1.0);
  const rope = mat(0xf5f0e6, 1.05);
  const mesh = mat(0xe8eef5, 0.75);
  // Posts
  box(g, mats, 0.14, 2.4, 0.14, -3.0, 1.2, 0, post);
  box(g, mats, 0.14, 2.4, 0.14, 3.0, 1.2, 0, post);
  box(g, mats, 0.35, 0.12, 0.35, -3.0, 0.06, 0, mat(0xd2b48c));
  box(g, mats, 0.35, 0.12, 0.35, 3.0, 0.06, 0, mat(0xd2b48c));
  // Top / bottom lines
  box(g, mats, 6.0, 0.05, 0.05, 0, 2.25, 0, rope);
  box(g, mats, 6.0, 0.05, 0.05, 0, 1.05, 0, rope);
  // Thin net grid (not a solid wall)
  for (let i = -2; i <= 2; i++) {
    box(g, mats, 0.04, 1.15, 0.04, i * 1.2, 1.65, 0, mesh);
  }
  for (let j = 0; j < 4; j++) {
    box(g, mats, 6.0, 0.03, 0.03, 0, 1.2 + j * 0.28, 0, mesh);
  }
  // Ball nearby marker
  return g;
}

function makeSandcastle(mats) {
  const g = new THREE.Group();
  const sand = mat(0xe8d090, 1.08);
  box(g, mats, 1.2, 0.5, 1.2, 0, 0.25, 0, sand);
  for (const [x, z] of [[-0.4, -0.4], [0.4, -0.4], [-0.4, 0.4], [0.4, 0.4]]) {
    box(g, mats, 0.32, 0.55, 0.32, x, 0.75, z, sand);
  }
  box(g, mats, 0.55, 0.75, 0.55, 0, 0.85, 0, sand);
  box(g, mats, 0.18, 0.28, 0.18, 0, 1.3, 0, mat(0xe05040, 1.1));
  return g;
}

function makeSurfboard(mats, hex) {
  const g = new THREE.Group();
  box(g, mats, 0.5, 0.08, 2.1, 0, 0.06, 0, mat(hex, 1.08));
  box(g, mats, 0.22, 0.05, 1.7, 0, 0.1, 0, mat(0xffffff, 1.12));
  return g;
}

/** Scan entire sand shelf for prop pads. */
function mapSandPads(world) {
  const beach = LAYOUT.beach || {
    x0: LAYOUT.pathX - 24, x1: LAYOUT.pathX + 24,
    z0: LAYOUT.farmZone.z1 + 13, z1: LAYOUT.farmZone.z1 + 28,
  };
  // Never place props on the green lawn belt
  if (LAYOUT.lawnZ1 && beach.z0 <= LAYOUT.lawnZ1) beach.z0 = LAYOUT.lawnZ1 + 1;
  const pier = LAYOUT.pier;
  const pads = [];
  for (let z = beach.z0 + 1; z <= beach.z1 - 2; z++) {
    for (let x = beach.x0 + 2; x <= beach.x1 - 2; x++) {
      if (!world.inside(x, GY, z)) continue;
      const t = world.get(x, GY, z);
      if (t !== B.SAND && t !== B.PATH) continue;
      if (world.get(x, GY + 1, z) !== B.AIR) continue;
      if (pier && x >= pier.x0 - 1 && x <= pier.x1 + 1 && z >= pier.z0) continue;
      // Prefer interior (not water edge)
      const edge = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(
        ([dx, dz]) => world.get(x + dx, GY, z + dz) === B.WATER,
      );
      if (edge) continue;
      pads.push([x, z]);
    }
  }
  return pads;
}

function takeSpaced(pads, count, minDist) {
  const out = [];
  for (const p of pads) {
    if (out.every(([ax, az]) => Math.hypot(ax - p[0], az - p[1]) >= minDist)) {
      out.push(p);
      if (out.length >= count) break;
    }
  }
  return out;
}

export class BeachDecor {
  constructor(game) {
    this.game = game;
    this.root = new THREE.Group();
    this.root.name = 'beachDecor';
    this._mats = [];
    this._ships = [];
    this._loader = new GLTFLoader();
    this._templates = null;
    this._loadId = 0;
    game.scene.add(this.root);
    this.rebuild();
  }

  async _ensureTemplates() {
    if (this._templates) return this._templates;
    const files = {
      cargoA: 'ship_cargo.glb',
      cargoB: 'ship_cargo_b.glb',
      sail: 'boat_sail.glb',
      tug: 'boat_tug.glb',
      row: 'boat_row.glb',
      palm: 'tree_palm_detailed_tall.glb',
      palmBend: 'tree_palm_bend.glb',
      palmTall: 'tree_palm_tall.glb',
    };
    const out = {};
    await Promise.all(Object.entries(files).map(async ([key, file]) => {
      try {
        const gltf = await this._loader.loadAsync(ASSET(file));
        out[key] = gltf.scene;
      } catch (e) {
        console.warn('[BeachDecor] missing', file, e);
      }
    }));
    this._templates = out;
    return out;
  }

  _clone(key, scale = 1) {
    const src = this._templates?.[key];
    if (!src) return null;
    const g = src.clone(true);
    adaptGltf(g, this._mats);
    g.scale.setScalar(scale);
    return g;
  }

  rebuild() {
    this.disposeMeshes();
    const loadId = ++this._loadId;
    // Place colorful props immediately (don't wait for GLB)
    this._placeColorProps();
    this._ensureTemplates().then(() => {
      if (loadId !== this._loadId) return;
      this._placeShipsAndExtraPalms();
    });
  }

  _placeColorProps() {
    const w = this.game.world;
    const mats = this._mats;
    const sandY = GY + 0.02;
    const pads = mapSandPads(w);
    if (!pads.length) return;

    // Shuffle deterministically
    for (let i = pads.length - 1; i > 0; i--) {
      const j = (Math.imul(i + 31, 1103515245) >>> 0) % (i + 1);
      [pads[i], pads[j]] = [pads[j], pads[i]];
    }

    const umbrellaColors = [0xe85a4a, 0xf0c040, 0x3a90d8, 0xff6a9a, 0x50c8a0, 0xff8c40];
    const loungerColors = [0x3a7ec8, 0xe85a4a, 0xf0c040, 0xffffff, 0x50c8a0, 0xff6a9a];

    // ── Lounge clusters: umbrella + 2 loungers + towel + cooler/ball ──
    const clusters = takeSpaced(pads, 7, 6.5);
    clusters.forEach(([x, z], i) => {
      const um = makeUmbrella(mats, umbrellaColors[i % umbrellaColors.length]);
      um.position.set(x + 0.5, sandY, z + 0.5);
      um.rotation.y = i * 0.55;
      this.root.add(um);

      const L1 = makeLounger(mats, loungerColors[i % loungerColors.length]);
      L1.position.set(x + 1.7, sandY, z + 1.4);
      L1.rotation.y = 0.35 + Math.PI;
      this.root.add(L1);

      const L2 = makeLounger(mats, loungerColors[(i + 2) % loungerColors.length]);
      L2.position.set(x - 0.6, sandY, z + 1.5);
      L2.rotation.y = -0.4 + Math.PI;
      this.root.add(L2);

      const towel = makeTowel(mats, i % 2 ? 0xf06080 : 0x40a0e0);
      towel.position.set(x + 0.4, sandY, z + 2.8);
      towel.rotation.y = 0.2;
      this.root.add(towel);

      if (i % 2 === 0) {
        const c = makeCooler(mats);
        c.position.set(x + 2.3, sandY, z + 0.4);
        this.root.add(c);
      } else {
        const b = makeBall(mats);
        b.position.set(x - 1.5, sandY, z + 2.4);
        this.root.add(b);
      }
    });

    // ── Palm line along both shores ──
    const palmPads = takeSpaced(
      pads.filter(([x]) => Math.abs(x - LAYOUT.pathX) > 8),
      10,
      5,
    );
    palmPads.forEach(([x, z], i) => {
      const p = makePalm(mats, i % 2 ? 0.6 : -0.4);
      p.position.set(x + 0.5, sandY, z + 0.5);
      p.rotation.y = i * 0.8;
      p.scale.setScalar(0.95 + (i % 3) * 0.12);
      this.root.add(p);
    });

    // ── Volleyball court (left of path, on sand) ──
    const beachZ0 = LAYOUT.beach?.z0 ?? LAYOUT.farmZone.z1 + 13;
    const court = pads.find(([x, z]) => x < LAYOUT.pathX - 6 && z >= beachZ0 + 3);
    if (court) {
      const [x, z] = court;
      const net = makeVolleyballNet(mats);
      net.position.set(x + 0.5, sandY, z + 0.5);
      net.rotation.y = 0.12;
      this.root.add(net);
      const ball = makeBall(mats);
      ball.position.set(x + 2.2, sandY, z + 1.5);
      this.root.add(ball);
    }

    // ── Extras: castles, boards ──
    const extras = takeSpaced(
      pads.filter((p) => clusters.every(([cx, cz]) => Math.hypot(cx - p[0], cz - p[1]) > 4)),
      6,
      7,
    );
    extras.forEach(([x, z], i) => {
      if (i % 3 === 0) {
        const sc = makeSandcastle(mats);
        sc.position.set(x + 0.5, sandY, z + 0.5);
        this.root.add(sc);
      } else {
        const sb = makeSurfboard(mats, i % 2 ? 0xff6a3a : 0x3a90d8);
        sb.position.set(x + 0.5, sandY, z + 0.5);
        sb.rotation.y = 0.7 + i * 0.3;
        this.root.add(sb);
      }
    });
  }

  /** True only when this column is open water (ships must never sit on sand). */
  _isWaterColumn(x, z) {
    const w = this.game.world;
    if (!w.inside(x, SEA, z)) return false;
    const g = w.get(x, GY, z);
    if (g === B.SAND || g === B.PATH || g === B.GRASS || g === B.PLANKS) return false;
    return w.get(x, SEA, z) === B.WATER || w.get(x, SEA - 1, z) === B.WATER || g === B.WATER || g === B.AIR;
  }

  _placeShip(key, x, z, scale, yaw, bob = 0.05) {
    if (!this._isWaterColumn(Math.floor(x), Math.floor(z))) return;
    const mesh = this._clone(key, scale);
    if (!mesh) return;
    const baseY = SEA - 0.12;
    mesh.position.set(x, baseY, z);
    mesh.rotation.y = yaw;
    this.root.add(mesh);
    this._ships.push({ mesh, baseY, phase: Math.random() * 6, bob });
  }

  _placeShipsAndExtraPalms() {
    const pier = LAYOUT.pier;
    const beach = LAYOUT.beach;
    const xMid = LAYOUT.pathX;
    const beachEnd = beach?.z1 ?? (LAYOUT.farmZone.z1 + 30);

    // Docked craft — ONLY past the sand shelf, in water next to pier tip
    if (pier) {
      this._placeShip('cargoA', pier.x1 + 7, pier.z1 + 0.5, 1.15, Math.PI / 2 + 0.05, 0.04);
      this._placeShip('tug', pier.x0 - 5.5, pier.z1 + 0.5, 1.3, -0.55, 0.05);
      this._placeShip('row', pier.x1 + 4, pier.z1 + 2, 1.45, 0.9, 0.06);
    }
    // Mid-water sailboats just past beach
    this._placeShip('sail', xMid - 14, beachEnd + 4, 0.9, 0.4, 0.06);
    this._placeShip('sail', xMid + 12, beachEnd + 5, 0.75, -0.3, 0.06);

    // Horizon freighters — world edge
    const farZ = WZ - 3;
    this._placeShip('cargoB', xMid - 28, farZ, 0.65, 0.1, 0.04);
    this._placeShip('cargoA', xMid + 2, farZ - 1, 0.8, -0.05, 0.04);
    this._placeShip('cargoB', xMid + 26, farZ, 0.55, 0.18, 0.04);

    // Kenney palms only on confirmed sand pads (interior beach)
    const sandY = GY + 0.02;
    const palmKeys = ['palm', 'palmBend', 'palmTall'];
    const bz0 = beach?.z0 ?? LAYOUT.farmZone.z1 + 13;
    const slots = [
      [xMid - 18, bz0 + 4, 3.0],
      [xMid - 14, bz0 + 10, 3.3],
      [xMid + 16, bz0 + 5, 3.1],
      [xMid + 20, bz0 + 11, 2.9],
    ];
    slots.forEach(([px, pz, sc], i) => {
      if (this.game.world.get(px, GY, pz) !== B.SAND) return;
      const p = this._clone(palmKeys[i % palmKeys.length], sc);
      if (!p) return;
      p.position.set(px + 0.5, sandY, pz + 0.5);
      p.rotation.y = i * 1.1;
      this.root.add(p);
    });
  }

  update() {
    const t = performance.now() * 0.001;
    for (const s of this._ships) {
      s.mesh.position.y = s.baseY + Math.sin(t * 1.1 + s.phase) * s.bob;
      s.mesh.rotation.z = Math.sin(t * 0.7 + s.phase) * 0.015;
    }
    for (const m of this._mats) {
      if (m.uniforms?.uLight) setEntityLight(m, 14, 0);
    }
  }

  disposeMeshes() {
    while (this.root.children.length) {
      const c = this.root.children.pop();
      c.traverse?.((o) => o.geometry?.dispose?.());
      this.root.remove(c);
    }
    for (const m of this._mats) m.dispose?.();
    this._mats = [];
    this._ships = [];
  }

  dispose() {
    this._loadId++;
    this.disposeMeshes();
    this.game.scene.remove(this.root);
  }
}
