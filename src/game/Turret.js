// Wooden watchtower: tall post + platform, auto-targets nearby Green Things.
import * as THREE from 'three';
import { GY } from './world/World.js';
import { solidEntityMaterial, setEntityLight } from './world/materials.js';

const COL = {
  plank: 0xa47d4c,
  plankLite: 0xae8655,
  log: 0x6b5233,
  brace: 0x8a6238,
  roof: 0x7a5539,
  lens: 0xffb060,
};

export class Turret {
  constructor(game, x, z) {
    this.game = game;
    this.dead = false;
    this.cool = 0;
    this.range = 14;
    this.damage = 1;
    this.scan = 0;
    this.root = new THREE.Group();
    this.root.name = 'turret';

    const matPlank = solidEntityMaterial(COL.plank, { shade: 0.92 });
    const matLite = solidEntityMaterial(COL.plankLite, { shade: 0.98 });
    const matLog = solidEntityMaterial(COL.log, { shade: 0.75 });
    const matBrace = solidEntityMaterial(COL.brace, { shade: 0.85 });
    const matRoof = solidEntityMaterial(COL.roof, { shade: 0.8 });
    // Warm lantern glow (matches pen lanterns)
    const matLens = solidEntityMaterial(COL.lens, { shade: 1.35 });
    this._mats = [matPlank, matLite, matLog, matBrace, matRoof, matLens];

    const add = (mat, w, h, d, x0, y0, z0) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      m.position.set(x0, y0, z0);
      this.root.add(m);
      return m;
    };

    // Tall log mast (~3 blocks)
    const mastH = 2.85;
    add(matLog, 0.32, mastH, 0.32, 0, mastH * 0.5, 0);
    // Mid wrap band
    add(matBrace, 0.42, 0.12, 0.42, 0, mastH * 0.45, 0);
    // Cross braces
    for (const yaw of [Math.PI * 0.25, -Math.PI * 0.25]) {
      const brace = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 1.1), matBrace);
      brace.position.set(0, mastH * 0.55, 0);
      brace.rotation.y = yaw;
      this.root.add(brace);
    }

    // Lookout platform
    const deckY = mastH + 0.06;
    add(matPlank, 1.15, 0.12, 1.15, 0, deckY, 0);
    // Corner posts + rail
    for (const [px, pz] of [[-0.48, -0.48], [0.48, -0.48], [-0.48, 0.48], [0.48, 0.48]]) {
      add(matLog, 0.1, 0.55, 0.1, px, deckY + 0.28, pz);
    }
    for (const [px, pz, sx, sz] of [
      [0, -0.48, 0.95, 0.08], [0, 0.48, 0.95, 0.08],
      [-0.48, 0, 0.08, 0.95], [0.48, 0, 0.08, 0.95],
    ]) add(matLite, sx, 0.08, sz, px, deckY + 0.48, pz);

    // Rotating head (cupola + lens)
    this.head = new THREE.Group();
    this.head.position.y = deckY + 0.55;
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.38, 0.62), matPlank);
    cabin.position.y = 0.12;
    this.head.add(cabin);
    const roof = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.14, 0.78), matRoof);
    roof.position.y = 0.38;
    this.head.add(roof);
    const peak = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.12, 0.28), matLog);
    peak.position.y = 0.5;
    this.head.add(peak);
    this.lens = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.18, 0.16), matLens);
    this.lens.position.set(0, 0.14, 0.36);
    this.head.add(this.lens);
    this.root.add(this.head);

    const standY = game.world.floorAt?.(x, z);
    const y = standY >= 1 ? standY : GY + 1;
    this.root.position.set(x + 0.5, y, z + 0.5);
    game.scene.add(this.root);
    this.x = x;
    this.z = z;
    this.y = y;
  }

  update(dt) {
    const g = this.game;
    this.cool = Math.max(0, this.cool - dt);
    this.scan += dt;
    let best = null, bestD = this.range;
    for (const m of g.mobs) {
      if (m.dead || m.state === 'leave') continue;
      const d = Math.hypot(m.pos.x - this.root.position.x, m.pos.z - this.root.position.z);
      if (d < bestD) { bestD = d; best = m; }
    }
    if (best) {
      const yaw = Math.atan2(best.pos.x - this.root.position.x, best.pos.z - this.root.position.z);
      this.head.rotation.y = yaw;
      if (this.cool <= 0) {
        this.cool = 0.75;
        best.hit(this.damage, this.root.position, 0.55);
        g.particles.sparkle(best.pos.x - 0.3, best.pos.y + 0.4, best.pos.z - 0.3, 5, 0xff8a4a);
        g.audio.sfx('hit', { pos: best.pos, pitch: 1.3 });
        if (best.dead) g.onMobKilled(best, 'turret');
      }
    } else {
      this.head.rotation.y = this.scan * 1.1;
    }

    const [sk, bl] = g.world.lightAt?.(this.x, (this.y | 0) + 2, this.z) || [15, 8];
    for (const m of this._mats) setEntityLight(m, sk, bl);
  }

  dispose() {
    this.game.scene.remove(this.root);
    for (const m of this._mats) m.dispose();
    this.root.traverse((o) => { if (o.geometry) o.geometry.dispose(); });
  }
}
