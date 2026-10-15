// Farm patrol buggy. Present from the first morning. Chases hostiles and shoots paint.
import * as THREE from 'three';
import { LAYOUT, GY, WX, inRect } from './world/World.js';
import { isFarm, isCrop } from './world/blocks.js';
import { findPath } from './nav.js';
import { damp, dampAngle, wrapAngle } from '../core/math.js';
import { syncMobLabel } from './mobLabel.js';

/** Fields, lawn and beach belong to the buggy. The lodge, pen and outer grass belong to the farmer. */
export function vehicleSector(x, z) {
  const F = LAYOUT.farmZone;
  const pen = LAYOUT.pigPen;
  if (!F) return false;
  if (z > F.z1 + 1) return true;
  if (pen && x >= pen.x0) return false;
  return x >= F.x0 - 2 && x <= F.x1 + 2 && z >= F.z0 - 1;
}

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
    this.speed = 0;
    this.turretYaw = 0;
    this.kick = 0;
    this.flashT = 0;
    this.path = null;
    this.pathI = 0;
    this.repath = 0;
    this.cool = 0.4;
    this.wheelSpin = 0;
    this._i = 0;
    this.kind = 'patrol';
    this.hp = 90;
    this.maxHp = 90;
    this.dead = false;
    this._labelY = 1.7;
    game.scene.add(this.root);
    game.talk?.sys('sys.patrol');
  }

  _build() {
    const sand = tex((g) => {
      g.fillStyle = '#c4a36a';
      g.fillRect(0, 0, 128, 128);
      g.fillStyle = '#a68448';
      for (let y = 0; y < 128; y += 16) g.fillRect(0, y, 128, 2);
      g.fillStyle = '#e6c98a';
      g.fillRect(8, 8, 112, 8);
      g.fillStyle = '#6e8f45';
      g.fillRect(0, 56, 128, 14);
      g.fillStyle = '#3e3428';
      for (let x = 10; x < 120; x += 22) g.fillRect(x, 18, 3, 3);
    });
    const armor = tex((g) => {
      g.fillStyle = '#6f8a48';
      g.fillRect(0, 0, 128, 128);
      g.fillStyle = '#8eae62';
      g.fillRect(0, 0, 128, 22);
      g.fillStyle = '#d2b15a';
      g.fillRect(18, 40, 92, 10);
      g.strokeStyle = '#2c3820';
      g.lineWidth = 3;
      g.strokeRect(8, 8, 112, 112);
      g.fillStyle = '#243018';
      for (let x = 16; x < 120; x += 28) for (let y = 28; y < 110; y += 28) g.fillRect(x, y, 4, 4);
    });
    const metal = tex((g) => {
      g.fillStyle = '#b7c0b0';
      g.fillRect(0, 0, 128, 128);
      g.fillStyle = '#eef2ea';
      g.fillRect(0, 18, 128, 16);
      g.fillStyle = '#5c6758';
      for (let y = 0; y < 128; y += 9) g.fillRect(0, y, 128, 2);
    });
    const tread = () => {
      const c = document.createElement('canvas');
      c.width = 64;
      c.height = 128;
      const g = c.getContext('2d');
      g.fillStyle = '#241c14';
      g.fillRect(0, 0, 64, 128);
      g.fillStyle = '#4a3b2a';
      for (let y = 0; y < 128; y += 12) g.fillRect(6, y, 52, 5);
      g.fillStyle = '#120e0a';
      g.fillRect(0, 0, 5, 128);
      g.fillRect(59, 0, 5, 128);
      const map = new THREE.CanvasTexture(c);
      map.colorSpace = THREE.SRGBColorSpace;
      map.wrapS = map.wrapT = THREE.RepeatWrapping;
      map.needsUpdate = true;
      return new THREE.MeshBasicMaterial({ map });
    };
    const hull = new THREE.Mesh(new THREE.BoxGeometry(1.28, 0.42, 2.15), sand);
    hull.position.y = 0.5;
    const deck = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.08, 1.15), armor);
    deck.position.set(0, 0.74, -0.15);
    const nose = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.1, 0.34), armor);
    nose.position.set(0, 0.62, 0.95);
    const chevron = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.34, 3), new THREE.MeshBasicMaterial({ color: 0xf0c14a }));
    chevron.rotation.x = Math.PI / 2;
    chevron.position.set(0, 0.78, 0.95);
    this.tracks = [];
    this.wheels = [];
    const wheelGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.22, 10);
    for (const side of [-1, 1]) {
      const belt = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.36, 2.35), tread());
      belt.position.set(side * 0.82, 0.32, 0);
      this.tracks.push(belt.material.map);
      this.root.add(belt);
      for (const z of [-0.78, -0.26, 0.26, 0.78]) {
        const w = new THREE.Mesh(wheelGeo, metal);
        w.rotation.z = Math.PI / 2;
        w.position.set(side * 0.82, 0.28, z);
        this.wheels.push(w);
        this.root.add(w);
      }
    }
    this.turret = new THREE.Group();
    this.turret.position.set(0, 0.86, -0.12);
    const dome = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.48, 0.32, 12), armor);
    dome.position.y = 0.16;
    const hatch = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.08, 8), metal);
    hatch.position.y = 0.36;
    this.barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 1.25, 10), metal);
    this.barrel.rotation.x = Math.PI / 2;
    this.barrel.position.set(0, 0.2, 0.72);
    this.flash = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffe27a }));
    this.flash.position.set(0, 0.2, 1.4);
    this.flash.visible = false;
    this.turret.add(dome, hatch, this.barrel, this.flash);
    this.root.add(hull, deck, nose, chevron, this.turret);
  }

  hit(dmg) {
    if (this.dead || dmg <= 0) return false;
    this.hp = Math.max(0, this.hp - dmg);
    this.hurt = 0.35;
    const p = this.root.position;
    this.game.particles?.burst(p.x, p.y + 0.7, p.z, 0xf0c14a, 6, 0.8);
    if (this.hp <= 0) {
      this.dead = true;
      this.speed = 0;
      this.game.particles?.burst(p.x, p.y + 0.6, p.z, 0xff8844, 16, 1.2);
      this.game.audio?.sfx('explode', { pos: p, pitch: 1.05, dur: 0.45 });
      this.game.talk?.sys('sys.tankDown', null, 'warn');
    }
    return true;
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
      // The farmer covers the lodge, the pen and the outer grass. Stay with the fields unless a foe is on top of the buggy.
      if (!vehicleSector(x, z) && d > 9) return;
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
    if (this.dead) {
      syncMobLabel(this, g.camera);
      return;
    }
    this.cool = Math.max(0, this.cool - dt);
    this.repath -= dt;
    this.flashT = Math.max(0, this.flashT - dt);
    if (this.flash) this.flash.visible = this.flashT > 0;
    this.kick = damp(this.kick, 0, 9, dt);
    if (this.barrel) this.barrel.position.z = 0.72 - this.kick * 0.2;
    const p = this.root.position;
    const foe = this._foe();
    let tx, tz;
    if (foe) {
      const edge = this._skirt(foe.pos.x, foe.pos.z);
      tx = edge[0]; tz = edge[1];
    } else {
      const spot = this.loop[this._i];
      tx = spot[0]; tz = spot[1];
      if (Math.hypot(tx - p.x, tz - p.z) < 1.6) this._i = (this._i + 1) % this.loop.length;
    }
    if (this.repath <= 0) {
      this.repath = foe ? 0.55 : 1.2;
      const path = findPath(g.world, p.x, p.z, tx, tz, { near: 1.2, maxNodes: 1800, blocked: this._blocked });
      this.path = path.path;
      this.pathI = 0;
    }
    let gx = tx, gz = tz;
    if (this.path && this.pathI < this.path.length) {
      gx = this.path[this.pathI][0] + 0.5;
      gz = this.path[this.pathI][1] + 0.5;
      if (Math.hypot(gx - p.x, gz - p.z) < 0.7) this.pathI++;
    }
    const dx = gx - p.x, dz = gz - p.z;
    const dist = Math.hypot(dx, dz) || 1;
    const desired = this._aim(gx, gz);
    const err = wrapAngle(desired - this.yaw);
    const turn = Math.max(-1.8 * dt, Math.min(1.8 * dt, err));
    if (dist > 0.45) this.yaw += turn;
    const aligned = Math.abs(err) < 0.4;
    let want = 0;
    if (dist > 0.55) {
      const crawl = Math.max(0.08, 1 - Math.abs(err) / 1.15);
      want = (foe ? 3.6 : 2.35) * (aligned ? 1 : crawl);
      if (foe && Math.hypot(foe.pos.x - p.x, foe.pos.z - p.z) < 7) want = Math.min(want, 1.3);
    }
    this.speed = damp(this.speed, want, aligned ? 2.4 : 5, dt);
    if (this.speed > 0.05 && dist > 0.4) {
      const nx = p.x + Math.sin(this.yaw) * this.speed * dt;
      const nz = p.z + Math.cos(this.yaw) * this.speed * dt;
      if (this._onField(nx, nz)) this.speed = 0;
      else { p.x = nx; p.z = nz; }
    }
    const aim = foe ? this._aim(foe.pos.x, foe.pos.z) : this.yaw;
    this.turretYaw = dampAngle(this.turretYaw, aim, 6.5, dt);
    if (this.turret) this.turret.rotation.y = this.turretYaw - this.yaw;
    if (foe && this.cool <= 0) {
      const range = Math.hypot(foe.pos.x - p.x, foe.pos.z - p.z);
      const aimErr = Math.abs(wrapAngle(aim - this.turretYaw));
      if (range < 12 && aimErr < 0.28) {
        const origin = new THREE.Vector3();
        this.flash.getWorldPosition(origin);
        const dir = new THREE.Vector3(foe.pos.x - origin.x, 0.35, foe.pos.z - origin.z);
        g.launchPaint(origin, dir, 24, 'cannon', 'tank');
        this.cool = 0.72;
        this.kick = 1;
        this.flashT = 0.08;
      }
    }
    p.y = GY + 1;
    this.root.rotation.y = this.yaw;
    const spin = this.wheelSpin + this.speed * dt * 7 + err * 2.2;
    this.wheelSpin = spin;
    for (const w of this.wheels) w.rotation.set(spin, 0, Math.PI / 2);
    const scroll = this.speed * dt * 0.55;
    for (const map of this.tracks) map.offset.y = (map.offset.y + scroll) % 1;
    if (this.speed > 1.15) {
      this._dust = (this._dust || 0) - dt;
      if (this._dust <= 0) {
        this._dust = 0.18;
        g.particles?.burst(
          p.x - Math.sin(this.yaw) * 1.15,
          GY + 1.05,
          p.z - Math.cos(this.yaw) * 1.15,
          0xc6b48a, 3, 0.55, 0.22,
        );
      }
    }
    syncMobLabel(this, g.camera);
  }

  dispose() {
    this.root.removeFromParent();
  }
}
