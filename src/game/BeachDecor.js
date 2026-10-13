// Beach set dressing — Kenney CC0 GLBs (ships, palms, chairs, parasols) + pier dock.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { LAYOUT, GY, SEA, WZ } from './world/World.js';
import { B } from './world/blocks.js';
import { solidEntityMaterial, setEntityLight } from './world/materials.js';

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

/** Rebind Kenney materials to game fog/light shaders (scene has no classic lights). */
function adaptGltf(root, mats) {
  root.traverse((o) => {
    if (!o.isMesh) return;
    const src = o.material;
    let hex = 0xc8c8c8;
    if (src?.color) hex = src.color.getHex();
    else if (src?.map) hex = 0xd0c8b0;
    const m = solidEntityMaterial(hex, { shade: 1.0 });
    mats.push(m);
    if (Array.isArray(o.material)) o.material.forEach((mm) => mm.dispose?.());
    else o.material?.dispose?.();
    o.material = m;
    o.castShadow = false;
    o.receiveShadow = false;
  });
}

function makeTowel(mats, hex) {
  const g = new THREE.Group();
  box(g, mats, 1.1, 0.04, 1.8, 0, 0.03, 0, mat(hex, 1.05));
  box(g, mats, 1.1, 0.03, 0.15, 0, 0.04, -0.85, mat(0xffffff, 1.1));
  return g;
}

function makeCooler(mats) {
  const g = new THREE.Group();
  box(g, mats, 0.7, 0.55, 0.5, 0, 0.28, 0, mat(0x2a80d0));
  box(g, mats, 0.72, 0.08, 0.52, 0, 0.58, 0, mat(0xe8e8e8));
  box(g, mats, 0.2, 0.12, 0.12, 0.25, 0.62, 0, mat(0xe05040));
  return g;
}

function makeBall(mats) {
  const g = new THREE.Group();
  box(g, mats, 0.45, 0.45, 0.45, 0, 0.25, 0, mat(0xf0a020, 1.1));
  box(g, mats, 0.48, 0.12, 0.48, 0, 0.25, 0, mat(0xffffff, 1.15));
  return g;
}

function makeSandcastle(mats) {
  const g = new THREE.Group();
  const sand = mat(0xe8d090, 1.05);
  box(g, mats, 1.1, 0.45, 1.1, 0, 0.22, 0, sand);
  box(g, mats, 0.35, 0.55, 0.35, -0.35, 0.7, -0.35, sand);
  box(g, mats, 0.35, 0.55, 0.35, 0.35, 0.7, -0.35, sand);
  box(g, mats, 0.35, 0.55, 0.35, -0.35, 0.7, 0.35, sand);
  box(g, mats, 0.35, 0.55, 0.35, 0.35, 0.7, 0.35, sand);
  box(g, mats, 0.5, 0.7, 0.5, 0, 0.8, 0, sand);
  box(g, mats, 0.2, 0.25, 0.2, 0, 1.2, 0, mat(0xe05040));
  return g;
}

function makeSurfboard(mats, hex = 0x3a90d8) {
  const g = new THREE.Group();
  box(g, mats, 0.45, 0.08, 2.0, 0, 0.06, 0, mat(hex, 1.05));
  box(g, mats, 0.2, 0.05, 1.6, 0, 0.1, 0, mat(0xffffff, 1.1));
  return g;
}

function makeLifeRing(mats) {
  const g = new THREE.Group();
  box(g, mats, 0.9, 0.12, 0.9, 0, 0.08, 0, mat(0xe05040));
  box(g, mats, 0.95, 0.05, 0.2, 0, 0.1, 0, mat(0xffffff, 1.1));
  box(g, mats, 0.2, 0.05, 0.95, 0, 0.1, 0, mat(0xffffff, 1.1));
  return g;
}

function makeVolleyballNet(mats) {
  const g = new THREE.Group();
  const post = mat(0xe8d8a8);
  const net = mat(0xf5f0e6, 0.85);
  box(g, mats, 0.12, 2.2, 0.12, -2.2, 1.1, 0, post);
  box(g, mats, 0.12, 2.2, 0.12, 2.2, 1.1, 0, post);
  box(g, mats, 4.4, 0.06, 0.06, 0, 2.05, 0, net);
  box(g, mats, 4.4, 0.06, 0.06, 0, 1.2, 0, net);
  box(g, mats, 4.4, 1.0, 0.04, 0, 1.6, 0, mat(0xd0d8e0, 0.55));
  return g;
}

