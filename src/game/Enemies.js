// Special night pests: golem (breaks towers), thief (steals crops), dragon (kidnaps robots).
// Same duck-typed surface as Green: pos, center, dead, state, hit, update, dispose, kind.
import * as THREE from 'three';
import { t } from '../core/i18n.js';
import {
  createGolemModel, createThiefModel, createDragonModel,
  createChomperModel, createHopperModel,
  createSeaBeastModel, createDinoModel,
} from './models.js';
import { findPath, houseFootprintBlocked, outdoorGoal } from './nav.js';
import { moveBody, applyGravity } from './physics.js';
import { damp, dampAngle } from '../core/math.js';
import { stepMobVisual, visualScale } from './mobVisuals.js';
import { setEntityLight } from './world/materials.js';
import { LAYOUT, GY, WX, WZ, SEA } from './world/World.js';

const houseCell = houseFootprintBlocked;

/** Shared ground-path chase helpers. */
function chaseAlong(self, dt, tx, tz, speed) {
  const p = self.body.pos;
  let gx = tx, gz = tz;
  if (self.path && self.pathI < self.path.length) {
    const [cx, cz] = self.path[self.pathI];
    gx = cx + 0.5; gz = cz + 0.5;
    if (Math.hypot(gx - p.x, gz - p.z) < 0.45) self.pathI++;
  }
  const dx = gx - p.x, dz = gz - p.z;
  const d = Math.hypot(dx, dz) || 1;
  self.body.vel.x = damp(self.body.vel.x, (dx / d) * speed, 8, dt);
  self.body.vel.z = damp(self.body.vel.z, (dz / d) * speed, 8, dt);
  self.yaw = dampAngle(self.yaw, Math.atan2(dx, dz), 8, dt);
  return true;
}

function commonHit(self, dmg, from, knock = 1, knockMul = 6) {
  if (self.dead || self.state === 'emerge' || self.state === 'leave') return false;
  self.hp -= dmg;
  self.hurt = 0.35;
  self.stun = 0.4;
  const d = new THREE.Vector3(self.body.pos.x - from.x, 0, self.body.pos.z - from.z);
  if (d.lengthSq() < 1e-4) d.set(0, 0, 1);
  d.normalize().multiplyScalar(knockMul * knock);
  self.body.vel.set(d.x, 4.5, d.z);
  self.body.onGround = false;
  if (self.hp <= 0) { self.dead = true; self.state = 'dead'; }
  return true;
}

function emergeLeave(self, dt, g) {
  const p = self.body.pos;
  if (self.state === 'emerge') {
    const k = Math.min(1, self.stateT / 1.0);
    self.root.position.set(p.x, p.y - (1 - k) * self.body.h * 1.1, p.z);
    if (self.stateT < 0.9 && Math.random() < 0.4) g.particles.burst(p.x - 0.5, p.y - 0.1, p.z - 0.5, 0x7a5539, 1, 1);
    if (k >= 1) { self.state = self.afterEmerge || 'chase'; self.stateT = 0; }
    return true;
  }
  if (self.state === 'leave') {
    const k = Math.min(1, self.stateT / 1.2);
    self.root.position.set(p.x, p.y - k * self.body.h * 1.2, p.z);
    if (k >= 1) self.dead = true;
    return true;
  }
  return false;
}

function lightRoot(self) {
  const mat = self.model?.mat;
  if (!mat?.uniforms?.uLight) return;
  const p = self.body.pos;
  const [sk, bl] = self.game.world.lightAt(p.x, p.y + 0.5, p.z);
  setEntityLight(mat, sk, bl);
  if (mat.uniforms.uHurt) mat.uniforms.uHurt.value = self.hurt > 0 ? 1 : 0;
}

// ───────────────────────────────────────────────────────────────── Chomper (swarm eater)
export class Chomper {
  constructor(game, x, z) {
    this.game = game;
    this.kind = 'chomp';
    this.big = false;
    this.model = createChomperModel();
    this.root = this.model.root;
    game.scene.add(this.root);
    const s = this.model.baseScale;
    this.body = {
      pos: new THREE.Vector3(x, game.world.floor[Math.floor(x) + Math.floor(z) * WX] || GY + 1, z),
      vel: new THREE.Vector3(), hw: 0.4 * s, h: 0.7 * s, onGround: false, step: 1.35, inWater: false,
    };
    this.hp = 3; this.maxHp = 3;
    this.speed = 2.35;
    this.fuse = 0;
    this.state = 'emerge';
    this.afterEmerge = 'hunt';
    this.stateT = 0;
    this.yaw = Math.atan2(LAYOUT.center[0] - x, LAYOUT.center[1] - z);
    this.repathT = 0;
    this.path = null;
    this.target = null;
    this.hurt = 0;
    this.stun = 0;
    this.phase = Math.random() * 6;
    this.t = 0;
    this.dead = false;
    this.bites = 0;
    this.maxBites = 3 + Math.floor(Math.random() * 2);
    this.eatT = 0;
    this.root.position.copy(this.body.pos);
  }

  get pos() { return this.body.pos; }
  get center() { return new THREE.Vector3(this.body.pos.x, this.body.pos.y + this.body.h * 0.45, this.body.pos.z); }
  leave() { if (!this.dead && this.state !== 'leave') { this.state = 'leave'; this.stateT = 0; } }
  hit(dmg, from, knock = 1) { return commonHit(this, dmg, from, knock, 7); }

