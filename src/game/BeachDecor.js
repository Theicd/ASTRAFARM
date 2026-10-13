// Beach: Kenney CC0 props (parasols, loungers, palms, watercraft) + seagulls.
// Ships sit ONLY past LAYOUT.waterLineZ — never on sand.
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

/**
 * Kenney models use a baked colormap. MeshBasicMaterial shows those colors correctly
 * (the game has no classic Three.js lights — Lambert/Standard go black/white).
 */
function adaptGltf(root, mats) {
  root.traverse((o) => {
    if (!o.isMesh) return;
    const srcs = Array.isArray(o.material) ? o.material : [o.material];
    const next = srcs.map((src) => {
      let map = src?.map || null;
      if (map) {
        map = map.clone();
        map.colorSpace = THREE.SRGBColorSpace;
        map.flipY = false;
        map.needsUpdate = true;
      }
      const m = new THREE.MeshBasicMaterial({
        map: map || null,
        color: map ? 0xffffff : (src?.color ? src.color.clone() : new THREE.Color(0xb0b8c0)),
        fog: false,
        transparent: !!src?.transparent,
        opacity: src?.opacity ?? 1,
        side: THREE.DoubleSide,
      });
      mats.push(m);
      return m;
    });
    o.material = next.length === 1 ? next[0] : next;
    o.castShadow = false;
    o.receiveShadow = false;
  });
}

