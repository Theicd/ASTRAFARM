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
        bed.position.set(cx + ox, sandY, cz + 2.45);
        bed.rotation.y = Math.PI;
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
      this._ships.push({ mesh, baseY: seaY, phase: past * 0.2, bob: 0.04 });
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

  update() {
    const t = performance.now() * 0.001;
    const phase = this.game.phase;
    const birdsOut = phase === 'day' || phase === 'dawn';
    for (const s of this._ships) {
      s.mesh.position.y = s.baseY + Math.sin(t * 1.1 + s.phase) * s.bob;
      s.mesh.rotation.z = Math.sin(t * 0.7 + s.phase) * 0.015;
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
  }

  dispose() {
    this._loadId++;
    this.disposeMeshes();
    this.game.scene.remove(this.root);
  }
}