  update(dt) {
    const g = this.game;
    this.t += dt; this.stateT += dt;
    this.hurt = Math.max(0, this.hurt - dt);
    this.stun = Math.max(0, this.stun - dt);
    if (this.netPuppet) {
      this.root.position.copy(this.body.pos);
      this.animate(dt, !!this._netMoving);
      return;
    }
    if (emergeLeave(this, dt, g)) { this.animate(dt, false); return; }

    const p = this.body.pos;
    let moving = false;

    if (this.state === 'eat') {
      this.body.vel.x = damp(this.body.vel.x, 0, 10, dt);
      this.body.vel.z = damp(this.body.vel.z, 0, 10, dt);
      this.eatT += dt;
      if (this.eatT >= 0.55) {
        this.eatT = 0;
        if (this.target) g.munchCrop(this.target.x, this.target.z, this);
        this.bites++;
        g.particles.burst(p.x - 0.3, p.y + 0.2, p.z - 0.3, 0xf0a040, 6, 1);
        g.audio.sfx('harvest', { pos: p, pitch: 0.7 + Math.random() * 0.2 });
        if (this.bites >= this.maxBites) {
          this.leave();
        } else {
          this.state = 'hunt';
          this.stateT = 0;
          this.target = null;
          this.repathT = 0;
        }
      }
    } else if (this.state === 'hunt' && this.stun <= 0) {
      this.repathT -= dt;
      if (this.repathT <= 0) {
        this.repathT = 0.5;
        const crop = g.nearestCrop(p);
        if (crop) {
          this.target = { x: crop[0], z: crop[1], pos: new THREE.Vector3(crop[0] + 0.5, GY + 1, crop[1] + 0.5) };
          const goal = outdoorGoal(this.target.pos.x, this.target.pos.z);
          const r = findPath(g.world, p.x, p.z, goal.x, goal.z, { near: 0, maxNodes: 2800, blocked: houseCell });
          this.path = r.path; this.pathI = 0;
        } else {
          this.target = {
            x: LAYOUT.fieldA.water[0] + 2, z: LAYOUT.fieldA.water[1] + 2,
            pos: new THREE.Vector3(LAYOUT.fieldA.water[0] + 2.5, GY + 1, LAYOUT.fieldA.water[1] + 2.5),
          };
          this.path = null;
        }
      }
      const t = this.target;
      if (t) {
        const dist = Math.hypot(t.pos.x - p.x, t.pos.z - p.z);
        if (dist < 0.9) {
          this.state = 'eat';
          this.stateT = 0;
          this.eatT = 0;
        } else {
          chaseAlong(this, dt, t.pos.x, t.pos.z, this.speed);
          moving = true;
        }
      }
    }

    if (this.stun > 0) {
      this.body.vel.x *= Math.exp(-2.5 * dt);
      this.body.vel.z *= Math.exp(-2.5 * dt);
    }
    applyGravity(this.body, dt);
    if (this.body.inWater) this.body.vel.y = Math.max(this.body.vel.y, 2);
    const r = moveBody(g.world, this.body, dt);
    if ((r.hitX || r.hitZ) && this.body.onGround && moving) this.body.vel.y = 7.5;
    this.root.position.copy(p);
    this.animate(dt, moving);
  }

  animate(dt, moving) {
    const M = this.model;
    if (stepMobVisual(M, dt, moving || this.state === 'eat')) {
      const chew = this.state === 'eat' ? 1.08 : 1;
      M.scale.scale.setScalar(visualScale(M) * chew);
      this.root.rotation.y = this.yaw;
      lightRoot(this);
      return;
    }
    this.phase += dt * (this.state === 'eat' ? 18 : moving ? 10 : 2);
    const sw = Math.sin(this.phase);
    if (M.legs) {
      const amp = this.state === 'eat' ? 0.15 : moving ? 0.55 : 0.06;
      M.legs[0].rotation.x = sw * amp; M.legs[3].rotation.x = sw * amp;
      M.legs[1].rotation.x = -sw * amp; M.legs[2].rotation.x = -sw * amp;
    }
    const chew = this.state === 'eat' ? 1 + Math.abs(Math.sin(this.phase)) * 0.18 : 1;
    M.scale.scale.set(visualScale(M) * chew, visualScale(M) * (2 - chew * 0.15), visualScale(M) * chew);
    this.root.rotation.y = this.yaw;
    lightRoot(this);
  }

  dispose() { this.game.scene.remove(this.root); }
}

// ───────────────────────────────────────────────────────────────── Hopper (swarm digger)
export class Hopper {
  constructor(game, x, z) {
    this.game = game;
    this.kind = 'hop';
    this.big = false;
    this.model = createHopperModel();
    this.root = this.model.root;
    game.scene.add(this.root);
    const s = this.model.baseScale;
    this.body = {
      pos: new THREE.Vector3(x, game.world.floor[Math.floor(x) + Math.floor(z) * WX] || GY + 1, z),
      vel: new THREE.Vector3(), hw: 0.32 * s, h: 0.85 * s, onGround: false, step: 1.2, inWater: false,
    };
    this.hp = 3; this.maxHp = 3;
    this.speed = 2.8;
    this.fuse = 0;
    this.state = 'emerge';
    this.afterEmerge = 'bounce';
    this.stateT = 0;
    this.yaw = Math.atan2(LAYOUT.center[0] - x, LAYOUT.center[1] - z);
    this.hurt = 0;
    this.stun = 0;
    this.phase = Math.random() * 6;
    this.t = 0;
    this.dead = false;
    this.digs = 0;
    this.maxDigs = 2 + Math.floor(Math.random() * 2);
    this.hopCool = 0.4;
    this.root.position.copy(this.body.pos);
  }

  get pos() { return this.body.pos; }
  get center() { return new THREE.Vector3(this.body.pos.x, this.body.pos.y + this.body.h * 0.5, this.body.pos.z); }
  leave() { if (!this.dead && this.state !== 'leave') { this.state = 'leave'; this.stateT = 0; } }
  hit(dmg, from, knock = 1) { return commonHit(this, dmg, from, knock, 8); }

  update(dt) {
    const g = this.game;
    this.t += dt; this.stateT += dt;
    this.hurt = Math.max(0, this.hurt - dt);
    this.stun = Math.max(0, this.stun - dt);
    this.hopCool = Math.max(0, this.hopCool - dt);
    if (this.netPuppet) {
      this.root.position.copy(this.body.pos);
      this.animate(dt, !!this._netMoving);
      return;
    }
    if (emergeLeave(this, dt, g)) { this.animate(dt, false); return; }

    const p = this.body.pos;
    // Bounce toward farm, dig on landing
    if (this.state === 'bounce' && this.stun <= 0) {
      const tx = LAYOUT.center[0] + (Math.random() - 0.5) * 10;
      const tz = LAYOUT.center[1] + (Math.random() - 0.5) * 10;
      if (this.body.onGround && this.hopCool <= 0) {
        // Dig underfoot when on farm
        if (g.hopperDig(Math.floor(p.x), Math.floor(p.z), this)) {
          this.digs++;
          g.audio.sfx('place', { pos: p, pitch: 0.6 });
          if (this.digs >= this.maxDigs) { this.leave(); return; }
        }
        const dx = tx - p.x, dz = tz - p.z;
        const d = Math.hypot(dx, dz) || 1;
        this.body.vel.x = (dx / d) * this.speed * 1.4;
        this.body.vel.z = (dz / d) * this.speed * 1.4;
        this.body.vel.y = 7.2;
        this.body.onGround = false;
        this.hopCool = 0.85 + Math.random() * 0.35;
        this.yaw = Math.atan2(dx, dz);
      } else if (!this.body.onGround) {
        // slight air steer
        const dx = LAYOUT.center[0] - p.x, dz = LAYOUT.center[1] - p.z;
        const d = Math.hypot(dx, dz) || 1;
        this.body.vel.x = damp(this.body.vel.x, (dx / d) * this.speed, 3, dt);
        this.body.vel.z = damp(this.body.vel.z, (dz / d) * this.speed, 3, dt);
      }
    }

    if (this.stun > 0) {
      this.body.vel.x *= Math.exp(-2 * dt);
      this.body.vel.z *= Math.exp(-2 * dt);
    }
    applyGravity(this.body, dt);
    if (this.body.inWater) this.body.vel.y = Math.max(this.body.vel.y, 3);
    moveBody(g.world, this.body, dt);
    this.root.position.copy(p);
    this.animate(dt, !this.body.onGround);
  }

