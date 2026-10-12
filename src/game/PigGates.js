// Double wooden gates at the pig sty — short plank leaves, stay open, sway in wind.
import * as THREE from 'three';
import { LAYOUT, GY } from './world/World.js';
import { solidEntityMaterial, setEntityLight } from './world/materials.js';

/** Plank colors matching atlas PAL.plank / log particles. */
const COL = {
  plank: 0xa47d4c,
  plankLite: 0xae8655,
  log: 0x6b5233,
  brace: 0x8a6238,
};

/** @param {number} dir +1 = extends +Z from hinge, -1 = extends −Z */
function makeGateLeaf(mats, width, dir = 1) {
  const g = new THREE.Group();
  const thick = 0.08;
  const h = 0.92; // ~fence height, not a tall slab
  const s = dir < 0 ? -1 : 1;
  const box = (mat, w, hh, d, x, y, z) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, hh, d), mat);
    m.position.set(x, y, z);
    g.add(m);
  };
  // Hinge + tip stiles (dark log)
  box(mats.log, thick * 1.15, h, 0.09, 0, h * 0.5, s * 0.04);
  box(mats.log, thick * 1.15, h, 0.09, 0, h * 0.5, s * (width - 0.04));
  // Three horizontal planks
  for (let i = 0; i < 3; i++) {
    const y = 0.14 + i * (h - 0.22) / 2;
    box(mats.plank, thick, 0.13, width - 0.1, 0.01, y, s * width * 0.5);
  }
  // Soft diagonal brace
  const brace = new THREE.Mesh(new THREE.BoxGeometry(thick * 0.85, 0.09, width * 0.78), mats.brace);
  brace.position.set(0.02, h * 0.48, s * width * 0.5);
  brace.rotation.x = s * 0.48;
  g.add(brace);
  // Top rail
  box(mats.plankLite, thick * 1.25, 0.07, width - 0.02, 0, h - 0.03, s * width * 0.5);
  return g;
}

export class PigGates {
  constructor(game) {
    this.game = game;
    this.t = 0;
    this.root = new THREE.Group();
    this.root.name = 'pigGates';

    this._mats = {
      plank: solidEntityMaterial(COL.plank, { shade: 0.92 }),
      plankLite: solidEntityMaterial(COL.plankLite, { shade: 0.98 }),
      log: solidEntityMaterial(COL.log, { shade: 0.78 }),
      brace: solidEntityMaterial(COL.brace, { shade: 0.85 }),
    };
    this._matList = Object.values(this._mats);

    const P = LAYOUT.pigPen;
    const zA = P.gateZ0;
    const zB = P.gateZ1 + 1;
    const span = zB - zA;
    // Shorter leaves — leave a small middle gap if they were closed
    const leafW = span * 0.42;
    const xHinge = P.gateX + 0.1;
    const y0 = GY + 1;

    this.hingeL = new THREE.Group();
    this.hingeL.position.set(xHinge, y0, zA + 0.02);
    this.hingeL.add(makeGateLeaf(this._mats, leafW, 1));
    this.root.add(this.hingeL);

    this.hingeR = new THREE.Group();
    this.hingeR.position.set(xHinge, y0, zB - 0.02);
    this.hingeR.add(makeGateLeaf(this._mats, leafW, -1));
    this.root.add(this.hingeR);

    // Open against the fence line, slight tuck so they don't stick into the path
    this.baseOpen = 1.55;
    this.hingeL.rotation.y = -this.baseOpen;
    this.hingeR.rotation.y = this.baseOpen;

    game.scene.add(this.root);
  }

  update(dt) {
    this.t += dt;
    const t = this.t;
    const breeze = Math.sin(t * 1.15) * 0.06 + Math.sin(t * 2.35 + 0.8) * 0.03;
    const gust = Math.sin(t * 0.37) * Math.sin(t * 0.37) * Math.sin(t * 0.11) * 0.1;
    this.hingeL.rotation.y = -this.baseOpen + breeze + gust + Math.sin(t * 1.7 + 1.2) * 0.02;
    this.hingeR.rotation.y = this.baseOpen - breeze * 0.9 + gust * 0.85 + Math.sin(t * 1.55 + 2.4) * 0.02;

    const w = this.game.world;
    const P = LAYOUT.pigPen;
    const [sk, bl] = w.lightAt?.(P.gateX, GY + 1, (P.gateZ0 + P.gateZ1) * 0.5) || [15, 0];
    for (const m of this._matList) setEntityLight(m, sk, bl);
  }

  dispose() {
    this.game.scene.remove(this.root);
    for (const m of this._matList) m.dispose();
    this.root.traverse((o) => { if (o.geometry) o.geometry.dispose(); });
  }
}
