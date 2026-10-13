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

/** Guaranteed-visible sailboat (voxel style) — used offshore so craft always show. */
function makeSailboat(mats, scale = 1) {
  const g = new THREE.Group();
  const hull = mat(0xd8c090, 1.05);
  const stripe = mat(0xc45a3a, 1.08);
  const mast = mat(0xe8d8b0, 1.0);
  const sail = mat(0xf5f0e6, 1.12);
  box(g, mats, 2.6, 0.55, 1.0, 0, 0.22, 0, hull);
  box(g, mats, 1.8, 0.35, 0.75, 0.25, 0.48, 0, hull);
  box(g, mats, 2.65, 0.12, 0.22, 0, 0.5, 0, stripe);
  box(g, mats, 0.1, 2.6, 0.1, -0.15, 1.55, 0, mast);
  box(g, mats, 1.55, 2.0, 0.06, 0.55, 1.7, 0, sail);
  box(g, mats, 0.95, 1.0, 0.05, -0.75, 1.35, 0, sail);
  g.scale.setScalar(scale);
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

  /** Open water: no sand/planks/grass nearby (ships must never hug the shore). */
  _isDeepWater(x, z, clearance = 5) {
    const w = this.game.world;
    const ix = Math.floor(x);
    const iz = Math.floor(z);
    if (!w.inside(ix, SEA, iz)) return false;
    for (let dz = -clearance; dz <= clearance; dz++) {
      for (let dx = -clearance; dx <= clearance; dx++) {
        if (!w.inside(ix + dx, GY, iz + dz)) continue;
        const g = w.get(ix + dx, GY, iz + dz);
        if (g === B.SAND || g === B.PATH || g === B.GRASS || g === B.PLANKS || g === B.FARM || g === B.FARM_WET) {
          return false;
        }
      }
    }
    const here = w.get(ix, GY, iz);
    if (here === B.SAND || here === B.PLANKS || here === B.PATH) return false;
    return (
      w.get(ix, SEA, iz) === B.WATER
      || w.get(ix, SEA - 1, iz) === B.WATER
      || here === B.WATER
      || here === B.AIR
    );
  }

  /** Snap toward +Z open water until clearance is satisfied (or give up). */
  _offshorePoint(x, zHint, clearance = 5) {
    const waterLine = LAYOUT.waterLineZ ?? ((LAYOUT.beach?.z1 ?? LAYOUT.farmZone.z1 + 30) + 1);
    let z = Math.max(zHint, waterLine + clearance);
    z = Math.min(z, WZ - 3);
    for (let tries = 0; tries < 24; tries++) {
      if (this._isDeepWater(x, z, clearance)) return [x, z];
      z += 1;
      if (z > WZ - 3) break;
    }
    // Sideways search at deepest safe z
    const zFar = Math.min(WZ - 3, waterLine + clearance + 6);
    for (const dx of [0, -4, 4, -8, 8, -12, 12]) {
      if (this._isDeepWater(x + dx, zFar, clearance)) return [x + dx, zFar];
    }
    return null;
  }

  _addBobbing(mesh, baseY, bob = 0.05) {
    this.root.add(mesh);
    this._ships.push({ mesh, baseY, phase: Math.random() * 6, bob });
  }

  _placeGltfShip(key, x, z, scale, yaw, bob = 0.05, clearance = 5) {
    const pt = this._offshorePoint(x, z, clearance);
    if (!pt) return false;
    const mesh = this._clone(key, scale);
    if (!mesh) return false;
    const baseY = SEA - 0.15;
    mesh.position.set(pt[0], baseY, pt[1]);
    mesh.rotation.y = yaw;
    this._addBobbing(mesh, baseY, bob);
    return true;
  }

  _placeSailboat(x, z, scale, yaw, clearance = 5) {
    const pt = this._offshorePoint(x, z, clearance);
    if (!pt) return;
    // Procedural sails — always readable voxel boats (Kenney sail used only on horizon)
    const mesh = makeSailboat(this._mats, scale);
    const baseY = SEA - 0.1;
    mesh.position.set(pt[0], baseY, pt[1]);
    mesh.rotation.y = yaw;
    this._addBobbing(mesh, baseY, 0.07);
  }

  _placeShipsAndExtraPalms() {
    const beach = LAYOUT.beach;
    const xMid = LAYOUT.pathX;
    const waterLine = LAYOUT.waterLineZ ?? ((beach?.z1 ?? LAYOUT.farmZone.z1 + 30) + 1);

    // ── Sailboats clearly offshore (never on / against sand) ──
    this._placeSailboat(xMid - 16, waterLine + 7, 1.15, 0.45, 6);
    this._placeSailboat(xMid + 4, waterLine + 9, 1.0, -0.35, 6);
    this._placeSailboat(xMid + 18, waterLine + 8, 1.25, 0.2, 6);
    // Extra procedural sails if GLB path failed silently — force one more
    {
      const pt = this._offshorePoint(xMid - 6, waterLine + 11, 6);
      if (pt) {
        const mesh = makeSailboat(this._mats, 1.1);
        mesh.position.set(pt[0], SEA - 0.1, pt[1]);
        mesh.rotation.y = -0.15;
        this._addBobbing(mesh, SEA - 0.1, 0.07);
      }
    }

    // ── Cargo / tug well past the waterline (large clearance — hulls are long) ──
    this._placeGltfShip('cargoA', xMid + 14, waterLine + 10, 1.0, Math.PI / 2 + 0.08, 0.04, 7);
    this._placeGltfShip('tug', xMid - 10, waterLine + 8, 1.2, -0.4, 0.05, 6);
    this._placeGltfShip('row', xMid + 2, waterLine + 6, 1.4, 0.85, 0.06, 5);

    // ── Horizon freighters ──
    const farZ = WZ - 3;
    this._placeGltfShip('cargoB', xMid - 26, farZ, 0.7, 0.1, 0.04, 4);
    this._placeGltfShip('cargoA', xMid + 4, farZ - 1, 0.85, -0.05, 0.04, 4);
    this._placeGltfShip('cargoB', xMid + 24, farZ, 0.6, 0.18, 0.04, 4);

    // Kenney palms on sand only
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