  animate(dt, airborne) {
    const M = this.model;
    if (stepMobVisual(M, dt, true)) {
      const squash = airborne ? 1.12 : 1;
      M.scale.scale.set(visualScale(M) / squash, visualScale(M) * squash, visualScale(M) / squash);
      this.root.rotation.y = this.yaw;
      lightRoot(this);
      return;
    }
    this.phase += dt * (airborne ? 14 : 4);
    const squash = airborne ? 0.85 : 1 + Math.sin(this.phase) * 0.08;
    M.scale.scale.set(visualScale(M) / squash, visualScale(M) * squash, visualScale(M) / squash);
    if (M.legs?.[0]) {
      M.legs[0].rotation.x = airborne ? -0.8 : Math.sin(this.phase) * 0.3;
      M.legs[1].rotation.x = airborne ? -0.8 : -Math.sin(this.phase) * 0.3;
    }
    this.root.rotation.y = this.yaw;
    lightRoot(this);
  }

  dispose() { this.game.scene.remove(this.root); }
}

// ───────────────────────────────────────────────────────────────── Golem
export class Golem {
  constructor(game, x, z) {
    this.game = game;
    this.kind = 'golem';
    this.big = false;
    this.model = createGolemModel();
    this.root = this.model.root;
    game.scene.add(this.root);
    const s = this.model.baseScale;
    this.body = {
      pos: new THREE.Vector3(x, game.world.floor[Math.floor(x) + Math.floor(z) * WX] || GY + 1, z),
      vel: new THREE.Vector3(), hw: 0.55 * s, h: 1.15 * s, onGround: false, step: 1.2, inWater: false,
    };
    this.hp = 10; this.maxHp = 10;
    this.speed = 1.35;
    this.fuse = 0;
    this.state = 'emerge';
    this.afterEmerge = 'chase';
    this.stateT = 0;
    this.yaw = Math.atan2(LAYOUT.center[0] - x, LAYOUT.center[1] - z);
    this.repathT = 0;
    this.path = null;
    this.target = null;
    this.hurt = 0;
    this.stun = 0;
    this.phase = Math.random() * 6;
    this.t = 0;
    this.dead = false;
    this.smashT = 0;
    this.marker = null;
    this.root.position.copy(this.body.pos);
  }

  get pos() { return this.body.pos; }
  get center() { return new THREE.Vector3(this.body.pos.x, this.body.pos.y + this.body.h * 0.5, this.body.pos.z); }

  leave() { if (!this.dead && this.state !== 'leave') { this.state = 'leave'; this.stateT = 0; this.clearMarker(); } }

  hit(dmg, from, knock = 1) { return commonHit(this, dmg, from, knock, 3.5); }

  pickTurret() {
    let best = null, bd = Infinity;
    for (const tr of this.game.turrets) {
      if (tr.dead) continue;
      const d = Math.hypot(tr.root.position.x - this.body.pos.x, tr.root.position.z - this.body.pos.z);
      if (d < bd) { bd = d; best = tr; }
    }
    return best;
  }

  clearMarker() {
    if (this.marker) {
      this.game.scene.remove(this.marker);
      this.marker.geometry?.dispose();
      this.marker.material?.dispose();
      this.marker = null;
    }
  }

  showMarker(x, z) {
    this.clearMarker();
    const geo = new THREE.RingGeometry(0.55, 0.9, 20);
    const mat = new THREE.MeshBasicMaterial({
      color: 0xff6040, transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthWrite: false,
    });
    const m = new THREE.Mesh(geo, mat);
    m.rotation.x = -Math.PI / 2;
    const y = (this.game.world.floorAt?.(x, z) ?? GY + 1) + 0.06;
    m.position.set(x, y, z);
    this.game.scene.add(m);
    this.marker = m;
  }

