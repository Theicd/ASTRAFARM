// Farm patrol buggy. Present from the first morning. Chases hostiles and shoots paint.
import * as THREE from 'three';
import { t } from '../core/i18n.js';
import { LAYOUT, GY, WX, inRect } from './world/World.js';
import { isFarm, isCrop } from './world/blocks.js';
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
    const ring = this._fieldRing();
    this.loop = ring;
    this.root.position.set(ring[0][0], GY + 1, ring[0][1]);
    this.yaw = 0;
    this.path = null;
    this.pathI = 0;
    this.repath = 0;
    this.cool = 0.4;
    this.wheelSpin = 0;
    this._i = 0;
    game.scene.add(this.root);
    game.talk?.sys('sys.patrol');
  }

  _build() {
    const body = tex((g) => {
      g.fillStyle = '#e7f4fb';
      g.fillRect(0, 0, 128, 128);
      g.fillStyle = '#2f7eb8';
      g.fillRect(0, 0, 128, 28);
      g.fillRect(0, 100, 128, 28);
      g.fillStyle = '#f4b942';
      g.fillRect(0, 58, 128, 14);
      g.fillStyle = '#d7e6f2';
      for (let x = 6; x < 128; x += 18) g.fillRect(x, 36, 8, 4);
    });
    const metal = tex((g) => {
      g.fillStyle = '#c5d2de';
      g.fillRect(0, 0, 128, 128);
      g.fillStyle = '#f7fbff';
      g.fillRect(0, 16, 128, 20);
      g.fillStyle = '#6d8296';
      for (let i = 0; i < 10; i++) {
        g.beginPath();
        g.arc(12 + (i % 5) * 24, 70 + Math.floor(i / 5) * 34, 4, 0, Math.PI * 2);
        g.fill();
      }
    });
    const glass = new THREE.MeshBasicMaterial({ color: 0x9fd8f2, transparent: true, opacity: 0.78 });
    const rubber = new THREE.MeshBasicMaterial({ color: 0x1c2128 });
    const hub = new THREE.MeshBasicMaterial({ color: 0xd8dee6 });
    const lamp = new THREE.MeshBasicMaterial({ color: 0xfff1b0 });
    const hull = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.36, 2.45), body);
    hull.position.y = 0.46;
    const hood = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.16, 0.85), metal);
    hood.position.set(0, 0.68, -0.72);
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.42, 0.85), body);
    cabin.position.set(0, 0.78, 0.05);
    const win = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.28, 0.06), glass);
    win.position.set(0, 0.84, -0.38);
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.06, 0.08), lamp);
    bar.position.set(0, 1.04, 0.05);
    const bumper = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.12, 0.1), metal);
    bumper.position.set(0, 0.38, -1.22);
    const gun = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.62, 12), metal);
    gun.rotation.x = Math.PI / 2;
    gun.position.set(0, 0.95, -0.55);
    for (const x of [-0.42, 0.42]) {
      const light = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8), lamp);
      light.position.set(x, 0.52, -1.18);
      this.root.add(light);
    }
    this.wheels = [];
    const geo = new THREE.CylinderGeometry(0.32, 0.32, 0.18, 16);
    const cap = new THREE.CylinderGeometry(0.14, 0.14, 0.2, 10);
    for (const [x, z] of [[-0.78, -0.78], [0.78, -0.78], [-0.78, 0.72], [0.78, 0.72]]) {
      const w = new THREE.Mesh(geo, rubber);
      const h = new THREE.Mesh(cap, hub);
      h.position.y = 0.01;
      w.add(h);
      w.position.set(x, 0.32, z);
      this.wheels.push(w);
      this.root.add(w);
    }
    const plate = this._plate();
    plate.position.y = 1.55;
    this.root.add(hull, hood, cabin, win, bar, bumper, gun, plate);
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

  _fieldRing() {
    let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity;
    for (const F of [LAYOUT.fieldA, LAYOUT.fieldB, LAYOUT.farmZone]) {
      if (!F) continue;
      x0 = Math.min(x0, F.x0);
      x1 = Math.max(x1, F.x1);
      z0 = Math.min(z0, F.z0);
      z1 = Math.max(z1, F.z1);
    }
    const m = 2;
    return [
      [x0 - m, z1 + m],
      [x1 + m, z1 + m],
      [x1 + m, z0 - m],
      [x0 - m, z0 - m],
    ];
  }

  _onField(x, z) {
    const w = this.game.world;
    const ix = Math.floor(x), iz = Math.floor(z);
    if (!w?.inside(ix, GY, iz)) return false;
    if (isFarm(w.get(ix, GY, iz)) || isCrop(w.get(ix, GY + 1, iz))) return true;
    for (const F of [LAYOUT.fieldA, LAYOUT.fieldB]) {
      if (F && inRect(ix, iz, F, 0)) return true;
    }
    return false;
  }

  _skirt(x, z) {
    if (!this._onField(x, z)) return [x, z];
    let best = null, bd = 1e9;
    const ix = Math.floor(x), iz = Math.floor(z);
    for (let dz = -10; dz <= 10; dz++) for (let dx = -10; dx <= 10; dx++) {
      const nx = ix + dx, nz = iz + dz;
      if (this._onField(nx, nz)) continue;
      const d = dx * dx + dz * dz;
      if (d < bd) { bd = d; best = [nx + 0.5, nz + 0.5]; }
    }
    return best || [x, z];
  }

  _blocked = (i) => {
    const x = i % WX, z = (i / WX) | 0;
    return this._onField(x, z);
  };

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
      const edge = this._skirt(foe.pos.x, foe.pos.z);
      tx = edge[0]; tz = edge[1];
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
      const path = findPath(g.world, p.x, p.z, tx, tz, { near: 1.1, maxNodes: 1800, blocked: this._blocked });
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
      const nx = p.x + (dx / dist) * step;
      const nz = p.z + (dz / dist) * step;
      if (!this._onField(nx, nz)) {
        p.x = nx;
        p.z = nz;
        this.wheelSpin += step * 3.2;
      }
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