/** Flat SAND/PATH at farm height — interior pads only (not water edge / grass cliff). */
function findSandSpots(world, need) {
  const F = LAYOUT.farmZone;
  const zMin = F.z1 + 7;
  const zMax = Math.min(WZ - 16, F.z1 + 18);
  const xMid = LAYOUT.pathX;
  const out = [];
  for (let z = zMin; z <= zMax; z++) {
    for (let x = xMid - 20; x <= xMid + 20; x++) {
      if (!world.inside(x, GY, z)) continue;
      const top = world.get(x, GY, z);
      if (top !== B.SAND && top !== B.PATH) continue;
      if (world.get(x, GY + 1, z) !== B.AIR) continue;
      const nbr = [[1, 0], [-1, 0], [0, 1], [0, -1]];
      if (nbr.some(([dx, dz]) => world.get(x + dx, GY, z + dz) === B.WATER)) continue;
      if (nbr.some(([dx, dz]) => {
        const g = world.get(x + dx, GY, z + dz);
        return g === B.GRASS || g === B.FARM || g === B.FARM_WET;
      })) continue;
      out.push([x, z]);
    }
  }
  for (let i = out.length - 1; i > 0; i--) {
    const j = (Math.imul(i + 17, 1103515245) >>> 0) % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out.slice(0, need);
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
      parasolA: 'detail_parasol_a.glb',
      parasolB: 'detail_parasol_b.glb',
      lounge: 'lounge_chair_relax.glb',
      lounge2: 'lounge_chair.glb',
      deck: 'deck_chair.glb',
      platform: 'platform_beach.glb',
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
    const sandY = GY + 0.02;
    const w = this.game.world;
    const F = LAYOUT.farmZone;
    const xMid = LAYOUT.pathX;
    const mats = this._mats;

    // Sync fillers while GLBs load
    const spotsEarly = findSandSpots(w, 8);
    for (let i = 0; i < Math.min(3, spotsEarly.length); i++) {
      const [x, z] = spotsEarly[i];
      const towel = makeTowel(mats, i % 2 ? 0xf06080 : 0x40a0e0);
      towel.position.set(x + 0.5, sandY, z + 0.5);
      this.root.add(towel);
    }

    this._ensureTemplates().then((tpl) => {
      if (loadId !== this._loadId) return;
      this._placeAll(tpl, sandY);
    });
  }

  _placeAll(tpl, sandY) {
    const w = this.game.world;
    const F = LAYOUT.farmZone;
    const xMid = LAYOUT.pathX;
    const mats = this._mats;
    const pier = LAYOUT.pier || {
      x0: xMid + 9, x1: xMid + 11,
      z0: F.z1 + 11, z1: F.z1 + 25,
    };

    const spots = findSandSpots(w, 28);
    let si = 0;
    for (let i = 0; i < spots.length && si < 6; i++) {
      const [x, z] = spots[i];
      if (spots.slice(0, i).some(([ax, az]) => Math.hypot(ax - x, az - z) < 5.5)) continue;
      // Keep clear of pier
      if (x >= pier.x0 - 3 && x <= pier.x1 + 4 && z >= pier.z0 - 2) continue;

      const parasol = this._clone(si % 2 ? 'parasolB' : 'parasolA', 1.35);
      if (parasol) {
        parasol.position.set(x + 0.5, sandY, z + 0.5);
        parasol.rotation.y = si * 0.7;
        this.root.add(parasol);
      }

      const chairA = this._clone(si % 2 ? 'deck' : 'lounge', si % 2 ? 1.1 : 1.25);
      if (chairA) {
        chairA.position.set(x + 1.6, sandY, z + 1.3);
        chairA.rotation.y = 0.45 + Math.PI;
        this.root.add(chairA);
      }
      const chairB = this._clone(si % 2 ? 'lounge2' : 'deck', si % 2 ? 1.25 : 1.1);
      if (chairB) {
        chairB.position.set(x - 0.5, sandY, z + 1.4);
        chairB.rotation.y = -0.5 + Math.PI;
        this.root.add(chairB);
      }

      const towel = makeTowel(mats, si % 2 ? 0xf06080 : 0x40a0e0);
      towel.position.set(x + 0.3, sandY, z + 2.6);
      towel.rotation.y = 0.15;
      this.root.add(towel);

      if (si % 2 === 0) {
        const cool = makeCooler(mats);
        cool.position.set(x + 2.2, sandY, z + 0.5);
        this.root.add(cool);
      } else {
        const ball = makeBall(mats);
        ball.position.set(x - 1.4, sandY, z + 2.2);
        this.root.add(ball);
      }
      si++;
    }

    const used = new Set(spots.slice(0, 10).map(([x, z]) => `${x},${z}`));
    const extras = spots.filter(([x, z]) => !used.has(`${x},${z}`));
    if (extras[0]) {
      const [x, z] = extras[0];
      const sc = makeSandcastle(mats);
      sc.position.set(x + 0.5, sandY, z + 0.5);
      this.root.add(sc);
    }
    if (extras[1]) {
      const [x, z] = extras[1];
      const sb = makeSurfboard(mats, 0xff6a3a);
      sb.position.set(x + 0.5, sandY, z + 0.5);
      sb.rotation.y = 0.9;
      this.root.add(sb);
    }
    if (extras[2]) {
      const [x, z] = extras[2];
      const lr = makeLifeRing(mats);
      lr.position.set(x + 0.5, sandY, z + 0.5);
      this.root.add(lr);
    }
    if (extras[3]) {
      const [x, z] = extras[3];
      const net = makeVolleyballNet(mats);
      net.position.set(x + 0.5, sandY, z + 0.5);
      this.root.add(net);
    }
    if (extras[4] && tpl.platform) {
      const [x, z] = extras[4];
      const pl = this._clone('platform', 1.4);
      if (pl) {
        pl.position.set(x + 0.5, sandY, z + 0.5);
        this.root.add(pl);
      }
    }

    // Palm line along beach sides
    const palmKeys = ['palm', 'palmBend', 'palmTall'];
    const palmSlots = [
      [xMid - 18, F.z1 + 9, 2.8],
      [xMid - 14, F.z1 + 12, 3.2],
      [xMid - 20, F.z1 + 14, 2.6],
      [xMid + 16, F.z1 + 10, 3.0],
      [xMid + 19, F.z1 + 13, 2.7],
      [xMid + 14, F.z1 + 16, 3.4],
      [xMid - 8, F.z1 + 15, 2.5],
      [xMid + 6, F.z1 + 17, 2.9],
    ];
    palmSlots.forEach(([px, pz, sc], i) => {
      if (w.get(px, GY, pz) !== B.SAND && w.get(px, GY, pz) !== B.PATH) return;
      const p = this._clone(palmKeys[i % palmKeys.length], sc);
      if (!p) return;
      p.position.set(px + 0.5, sandY, pz + 0.5);
      p.rotation.y = i * 0.9;
      this.root.add(p);
    });

    // ── Pier: docked cargo ship + small boat ──
    const dockZ = pier.z1 - 2;
    const dockX = pier.x1 + 4;
    const docked = this._clone('cargoA', 1.15);
    if (docked) {
      docked.position.set(dockX, SEA - 0.05, dockZ);
      docked.rotation.y = Math.PI / 2 + 0.08;
      this.root.add(docked);
      this._ships.push({ mesh: docked, baseY: SEA - 0.05, phase: 1.2, bob: 0.04 });
    }
    const tug = this._clone('tug', 1.3);
    if (tug) {
      tug.position.set(pier.x0 - 3.5, SEA - 0.1, pier.z0 + 4);
      tug.rotation.y = -0.4;
      this.root.add(tug);
      this._ships.push({ mesh: tug, baseY: SEA - 0.1, phase: 2.5, bob: 0.05 });
    }
    const row = this._clone('row', 1.4);
    if (row) {
      row.position.set(pier.x1 + 2.5, SEA - 0.05, pier.z0 + 2);
      row.rotation.y = 1.1;
      this.root.add(row);
      this._ships.push({ mesh: row, baseY: SEA - 0.05, phase: 0.4, bob: 0.06 });
    }

    // ── Horizon freighters — world edge, in fog, read as distant background ──
    const farZ = WZ - 3;
    const horizon = [
      [xMid - 32, farZ, 'cargoB', 0.55, 0.15],
      [xMid - 8, farZ - 1, 'cargoA', 0.7, -0.05],
      [xMid + 18, farZ, 'cargoB', 0.5, 0.22],
      [xMid + 34, farZ - 1, 'sail', 0.45, -0.3],
    ];
    for (const [x, z, key, sc, yaw] of horizon) {
      const s = this._clone(key, sc);
      if (!s) continue;
      // Sit on water; small scale + max Z + fog = distant silhouette
      s.position.set(x, SEA + 0.02, Math.min(WZ - 2, z));
      s.rotation.y = yaw;
      this.root.add(s);
      this._ships.push({ mesh: s, baseY: SEA + 0.02, phase: Math.random() * 6, bob: 0.05 });
    }
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
      c.traverse?.((o) => {
        o.geometry?.dispose?.();
      });
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