  update(dt) {
    const g = this.game;
    this.t += dt; this.stateT += dt;
    this.hurt = Math.max(0, this.hurt - dt);
    this.stun = Math.max(0, this.stun - dt);

    if (this.netPuppet) {
      this.root.position.copy(this.body.pos);
      this.animate(dt, !!this._netMoving);
      return;
    }
    if (emergeLeave(this, dt, g)) { this.animate(dt, false); return; }

    const p = this.body.pos;
    let moving = false;

    if (this.state === 'windup') {
      this.body.vel.x = damp(this.body.vel.x, 0, 10, dt);
      this.body.vel.z = damp(this.body.vel.z, 0, 10, dt);
      const k = Math.min(1, this.stateT / 1.1);
      if (this.marker?.material) this.marker.material.opacity = 0.35 + k * 0.45;
      if (this.model.arms?.[0]) this.model.arms[0].rotation.x = -k * 1.4;
      if (this.model.arms?.[1]) this.model.arms[1].rotation.x = -k * 1.1;
      if (this.stateT >= 1.1) {
        this.state = 'smash';
        this.stateT = 0;
      }
    } else if (this.state === 'smash') {
      const tr = this.target?.turret && !this.target.turret.dead ? this.target.turret : null;
      if (this.model.arms?.[0]) this.model.arms[0].rotation.x = 0.9;
      if (this.model.arms?.[1]) this.model.arms[1].rotation.x = 0.7;
      if (this.stateT < 0.08) {
        g.particles.burst(p.x - 0.4, p.y, p.z - 0.4, 0x8a8680, 14, 1.2);
        g.audio.sfx('explode', { pos: p, refDistance: 5, pitch: 0.55, dur: 0.5 });
        if (tr) {
          const hit = tr.hit(3);
          g.talk.sys(hit && tr.dead ? 'sys.golemBroke' : 'sys.golemHit', null, 'warn');
          if (hit && !tr.dead) g.floats.add('!', tr.root.position.x, tr.root.position.y + 3.2, tr.root.position.z, '#ff8060');
        }
        this.clearMarker();
      }
      if (this.stateT >= 0.55) {
        if (this.model.arms) for (const a of this.model.arms) a.rotation.x = 0;
        this.state = 'chase';
        this.stateT = 0;
        this.smashT = 1.8;
      }
    } else {
      this.smashT = Math.max(0, this.smashT - dt);
      this.repathT -= dt;
      if (this.repathT <= 0 && this.stun <= 0) {
        this.repathT = 0.9;
        const tr = this.pickTurret();
        if (tr) {
          this.target = { kind: 'turret', turret: tr, pos: tr.root.position.clone() };
          const r = findPath(g.world, p.x, p.z, tr.root.position.x, tr.root.position.z, { near: 1.2, maxNodes: 2800, blocked: houseCell });
          this.path = r.path; this.pathI = 0;
        } else {
          // No towers — lumber toward farm center and sulk-smash the dirt
          this.target = { kind: 'farm', pos: new THREE.Vector3(LAYOUT.center[0], GY + 1, LAYOUT.center[1]) };
          this.path = null;
        }
      }
      const t = this.target;
      if (t && this.stun <= 0) {
        const dist = Math.hypot(t.pos.x - p.x, t.pos.z - p.z);
        if (t.kind === 'turret' && dist < 2.4 && this.smashT <= 0) {
          this.state = 'windup';
          this.stateT = 0;
          this.showMarker(t.pos.x, t.pos.z);
          g.talk.sys('sys.golemWind', null, 'warn');
        } else {
          chaseAlong(this, dt, t.pos.x, t.pos.z, this.speed);
          moving = true;
        }
      }
    }

    if (this.stun > 0) {
      this.body.vel.x *= Math.exp(-2.5 * dt);
      this.body.vel.z *= Math.exp(-2.5 * dt);
    }
    applyGravity(this.body, dt);
    if (this.body.inWater) this.body.vel.y = Math.max(this.body.vel.y, 1.5);
    const r = moveBody(g.world, this.body, dt);
    if ((r.hitX || r.hitZ) && this.body.onGround && moving) this.body.vel.y = 6.5;
    this.root.position.copy(p);
    this.animate(dt, moving);
  }

  animate(dt, moving) {
    const M = this.model;
    stepMobVisual(M, dt, moving);
    this.phase += dt * (moving ? 5 : 1.5);
    const sw = Math.sin(this.phase) * (moving ? 0.45 : 0.05);
    if (M.legs?.[0]) { M.legs[0].rotation.x = sw; M.legs[1].rotation.x = -sw; }
    if (!M.scale?.scale) { this.root.rotation.y = this.yaw; return; }
    M.scale.scale.setScalar(visualScale(M) * (1 + (this.state === 'windup' ? Math.sin(this.t * 12) * 0.03 : 0)));
    this.root.rotation.y = this.yaw;
    lightRoot(this);
  }

  dispose() { this.clearMarker(); this.game.scene.remove(this.root); }
}

// ───────────────────────────────────────────────────────────────── Crop thief
export class CropThief {
  constructor(game, x, z) {
    this.game = game;
    this.kind = 'thief';
    this.big = false;
    this.model = createThiefModel();
    this.root = this.model.root;
    game.scene.add(this.root);
    const s = this.model.baseScale;
    this.body = {
      pos: new THREE.Vector3(x, game.world.floor[Math.floor(x) + Math.floor(z) * WX] || GY + 1, z),
      vel: new THREE.Vector3(), hw: 0.28 * s, h: 0.75 * s, onGround: false, step: 1.35, inWater: false,
    };
    this.hp = 2; this.maxHp = 2;
    this.speed = 3.6;
    this.fuse = 0;
    this.state = 'emerge';
    this.afterEmerge = 'hunt';
    this.stateT = 0;
    this.yaw = 0;
    this.repathT = 0;
    this.path = null;
    this.target = null;
    this.hurt = 0;
    this.stun = 0;
    this.phase = Math.random() * 6;
    this.t = 0;
    this.dead = false;
    this.loot = 0;
    this.fleeTo = null;
    this.root.position.copy(this.body.pos);
  }

  get pos() { return this.body.pos; }
  get center() { return new THREE.Vector3(this.body.pos.x, this.body.pos.y + this.body.h * 0.5, this.body.pos.z); }

  leave() { if (!this.dead && this.state !== 'leave') { this.state = 'leave'; this.stateT = 0; } }

  hit(dmg, from, knock = 1) {
    const ok = commonHit(this, dmg, from, knock, 9);
    if (this.dead) {
      this.releasePig();
      if (this.loot > 0) this.game.onThiefDropped(this);
    }
    return ok;
  }

  releasePig() {
    const pig = this.carriedPig;
    if (!pig || pig.dead) { this.carriedPig = null; return; }
    pig.carried = null;
    pig.body.pos.copy(this.body.pos);
    pig.root.position.copy(pig.body.pos);
    pig.root.visible = true;
    this.carriedPig = null;
  }

