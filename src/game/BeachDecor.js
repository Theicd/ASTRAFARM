// Beach set dressing: umbrellas, chairs, sailboats + distant cargo ships on the water.
// Built from boxes (same look as the farm) — no external .vox required.
import * as THREE from 'three';
import { LAYOUT, GY, SEA, WZ } from './world/World.js';
import { solidEntityMaterial, setEntityLight } from './world/materials.js';

function mat(hex, shade = 0.95) {
  return solidEntityMaterial(hex, { shade });
}

function box(parent, mats, w, h, d, x, y, z, m) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
  mesh.position.set(x, y, z);
  mesh.castShadow = false;
  mesh.receiveShadow = false;
  parent.add(mesh);
  mats.push(m);
  return mesh;
}

function makeUmbrella(mats, color = 0xe85a4a) {
  const g = new THREE.Group();
  const pole = mat(0xe8d8a8);
  const cloth = mat(color);
  const tip = mat(0xf0e0b0);
  box(g, mats, 0.12, 2.4, 0.12, 0, 1.2, 0, pole);
  // Octagonal-ish canopy from boxes
  box(g, mats, 2.6, 0.12, 2.6, 0, 2.45, 0, cloth);
  box(g, mats, 1.8, 0.1, 1.8, 0, 2.55, 0, cloth);
  box(g, mats, 0.35, 0.25, 0.35, 0, 2.7, 0, tip);
  // Stripe accents
  const stripe = mat(0xf8f0e0);
  box(g, mats, 2.65, 0.04, 0.35, 0, 2.48, 0, stripe);
  box(g, mats, 0.35, 0.04, 2.65, 0, 2.48, 0, stripe);
  return g;
}

function makeChair(mats) {
  const g = new THREE.Group();
  const wood = mat(0xc4a060);
  const cloth = mat(0x3a7ec8);
  box(g, mats, 0.9, 0.12, 0.7, 0, 0.35, 0.05, cloth); // seat
  box(g, mats, 0.9, 0.7, 0.1, 0, 0.7, -0.3, cloth); // back
  box(g, mats, 0.08, 0.35, 0.08, -0.35, 0.18, 0.25, wood);
  box(g, mats, 0.08, 0.35, 0.08, 0.35, 0.18, 0.25, wood);
  box(g, mats, 0.08, 0.55, 0.08, -0.35, 0.28, -0.3, wood);
  box(g, mats, 0.08, 0.55, 0.08, 0.35, 0.28, -0.3, wood);
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
  const hull = mat(0x3a4555);
  const red = mat(0xb04030);
  const bridge = mat(0xd0d4dc);
  const stack = mat(0x2a3038);
  box(g, mats, 8, 1.2, 2.2, 0, 0.4, 0, hull);
  box(g, mats, 8.2, 0.35, 2.3, 0, -0.1, 0, red);
  box(g, mats, 2.2, 1.6, 1.8, -2.4, 1.6, 0, bridge);
  box(g, mats, 0.5, 1.4, 0.5, -2.0, 2.8, 0, stack);
  box(g, mats, 3.5, 0.9, 1.6, 1.5, 1.2, 0, mat(0xc8a050)); // containers
  box(g, mats, 1.2, 0.9, 1.6, 3.2, 1.2, 0, mat(0x4080c0));
  g.scale.setScalar(scale);
  return g;
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
    const F = LAYOUT.farmZone;
    const xMid = LAYOUT.pathX;
    const sandZ = F.z1 + 6;
    const mats = this._mats;

    // Umbrella + chair clusters on the sand shelf
    const spots = [
      [xMid - 8, sandZ + 2, 0xe85a4a],
      [xMid - 5, sandZ + 4, 0xf0c040],
      [xMid + 6, sandZ + 3, 0x3a90d8],
      [xMid + 10, sandZ + 5, 0xe85a4a],
      [xMid - 12, sandZ + 7, 0xf0c040],
    ];
    for (const [x, z, col] of spots) {
      const um = makeUmbrella(mats, col);
      um.position.set(x + 0.5, GY + 0.02, z + 0.5);
      this.root.add(um);
      const ch = makeChair(mats);
      ch.position.set(x + 1.3, GY + 0.02, z + 1.1);
      ch.rotation.y = 0.35 + Math.random() * 0.4;
      this.root.add(ch);
      const ch2 = makeChair(mats);
      ch2.position.set(x - 0.2, GY + 0.02, z + 1.4);
      ch2.rotation.y = -0.5;
      this.root.add(ch2);
    }

    // Nearshore sailboats
    const boats = [
      [xMid - 14, F.z1 + 18, 1.1, 0.6],
      [xMid + 4, F.z1 + 20, 0.95, -0.4],
      [xMid + 16, F.z1 + 17, 1.25, 0.2],
    ];
    for (const [x, z, sc, yaw] of boats) {
      const b = makeSailboat(mats, sc);
      b.position.set(x, SEA - 0.15, z);
      b.rotation.y = yaw;
      this.root.add(b);
      this._ships.push({ mesh: b, baseY: SEA - 0.15, phase: Math.random() * 6, bob: 0.08 });
    }

    // Distant freighters on the horizon (background of water)
    const freighters = [
      [xMid - 28, Math.min(WZ - 6, F.z1 + 36), 2.4, 0.15],
      [xMid + 8, Math.min(WZ - 5, F.z1 + 40), 3.1, -0.1],
      [xMid + 32, Math.min(WZ - 6, F.z1 + 34), 2.0, 0.35],
    ];
    for (const [x, z, sc, yaw] of freighters) {
      const s = makeCargoShip(mats, sc);
      s.position.set(x, SEA + 0.2, z);
      s.rotation.y = yaw;
      this.root.add(s);
      this._ships.push({ mesh: s, baseY: SEA + 0.2, phase: Math.random() * 6, bob: 0.12 });
    }
  }

  update(dt) {
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
