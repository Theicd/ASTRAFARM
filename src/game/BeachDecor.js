// Beach: Kenney CC0 props (parasols, loungers, palms, watercraft) + seagulls.
// Ships sit ONLY past LAYOUT.waterLineZ — never on sand.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { LAYOUT, GY, SEA, WX, WZ } from './world/World.js';

import { B } from './world/blocks.js';
import { solidEntityMaterial, mapEntityMaterial, setEntityLight } from './world/materials.js';
import { takeMobVisual, stepMobVisual } from './mobVisuals.js';

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
      m.name = src?.name || '';
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

const _texCache = new Map();

function canvasTex(key, draw, repeat = 2) {
  if (_texCache.has(key)) return _texCache.get(key);
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 128;
  draw(c.getContext('2d'), c.width, c.height);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeat, repeat);
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  _texCache.set(key, tex);
  return tex;
}

function clothTexture() {
  return canvasTex('cloth', (g, w, h) => {
    g.fillStyle = '#f7f3ea';
    g.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y += 16) {
      g.fillStyle = 'rgba(25,25,25,0.55)';
      g.fillRect(0, y, w, 7);
    }
  }, 1);
}

function woodTexture() {
  return canvasTex('wood', (g, w, h) => {
    g.fillStyle = '#c48945';
    g.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y += 9) {
      g.fillStyle = y % 18 === 0 ? 'rgba(70,35,12,0.55)' : 'rgba(255,220,160,0.18)';
      g.fillRect(0, y, w, 3);
    }
    g.fillStyle = 'rgba(60,30,10,0.35)';
    for (let x = 10; x < w; x += 28) g.fillRect(x, 0, 2, h);
  }, 1);
}

/** Kenney parasol atlas is flat color cells. Paint stripes into it so the canopy reads as cloth. */
function detailedAtlas(image) {
  const key = image;
  if (_texCache.has(key)) return _texCache.get(key);
  const c = document.createElement('canvas');
  c.width = image.width || 512;
  c.height = image.height || 512;
  const g = c.getContext('2d');
  g.drawImage(image, 0, 0, c.width, c.height);
  g.globalCompositeOperation = 'multiply';
  for (let x = 0; x < c.width; x += 8) {
    g.fillStyle = (x / 8) % 2 === 0 ? 'rgba(0,0,0,0.22)' : 'rgba(255,255,255,0.08)';
    g.fillRect(x, 0, 3, c.height);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.flipY = false;
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.needsUpdate = true;
  _texCache.set(key, tex);
  return tex;
}

function leafTexture() {
  return canvasTex('leaf', (g, w, h) => {
    g.fillStyle = '#37c56e';
    g.fillRect(0, 0, w, h);
    g.fillStyle = '#1e8a45';
    for (let x = 0; x < w; x += 14) g.fillRect(x, 0, 5, h);
    g.fillStyle = '#d7f5a8';
    g.fillRect(w * 0.46, 0, 4, h);
  }, 1);
}

/** Kenney chairs/palms ship UVs in a huge range, so a normal texture smears to one color. */
function projectUVs(mesh, mode) {
  const src = mesh.geometry;
  if (!src?.attributes?.position) return;
  const old = src.attributes.uv;
  if (old) {
    let min = Infinity;
    let max = -Infinity;
    const n = Math.min(old.count, 300);
    for (let i = 0; i < n; i++) {
      min = Math.min(min, old.getX(i), old.getY(i));
      max = Math.max(max, old.getX(i), old.getY(i));
    }
    if (max - min < 3) return;
  }
  const geo = src.clone();
  mesh.geometry = geo;
  const pos = geo.attributes.position;
  let uv = geo.attributes.uv;
  if (!uv) {
    uv = new THREE.BufferAttribute(new Float32Array(pos.count * 2), 2);
    geo.setAttribute('uv', uv);
  }
  const scale = mode === 'leaf' ? 2.4 : mode === 'bark' ? 3.2 : 2.2;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    if (mode === 'bark') uv.setXY(i, x * scale, y * scale);
    else if (mode === 'leaf') uv.setXY(i, x * scale, z * scale);
    else uv.setXY(i, x * scale, z * scale + y * 0.35);
  }
  uv.needsUpdate = true;
}