  update(dt) {
    const g = this.game;
    this.t += dt; this.stateT += dt;
    this.hurt = Math.max(0, this.hurt - dt);
    this.stun = Math.max(0, this.stun - dt);

    if (this.netPuppet) {
      this.root.position.copy(this.body.pos);
      this.animate(dt, !!this._netMoving);
      return;
    }
    if (emergeLeave(this, dt, g)) { this.animate(dt, false); return; }

    const p = this.body.pos;
    let moving = false;
    const spd = this.state === 'flee' ? this.speed * 1.15 : this.speed;

    if (this.state === 'hunt') {
      this.repathT -= dt;
      if (this.repathT <= 0 && this.stun <= 0 && !(this.target?.pig && this.target.pigRef && !this.target.pigRef.dead)) {
        this.repathT = 0.45;
        const pig = !this.carriedPig && Math.random() < 0.65 ? g.nearestPennedPig(p) : null;
        const crop = g.nearestCrop(p);
        if (pig) {
          this.target = { pig: true, pigRef: pig, pos: pig.body.pos.clone(), crop: false };
          const goal = outdoorGoal(pig.body.pos.x, pig.body.pos.z);
          const r = findPath(g.world, p.x, p.z, goal.x, goal.z, { near: 1, maxNodes: 2800, blocked: houseCell });
          this.path = r.path; this.pathI = 0;
        } else if (crop) {
          this.target = { x: crop[0], z: crop[1], pos: new THREE.Vector3(crop[0] + 0.5, GY + 1, crop[1] + 0.5), crop: true };
          const goal = outdoorGoal(this.target.pos.x, this.target.pos.z);
          const r = findPath(g.world, p.x, p.z, goal.x, goal.z, { near: 0, maxNodes: 2800, blocked: houseCell });
          this.path = r.path; this.pathI = 0;
        } else {
          // Empty field — still raid the plots so the thief is visible
          const fx = LAYOUT.fieldA.water[0] + 2 + Math.floor(Math.random() * 4);
          const fz = LAYOUT.fieldA.water[1] + 2 + Math.floor(Math.random() * 4);
          this.target = { x: fx, z: fz, pos: new THREE.Vector3(fx + 0.5, GY + 1, fz + 0.5), crop: false };
          this.path = null;
        }
      }
      const t = this.target;
      if (t?.pigRef && !t.pigRef.dead) t.pos.copy(t.pigRef.body.pos);
      if (t && this.stun <= 0) {
        const dist = Math.hypot(t.pos.x - p.x, t.pos.z - p.z);
        if (t.pig && dist < 1.15 && t.pigRef && !t.pigRef.dead && !t.pigRef.carried) {
          t.pigRef.carried = this;
          t.pigRef.penned = false;
          this.carriedPig = t.pigRef;
          g.talk.sys('sys.thiefPig', null, 'warn');
          g.audio.sfx('pig', { pos: p, pitch: 1.3 });
          this.beginFlee();
        } else if (!t.pig && dist < 0.85) {
          const stole = t.crop ? g.stealCrop(t.x, t.z, this) : 0;
          if (stole > 0) {
            this.loot += stole;
            if (this.model.sack) this.model.sack.visible = true;
            g.talk.sys('sys.thiefSteal', { n: stole }, 'warn');
            g.audio.sfx('harvest', { pos: p, pitch: 1.4 });
          } else {
            // Snatch a couple coins when plots are bare
            this.loot += 1;
            if (this.model.sack) this.model.sack.visible = true;
            g.money = Math.max(0, (g.money | 0) - 3);
            g.talk.sys('sys.thiefSteal', { n: 1 }, 'warn');
            g.floats.add('-3¢', p.x, p.y + 1.2, p.z, '#ff8080');
          }
          this.beginFlee();
        } else {
          chaseAlong(this, dt, t.pos.x, t.pos.z, spd);
          moving = true;
        }
      }
    } else if (this.state === 'flee') {
      if (!this.fleeTo) this.beginFlee();
      const [fx, fz] = this.fleeTo;
      chaseAlong(this, dt, fx, fz, spd);
      moving = true;
      if (Math.hypot(fx - p.x, fz - p.z) < 2.2 || this.stateT > 18) {
        g.onThiefEscaped(this);
        this.carriedPig = null;
        this.dead = true;
        this.state = 'dead';
        return;
      }
    }

    if (this.stun > 0) {
      this.body.vel.x *= Math.exp(-2.5 * dt);
      this.body.vel.z *= Math.exp(-2.5 * dt);
    }
    applyGravity(this.body, dt);
    if (this.body.inWater) this.body.vel.y = Math.max(this.body.vel.y, 2);
    const r = moveBody(g.world, this.body, dt);
    if ((r.hitX || r.hitZ) && this.body.onGround && moving) this.body.vel.y = 8;
    this.root.position.copy(p);
    this.animate(dt, moving);
  }

  beginFlee() {
    this.state = 'flee';
    this.stateT = 0;
    const cells = this.game.world.spawnCells;
    let best = null, bd = -1;
    const p = this.body.pos;
    for (let i = 0; i < 24; i++) {
      const idx = cells[Math.floor(Math.random() * cells.length)];
      if (idx == null) continue;
      const x = (idx % WX) + 0.5, z = ((idx / WX) | 0) + 0.5;
      if (z < LAYOUT.house.z0) continue;
      const d = Math.hypot(x - p.x, z - p.z);
      if (d > bd) { bd = d; best = [x, z]; }
    }
    this.fleeTo = best || [2, 2];
    this.path = null;
  }

  animate(dt, moving) {
    const M = this.model;
    stepMobVisual(M, dt, moving);
    this.phase += dt * (moving ? 14 : 3);
    const sw = Math.sin(this.phase) * (moving ? 0.75 : 0.08);
    if (M.legs?.[0]) { M.legs[0].rotation.x = sw; M.legs[1].rotation.x = -sw; }
    if (!M.body) { this.root.rotation.y = this.yaw; return; }
    M.body.rotation.z = Math.sin(this.t * 8) * (moving ? 0.12 : 0.03);
    if (M.sack?.visible) M.sack.rotation.z = Math.sin(this.t * 10) * 0.2;
    this.root.rotation.y = this.yaw;
    lightRoot(this);
  }

  dispose() { this.game.scene.remove(this.root); }
}

// ───────────────────────────────────────────────────────────────── Dragon
export class Dragon {
  constructor(game, x, z) {
    this.game = game;
    this.kind = 'dragon';
    this.big = false;
    this.model = createDragonModel();
    this.root = this.model.root;
    game.scene.add(this.root);
    const s = this.model.baseScale;
    const floor = game.world.floor[Math.floor(x) + Math.floor(z) * WX] || GY + 1;
    this.body = {
      pos: new THREE.Vector3(x, floor + 4, z),
      vel: new THREE.Vector3(), hw: 0.4 * s, h: 0.7 * s, onGround: false, step: 1, inWater: false,
    };
    this.hp = 6; this.maxHp = 6;
    this.speed = 4.2;
    this.fuse = 0;
    this.state = 'swoop';
    this.stateT = 0;
    this.yaw = Math.atan2(LAYOUT.center[0] - x, LAYOUT.center[1] - z);
    this.hurt = 0;
    this.stun = 0;
    this.phase = Math.random() * 6;
    this.t = 0;
    this.dead = false;
    this.carrying = null;
    this.prey = null;
    this.flyY = floor + 4;
    this.root.position.copy(this.body.pos);
  }

  get pos() { return this.body.pos; }
  get center() { return new THREE.Vector3(this.body.pos.x, this.body.pos.y + 0.4, this.body.pos.z); }

  leave() {
    if (this.dead || this.state === 'leave') return;
    if (this.carrying) this.dropRobot(false);
    this.state = 'leave';
    this.stateT = 0;
  }

  hit(dmg, from, knock = 1) {
    if (this.dead || this.state === 'leave') return false;
    this.hp -= dmg;
    this.hurt = 0.35;
    this.stun = 0.25;
    const d = new THREE.Vector3(this.body.pos.x - from.x, 0, this.body.pos.z - from.z);
    if (d.lengthSq() < 1e-4) d.set(0, 0, 1);
    d.normalize().multiplyScalar(5 * knock);
    this.body.vel.x += d.x; this.body.vel.z += d.z;
    if (this.hp <= 0) {
      this.dead = true;
      this.state = 'dead';
      if (this.carrying) this.dropRobot(true);
    }
    return true;
  }

