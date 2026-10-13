// Beach dressing: structured lounge sets, tall umbrellas, palms, seagulls, offshore fleet.
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

/* ─── Props ─── */

function makeUmbrella(mats, color = 0xe85a4a) {
  const g = new THREE.Group();
  // Dark wood pole — must contrast with sand
  const pole = mat(0x5c3a1e, 1.05);
  const cloth = mat(color, 1.1);
  const tip = mat(0xf5e6b0, 1.12);
  const stripe = mat(0xfff8ee, 1.15);
  // Tall pole (visible above sand)
  box(g, mats, 0.14, 3.4, 0.14, 0, 1.7, 0, pole);
  box(g, mats, 0.22, 0.18, 0.22, 0, 0.12, 0, mat(0x3a2410, 1.0)); // base plate
  // Canopy high up
  box(g, mats, 3.0, 0.12, 3.0, 0, 3.35, 0, cloth);
  box(g, mats, 2.2, 0.1, 2.2, 0, 3.48, 0, cloth);
  box(g, mats, 1.3, 0.08, 1.3, 0, 3.58, 0, cloth);
  box(g, mats, 0.35, 0.28, 0.35, 0, 3.75, 0, tip);
  box(g, mats, 3.05, 0.05, 0.3, 0, 3.38, 0, stripe);
  box(g, mats, 0.3, 0.05, 3.05, 0, 3.38, 0, stripe);
  return g;
}

function makeLounger(mats, clothHex = 0x3a7ec8) {
  const g = new THREE.Group();
  const wood = mat(0x8b6914, 1.05);
  const cloth = mat(clothHex, 1.1);
  box(g, mats, 0.95, 0.1, 2.05, 0, 0.32, 0.1, wood);
  box(g, mats, 0.1, 0.32, 0.1, -0.4, 0.16, 0.95, wood);
  box(g, mats, 0.1, 0.32, 0.1, 0.4, 0.16, 0.95, wood);
  box(g, mats, 0.1, 0.45, 0.1, -0.4, 0.22, -0.85, wood);
  box(g, mats, 0.1, 0.45, 0.1, 0.4, 0.22, -0.85, wood);
  box(g, mats, 0.9, 0.12, 1.4, 0, 0.42, 0.28, cloth);
  box(g, mats, 0.9, 0.9, 0.14, 0, 0.9, -0.8, cloth);
  box(g, mats, 0.9, 0.1, 0.4, 0, 0.46, -0.5, cloth);
  return g;
}

function makeTowel(mats, hex) {
  const g = new THREE.Group();
  box(g, mats, 1.15, 0.04, 1.9, 0, 0.03, 0, mat(hex, 1.1));
  box(g, mats, 1.15, 0.03, 0.18, 0, 0.045, -0.88, mat(0xffffff, 1.15));
  return g;
}

function makeCooler(mats) {
  const g = new THREE.Group();
  box(g, mats, 0.75, 0.55, 0.55, 0, 0.3, 0, mat(0x1a6ab8, 1.08));
  box(g, mats, 0.78, 0.08, 0.58, 0, 0.6, 0, mat(0xf0f0f0, 1.12));
  box(g, mats, 0.22, 0.12, 0.14, 0.28, 0.64, 0, mat(0xe05040, 1.12));
  return g;
}

function makeBall(mats) {
  const g = new THREE.Group();
  box(g, mats, 0.48, 0.48, 0.48, 0, 0.26, 0, mat(0xf0a020, 1.15));
  box(g, mats, 0.5, 0.12, 0.5, 0, 0.26, 0, mat(0xffffff, 1.15));
  box(g, mats, 0.12, 0.5, 0.5, 0, 0.26, 0, mat(0xe05040, 1.12));
  return g;
}

