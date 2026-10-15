// Farm patrol buggy. Present from the first morning. Chases hostiles and shoots paint.
import * as THREE from 'three';
import { t } from '../core/i18n.js';
import { LAYOUT, GY } from './world/World.js';
import { findPath } from './nav.js';
import { dampAngle } from '../core/math.js';

function tex(draw) {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  draw(c.getContext('2d'));
  const map = new THREE.CanvasTexture(c);
  map.colorSpace = THREE.SRGBColorSpace;
  map.needsUpdate = true;
  return new THREE.MeshBasicMaterial({ map, color: 0xffffff });
}

export class Patrol {
  constructor(game) {
    this.game = game;
    this.root = new THREE.Group();
    this.root.name = 'patrol';
    this._build();
    const x = LAYOUT.pathX + 3.2;
    const z = LAYOUT.house.z1 + 3.4;
    this.root.position.set(x, GY + 1, z);
    this.yaw = 0;
    this.path = null;
    this.pathI = 0;
    this.repath = 0;
    this.cool = 0.4;
    this.wheelSpin = 0;
    this._i = 0;
    const F = LAYOUT.farmZone;
    this.loop = [
      [F.x0 + 2, F.z0 + 2],
      [F.x1 - 2, F.z0 + 2],
      [F.x1 - 2, F.z1 - 2],
      [F.x0 + 2, F.z1 - 2],
    ];
    game.scene.add(this.root);
    game.talk?.sys('sys.patrol');
  }

  _build() {
    const body = tex((g) => {
      g.fillStyle = '#2f6b3a';
      g.fillRect(0, 0, 128, 128);
      g.fillStyle = '#f2f4f0';
      g.fillRect(0, 54, 128, 16);
      g.fillStyle = '#1d4a28';
      for (let i = 0; i < 6; i++) g.fillRect(8 + i * 20, 18, 10, 6);
    });
    const metal = tex((g) => {
      g.fillStyle = '#9eb0c0';
      g.fillRect(0, 0, 128, 128);
      g.fillStyle = '#e7eef4';
      g.fillRect(0, 20, 128, 18);
      g.fillStyle = '#5d7284';
      for (let i = 0; i < 8; i++) {
        g.beginPath();
        g.arc(16 + (i % 4) * 30, 78, 4, 0, Math.PI * 2);
        g.fill();
      }
    });
    const glass = new THREE.MeshBasicMaterial({ color: 0xb7e4ff, transparent: true, opacity: 0.72 });
    const rubber = new THREE.MeshBasicMaterial({ color: 0x22262c });
    const paint = tex((g) => {
      const cols = ['#ff4d6a', '#3dff7a', '#3aa0ff', '#ffd23a'];
      cols.forEach((c, i) => { g.fillStyle = c; g.fillRect(i * 32, 0, 32, 128); });
    });
    const hull = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.42, 2.15), body);
    hull.position.y = 0.48;
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.48, 0.9), body);
    cabin.position.set(0, 0.88, -0.15);
    const win = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.28, 0.08), glass);
    win.position.set(0, 0.92, -0.58);
    const gun = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 0.7, 10), metal);
    gun.rotation.x = Math.PI / 2;
    gun.position.set(0, 1.05, -0.55);
    const tank = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.28, 0.42), paint);
    tank.position.set(0, 0.78, 0.55);
    this.wheels = [];
    const geo = new THREE.CylinderGeometry(0.28, 0.28, 0.16, 14);
    for (const [x, z] of [[-0.62, -0.7], [0.62, -0.7], [-0.62, 0.7], [0.62, 0.7]]) {
      const w = new THREE.Mesh(geo, rubber);
      w.position.set(x, 0.28, z);
      this.wheels.push(w);
      this.root.add(w);
    }
    const plate = this._plate();
    plate.position.y = 1.7;
    this.root.add(hull, cabin, win, gun, tank, plate);
  }

  _plate() {
    const c = document.createElement('canvas');
    c.width = 256; c.height = 64;
    const g = c.getContext('2d');
    g.fillStyle = 'rgba(8,14,12,0.88)';
    g.fillRect(0, 0, 256, 64);
    g.fillStyle = '#b6f27a';
    g.fillRect(0, 0, 256, 4);
    g.font = 'bold 28px "Segoe UI", Arial, sans-serif';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillStyle = '#e9fff0';
    g.fillText(t('patrol.name'), 128, 34);
    const map = new THREE.CanvasTexture(c);
    map.colorSpace = THREE.SRGBColorSpace;
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map, transparent: true, depthTest: false }));
    s.scale.set(2.4, 0.6, 1);
    return s;
  }

  _foe() {
    let best = null, bd = 48;
    const p = this.root.position;
    const consider = (ent, x, z) => {
      const d = Math.hypot(x - p.x, z - p.z);
      if (d < bd) { bd = d; best = ent; }
    };
    for (const m of this.game.mobs || []) {
      if (!m || m.dead || m.state === 'leave' || m.state === 'emerge') continue;
      consider(m, m.pos.x, m.pos.z);
    }
    for (const f of this.game.beachDecor?._fish || []) {
      if (!f.v?.root?.visible || f.state === 'under' || f.dead) continue;
      consider(f, f.pos.x, f.pos.z);
    }
    return best;
  }

  _aim(tx, tz) {
    return Math.atan2(tx - this.root.position.x, tz - this.root.position.z);
  }

  update(dt) {
    const g = this.game;
    if (!g || g.titleMode || g.state !== 'play' || g.isNetClient?.()) return;
    this.cool = Math.max(0, this.cool - dt);
    this.repath -= dt;
    const p = this.root.position;
    const foe = this._foe();
    let tx, tz, speed = 2.4;
    if (foe) {
      tx = foe.pos.x; tz = foe.pos.z;
      speed = 4.6;
      const d = Math.hypot(tx - p.x, tz - p.z);
      if (d < 10 && this.cool <= 0) {
        const origin = new THREE.Vector3(p.x, p.y + 1.15, p.z);
        const dir = new THREE.Vector3(tx - p.x, 0.2, tz - p.z);
        g.launchPaint(origin, dir, 20);
        this.cool = 0.42;
      }
      if (d < 4.5) speed = 1.4;
    } else {
      const spot = this.loop[this._i];
      tx = spot[0]; tz = spot[1];
      if (Math.hypot(tx - p.x, tz - p.z) < 1.4) this._i = (this._i + 1) % this.loop.length;
    }
    if (this.repath <= 0) {
      this.repath = foe ? 0.45 : 1.1;
      const path = findPath(g.world, p.x, p.z, tx, tz, { near: 1.1, maxNodes: 1800 });
      this.path = path.path;
      this.pathI = 0;
    }
    let gx = tx, gz = tz;
    if (this.path && this.pathI < this.path.length) {
      gx = this.path[this.pathI][0] + 0.5;
      gz = this.path[this.pathI][1] + 0.5;
      if (Math.hypot(gx - p.x, gz - p.z) < 0.55) this.pathI++;
    }
    const dx = gx - p.x, dz = gz - p.z;
    const dist = Math.hypot(dx, dz) || 1;
    const step = Math.min(dist, speed * dt);
    if (dist > 0.4) {
      p.x += (dx / dist) * step;
      p.z += (dz / dist) * step;
      this.wheelSpin += step * 3.2;
    }
    this.yaw = dampAngle(this.yaw, this._aim(tx, tz), 8, dt);
    p.y = GY + 1;
    this.root.rotation.y = this.yaw;
    for (const w of this.wheels) w.rotation.set(this.wheelSpin, 0, Math.PI / 2);
  }

  dispose() {
    this.root.removeFromParent();
  }
}