function dressPalm(group) {
  if (!group) return;
  const bark = woodTexture();
  const leaf = leafTexture();
  group.traverse((o) => {
    if (!o.isMesh || !o.material) return;
    const mats = Array.isArray(o.material) ? o.material : [o.material];
    const leafy = mats.some((m) => (m.name || '').toLowerCase().includes('leaf'));
    projectUVs(o, leafy ? 'leaf' : 'bark');
    for (const m of mats) {
      m.map = leafy ? leaf : bark;
      m.color.set(0xffffff);
      m.needsUpdate = true;
    }
  });
}

function dressFurniture(group, hex) {
  if (!group) return;
  const tint = new THREE.Color(hex);
  const cloth = clothTexture();
  const wood = woodTexture();
  group.traverse((o) => {
    if (!o.isMesh || !o.material) return;
    const mats = Array.isArray(o.material) ? o.material : [o.material];
    for (const m of mats) {
      const name = (m.name || '').toLowerCase();
      if (m.map?.image) {
        m.map = detailedAtlas(m.map.image);
        m.color.set(0xffffff);
      } else if (name.includes('wood')) {
        projectUVs(o, 'seat');
        m.map = wood;
        m.color.set(0xffffff);
      } else if (name.includes('metal')) {
        m.map = null;
        m.color.set(0x9aa3ab);
      } else {
        projectUVs(o, 'seat');
        m.map = cloth;
        m.color.copy(tint);
      }
      m.needsUpdate = true;
    }
  });
}

function painted(key, draw, tint = 0xffffff) {
  return mapEntityMaterial(canvasTex(key, draw, 1), { colorHex: tint });
}

function metalTexture() {
  return painted('pump-metal', (g, w, h) => {
    g.fillStyle = '#8e98a2';
    g.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y += 6) {
      g.fillStyle = y % 12 === 0 ? 'rgba(40,48,56,0.45)' : 'rgba(255,255,255,0.12)';
      g.fillRect(0, y, w, 2);
    }
    g.fillStyle = 'rgba(20,24,28,0.35)';
    for (let x = 8; x < w; x += 22) g.fillRect(x, 0, 3, h);
  });
}

function rustTexture() {
  return painted('pump-rust', (g, w, h) => {
    g.fillStyle = '#b85a32';
    g.fillRect(0, 0, w, h);
    for (let i = 0; i < 80; i++) {
      g.fillStyle = i % 2 ? 'rgba(80,30,12,0.55)' : 'rgba(230,160,90,0.35)';
      g.fillRect((i * 17) % w, (i * 29) % h, 8, 6);
    }
  });
}

function tankTexture() {
  return painted('pump-tank', (g, w, h) => {
    g.fillStyle = '#d5dde4';
    g.fillRect(0, 0, w, h);
    g.fillStyle = 'rgba(40,70,90,0.25)';
    for (let y = 10; y < h; y += 18) g.fillRect(0, y, w, 4);
    g.fillStyle = 'rgba(255,255,255,0.35)';
    g.fillRect(8, 8, 10, h - 16);
  });
}

function makePump(mats) {
  const g = new THREE.Group();
  const steel = metalTexture();
  const rust = rustTexture();
  const tank = tankTexture();
  const dark = painted('pump-dark', (g, w, h) => {
    g.fillStyle = '#3a4450';
    g.fillRect(0, 0, w, h);
    g.fillStyle = 'rgba(0,0,0,0.35)';
    for (let y = 0; y < h; y += 8) g.fillRect(0, y, w, 2);
  });
  for (const [x, z] of [[-2.2, -1.6], [2.2, -1.6], [-2.2, 1.6], [2.2, 1.6]]) {
    box(g, mats, 0.32, 4.2, 0.32, x, 1.4, z, steel);
  }
  box(g, mats, 5.2, 0.28, 3.8, 0, 3.5, 0, rust);
  box(g, mats, 2.2, 1.8, 2.2, -0.6, 4.6, 0, tank);
  box(g, mats, 1.2, 1.1, 1.2, 1.5, 4.2, 0.4, dark);
  box(g, mats, 0.35, 3.2, 0.35, -0.6, 6.4, 0, steel);
  box(g, mats, 3.4, 0.22, 0.22, 1.1, 7.8, 0, rust);
  box(g, mats, 0.55, 2.4, 0.55, 2.6, 2.2, 0.8, steel);
  g.scale.setScalar(2.6);
  return g;
}