function makePalm(mats, bend = 0) {
  const g = new THREE.Group();
  const trunk = mat(0x8a5528, 1.05);
  const leaf = mat(0x228b3a, 1.12);
  const leaf2 = mat(0x2fad48, 1.1);
  box(g, mats, 0.42, 3.0, 0.42, bend * 0.12, 1.5, 0, trunk);
  box(g, mats, 0.34, 1.1, 0.34, bend * 0.4, 2.95, bend * 0.1, trunk);
  box(g, mats, 2.6, 0.14, 0.6, 1.0, 3.55, 0, leaf);
  box(g, mats, 2.6, 0.14, 0.6, -1.0, 3.48, 0.1, leaf2);
  box(g, mats, 0.6, 0.14, 2.4, 0.1, 3.6, 0.95, leaf);
  box(g, mats, 0.6, 0.14, 2.4, -0.1, 3.42, -0.95, leaf2);
  box(g, mats, 2.0, 0.12, 0.5, 0.55, 3.65, 0.55, leaf);
  box(g, mats, 2.0, 0.12, 0.5, -0.6, 3.5, -0.45, leaf2);
  box(g, mats, 0.3, 0.3, 0.3, 0.4, 3.3, 0.25, mat(0x6b3f1a, 1.05));
  box(g, mats, 0.26, 0.26, 0.26, -0.3, 3.25, 0.2, mat(0x7a4a22, 1.05));
  return g;
}

function makeVolleyballNet(mats) {
  const g = new THREE.Group();
  const post = mat(0x5c3a1e, 1.05);
  const rope = mat(0xf5f0e6, 1.08);
  const net = mat(0xd8e0ea, 0.7);
  box(g, mats, 0.16, 2.5, 0.16, -3.0, 1.25, 0, post);
  box(g, mats, 0.16, 2.5, 0.16, 3.0, 1.25, 0, post);
  box(g, mats, 6.0, 0.06, 0.06, 0, 2.35, 0, rope);
  box(g, mats, 6.0, 0.06, 0.06, 0, 1.1, 0, rope);
  for (let i = -2; i <= 2; i++) box(g, mats, 0.04, 1.2, 0.04, i * 1.2, 1.7, 0, net);
  for (let j = 0; j < 4; j++) box(g, mats, 6.0, 0.03, 0.03, 0, 1.25 + j * 0.28, 0, net);
  return g;
}

function makeSandcastle(mats) {
  const g = new THREE.Group();
  const sand = mat(0xe8d090, 1.1);
  box(g, mats, 1.2, 0.5, 1.2, 0, 0.25, 0, sand);
  for (const [x, z] of [[-0.4, -0.4], [0.4, -0.4], [-0.4, 0.4], [0.4, 0.4]]) {
    box(g, mats, 0.32, 0.55, 0.32, x, 0.75, z, sand);
  }
  box(g, mats, 0.55, 0.75, 0.55, 0, 0.85, 0, sand);
  box(g, mats, 0.18, 0.28, 0.18, 0, 1.3, 0, mat(0xe05040, 1.12));
  return g;
}

function makeSurfboard(mats, hex) {
  const g = new THREE.Group();
  box(g, mats, 0.5, 0.08, 2.1, 0, 0.06, 0, mat(hex, 1.1));
  box(g, mats, 0.22, 0.05, 1.7, 0, 0.1, 0, mat(0xffffff, 1.15));
  return g;
}

function makeSailboat(mats, scale = 1) {
  const g = new THREE.Group();
  const hull = mat(0xd4b878, 1.08);
  const stripe = mat(0xc4452a, 1.1);
  const mast = mat(0x5c3a1e, 1.05);
  const sail = mat(0xfff8f0, 1.15);
  box(g, mats, 2.8, 0.6, 1.1, 0, 0.25, 0, hull);
  box(g, mats, 1.9, 0.4, 0.8, 0.3, 0.55, 0, hull);
  box(g, mats, 2.85, 0.14, 0.25, 0, 0.55, 0, stripe);
  box(g, mats, 0.12, 2.8, 0.12, -0.1, 1.7, 0, mast);
  box(g, mats, 1.7, 2.2, 0.07, 0.65, 1.85, 0, sail);
  box(g, mats, 1.0, 1.1, 0.06, -0.7, 1.45, 0, sail);
  g.scale.setScalar(scale);
  return g;
}