function makeSeagull(mats) {
  const g = new THREE.Group();
  const body = mat(0xf5f5f5, 1.15);
  const wing = mat(0xd0d4d8, 1.12);
  box(g, mats, 0.55, 0.28, 0.28, 0, 0, 0, body);
  box(g, mats, 1.4, 0.08, 0.35, 0, 0.05, 0, wing);
  box(g, mats, 0.2, 0.12, 0.12, 0.35, 0.02, 0, mat(0xf0a020, 1.15));
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
    this._placeSeagulls();
    this._ensureTemplates().then(() => {
      if (loadId !== this._loadId) return;
      this._placeKenneyResort();
      this._placeKenneyFleetOffshore();
    });
  }

  /** Kenney parasol + loungers UNDER it, palm rows, volleyball toys. */
  _placeKenneyResort() {
    const w = this.game.world;
    const beach = LAYOUT.beach;
    if (!beach) return;
    const xMid = LAYOUT.pathX;
    const pier = LAYOUT.pier;
    const sandY = GY + 0.02;
    const z0 = beach.z0 + 2;
    const z1 = beach.z1 - 2;
    const zMid = Math.floor((z0 + z1) / 2);

    const sets = [
      [xMid - 12, z0 + 2],
      [xMid - 5, z0 + 3],
      [xMid + 3, z0 + 2],
      [xMid + 10, z0 + 3],
      [xMid - 9, zMid],
      [xMid + 6, zMid],
      [xMid - 3, z1 - 1],
      [xMid + 11, z1 - 1],
    ];

    let si = 0;
    for (const [cx, cz] of sets) {
      if (pier && cx >= pier.x0 - 2 && cx <= pier.x1 + 3 && cz >= pier.z0) continue;
      if (!sandOk(w, cx, cz)) continue;

      const parasol = this._clone(si % 2 ? 'parasolB' : 'parasolA', 2.2);
      if (parasol) {
        parasol.position.set(cx + 0.5, sandY, cz + 0.5);
        parasol.rotation.y = si * 0.4;
        this.root.add(parasol);
      }

      // Sunbeds / loungers directly under the shade (sea-facing)
      const L1 = this._clone(si % 2 ? 'deck' : 'lounge', 1.35);
      if (L1) {
        L1.position.set(cx + 1.5, sandY, cz + 1.45);
        L1.rotation.y = Math.PI + 0.2;
        this.root.add(L1);
      }
      const L2 = this._clone(si % 2 ? 'lounge2' : 'deck', 1.35);
      if (L2) {
        L2.position.set(cx - 0.5, sandY, cz + 1.5);
        L2.rotation.y = Math.PI - 0.25;
        this.root.add(L2);
      }
      si++;
    }

    // Palm line on both flanks
    const palms = [
      [xMid - 18, z0 + 1, 'palm', 3.4],
      [xMid - 18, zMid, 'palmBend', 3.2],
      [xMid - 18, z1 - 1, 'palmTall', 3.5],
      [xMid - 15, z0 + 4, 'palm', 3.0],
      [xMid + 16, z0 + 1, 'palmTall', 3.3],
      [xMid + 16, zMid, 'palm', 3.4],
      [xMid + 16, z1 - 1, 'palmBend', 3.1],
      [xMid + 19, z0 + 4, 'palm', 3.2],
    ];
    for (const [px, pz, key, sc] of palms) {
      if (!sandOk(w, px, pz)) continue;
      const p = this._clone(key, sc);
      if (!p) continue;
      p.position.set(px + 0.5, sandY, pz + 0.5);
      this.root.add(p);
    }
  }

  /**
   * Water starts at LAYOUT.waterLineZ (= beach.z1 + 1).
   * Every craft is placed strictly at z >= waterLine + 2, up to the world edge.
   */
  _placeKenneyFleetOffshore() {
    const xMid = LAYOUT.pathX;
    const beachEnd = LAYOUT.beach?.z1 ?? (LAYOUT.farmZone.z1 + 25);
    const waterLine = LAYOUT.waterLineZ ?? (beachEnd + 1);

    // Sanity: never spawn on sand
    const zMin = Math.max(waterLine + 2, beachEnd + 2);
    const zMax = WZ - 3;
    if (zMin > zMax) {
      console.warn('[BeachDecor] no open water for ships', { waterLine, beachEnd, WZ });
      return;
    }

    const midZ = Math.min(zMax, zMin + 2);
    const farZ = Math.min(zMax, zMin + 5);
    const horizonZ = zMax;

    const add = (key, x, z, scale, yaw, bob = 0.05) => {
      const zz = Math.max(z, zMin);
      if (zz > zMax) return;
      // Refuse if somehow still on sand/planks
      const ix = Math.floor(x);
      const iz = Math.floor(zz);
      if (this.game.world.inside(ix, GY, iz)) {
        const g = this.game.world.get(ix, GY, iz);
        if (g === B.SAND || g === B.PATH || g === B.PLANKS || g === B.GRASS) return;
      }
      const mesh = this._clone(key, scale);
      if (!mesh) return;
      const y = SEA - 0.05;
      mesh.position.set(x, y, zz);
      mesh.rotation.y = yaw;
      this.root.add(mesh);
      this._ships.push({ mesh, baseY: y, phase: Math.random() * 6, bob });
    };

    // Sailboats mid-water
    add('sail', xMid - 14, midZ, 3.2, 0.4);
    add('sail', xMid + 2, midZ + 1, 2.8, -0.35);
    add('sail', xMid + 15, midZ, 3.4, 0.15);
    add('row', xMid - 4, midZ + 2, 2.4, 0.85);
    add('tug', xMid + 9, midZ + 2, 2.6, -0.45);

    // Cargo further out
    add('cargoA', xMid - 18, farZ, 3.5, 0.08, 0.04);
    add('cargoB', xMid + 4, farZ + 1, 3.8, -0.06, 0.04);
    add('cargoA', xMid + 22, farZ, 3.2, 0.18, 0.04);

    // Horizon line
    add('cargoB', xMid - 8, horizonZ, 2.6, 0.05, 0.035);
    add('sail', xMid + 14, horizonZ, 2.4, -0.3, 0.04);
    add('cargoA', xMid + 28, horizonZ, 2.3, 0.12, 0.035);
  }

  _placeSeagulls() {
    const mats = this._mats;
    const beach = LAYOUT.beach;
    const xMid = LAYOUT.pathX;
    const z0 = beach?.z0 ?? LAYOUT.farmZone.z1 + 14;
    const z1 = beach?.z1 ?? z0 + 12;
    const zm = (z0 + z1) * 0.5;
    const flock = [
      [xMid - 12, GY + 8, z0 + 3, 1.2, 0.0],
      [xMid - 4, GY + 10, z0 + 6, 1.5, 1.2],
      [xMid + 6, GY + 9, zm, 1.1, 2.4],
      [xMid + 14, GY + 11, z1 - 1, 1.4, 3.1],
      [xMid - 8, GY + 12, z1 - 2, 1.3, 4.0],
      [xMid + 2, GY + 7.5, z0 + 8, 1.6, 5.2],
      [xMid + 10, GY + 13, z0 + 4, 1.0, 0.7],
      [xMid - 16, GY + 9.5, zm, 1.35, 2.0],
    ];
    for (const [x, y, z, speed, phase] of flock) {
      const bird = makeSeagull(mats);
      bird.position.set(x, y, z);
      this.root.add(bird);
      this._birds.push({
        mesh: bird, ox: x, oy: y, oz: z, speed, phase,
        radius: 4 + Math.random() * 5,
      });
    }
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
