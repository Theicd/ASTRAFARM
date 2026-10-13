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
      cargoC: 'ship_cargo_c.glb',
      liner: 'ship_ocean_liner.glb',
      linerSmall: 'ship_ocean_liner_small.glb',
      shipLarge: 'ship_large.glb',
      shipSmall: 'ship_small.glb',
      sail: 'boat_sail.glb',
      sailB: 'boat_sail_b.glb',
      tug: 'boat_tug.glb',
      tugA: 'boat_tug_a.glb',
      tugC: 'boat_tug_c.glb',
      row: 'boat_row.glb',
      rowSmall: 'boat_row_small.glb',
      fan: 'boat_fan.glb',
      fish: 'boat_fishing_small.glb',
      houseA: 'boat_house_a.glb',
      houseB: 'boat_house_b.glb',
      houseC: 'boat_house_c.glb',
      houseD: 'boat_house_d.glb',
      speedA: 'boat_speed_a.glb',
      speedB: 'boat_speed_b.glb',
      speedE: 'boat_speed_e.glb',
      tow: 'boat_tow_a.glb',
      palm: 'tree_palm_detailed_tall.glb',
      palmBend: 'tree_palm_bend.glb',
      palmTall: 'tree_palm_tall.glb',
      parasolA: 'detail_parasol_a.glb',
      parasolB: 'detail_parasol_b.glb',
      lounge: 'lounge_chair_relax.glb',
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

    // Kenney parasols are cafe TABLES. Chairs go in front of the table, not inside it.
    // Sets are 9 blocks apart so neighboring canopies and chairs never intersect.
    const sets = [
      [xMid - 16, z0],
      [xMid - 7, z0],
      [xMid + 7, z0],
      [xMid + 16, z0],
      [xMid - 16, z1],
      [xMid - 7, z1],
      [xMid + 7, z1],
      [xMid + 16, z1],
    ];

    let si = 0;
    for (const [cx, cz] of sets) {
      if (Math.abs(cx - xMid) < 3) continue;
      if (!sandOk(w, cx, cz) || !sandOk(w, cx, cz + 3)) continue;
      // Table+parasol. Raw size 0.35 → scale 6 ≈ 2.1m canopy, clear of the chairs.
      const parasol = this._clone(si % 2 ? 'parasolB' : 'parasolA', 6);
      if (parasol) {
        parasol.position.set(cx + 0.5, sandY, cz + 0.5);
        this.root.add(parasol);
      }
      // Sunbeds 2.5 blocks seaward of the table (canopy radius is ~1.1)
      const L1 = this._clone('lounge', 2.2);
      if (L1 && sandOk(w, cx - 2, cz + 3)) {
        L1.position.set(cx - 1.1, sandY, cz + 3.1);
        L1.rotation.y = Math.PI;
        this.root.add(L1);
      }
      const L2 = this._clone('deck', 1.8);
      if (L2 && sandOk(w, cx + 2, cz + 3)) {
        L2.position.set(cx + 1.6, sandY, cz + 3.1);
        L2.rotation.y = Math.PI;
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
   * Two lines of Kenney watercraft, both fully past the sand.
   * nearZ = bow of the near row. farZ = bow of the ship row, behind the small boats.
   * Scale is chosen so each hull is a few blocks long (ocean liner raw length is 21).
   */
  _placeKenneyFleetOffshore() {
    const xMid = LAYOUT.pathX;
    const beachEnd = LAYOUT.beach?.z1 ?? (LAYOUT.farmZone.z1 + 25);
    const waterLine = LAYOUT.waterLineZ ?? (beachEnd + 1);
    const zMax = WZ - 2.5;
    // Half-length on Z at scale 1
    const halfZ = {
      fan: 1.43, fish: 1.93, row: 1.43, rowSmall: 1.19,
      sail: 1.98, sailB: 2.29, speedA: 1.69, speedB: 1.65, speedE: 1.43,
      tug: 1.43, tugA: 1.73, tugC: 1.43,
      houseA: 2.32, houseB: 2.78, houseC: 2.58, houseD: 2.32, tow: 3.32,
      cargoA: 5.27, cargoB: 5.27, cargoC: 5.27,
      liner: 10.64, linerSmall: 10.64, shipLarge: 6.55, shipSmall: 5.3,
    };

    const placeRow = (keys, nearBowZ, targetLen, x0, gap) => {
      keys.forEach((key, i) => {
        const raw = (halfZ[key] || 2) * 2;
        let scale = targetLen / raw;
        let hz = (halfZ[key] || 2) * scale;
        let z = nearBowZ + hz;
        if (z + hz > zMax) {
          const room = Math.max(1.2, zMax - nearBowZ);
          scale *= room / (hz * 2);
          hz = (halfZ[key] || 2) * scale;
          z = nearBowZ + hz;
        }
        if (z - hz < waterLine + 0.4) return;
        const x = x0 + i * gap;
        const mesh = this._clone(key, scale);
        if (!mesh) return;
        const y = SEA - 0.12;
        mesh.position.set(x, y, z);
        mesh.rotation.y = 0.04 * ((i % 2) ? 1 : -1);
        this.root.add(mesh);
        this._ships.push({ mesh, baseY: y, phase: i * 0.7, bob: 0.045 });
      });
    };

    // Near line: small craft, bows ~1.5 blocks past the sand
    placeRow(
      ['fish', 'fan', 'rowSmall', 'row', 'sail', 'sailB', 'speedA', 'speedB', 'speedE', 'tug', 'tugA', 'tugC'],
      waterLine + 1.6,
      3.6,
      xMid - 22,
      4,
    );
    // Far line: houses, tugs-with-tow, cargo, liners — behind the small boats
    placeRow(
      ['houseA', 'houseB', 'houseC', 'houseD', 'tow', 'cargoA', 'cargoB', 'cargoC', 'shipSmall', 'shipLarge', 'linerSmall', 'liner'],
      waterLine + 6.2,
      5.2,
      xMid - 22,
      4,
    );
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