  pickPrey() {
    const g = this.game;
    // Only grab robots that are actually working outdoors — never from bed/house
    const crew = [g.robot, ...(g.helpers || [])].filter((r) => {
      if (!r || r.dead || r.captive) return false;
      if (r.state === 'kidnapped' || r.state === 'sleep' || r.state === 'toBed' || r.state === 'hide') return false;
      if (!r.exposed || r.inHouse) return false;
      return r.state === 'work' || r.state === 'scare' || r.state === 'panic' || r.state === 'sulk' || r.state === 'flung';
    });
    if (!crew.length) return null;
    let best = null, bd = Infinity;
    for (const r of crew) {
      const d = Math.hypot(r.body.pos.x - this.body.pos.x, r.body.pos.z - this.body.pos.z);
      if (d < bd) { bd = d; best = r; }
    }
    return best;
  }

  dropRobot(rescued) {
    const r = this.carrying;
    this.carrying = null;
    if (!r) return;
    r.releaseKidnap(this.body.pos.clone(), rescued);
    if (rescued) {
      this.game.today.rescued = (this.game.today.rescued | 0) + 1;
      this.game.talk.sys('sys.dragonRescue');
      this.game.money += 8;
      this.game.floats.add('+8', this.body.pos.x, this.body.pos.y + 1, this.body.pos.z, '#ffe080');
    }
    if (this.game.isNetHost()) this.game.pushNetSim(true);
  }

  update(dt) {
    const g = this.game;
    this.t += dt; this.stateT += dt;
    this.hurt = Math.max(0, this.hurt - dt);
    this.stun = Math.max(0, this.stun - dt);

    if (this.netPuppet) {
      this.root.position.copy(this.body.pos);
      if (this.carrying && !this.carrying.captive && !this.carrying.netHidden) {
        this.carrying.body.pos.set(this.body.pos.x, this.body.pos.y - 0.9, this.body.pos.z);
        this.carrying.root.position.copy(this.carrying.body.pos);
        this.carrying.root.visible = true;
      }
      this.animate(dt);
      return;
    }

    if (this.state === 'leave') {
      this.body.pos.y += dt * 6;
      this.body.pos.x += Math.sin(this.yaw) * dt * 5;
      this.body.pos.z += Math.cos(this.yaw) * dt * 5;
      this.root.position.copy(this.body.pos);
      if (this.stateT > 2.5) this.dead = true;
      this.animate(dt);
      return;
    }

    if (this.state === 'swoop') {
      // Dusk/night: crew goes indoors — abort the raid
      if (g.isNightish) { this.leave(); return; }
      if (!this.prey || this.prey.dead || this.prey.state === 'kidnapped' || this.prey.inHouse || !this.prey.exposed) {
        this.prey = this.pickPrey();
      }
      if (!this.prey) {
        // Nobody outdoors to grab — circle then leave
        if (this.stateT > 6) { this.leave(); return; }
        this.yaw += dt * 1.2;
        this.body.pos.x += Math.sin(this.yaw) * this.speed * dt * 0.5;
        this.body.pos.z += Math.cos(this.yaw) * this.speed * dt * 0.5;
      } else {
        const tp = this.prey.body.pos;
        const targetY = tp.y + (this.prey.state === 'sleep' ? 1.2 : 2.2);
        const dx = tp.x - this.body.pos.x, dz = tp.z - this.body.pos.z;
        const dist = Math.hypot(dx, dz);
        this.yaw = dampAngle(this.yaw, Math.atan2(dx, dz), 6, dt);
        const sp = this.stun > 0 ? this.speed * 0.4 : this.speed;
        if (dist > 0.01) {
          this.body.pos.x += (dx / dist) * sp * dt;
          this.body.pos.z += (dz / dist) * sp * dt;
        }
        this.body.pos.y = damp(this.body.pos.y, targetY, 4, dt);
        if (dist < 1.4) {
          this.carrying = this.prey;
          this.prey.kidnapBy(this);
          this.state = 'flee';
          this.stateT = 0;
          g.talk.sys('sys.dragonGrab', null, 'warn');
          g.hud.banner(t('banner.dragon'), t('banner.dragonSub'), 2.8);
          g.audio.sfx('boss_spawn', { pos: this.body.pos, pitch: 1.35 });
          if (g.isNetHost()) g.pushNetSim(true);
          g.particles.sparkle(tp.x - 0.3, tp.y + 1, tp.z - 0.3, 16, 0xff8060);
        }
      }
    } else if (this.state === 'flee') {
      // Leave toward the beach or a side — never back over the lodge.
      const H = LAYOUT.house;
      let dirX = this.body.pos.x < LAYOUT.center[0] ? -0.55 : 0.55;
      let dirZ = 0.85;
      if (this.body.pos.z < H.z1 + 3) {
        dirX = this.body.pos.x < (H.x0 + H.x1) * 0.5 ? -1 : 1;
        dirZ = 0.2;
      }
      this.yaw = Math.atan2(dirX, dirZ);
      const sp = this.stun > 0 ? this.speed * 0.5 : this.speed * 1.1;
      this.body.pos.x += dirX * sp * dt;
      this.body.pos.z += dirZ * sp * dt;
      this.body.pos.y = damp(this.body.pos.y, this.flyY + 3, 3, dt);
      if (this.carrying) {
        this.carrying.body.pos.set(this.body.pos.x, this.body.pos.y - 0.9, this.body.pos.z);
        this.carrying.root.position.copy(this.carrying.body.pos);
      }
      const cx = LAYOUT.center[0], cz = LAYOUT.center[1];
      const edge = Math.hypot(this.body.pos.x - cx, this.body.pos.z - cz) > 34 || this.stateT > 14;
      if (edge) {
        g.onDragonEscaped(this);
        if (this.carrying) {
          this.carrying.netHidden = true;
          this.carrying.captive = true;
          this.carrying.root.visible = false;
          this.carrying = null;
          if (g.isNetHost()) g.pushNetSim(true);
        }
        this.dead = true;
        this.state = 'dead';
        return;
      }
    }

    this.root.position.copy(this.body.pos);
    this.animate(dt);
  }

