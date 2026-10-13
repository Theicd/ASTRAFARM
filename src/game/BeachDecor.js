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

  /**
   * Kenney city parasols are ~0.45m and loungers ~0.6m — scale them up to real beach size.
   * Sets: parasol with two sunbeds under the canopy, palms on the flanks.
   */
  _placeKenneyResort() {
    const w = this.game.world;
    const beach = LAYOUT.beach;
    if (!beach) return;
    const xMid = LAYOUT.pathX;
    const sandY = GY + 1.02; // top of the GY sand block
    const z0 = beach.z0 + 3; // past the short entrance path
    const z1 = beach.z1 - 2;

    // Two tidy rows, clear of the center path
    const sets = [
      [xMid - 14, z0],
      [xMid - 7, z0 + 1],
      [xMid + 6, z0],
      [xMid + 13, z0 + 1],
      [xMid - 11, z1 - 1],
      [xMid - 4, z1],
      [xMid + 4, z1 - 1],
      [xMid + 11, z1],
    ];

    let si = 0;
    for (const [cx, cz] of sets) {
      if (Math.abs(cx - xMid) < 2) continue;
      if (!sandOk(w, cx, cz)) continue;
      // Parasol raw height 0.45 → scale 7 ≈ 3.1m pole + ~2.4m canopy
      const parasol = this._clone(si % 2 ? 'parasolB' : 'parasolA', 7);
      if (parasol) {
        parasol.position.set(cx + 0.5, sandY, cz + 0.5);
        parasol.rotation.y = si * 0.35;
        this.root.add(parasol);
      }
      // Lounger raw ~0.67m → scale 2.6 ≈ 1.7m sunbed, sitting under the canopy
      const L1 = this._clone(si % 2 ? 'deck' : 'lounge', 2.6);
      if (L1) {
        L1.position.set(cx + 1.15, sandY, cz + 0.85);
        L1.rotation.y = Math.PI + 0.15;
        this.root.add(L1);
      }
      const L2 = this._clone(si % 2 ? 'lounge' : 'deck', 2.6);
      if (L2) {
        L2.position.set(cx - 0.15, sandY, cz + 0.9);
        L2.rotation.y = Math.PI - 0.2;
        this.root.add(L2);
      }
      si++;
    }

    // Palm raw height ~1.4m → scale 3.2 ≈ 4.5m trees along both edges
    const palms = [
      [xMid - 20, z0, 'palm', 3.2],
      [xMid - 20, (z0 + z1) / 2, 'palmBend', 3.0],
      [xMid - 20, z1, 'palmTall', 3.4],
      [xMid - 17, z0 + 3, 'palm', 2.8],
      [xMid + 18, z0, 'palmTall', 3.3],
      [xMid + 18, (z0 + z1) / 2, 'palm', 3.1],
      [xMid + 18, z1, 'palmBend', 3.0],
      [xMid + 21, z0 + 3, 'palm', 2.9],
    ];
    for (const [px, pz, key, sc] of palms) {
      const ix = Math.round(px);
      const iz = Math.round(pz);
      if (!sandOk(w, ix, iz)) continue;
      const p = this._clone(key, sc);
      if (!p) continue;
      p.position.set(ix + 0.5, sandY, iz + 0.5);
      this.root.add(p);
    }
  }

  /**
   * Measured Kenney hulls (local units, long axis = Z, origin at center):
   *   cargo 10.55 long, sail ~3.8, tug/row ~2.9
   * Scale must stay small or a "3x" cargo is 30+ blocks and covers the whole beach.
   * Pivot is pushed so the NEAR end of the hull is still past the waterline.
   */
  _placeKenneyFleetOffshore() {
    const xMid = LAYOUT.pathX;
    const beachEnd = LAYOUT.beach?.z1 ?? (LAYOUT.farmZone.z1 + 25);
    const waterLine = LAYOUT.waterLineZ ?? (beachEnd + 1);
    const zMax = WZ - 3;
    // Half-length along Z at scale 1 (max |minZ|,|maxZ|)
    const halfZ = { sail: 1.98, row: 1.43, tug: 1.43, cargoA: 5.27, cargoB: 5.27 };

    const add = (key, x, scale, yaw, extra = 1.5, bob = 0.05) => {
      const hz = (halfZ[key] || 2) * scale;
      // Near tip of the hull must clear the sand
      let z = waterLine + hz + extra;
      if (z + hz > zMax) z = zMax - hz - 0.4;
      if (z - hz < waterLine + 0.5) return;
      const ix = Math.floor(x);
      const iz = Math.floor(z);
      if (this.game.world.inside(ix, GY, iz)) {
        const g = this.game.world.get(ix, GY, iz);
        if (g === B.SAND || g === B.PATH || g === B.PLANKS || g === B.GRASS) return;
      }
      const mesh = this._clone(key, scale);
      if (!mesh) return;
      const y = SEA - 0.15;
      mesh.position.set(x, y, z);
      mesh.rotation.y = yaw; // keep yaw small — long axis stays out to sea
      this.root.add(mesh);
      this._ships.push({ mesh, baseY: y, phase: Math.random() * 6, bob });
    };

    // Sailboats just offshore (readable, not beached)
    add('sail', xMid - 16, 1.15, 0.15, 1.2, 0.06);
    add('sail', xMid + 2, 1.05, -0.12, 2.2, 0.06);
    add('sail', xMid + 16, 1.2, 0.08, 1.4, 0.06);
    add('row', xMid - 6, 1.3, 0.2, 2.8, 0.05);
    add('tug', xMid + 10, 1.25, -0.18, 3.2, 0.05);

    // Cargo freighters further out — scale ~0.55 → ~6 blocks long, on the horizon
    add('cargoA', xMid - 18, 0.55, 0.06, 4.5, 0.04);
    add('cargoB', xMid + 6, 0.62, -0.05, 5.2, 0.04);
    add('cargoA', xMid + 24, 0.5, 0.1, 4.8, 0.04);
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