/** Big readable freighter silhouette for the daytime horizon. */
function makeHorizonFreighter(mats, scale = 1) {
  const g = new THREE.Group();
  const hull = mat(0x2f3848, 1.08);
  const red = mat(0xa83828, 1.1);
  const bridge = mat(0xe8ecf0, 1.12);
  const stack = mat(0x1a1e24, 1.05);
  const contA = mat(0xc9a040, 1.1);
  const contB = mat(0x2a70b8, 1.1);
  box(g, mats, 10, 1.5, 2.6, 0, 0.55, 0, hull);
  box(g, mats, 10.3, 0.4, 2.7, 0, -0.05, 0, red);
  box(g, mats, 2.6, 2.0, 2.2, -3.0, 2.0, 0, bridge);
  box(g, mats, 0.55, 1.6, 0.55, -2.5, 3.4, 0, stack);
  box(g, mats, 4.0, 1.1, 2.0, 1.6, 1.5, 0, contA);
  box(g, mats, 1.5, 1.1, 2.0, 4.0, 1.5, 0, contB);
  g.scale.setScalar(scale);
  return g;
}

/** Simple seagull — white body, grey wings (procedural, always visible). */
function makeSeagull(mats) {
  const g = new THREE.Group();
  const body = mat(0xf5f5f5, 1.15);
  const wing = mat(0xd0d4d8, 1.12);
  const beak = mat(0xf0a020, 1.15);
  box(g, mats, 0.55, 0.28, 0.28, 0, 0, 0, body);
  box(g, mats, 1.4, 0.08, 0.35, 0, 0.05, 0, wing);
  box(g, mats, 0.2, 0.12, 0.12, 0.35, 0.02, 0, beak);
  box(g, mats, 0.12, 0.12, 0.12, -0.28, 0.08, 0, mat(0x2a2a2a, 1.0));
  return g;
}

function sandOk(world, x, z) {
  if (!world.inside(x, GY, z)) return false;
  const t = world.get(x, GY, z);
  return (t === B.SAND || t === B.PATH) && world.get(x, GY + 1, z) === B.AIR;
}