  animate(dt) {
    const M = this.model;
    this.phase += dt * 10;
    const flap = Math.sin(this.phase) * 0.55;
    if (M.wings?.[0]) M.wings[0].rotation.z = 0.35 + flap;
    if (M.wings?.[1]) M.wings[1].rotation.z = -0.35 - flap;
    if (M.head) M.head.rotation.x = Math.sin(this.t * 3) * 0.1;
    M.scale.scale.setScalar(visualScale(M) * (1 + Math.sin(this.t * 6) * 0.03));
    this.root.rotation.y = this.yaw;
    lightRoot(this);
  }

  dispose() {
    if (this.carrying) this.dropRobot(false);
    this.game.scene.remove(this.root);
  }
}

// ───────────────────────────────────────────────────────────────── Sea beast (arcade tide)
export class SeaBeast {
  constructor(game, x, z, { big = false } = {}) {
    this.game = game;
    this.kind = big ? 'leviathan' : 'sea';
    this.big = big;
    this.model = createSeaBeastModel(big);
    this.root = this.model.root;
    game.scene.add(this.root);
    const shore = LAYOUT.waterLineZ ?? 80;
    const stand = game.world.floor[Math.floor(x) + Math.floor(z) * WX];
    const inSea = z >= shore - 0.5 || !(stand >= GY);
    this.body = {
      pos: new THREE.Vector3(x, inSea ? SEA - 0.15 : stand, z),
      vel: new THREE.Vector3(),
      hw: big ? 0.72 : 0.55,
      h: big ? 1.85 : 1.45,
      onGround: false,
      step: 1.35,
      inWater: inSea,
    };
    this.hp = big ? 32 : 18;
    this.maxHp = this.hp;
    this.speed = big ? 2.0 : 2.45;
    this.state = 'emerge';
    this.afterEmerge = 'hunt';
    this.stateT = 0;
    this.yaw = Math.atan2(LAYOUT.center[0] - x, LAYOUT.center[1] - z);
    this.repathT = 0;
    this.path = null;
    this.target = null;
    this.hurt = 0;
    this.stun = 0;
    this.phase = Math.random() * 6;
    this.t = 0;
    this.dead = false;
    this.bites = 0;
    this.maxBites = big ? 8 : 5;
    this.eatT = 0;
    this.root.position.copy(this.body.pos);
  }

  get pos() { return this.body.pos; }
  get center() { return new THREE.Vector3(this.body.pos.x, this.body.pos.y + this.body.h * 0.5, this.body.pos.z); }
  leave() { if (!this.dead && this.state !== 'leave' && this.state !== 'retreat') { this.state = 'retreat'; this.stateT = 0; } }
  hit(dmg, from, knock = 1) { return commonHit(this, dmg, from, knock, this.big ? 4 : 6); }

  update(dt) {
    const g = this.game;
    this.t += dt; this.stateT += dt;
    this.hurt = Math.max(0, this.hurt - dt);
    this.stun = Math.max(0, this.stun - dt);
    if (this.netPuppet) {
      this.root.position.copy(this.body.pos);
      this.animate(dt, !!this._netMoving);
      return;
    }
    if (emergeLeave(this, dt, g)) { this.animate(dt, false); return; }

    const p = this.body.pos;

    if (this.state === 'retreat') {
      // Slide back into the farm-facing sea (+Z past the fields)
      const tz = Math.min(WZ - 3, (LAYOUT.waterLineZ ?? 80) + 6);
      chaseAlong(this, dt, p.x, tz, this.speed * 1.3);
      this._rideSea();
      if (!this.body.inWater) applyGravity(this.body, dt);
      moveBody(g.world, this.body, dt);
      if (p.z > LAYOUT.farmZone.z1 + 10 || this.stateT > 12) {
        this.state = 'leave';
        this.stateT = 0;
      }
      this.root.position.copy(p);
      this.animate(dt, true);
      return;
    }

    let moving = false;
    if (this.state === 'eat') {
      this.body.vel.x = damp(this.body.vel.x, 0, 8, dt);
      this.body.vel.z = damp(this.body.vel.z, 0, 8, dt);
      this.eatT += dt;
      if (this.eatT >= 0.65) {
        this.eatT = 0;
        if (this.target) g.munchCrop(this.target.x, this.target.z, this);
        this.bites++;
        g.particles.burst(p.x, p.y + 0.3, p.z, 0x4a90c8, 8, 1.2);
        g.audio.sfx('harvest', { pos: p, pitch: 0.5 });
        if (this.bites >= this.maxBites) this.leave();
        else { this.state = 'hunt'; this.stateT = 0; this.target = null; }
      }
    } else if (this.state === 'hunt' && this.stun <= 0) {
      this.repathT -= dt;
      if (this.repathT <= 0) {
        this.repathT = 0.55;
        const nightish = g.phase === 'night' || g.phase === 'dusk';
        const pig = nightish ? (g.nearestPig?.(p) || null) : null;
        const crop = g.nearestCrop?.(p) || null;
        if (pig) {
          this.target = { x: pig.pos.x, z: pig.pos.z, pos: pig.body.pos, pig: true, pigRef: pig };
          this.path = null;
        } else if (crop) {
          this.target = { x: crop[0], z: crop[1], pos: new THREE.Vector3(crop[0] + 0.5, GY + 1, crop[1] + 0.5) };
          const goal = outdoorGoal(this.target.pos.x, this.target.pos.z);
          const r = findPath(g.world, p.x, p.z, goal.x, goal.z, { near: 0, maxNodes: 2800, blocked: houseCell });
          this.path = r.path; this.pathI = 0;
        } else {
          this.target = { x: LAYOUT.farmZone.x0 + 4, z: LAYOUT.farmZone.z0 + 2, pos: new THREE.Vector3(LAYOUT.farmZone.x0 + 4.5, GY + 1, LAYOUT.farmZone.z0 + 2.5) };
          this.path = null;
        }
      }
      const shore = LAYOUT.waterLineZ ?? 80;
      if (p.z >= shore - 0.4) {
        // The sea floor is a cliff. Swim straight at the sand before pathing inland.
        this.path = null;
        const aimX = Math.abs(p.x - LAYOUT.pathX) > 22 ? LAYOUT.pathX : p.x;
        chaseAlong(this, dt, aimX, shore - 5, this.speed);
        moving = true;
      } else       if (this.target?.pigRef && !this.target.pigRef.dead) this.target.pos.copy(this.target.pigRef.body.pos);
      if (this.target) {
        const dist = Math.hypot(this.target.pos.x - p.x, this.target.pos.z - p.z);
        if (this.target.pig && dist < 1.25 && this.target.pigRef && !this.target.pigRef.dead) {
          g.removePig(this.target.pigRef);
          g.talk.sys('sys.seaPig', null, 'warn');
          this.target = null;
          this.leave();
        } else if (dist < 1.1) { this.state = 'eat'; this.eatT = 0; this.stateT = 0; }
        else { chaseAlong(this, dt, this.target.pos.x, this.target.pos.z, this.speed); moving = true; }
      }
    }

    if (this.stun > 0) {
      this.body.vel.x *= Math.exp(-2 * dt);
      this.body.vel.z *= Math.exp(-2 * dt);
    }
    const riding = this._rideSea();
    if (!riding) {
      applyGravity(this.body, dt);
      if (this.body.inWater) this.body.vel.y = Math.max(this.body.vel.y, 1.5);
    }
    const r = moveBody(g.world, this.body, dt);
    if ((r.hitX || r.hitZ) && this.body.onGround && moving && !riding) this.body.vel.y = 8;
    this.root.position.copy(p);
    this.animate(dt, moving);
  }