function makeBungalow(mats, roofHex = 0xd25a3a) {
  const g = new THREE.Group();
  const wood = mapEntityMaterial(woodTexture(), { colorHex: 0xffffff });
  const roof = painted('roof-' + roofHex.toString(16), (g, w, h) => {
    const css = '#' + roofHex.toString(16).padStart(6, '0');
    g.fillStyle = css;
    g.fillRect(0, 0, w, h);
    g.fillStyle = 'rgba(0,0,0,0.18)';
    for (let y = 0; y < h; y += 10) g.fillRect(0, y, w, 3);
  });
  const wall = painted('bungalow-wall', (g, w, h) => {
    g.fillStyle = '#f3e6c8';
    g.fillRect(0, 0, w, h);
    g.strokeStyle = 'rgba(120,80,40,0.35)';
    for (let y = 8; y < h; y += 16) { g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke(); }
  });
  const glass = mat(0x9fd0e8);
  for (const [x, z] of [[-1.8, -1.3], [1.8, -1.3], [-1.8, 1.3], [1.8, 1.3]]) {
    box(g, mats, 0.18, 3.4, 0.18, x, 1.7, z, wood);
  }
  box(g, mats, 4.4, 0.16, 3.2, 0, 3.45, 0, wood);
  box(g, mats, 3.4, 1.5, 2.4, 0, 4.3, 0, wall);
  box(g, mats, 0.85, 0.7, 0.08, 0, 4.25, 1.22, glass);
  box(g, mats, 4.6, 0.22, 3.4, 0, 5.15, 0, roof);
  box(g, mats, 3.1, 0.16, 2.2, 0, 5.4, 0, roof);
  box(g, mats, 1.6, 0.12, 1.2, 0, 5.58, 0, roof);
  return g;
}