export class BeachDecor {
  constructor(game) {
    this.game = game;
    this.root = new THREE.Group();
    this.root.name = 'beachDecor';
    this._mats = [];
    this._ships = [];
    this._birds = [];
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
      palm: 'tree_palm_detailed_tall.glb',
      palmBend: 'tree_palm_bend.glb',
      palmTall: 'tree_palm_tall.glb',
    };
    const out = {};
    await Promise.all(Object.entries(files).map(async ([key, file]) => {
      try {
        out[key] = (await this._loader.loadAsync(ASSET(file))).scene;
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
    this._placeBeachResort();
    this._placeSeagulls();
    this._placeOffshoreFleet(); // procedural — always visible, no water-check trap
    this._ensureTemplates().then(() => {
      if (loadId !== this._loadId) return;
      this._placeKenneyPalms();
    });
  }

  /** Structured resort layout: lounge sets under umbrellas, palm rows, court. */
  _placeBeachResort() {
    const w = this.game.world;
    const mats = this._mats;
    const sandY = GY + 0.02;
    const beach = LAYOUT.beach;
    if (!beach) return;
    const xMid = LAYOUT.pathX;
    const pier = LAYOUT.pier;
    const z0 = beach.z0 + 2;
    const z1 = beach.z1 - 3;
    const zMid = Math.floor((z0 + z1) / 2);

    const umbrellaColors = [0xe85a4a, 0xf0c040, 0x3a90d8, 0xff6a9a, 0x50c8a0, 0xff8c40];
    const loungerColors = [0x3a7ec8, 0xe85a4a, 0xf0c040, 0xffffff, 0x50c8a0, 0xff6a9a];

    // Fixed lounge-set slots (grid) — umbrella with loungers UNDER the canopy
    const sets = [
      [xMid - 14, z0 + 3],
      [xMid - 7, z0 + 5],
      [xMid + 2, z0 + 3],
      [xMid + 10, z0 + 5],
      [xMid - 11, zMid],
      [xMid + 6, zMid + 1],
      [xMid - 4, z1 - 2],
      [xMid + 12, z1 - 3],
    ];

    let si = 0;
    for (const [cx, cz] of sets) {
      if (pier && cx >= pier.x0 - 2 && cx <= pier.x1 + 3 && cz >= pier.z0) continue;
      if (!sandOk(w, cx, cz)) continue;
      const um = makeUmbrella(mats, umbrellaColors[si % umbrellaColors.length]);
      um.position.set(cx + 0.5, sandY, cz + 0.5);
      um.rotation.y = (si % 5) * 0.15;
      this.root.add(um);

      // Loungers under the canopy (toward the sea = +Z)
      const L1 = makeLounger(mats, loungerColors[si % loungerColors.length]);
      L1.position.set(cx + 1.55, sandY, cz + 1.5);
      L1.rotation.y = Math.PI + 0.25;
      this.root.add(L1);
      const L2 = makeLounger(mats, loungerColors[(si + 1) % loungerColors.length]);
      L2.position.set(cx - 0.55, sandY, cz + 1.55);
      L2.rotation.y = Math.PI - 0.3;
      this.root.add(L2);

      const towel = makeTowel(mats, si % 2 ? 0xf06080 : 0x40a0e0);
      towel.position.set(cx + 0.3, sandY, cz + 2.7);
      towel.rotation.y = 0.15;
      this.root.add(towel);

      if (si % 2 === 0) {
        const c = makeCooler(mats);
        c.position.set(cx + 2.2, sandY, cz + 0.35);
        this.root.add(c);
      } else {
        const b = makeBall(mats);
        b.position.set(cx - 1.5, sandY, cz + 2.3);
        this.root.add(b);
      }
      si++;
    }

    // Palm rows along the flanks (not random scatter)
    const palmRow = [
      [xMid - 20, z0 + 2], [xMid - 20, zMid], [xMid - 20, z1 - 1],
      [xMid - 17, z0 + 6], [xMid - 17, z1 - 4],
      [xMid + 18, z0 + 2], [xMid + 18, zMid], [xMid + 18, z1 - 1],
      [xMid + 21, z0 + 6], [xMid + 21, z1 - 4],
    ];
    palmRow.forEach(([px, pz], i) => {
      if (!sandOk(w, px, pz)) return;
      const p = makePalm(mats, i % 2 ? 0.5 : -0.4);
      p.position.set(px + 0.5, sandY, pz + 0.5);
      p.rotation.y = i * 0.7;
      p.scale.setScalar(1.05 + (i % 3) * 0.1);
      this.root.add(p);
    });

    // Volleyball court — left side, clear of lounge sets
    const vx = xMid - 10;
    const vz = zMid + 2;
    if (sandOk(w, vx, vz)) {
      const net = makeVolleyballNet(mats);
      net.position.set(vx + 0.5, sandY, vz + 0.5);
      net.rotation.y = 0.1;
      this.root.add(net);
      const ball = makeBall(mats);
      ball.position.set(vx + 2.0, sandY, vz + 1.4);
      this.root.add(ball);
    }

    // Near-water toys
    for (const [tx, tz, kind] of [
      [xMid - 8, z1 - 1, 'castle'],
      [xMid + 3, z1 - 1, 'board'],
      [xMid + 9, z1 - 2, 'board'],
    ]) {
      if (!sandOk(w, tx, tz)) continue;
      if (kind === 'castle') {
        const sc = makeSandcastle(mats);
        sc.position.set(tx + 0.5, sandY, tz + 0.5);
        this.root.add(sc);
      } else {
        const sb = makeSurfboard(mats, tx % 2 ? 0xff6a3a : 0x3a90d8);
        sb.position.set(tx + 0.5, sandY, tz + 0.5);
        sb.rotation.y = 0.8;
        this.root.add(sb);
      }
    }
  }

  _placeSeagulls() {
    const mats = this._mats;
    const beach = LAYOUT.beach;
    const xMid = LAYOUT.pathX;
    const z0 = beach?.z0 ?? LAYOUT.farmZone.z1 + 14;
    const z1 = beach?.z1 ?? z0 + 20;
    const zm = (z0 + z1) * 0.5;
    const flock = [
      [xMid - 12, GY + 8, z0 + 4, 1.2, 0.0],
      [xMid - 4, GY + 10, z0 + 8, 1.5, 1.2],
      [xMid + 6, GY + 9, zm, 1.1, 2.4],
      [xMid + 14, GY + 11, z1 - 2, 1.4, 3.1],
      [xMid - 8, GY + 12, z1 - 4, 1.3, 4.0],
      [xMid + 2, GY + 7.5, z0 + 12, 1.6, 5.2],
      [xMid + 10, GY + 13, z0 + 6, 1.0, 0.7],
      [xMid - 16, GY + 9.5, zm, 1.35, 2.0],
    ];
    for (const [x, y, z, speed, phase] of flock) {
      const bird = makeSeagull(mats);
      bird.position.set(x, y, z);
      bird.rotation.y = Math.random() * Math.PI * 2;
      this.root.add(bird);
      this._birds.push({
        mesh: bird,
        ox: x,
        oy: y,
        oz: z,
        speed,
        phase,
        radius: 4 + Math.random() * 5,
      });
    }
  }

  /**
   * Always place a daytime offshore fleet with procedural models.
   * (Kenney GLBs + strict sand-clearance previously deleted every ship.)
   */
  _placeOffshoreFleet() {
    const mats = this._mats;
    const xMid = LAYOUT.pathX;
    const waterLine = LAYOUT.waterLineZ ?? ((LAYOUT.beach?.z1 ?? LAYOUT.farmZone.z1 + 30) + 1);
    const midZ = Math.min(WZ - 6, waterLine + 8);
    const farZ = Math.min(WZ - 3, waterLine + 14);
    const horizonZ = Math.min(WZ - 2, Math.max(farZ + 2, WZ - 4));

    const add = (mesh, x, y, z, yaw, bob = 0.06) => {
      mesh.position.set(x, y, z);
      mesh.rotation.y = yaw;
      this.root.add(mesh);
      this._ships.push({ mesh, baseY: y, phase: Math.random() * 6, bob });
    };

    // Mid-sea sailboats (clear of sand shelf)
    add(makeSailboat(mats, 1.35), xMid - 16, SEA - 0.05, midZ, 0.5);
    add(makeSailboat(mats, 1.15), xMid + 2, SEA - 0.05, midZ + 2, -0.35);
    add(makeSailboat(mats, 1.45), xMid + 16, SEA - 0.05, midZ + 1, 0.2);

    // Larger freighters further out — dark silhouette cuts through fog
    add(makeHorizonFreighter(mats, 1.4), xMid - 22, SEA + 0.1, farZ, 0.12, 0.05);
    add(makeHorizonFreighter(mats, 1.7), xMid + 6, SEA + 0.1, farZ + 1, -0.06, 0.05);
    add(makeHorizonFreighter(mats, 1.25), xMid + 28, SEA + 0.1, farZ, 0.22, 0.05);

    // Tiny horizon dots even farther (readable blocks)
    add(makeHorizonFreighter(mats, 0.85), xMid - 10, SEA + 0.15, horizonZ, 0.05, 0.04);
    add(makeSailboat(mats, 0.9), xMid + 18, SEA - 0.02, horizonZ - 1, -0.4, 0.05);
  }

  _placeKenneyPalms() {
    const sandY = GY + 0.02;
    const beach = LAYOUT.beach;
    const xMid = LAYOUT.pathX;
    const bz0 = beach?.z0 ?? LAYOUT.farmZone.z1 + 13;
    const keys = ['palm', 'palmBend', 'palmTall'];
    const slots = [
      [xMid - 19, bz0 + 8, 3.2],
      [xMid + 19, bz0 + 9, 3.0],
    ];
    slots.forEach(([px, pz, sc], i) => {
      if (this.game.world.get(px, GY, pz) !== B.SAND) return;
      const p = this._clone(keys[i % keys.length], sc);
      if (!p) return;
      p.position.set(px + 0.5, sandY, pz + 0.5);
      this.root.add(p);
    });
  }

  update() {
    const t = performance.now() * 0.001;
    for (const s of this._ships) {
      s.mesh.position.y = s.baseY + Math.sin(t * 1.1 + s.phase) * s.bob;
      s.mesh.rotation.z = Math.sin(t * 0.7 + s.phase) * 0.015;
    }
    for (const b of this._birds) {
      const a = t * b.speed + b.phase;
      b.mesh.position.x = b.ox + Math.cos(a) * b.radius;
      b.mesh.position.z = b.oz + Math.sin(a) * b.radius * 0.6;
      b.mesh.position.y = b.oy + Math.sin(a * 2.1) * 0.6;
      b.mesh.rotation.y = a + Math.PI / 2;
      // Wing flap
      b.mesh.rotation.z = Math.sin(t * 8 + b.phase) * 0.25;
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
    this._birds = [];
  }

  dispose() {
    this._loadId++;
    this.disposeMeshes();
    this.game.scene.remove(this.root);
  }
}