  /**
   * The open sea is a sheet over a trench. Swim on the surface, then step
   * onto the sand instead of staying stuck against the cliff.
   */
  _rideSea() {
    const shore = LAYOUT.waterLineZ ?? 80;
    const p = this.body.pos;
    if (p.z < shore - 0.35) return false;
    const headingIn = this.body.vel.z <= 0.15;
    const ix = Math.max(0, Math.min(WX - 1, Math.floor(p.x)));
    const iz = Math.max(0, Math.min(WZ - 1, Math.floor(shore) - 1));
    const stand = this.game.world.floor[ix + iz * WX];
    if (headingIn && p.z <= shore + 1.6 && stand >= GY) {
      p.y = stand;
      p.z = Math.min(p.z, shore - 0.45);
      this.body.vel.y = 0;
      this.body.onGround = true;
      this.body.inWater = false;
      return false;
    }
    p.y = SEA - 0.15;
    this.body.vel.y = 0;
    this.body.onGround = true;
    this.body.inWater = true;
    return true;
  }

  animate(dt, moving) {
    const M = this.model;
    stepMobVisual(M, dt, moving);
    this.phase += dt * (moving ? 8 : 3);
    const und = Math.sin(this.phase) * 0.12;
    if (!M.scale?.scale) { this.root.rotation.y = this.yaw; return; }
    if (M.tail) M.tail.rotation.y = und * 2;
    if (M.head) M.head.rotation.x = Math.sin(this.t * 4) * 0.08;
    M.scale.scale.setScalar(visualScale(M) * (1 + Math.sin(this.t * 5) * 0.03));
    this.root.rotation.y = this.yaw;
    lightRoot(this);
  }

  dispose() { this.game.scene.remove(this.root); }
}

// ───────────────────────────────────────────────────────────────── Dino stampede
export class Dino {
  constructor(game, x, z) {
    this.game = game;
    this.kind = 'dino';
    this.big = false;
    this.model = createDinoModel();
    this.root = this.model.root;
    game.scene.add(this.root);
    const s = this.model.baseScale;
    const floor = game.world.floor[Math.floor(x) + Math.floor(z) * WX] || GY + 1;
    this.body = {
      pos: new THREE.Vector3(x, floor, z),
      vel: new THREE.Vector3(), hw: 0.45 * s, h: 1.1 * s, onGround: false, step: 1.35, inWater: false,
    };
    this.hp = 8; this.maxHp = 8;
    this.speed = 4.2;
    this.state = 'emerge';
    this.afterEmerge = 'charge';
    this.stateT = 0;
    this.yaw = Math.atan2(LAYOUT.center[0] - x, LAYOUT.farmZone.z0 - z);
    this.hurt = 0;
    this.stun = 0;
    this.phase = Math.random() * 6;
    this.t = 0;
    this.dead = false;
    this.stomps = 0;
    this.maxStomps = 4;
    this.stompT = 0;
    this.root.position.copy(this.body.pos);
  }

  get pos() { return this.body.pos; }
  get center() { return new THREE.Vector3(this.body.pos.x, this.body.pos.y + this.body.h * 0.5, this.body.pos.z); }
  leave() { if (!this.dead && this.state !== 'leave') { this.state = 'leave'; this.stateT = 0; } }
  hit(dmg, from, knock = 1) { return commonHit(this, dmg, from, knock, 8); }

  update(dt) {
    const g = this.game;
    this.t += dt; this.stateT += dt;
    this.hurt = Math.max(0, this.hurt - dt);
    this.stun = Math.max(0, this.stun - dt);
    if (this.netPuppet) {
      this.root.position.copy(this.body.pos);
      this.animate(dt, !!this._netMoving);
      return;
    }
    if (emergeLeave(this, dt, g)) { this.animate(dt, false); return; }

    const p = this.body.pos;
    let moving = false;

    if (this.state === 'charge' && this.stun <= 0) {
      // Sprint from beach (+Z) into the fields toward the lodge door
      const tx = LAYOUT.center[0] + Math.sin(this.t * 0.7) * 6;
      const tz = LAYOUT.farmZone.z1 - 2 - (this.t % 8);
      chaseAlong(this, dt, tx, tz, this.speed);
      moving = true;
      this.stompT -= dt;
      if (this.stompT <= 0) {
        this.stompT = 0.55;
        const cx = Math.floor(p.x), cz = Math.floor(p.z);
        if (g.munchCrop(cx, cz, this) > 0 || g.munchCrop(cx + 1, cz, this) > 0) {
          this.stomps++;
          g.shake = Math.max(g.shake || 0, 0.18);
        }
        if (this.stomps >= this.maxStomps || this.stateT > 22) this.leave();
      }
    }

    if (this.stun > 0) {
      this.body.vel.x *= Math.exp(-2 * dt);
      this.body.vel.z *= Math.exp(-2 * dt);
    }
    applyGravity(this.body, dt);
    const r = moveBody(g.world, this.body, dt);
    if ((r.hitX || r.hitZ) && this.body.onGround && moving) this.body.vel.y = 9;
    this.root.position.copy(p);
    this.animate(dt, moving);
  }

  animate(dt, moving) {
    const M = this.model;
    stepMobVisual(M, dt, moving);
    this.phase += dt * (moving ? 14 : 3);
    const sw = Math.sin(this.phase);
    if (M.legs?.length) {
      for (let i = 0; i < M.legs.length; i++) M.legs[i].rotation.x = sw * (i % 2 ? -0.7 : 0.7) * (moving ? 1 : 0.1);
    }
    if (M.head) M.head.rotation.x = moving ? -0.25 : Math.sin(this.t * 3) * 0.08;
    this.root.rotation.y = this.yaw;
    lightRoot(this);
  }

  dispose() { this.game.scene.remove(this.root); }
}