function makeStiltVillage(mats) {
  const g = new THREE.Group();
  const wood = mat(0xb88858);
  const a = makeBungalow(mats, 0xd25a3a);
  const b = makeBungalow(mats, 0x2f6f86);
  b.position.set(7.4, 0, 1.6);
  b.rotation.y = 0.35;
  const c = makeBungalow(mats, 0xe0a040);
  c.position.set(3.6, 0, -5.2);
  c.rotation.y = -0.5;
  g.add(a, b, c);
  box(g, mats, 7.2, 0.14, 1.15, 3.6, 3.45, 0.7, wood);
  box(g, mats, 1.15, 0.14, 5.4, 2.2, 3.45, -2.4, wood);
  g.scale.setScalar(2.15);
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
    this._fish = [];
    this._critters = [];
    this._shots = [];
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
    this._placeSeaStructures();
    this._placeSeaLife();
    this._placeBeachAnimals();
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

    const bedColors = [0xe85a4a, 0x2f9fe0, 0xf0c040, 0x3cbe8c, 0xff7aa2, 0x6a8cff];
    let si = 0;
    for (const [cx, cz] of sets) {
      if (Math.abs(cx - xMid) < 3) continue;
      if (!sandOk(w, cx, cz)) continue;
      const tint = bedColors[si % bedColors.length];

      // Shade table. Canopy is ~2.1m; furniture stays outside that radius.
      const parasol = this._clone(si % 2 ? 'parasolB' : 'parasolA', 6);
      if (parasol) {
        dressFurniture(parasol, 0xffffff);
        parasol.position.set(cx + 0.5, sandY, cz + 0.5);
        this.root.add(parasol);
      }

      // Two sunbeds side by side, feet toward the sea, clear of the table.
      for (const ox of [-1.15, 0.85]) {
        if (!sandOk(w, cx + Math.round(ox), cz + 3)) continue;
        const bed = this._clone('lounge', 3.15);
        if (!bed) continue;
        dressFurniture(bed, tint);
        bed.position.set(cx + ox, sandY, cz + 4.4);
        bed.rotation.y = 0;
        this.root.add(bed);
      }

      // One upright deck chair beside the table, same set color.
      if (sandOk(w, cx + 2, cz)) {
        const chair = this._clone('deck', 1.45);
        if (chair) {
          dressFurniture(chair, tint);
          chair.position.set(cx + 2.15, sandY, cz + 0.35);
          chair.rotation.y = -Math.PI / 2;
          this.root.add(chair);
        }
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
      dressPalm(p);
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
    // Half-length on Z at scale 1
    const halfZ = {
      fan: 1.43, fish: 1.93, row: 1.43, rowSmall: 1.19,
      sail: 1.98, sailB: 2.29, speedA: 1.69, speedB: 1.65, speedE: 1.43,
      tug: 1.43, tugA: 1.73, tugC: 1.43,
      houseA: 2.32, houseB: 2.78, houseC: 2.58, houseD: 2.32, tow: 3.32,
      cargoA: 5.27, cargoB: 5.27, cargoC: 5.27,
      liner: 10.64, linerSmall: 10.64, shipLarge: 6.55, shipSmall: 5.3,
    };

    // Same height as the ocean plane in Sky.js
    const seaY = SEA - 1 + 14 / 16 - 0.02;

    // Scattered field: flanks close in, center stays open, big ships far out.
    // [key, x, blocks past shore, length, yaw]
    const spots = [
      ['speedA', xMid - 55, 16, 3.2, 0.7],
      ['rowSmall', xMid + 52, 22, 3.0, -0.55],
      ['fish', xMid - 78, 30, 3.2, 0.25],
      ['fan', xMid + 74, 26, 3.3, -0.9],

      ['sail', xMid - 36, 55, 4.6, 0.4],
      ['tug', xMid + 40, 62, 4.2, -0.25],
      ['speedB', xMid - 88, 48, 3.6, 1.05],
      ['speedE', xMid + 90, 58, 3.6, -1.15],
      ['sailB', xMid - 12, 78, 4.8, 0.18],
      ['row', xMid + 18, 88, 3.8, -0.42],
      ['tugC', xMid - 64, 96, 4.0, 0.6],
      ['tugA', xMid + 66, 104, 4.2, -0.5],

      ['houseA', xMid - 48, 130, 6.2, 0.35],
      ['houseD', xMid + 50, 145, 6.0, -0.28],
      ['tow', xMid - 20, 160, 6.6, 0.12],
      ['houseC', xMid + 24, 175, 6.4, -0.16],
      ['houseB', xMid - 70, 150, 6.0, 0.45],

      ['cargoC', xMid + 58, 190, 8.5, -0.2],
      ['shipSmall', xMid - 30, 210, 8.0, 0.14],
      ['cargoA', xMid + 10, 230, 9.5, -0.06],
      ['linerSmall', xMid - 8, 255, 11, 0.08],
      ['cargoB', xMid + 42, 240, 9.0, 0.22],
      ['shipLarge', xMid - 46, 270, 12, -0.1],
      ['liner', xMid + 28, 290, 13, 0.05],
    ];

    for (const [key, x, past, len, yaw] of spots) {
      const shore = waterLine;
      const raw = (halfZ[key] || 2) * 2;
      const scale = len / raw;
      const hz = (halfZ[key] || 2) * scale;
      const z = shore + past + hz;
      if (z - hz < shore + 1) continue;
      const mesh = this._clone(key, scale);
      if (!mesh) continue;
      mesh.position.set(x, seaY, z);
      mesh.rotation.y = yaw;
      this.root.add(mesh);
      const cruise = key.startsWith('speed') ? 1.15
        : key.startsWith('sail') ? 0.46
        : key === 'row' || key === 'rowSmall' || key === 'fish' ? 0.22
        : key === 'fan' ? 0.62
        : key.startsWith('tug') ? 0.36
        : 0;
      const heavy = key.startsWith('liner') || key.startsWith('cargo') || key.startsWith('ship');
      this._ships.push({
        mesh, baseY: seaY, x, z, yaw, phase: past * 0.17,
        bob: cruise ? 0.08 : 0.03, cruise, range: cruise ? 7 + cruise * 6 : 0,
        armed: true, heavy, maxSpeed: heavy ? 1.1 : (cruise ? Math.max(cruise * 2.2, 1.6) : 2.2),
        gunRange: heavy ? 22 : 16, dmg: heavy ? 9 : 5, cool: Math.random(),
        order: null,
      });
    }
    this._dockAtPier(seaY);
  }

  _dockAtPier(seaY) {
    const pier = LAYOUT.pier;
    if (!pier) return;
    const slips = [
      ['row', pier.x - 4.2, pier.z0 + 3, 0],
      ['rowSmall', pier.x + 4.2, pier.z0 + 3, Math.PI],
      ['fish', pier.x - 4.4, pier.z0 + 7, 0],
      ['sail', pier.x + 4.4, pier.z0 + 7, Math.PI],
      ['tug', pier.x - 5.1, pier.z1 - 2, 0.15],
      ['speedA', pier.x + 5.1, pier.z1 - 2, Math.PI - 0.15],
    ];
    for (const [key, x, z, yaw] of slips) {
      const mesh = this._clone(key, key === 'sail' ? 1.15 : 0.95);
      if (!mesh) continue;
      mesh.position.set(x, seaY, z);
      mesh.rotation.y = yaw;
      this.root.add(mesh);
      this._ships.push({
        mesh, baseY: seaY, x, z, yaw, phase: z * 0.1,
        bob: 0.035, cruise: 0, range: 0,
        armed: true, heavy: false, maxSpeed: 2.4,
        gunRange: 16, dmg: 5, cool: 0.4, order: null, docked: true,
      });
    }
  }

  _placeSeaStructures() {
    const mats = this._mats;
    const xMid = LAYOUT.pathX;
    const z0 = (LAYOUT.waterLineZ ?? 82) + 36;
    const y = SEA - 1 + 14 / 16;
    const spots = [
      [xMid - 46, z0, 'pump', 0.35],
      [xMid + 38, z0 + 18, 'village', -0.25],
      [xMid - 8, z0 + 62, 'pump', -0.5],
      [xMid + 18, z0 + 96, 'village', 0.4],
      [xMid - 34, z0 + 130, 'pump', 0.15],
    ];
    for (const [x, z, kind, yaw] of spots) {
      const g = kind === 'pump' ? makePump(mats) : makeStiltVillage(mats);
      g.position.set(x, y - 0.35, z);
      g.rotation.y = yaw;
      this.root.add(g);
    }
  }

  _placeSeaLife() {
    this._fish = [];
    const xMid = LAYOUT.pathX;
    const z0 = (LAYOUT.waterLineZ ?? 82) + 4;
    const spots = [
      ['Fish', xMid - 16, z0, 2.8, 0.4],
      ['Fish', xMid + 22, z0 + 6, 3.1, -0.5],
      ['BlueDemon', xMid - 36, z0 + 8, 3.4, 0.2],
      ['Fish', xMid + 8, z0 + 3, 3.3, 1.0],
      ['Fish', xMid + 40, z0 + 7, 2.7, -0.2],
      ['BlueDemon', xMid - 6, z0 + 10, 3.6, 0.6],
    ];
    const stand = 8.05;
    for (const [key, x, z, sc, yaw] of spots) {
      const v = takeMobVisual(key, sc);
      if (!v) continue;
      v.root.position.set(x, stand, Math.min(WZ - 3, z));
      this.root.add(v.root);
      this._fish.push({ v, x, z: Math.min(WZ - 3, z), yaw, bite: 0, fed: false });
    }
  }

  _placeBeachAnimals() {
    this._critters = [];
    const beach = LAYOUT.beach;
    const xMid = LAYOUT.pathX;
    const z0 = (beach?.z0 ?? 70) + 2;
    const bunnies = [
      [xMid - 14, z0 + 1],
      [xMid + 18, z0 + 3],
      [xMid - 28, z0 + 4],
      [xMid + 8, z0],
    ];
    for (const [x, z] of bunnies) {
      const v = takeMobVisual('Bunny', 0.85);
      if (!v) continue;
      v.root.position.set(x, GY + 1, z);
      this.root.add(v.root);
      this._critters.push({ v, x, z, kind: 'bunny' });
    }
    const birbs = [
      [xMid - 20, GY + 8, z0 + 6],
      [xMid + 30, GY + 11, z0 + 10],
      [xMid + 4, GY + 14, z0 + 2],
    ];
    for (const [x, y, z] of birbs) {
      const v = takeMobVisual('Birb', 0.7);
      if (!v) continue;
      v.root.position.set(x, y, z);
      this.root.add(v.root);
      this._critters.push({ v, x, y, z, kind: 'birb' });
    }
  }

  _placeSeagulls() {
    const mats = this._mats;
    const beach = LAYOUT.beach;
    const xMid = LAYOUT.pathX;
    const z0 = beach?.z0 ?? LAYOUT.farmZone.z1 + 14;
    const z1 = beach?.z1 ?? z0 + 12;
    // Spread along the shore and out over the water — not one tight circle.
    const flock = [
      { x: xMid - 34, y: GY + 6.5, z: z0 + 2, speed: 0.32, phase: 0.3, rx: 16, rz: 2.5 },
      { x: xMid + 28, y: GY + 8, z: z1 - 1, speed: 0.26, phase: 1.7, rx: 18, rz: 3 },
      { x: xMid - 6, y: GY + 13, z: z0 + 4, speed: 0.18, phase: 2.4, rx: 12, rz: 6 },
      { x: xMid - 52, y: GY + 5.5, z: z1 + 16, speed: 0.38, phase: 0.8, rx: 14, rz: 7 },
      { x: xMid + 20, y: GY + 7, z: z1 + 28, speed: 0.3, phase: 3.2, rx: 20, rz: 9 },
      { x: xMid + 58, y: GY + 10, z: z1 + 14, speed: 0.22, phase: 4.1, rx: 16, rz: 5 },
      { x: xMid - 22, y: GY + 15, z: z1 + 42, speed: 0.16, phase: 2.0, rx: 24, rz: 11 },
      { x: xMid + 8, y: GY + 9, z: z1 + 55, speed: 0.2, phase: 5.1, rx: 18, rz: 8 },
    ];
    for (const b of flock) {
      const bird = makeSeagull(mats);
      bird.position.set(b.x, b.y, b.z);
      this.root.add(bird);
      this._birds.push({ mesh: bird, ...b });
    }
  }

  update(dt = 0.016) {
    const t = performance.now() * 0.001;
    const phase = this.game.phase;
    const birdsOut = phase === 'day' || phase === 'dawn';
    const nightish = phase === 'night' || phase === 'dusk';
    for (const s of this._ships) {
      s.cool = Math.max(0, (s.cool || 0) - dt);
      if (s.order) {
        const mob = s.order.mob;
        if (s.order.attack && mob && !mob.dead) {
          s.order.x = mob.pos.x;
          s.order.z = mob.pos.z;
        }
        const dx = s.order.x - s.x, dz = s.order.z - s.z;
        const dist = Math.hypot(dx, dz) || 1;
        const step = Math.min(dist, (s.maxSpeed || 1.5) * dt);
        if (dist > 1.5) {
          s.x += (dx / dist) * step;
          s.z += (dz / dist) * step;
          s.yaw = Math.atan2(dx, dz);
        }
        if (s.order.attack && dist < (s.gunRange || 16)) this._cannon(s, s.order.x, s.order.z);
        if (!s.order.attack && dist < 1.5) s.order = null;
        else if (s.order.attack && (!mob || mob.dead) && dist < 2) s.order = null;
        s.mesh.position.set(s.x, s.baseY + Math.sin(t * 1.1 + s.phase) * s.bob, s.z);
        s.mesh.rotation.y = s.yaw;
        s.mesh.rotation.z = Math.sin(t * 0.6 + s.phase) * 0.02;
      } else {
        const along = s.cruise ? Math.sin(t * s.cruise * 0.32 + s.phase) * s.range : 0;
        s.mesh.position.x = s.x + Math.sin(s.yaw) * along;
        s.mesh.position.z = s.z + Math.cos(s.yaw) * along;
        s.mesh.position.y = s.baseY + Math.sin(t * (s.cruise ? 1.7 : 0.85) + s.phase) * s.bob;
        s.mesh.rotation.z = Math.sin(t * 0.7 + s.phase) * (s.cruise ? 0.045 : 0.012);
        s.mesh.rotation.y = s.yaw + (s.cruise ? Math.sin(t * 0.22 + s.phase) * 0.28 : 0);
      }
    }
    this._stepShots(dt);
    const player = this.game.player;
    const pp = player?.body?.pos;
    const beachZ = LAYOUT.beach?.z0 ?? 70;
    for (const f of this._fish || []) {
      f.bite = Math.max(0, (f.bite || 0) - dt);
      const pos = f.v.root.position;
      let tx = f.x, tz = f.z, ty = 8.15, chasing = false;
      if (nightish && !f.fed) {
        const pig = this.game.nearestPig?.(pos);
        if (pig) {
          tx = pig.pos.x; tz = pig.pos.z; ty = pig.pos.y;
          chasing = true;
          if (Math.hypot(tx - pos.x, tz - pos.z) < 1.3) {
            this.game.removePig(pig);
            this.game.talk?.sys('sys.seaPig', null, 'warn');
            f.fed = true;
          }
        }
      } else if (pp && pp.z > beachZ - 1) {
        const d = Math.hypot(pp.x - pos.x, pp.z - pos.z);
        if (d < 10) {
          tx = pp.x; tz = pp.z; ty = pp.y; chasing = true;
          if (d < 1.45 && f.bite <= 0 && player.alive) {
            player.damage(2, pos);
            f.bite = 1.15;
          }
        }
      }
      if (!chasing) {
        const a = t * 0.35 + f.yaw;
        tx = f.x + Math.cos(a) * 4.5;
        tz = f.z + Math.sin(a) * 3.2;
        ty = 8.15 + Math.sin(a * 2) * 0.12;
      }
      const dx = tx - pos.x, dz = tz - pos.z;
      const dist = Math.hypot(dx, dz) || 1;
      const step = Math.min(dist, (chasing ? 3.4 : 1.6) * dt);
      pos.x += (dx / dist) * step;
      pos.z += (dz / dist) * step;
      pos.y += (ty - pos.y) * Math.min(1, dt * 3);
      f.v.root.rotation.y = Math.atan2(dx, dz);
      stepMobVisual(f.v, dt, true);
    }
    for (const c of this._critters || []) {
      if (c.kind === 'bunny') {
        const a = t * 0.45 + c.x;
        c.v.root.position.x = c.x + Math.sin(a) * 1.6;
        c.v.root.position.z = c.z + Math.cos(a * 0.7) * 1.1;
        c.v.root.position.y = GY + 1;
        c.v.root.rotation.y = a;
        stepMobVisual(c.v, dt, true);
      } else {
        const a = t * 0.55 + c.z;
        c.v.root.position.x = c.x + Math.cos(a) * 6;
        c.v.root.position.z = c.z + Math.sin(a * 0.6) * 4;
        c.v.root.position.y = c.y + Math.sin(a * 1.3) * 0.8;
        c.v.root.rotation.y = -a;
        stepMobVisual(c.v, dt, true);
      }
    }
    for (const b of this._birds) {
      b.mesh.visible = birdsOut;
      if (!birdsOut) continue;
      const a = t * b.speed + b.phase;
      b.mesh.position.x = b.x + Math.cos(a) * b.rx;
      b.mesh.position.z = b.z + Math.sin(a * 0.65) * b.rz;
      b.mesh.position.y = b.y + Math.sin(a * 1.4) * 0.7;
      b.mesh.rotation.y = -Math.sin(a) * 0.9;
      b.mesh.rotation.z = Math.sin(t * 7 + b.phase) * 0.28;
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
    this._fish = [];
    this._critters = [];
    for (const shot of this._shots || []) shot.mesh.removeFromParent();
    this._shots = [];
  }

  _cannon(ship, tx, tz) {
    if (ship.cool > 0) return;
    ship.cool = ship.heavy ? 1.6 : 1.05;
    const ball = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 8, 6),
      new THREE.MeshBasicMaterial({ color: 0x2a2a2a }),
    );
    const x = ship.mesh.position.x, z = ship.mesh.position.z;
    ball.position.set(x, ship.baseY + 1.3, z);
    this.root.add(ball);
    this._shots.push({ mesh: ball, x, z, y: ship.baseY + 1.3, tx, tz, t: 0, dur: 0.55, dmg: ship.dmg || 5 });
    this.game.audio?.sfx('hit', { pos: ball.position, pitch: 0.45 });
  }

  _stepShots(dt) {
    for (let i = this._shots.length - 1; i >= 0; i--) {
      const s = this._shots[i];
      s.t += dt;
      const k = Math.min(1, s.t / s.dur);
      const arc = Math.sin(k * Math.PI) * 3.2;
      s.mesh.position.set(
        s.x + (s.tx - s.x) * k,
        s.y + arc,
        s.z + (s.tz - s.z) * k,
      );
      if (k < 1) continue;
      const x = s.tx, z = s.tz, y = s.y;
      this.game.particles?.burst(x, y, z, 0xc8d8e8, 12, 1.4);
      this.game.audio?.sfx('explode', { pos: { x, y, z }, pitch: 1.4, dur: 0.35 });
      for (const m of this.game.mobs || []) {
        if (!m || m.dead) continue;
        if (Math.hypot(m.pos.x - x, m.pos.z - z) < 2.5) m.hit(s.dmg, { x, z }, 0.6);
      }
      s.mesh.removeFromParent();
      this._shots.splice(i, 1);
    }
  }

  dispose() {
    this._loadId++;
    this.disposeMeshes();
    this.game.scene.remove(this.root);
  }
}
