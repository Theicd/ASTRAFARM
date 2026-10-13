// Beach set dressing: umbrellas, chairs, toys on the SAND shelf + distant ships in deep water.
import * as THREE from 'three';
import { LAYOUT, GY, SEA, WZ } from './world/World.js';
import { B } from './world/blocks.js';
import { solidEntityMaterial, setEntityLight } from './world/materials.js';

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

function makeUmbrella(mats, color = 0xe85a4a) {
  const g = new THREE.Group();
  const pole = mat(0xe8d8a8);
  const cloth = mat(color);
  const tip = mat(0xf0e0b0);
  const stripe = mat(0xf8f0e0);
  box(g, mats, 0.12, 2.4, 0.12, 0, 1.2, 0, pole);
  box(g, mats, 2.6, 0.12, 2.6, 0, 2.45, 0, cloth);
  box(g, mats, 1.8, 0.1, 1.8, 0, 2.55, 0, cloth);
  box(g, mats, 0.35, 0.25, 0.35, 0, 2.7, 0, tip);
  box(g, mats, 2.65, 0.04, 0.35, 0, 2.48, 0, stripe);
  box(g, mats, 0.35, 0.04, 2.65, 0, 2.48, 0, stripe);
  return g;
}

function makeChair(mats, clothHex = 0x3a7ec8) {
  const g = new THREE.Group();
  const wood = mat(0xc4a060);
  const cloth = mat(clothHex);
  box(g, mats, 0.9, 0.12, 0.7, 0, 0.35, 0.05, cloth);
  box(g, mats, 0.9, 0.7, 0.1, 0, 0.7, -0.3, cloth);
  box(g, mats, 0.08, 0.35, 0.08, -0.35, 0.18, 0.25, wood);
  box(g, mats, 0.08, 0.35, 0.08, 0.35, 0.18, 0.25, wood);
  box(g, mats, 0.08, 0.55, 0.08, -0.35, 0.28, -0.3, wood);
  box(g, mats, 0.08, 0.55, 0.08, 0.35, 0.28, -0.3, wood);
  return g;
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

function makeBucket(mats) {
  const g = new THREE.Group();
  box(g, mats, 0.4, 0.35, 0.4, 0, 0.2, 0, mat(0xe05040));
  box(g, mats, 0.42, 0.06, 0.42, 0, 0.4, 0, mat(0xf0e8d0));
  box(g, mats, 0.08, 0.35, 0.08, 0.28, 0.35, 0, mat(0xe8d8a8));
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
  const o = mat(0xe05040);
  const w = mat(0xffffff, 1.1);
  box(g, mats, 0.9, 0.12, 0.9, 0, 0.08, 0, o);
  box(g, mats, 0.45, 0.14, 0.45, 0, 0.08, 0, mat(0x87ceeb, 0.3));
  box(g, mats, 0.95, 0.05, 0.2, 0, 0.1, 0, w);
  box(g, mats, 0.2, 0.05, 0.95, 0, 0.1, 0, w);
  return g;
}

function makeIceCart(mats) {
  const g = new THREE.Group();
  box(g, mats, 1.2, 1.0, 0.8, 0, 0.55, 0, mat(0xf0f4f8));
  box(g, mats, 1.25, 0.12, 0.85, 0, 1.1, 0, mat(0xe05040));
  box(g, mats, 0.15, 0.9, 0.15, -0.45, 0.45, 0.35, mat(0x3a4555));
  box(g, mats, 0.15, 0.9, 0.15, 0.45, 0.45, 0.35, mat(0x3a4555));
  box(g, mats, 0.15, 0.9, 0.15, -0.45, 0.45, -0.35, mat(0x3a4555));
  box(g, mats, 0.15, 0.9, 0.15, 0.45, 0.45, -0.35, mat(0x3a4555));
  box(g, mats, 0.35, 0.35, 0.35, 0, 1.35, 0, mat(0xffb0c8, 1.1));
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

function makePalm(mats) {
  const g = new THREE.Group();
  const trunk = mat(0xa87840);
  const leaf = mat(0x3a9a48, 1.05);
  box(g, mats, 0.35, 2.4, 0.35, 0, 1.2, 0, trunk);
  box(g, mats, 2.2, 0.12, 0.5, 0.6, 2.45, 0, leaf);
  box(g, mats, 2.2, 0.12, 0.5, -0.6, 2.4, 0.1, leaf);
  box(g, mats, 0.5, 0.12, 2.0, 0.1, 2.5, 0.5, leaf);
  box(g, mats, 0.5, 0.12, 2.0, -0.1, 2.35, -0.5, leaf);
  box(g, mats, 0.25, 0.25, 0.25, 0.4, 2.15, 0.3, mat(0xc8a020));
  return g;
}

function makeSailboat(mats, scale = 1) {
  const g = new THREE.Group();
  const hull = mat(0xd8c090);
  const stripe = mat(0xc45a3a);
  const mast = mat(0xe8d8b0);
  const sail = mat(0xf5f0e6, 1.05);
  box(g, mats, 2.4, 0.55, 0.9, 0, 0.2, 0, hull);
  box(g, mats, 1.6, 0.35, 0.7, 0.2, 0.45, 0, hull);
  box(g, mats, 2.45, 0.12, 0.2, 0, 0.48, 0, stripe);
  box(g, mats, 0.1, 2.4, 0.1, -0.2, 1.5, 0, mast);
  box(g, mats, 1.4, 1.8, 0.06, 0.45, 1.6, 0, sail);
  box(g, mats, 0.9, 0.9, 0.05, -0.7, 1.3, 0, sail);
  g.scale.setScalar(scale);
  return g;
}

function makeCargoShip(mats, scale = 1) {
  const g = new THREE.Group();
  box(g, mats, 8, 1.2, 2.2, 0, 0.4, 0, mat(0x3a4555));
  box(g, mats, 8.2, 0.35, 2.3, 0, -0.1, 0, mat(0xb04030));
  box(g, mats, 2.2, 1.6, 1.8, -2.4, 1.6, 0, mat(0xd0d4dc));
  box(g, mats, 0.5, 1.4, 0.5, -2.0, 2.8, 0, mat(0x2a3038));
  box(g, mats, 3.5, 0.9, 1.6, 1.5, 1.2, 0, mat(0xc8a050));
  box(g, mats, 1.2, 0.9, 1.6, 3.2, 1.2, 0, mat(0x4080c0));
  g.scale.setScalar(scale);
  return g;
}

/** Flat SAND at sea level, inland of water edge, clear of the grass cliff. */
function findSandSpots(world, need) {
  const F = LAYOUT.farmZone;
  const zMin = F.z1 + 11;
  const zMax = Math.min(WZ - 14, F.z1 + 18);
  const xMid = LAYOUT.pathX;
  const out = [];
  for (let z = zMin; z <= zMax; z++) {
    for (let x = xMid - 20; x <= xMid + 20; x++) {
      if (!world.inside(x, SEA, z)) continue;
      if (world.get(x, SEA, z) !== B.SAND && world.get(x, SEA, z) !== B.PATH) continue;
      if (world.get(x, SEA + 1, z) !== B.AIR) continue;
      // Must be flat sea-level pad (not standing on a GY cliff face)
      if (world.get(x, GY, z) === B.GRASS || world.get(x, GY, z) === B.FARM || world.get(x, GY, z) === B.FARM_WET) continue;
      const nbr = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]];
      const waterEdge = nbr.some(([dx, dz]) => world.get(x + dx, SEA, z + dz) === B.WATER);
      if (waterEdge) continue;
      // Skip cells next to the grass plateau step
      const cliff = nbr.some(([dx, dz]) => {
        const g = world.get(x + dx, GY, z + dz);
        return g === B.GRASS || g === B.PATH || g === B.FARM || g === B.FARM_WET;
      });
      if (cliff) continue;
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
    game.scene.add(this.root);
    this.rebuild();
  }

  rebuild() {
    this.disposeMeshes();
    const w = this.game.world;
    const F = LAYOUT.farmZone;
    const xMid = LAYOUT.pathX;
    const mats = this._mats;
    const sandY = SEA + 0.02;

    const spots = findSandSpots(w, 22);
    const colors = [0xe85a4a, 0xf0c040, 0x3a90d8, 0xe85a4a, 0xf0c040, 0x50c8a0];
    const chairCols = [0x3a7ec8, 0xe85a4a, 0xf0c040, 0xffffff];
    let si = 0;
    for (let i = 0; i < spots.length && si < 5; i++) {
      const [x, z] = spots[i];
      if (spots.slice(0, i).some(([ax, az]) => Math.hypot(ax - x, az - z) < 5.2)) continue;
      const um = makeUmbrella(mats, colors[si % colors.length]);
      um.position.set(x + 0.5, sandY, z + 0.5);
      this.root.add(um);
      const ch = makeChair(mats, chairCols[si % chairCols.length]);
      ch.position.set(x + 1.4, sandY, z + 1.2);
      ch.rotation.y = 0.4;
      this.root.add(ch);
      const ch2 = makeChair(mats, chairCols[(si + 1) % chairCols.length]);
      ch2.position.set(x - 0.35, sandY, z + 1.35);
      ch2.rotation.y = -0.55;
      this.root.add(ch2);
      const towel = makeTowel(mats, si % 2 ? 0xf06080 : 0x40a0e0);
      towel.position.set(x + 0.2, sandY, z + 2.4);
      towel.rotation.y = 0.2;
      this.root.add(towel);
      if (si % 2 === 0) {
        const cool = makeCooler(mats);
        cool.position.set(x + 2.0, sandY, z + 0.6);
        this.root.add(cool);
      } else {
        const ball = makeBall(mats);
        ball.position.set(x - 1.2, sandY, z + 2.0);
        this.root.add(ball);
      }
      si++;
    }

    // Extra props on remaining flat spots
    const used = new Set(spots.slice(0, 8).map(([x, z]) => `${x},${z}`));
    const extras = spots.filter(([x, z]) => !used.has(`${x},${z}`));
    if (extras[0]) {
      const [x, z] = extras[0];
      const sc = makeSandcastle(mats);
      sc.position.set(x + 0.5, sandY, z + 0.5);
      this.root.add(sc);
    }
    if (extras[1]) {
      const [x, z] = extras[1];
      const bk = makeBucket(mats);
      bk.position.set(x + 0.5, sandY, z + 0.5);
      this.root.add(bk);
    }
    if (extras[2]) {
      const [x, z] = extras[2];
      const sb = makeSurfboard(mats, 0xff6a3a);
      sb.position.set(x + 0.5, sandY, z + 0.5);
      sb.rotation.y = 0.9;
      this.root.add(sb);
    }
    if (extras[3]) {
      const [x, z] = extras[3];
      const lr = makeLifeRing(mats);
      lr.position.set(x + 0.5, sandY, z + 0.5);
      this.root.add(lr);
    }
    if (extras[4]) {
      const [x, z] = extras[4];
      const cart = makeIceCart(mats);
      cart.position.set(x + 0.5, sandY, z + 0.5);
      cart.rotation.y = -0.3;
      this.root.add(cart);
    }
    if (extras[5]) {
      const [x, z] = extras[5];
      const net = makeVolleyballNet(mats);
      net.position.set(x + 0.5, sandY, z + 0.5);
      net.rotation.y = 0.15;
      this.root.add(net);
    }
    // Palm accents on shelf sides
    for (const [ox, oz] of [[-16, 13], [15, 14], [-10, 16], [12, 12]]) {
      const px = xMid + ox;
      const pz = F.z1 + oz;
      if (w.get(px, SEA, pz) !== B.SAND) continue;
      if (w.get(px, GY, pz) === B.GRASS) continue;
      const p = makePalm(mats);
      p.position.set(px + 0.5, sandY, pz + 0.5);
      p.rotation.y = ox * 0.05;
      this.root.add(p);
    }

    // Mid-distance sailboats — past sand shelf, in open water
    const boatZ0 = Math.min(WZ - 12, F.z1 + 28);
    const boats = [
      [xMid - 16, boatZ0, 0.85, 0.5],
      [xMid + 8, Math.min(WZ - 10, boatZ0 + 2), 0.7, -0.35],
      [xMid + 18, Math.min(WZ - 11, boatZ0 + 1), 0.95, 0.15],
    ];
    for (const [x, z, sc, yaw] of boats) {
      const b = makeSailboat(mats, sc);
      b.position.set(x, SEA - 0.15, z);
      b.rotation.y = yaw;
      this.root.add(b);
      this._ships.push({ mesh: b, baseY: SEA - 0.15, phase: Math.random() * 6, bob: 0.06 });
    }

    // Far horizon freighters — tiny + at world edge so they read as offshore
    const farZ = WZ - 5;
    const freighters = [
      [xMid - 28, farZ, 1.05, 0.1],
      [xMid + 2, farZ - 1, 1.25, -0.06],
      [xMid + 26, farZ, 0.9, 0.22],
    ];
    for (const [x, z, sc, yaw] of freighters) {
      const s = makeCargoShip(mats, sc);
      s.position.set(x, SEA + 0.05, z);
      s.rotation.y = yaw;
      this.root.add(s);
      this._ships.push({ mesh: s, baseY: SEA + 0.05, phase: Math.random() * 6, bob: 0.08 });
    }
  }

  update() {
    const t = performance.now() * 0.001;
    for (const s of this._ships) {
      s.mesh.position.y = s.baseY + Math.sin(t * 1.1 + s.phase) * s.bob;
      s.mesh.rotation.z = Math.sin(t * 0.7 + s.phase) * 0.02;
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
    this.disposeMeshes();
    this.game.scene.remove(this.root);
  }
}
