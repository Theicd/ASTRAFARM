// Arcade set-pieces: hurricane shelter, sea-beast tide, dino stampede.
// Visuals (sky/fog/shake + spinning storm) + farm damage + monster spawns stay in sync.
import * as THREE from 'three';
import { t } from '../core/i18n.js';
import { damp } from '../core/math.js';
import { mulberry32 } from '../core/rng.js';
import { LAYOUT, GY, WX, WZ, SEA } from './world/World.js';
import { B, isCrop } from './world/blocks.js';

/** Spawn on the farm-facing beach (+Z past the fields). */
function beachXZ(rng, spread = 12) {
  const x = LAYOUT.center[0] + (rng() - 0.5) * spread * 2;
  const z = LAYOUT.farmZone.z1 + 8 + rng() * 10;
  return [x, Math.max(LAYOUT.farmZone.z1 + 4, Math.min(WZ - 3, z))];
}

/** Funnel tornado: narrow at the ground, wide cloud deck, debris in a rising helix. */
function makeHurricaneMesh() {
  const root = new THREE.Group();
  root.name = 'hurricane';
  const funnel = new THREE.Group();
  const ghost = {
    transparent: true, depthWrite: false, fog: true, side: THREE.DoubleSide,
  };

  const rings = [];
  for (let i = 0; i < 11; i++) {
    const t = i / 10;
    const radius = 1.15 + t * t * 8.2;
    const tube = 0.16 + t * 0.42;
    const mat = new THREE.MeshBasicMaterial({
      ...ghost,
      color: t < 0.25 ? 0x5c6b7a : t < 0.7 ? 0xb7c4d0 : 0xe4ebf2,
      opacity: 0.22 + (1 - t) * 0.42,
    });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 6, 20), mat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.35 + t * 17;
    ring.userData.spin = 1.6 + t * 4.2;
    funnel.add(ring);
    rings.push(ring);
  }

  const debrisColors = [0x8d6a45, 0x6a8f4a, 0xcbb892, 0x9aa8b8, 0x3e4a58, 0xd8dee6];
  const bits = [];
  for (let i = 0; i < 48; i++) {
    const t = i / 48;
    const y = 0.25 + t * 16.5;
    const rad = 0.7 + t * t * 6.4;
    const ang = t * Math.PI * 9;
    const mat = new THREE.MeshBasicMaterial({
      ...ghost,
      color: debrisColors[i % debrisColors.length],
      opacity: 0.92,
    });
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(0.28 + (i % 3) * 0.16, 0.16, 0.42 + (i % 2) * 0.2), mat);
    mesh.userData = { ang, rad, y, spin: 4.2 + (i % 5) * 0.55 };
    mesh.position.set(Math.cos(ang) * rad, y, Math.sin(ang) * rad);
    funnel.add(mesh);
    bits.push(mesh);
  }

  const dust = new THREE.Mesh(
    new THREE.RingGeometry(0.9, 3.6, 24),
    new THREE.MeshBasicMaterial({ ...ghost, color: 0xd8c8a4, opacity: 0.42 }),
  );
  dust.rotation.x = -Math.PI / 2;
  dust.position.y = 0.12;
  funnel.add(dust);

  const eye = new THREE.Mesh(
    new THREE.CylinderGeometry(0.28, 1.05, 15, 10, 1, true),
    new THREE.MeshBasicMaterial({ ...ghost, color: 0x1c2430, opacity: 0.5 }),
  );
  eye.position.y = 7.4;
  funnel.add(eye);

  root.add(funnel);
  root.userData.bits = bits;
  root.userData.rings = rings;
  root.userData.dust = dust;
  root.userData.eye = eye;
  root.userData.funnel = funnel;
  return root;
}

export class ArcadeEvents {
  constructor(game) {
    this.game = game;
    this.queue = [];
    this.active = null;
    this.storm = 0;
    this.stormTarget = 0;
    this.wind = 0;
    this.shelter = false;
    this._dmgT = 0;
    this._spawned = [];
    this.stormMesh = null;
    this._stormPath = 0;
  }

  reset() {
    this.queue = [];
    this.active = null;
    this.storm = 0;
    this.stormTarget = 0;
    this.wind = 0;
    this.shelter = false;
    this._dmgT = 0;
    this._spawned = [];
    this._stormPath = 0;
    this.disposeStormMesh();
  }

  disposeStormMesh() {
    if (!this.stormMesh) return;
    this.game.scene.remove(this.stormMesh);
    this.stormMesh.traverse((o) => {
      o.geometry?.dispose?.();
      if (o.material) {
        if (Array.isArray(o.material)) o.material.forEach((m) => m.dispose());
        else o.material.dispose();
      }
    });
    this.stormMesh = null;
  }

  planDay(dayIndex, cfg) {
    this.reset();
    const rng = mulberry32(((this.game.world?.seed || 1) ^ (dayIndex * 7919) ^ 0xa7cad3) >>> 0);
    const dayLen = cfg.day;
    const events = [];

    if (dayIndex === 0) {
      events.push({ kind: 'tide', t: dayLen * 0.72, warn: 6, rage: 28 });
    } else {
      if (dayIndex >= 1 && (dayIndex === 2 || rng() < 0.55 + dayIndex * 0.08)) {
        events.push({
          kind: 'hurricane',
          t: dayLen * (0.28 + rng() * 0.22),
          warn: 8,
          rage: 22 + Math.min(18, dayIndex * 3),
        });
      }
      if (dayIndex >= 1 && (dayIndex % 2 === 1 || rng() < 0.5)) {
        events.push({
          kind: 'tide',
          t: dayLen * (0.45 + rng() * 0.35),
          warn: 7,
          rage: 32 + dayIndex * 2,
          big: dayIndex >= 3 || !!cfg.boss,
        });
      }
      if (dayIndex >= 2 && (rng() < 0.45 || dayIndex >= 4)) {
        events.push({
          kind: 'stampede',
          t: dayLen * (0.2 + rng() * 0.4),
          warn: 5,
          rage: 26,
          count: Math.min(4, 2 + (dayIndex >= 4 ? 1 : 0)),
        });
      }
    }

    events.sort((a, b) => a.t - b.t);
    const spaced = [];
    let lastEnd = -99;
    for (const e of events) {
      const start = Math.max(e.t, lastEnd + 18);
      if (start + e.warn + e.rage > dayLen - 8) continue;
      spaced.push({ ...e, t: start });
      lastEnd = start + e.warn + e.rage;
    }
    this.queue = spaced;
  }

  get outdoorUnsafe() {
    return this.shelter || (this.active?.kind === 'hurricane' && this.active.phase === 'rage');
  }

  /** Host snapshot so every client sees the same storm, like the shared night. */
  netSnapshot() {
    const a = this.active;
    const p = this.stormMesh?.position;
    if (!a && this.storm < 0.04 && !this.stormMesh) return null;
    return {
      k: a?.kind || '',
      ph: a?.phase || 'clear',
      st: +this.stormTarget.toFixed(2),
      sh: this.shelter ? 1 : 0,
      u: +(this._stormPath || 0).toFixed(3),
      sc: this.stormMesh ? +this.stormMesh.scale.x.toFixed(2) : 0,
      x: p ? +p.x.toFixed(1) : 0,
      y: p ? +p.y.toFixed(1) : 0,
      z: p ? +p.z.toFixed(1) : 0,
    };
  }

  /** Client: follow the host storm. No extra spawns or crop damage. */
  applyNet(snap) {
    const g = this.game;
    if (!snap || !snap.k) {
      this.stormTarget = 0;
      if (this.shelter) {
        this.shelter = false;
        if (g.phase === 'day') g.wakeCrew();
      }
      if (this.active && this.active.phase !== 'clear') {
        this.active.phase = 'clear';
        this.active.phaseT = 0;
      }
      return;
    }
    const prev = this.active ? `${this.active.kind}:${this.active.phase}` : '';
    const next = `${snap.k}:${snap.ph}`;
    if (!this.active || this.active.kind !== snap.k) {
      this.active = { kind: snap.k, phase: snap.ph, phaseT: 0, rage: 22, warn: 8 };
    } else {
      this.active.phase = snap.ph;
    }
    this.stormTarget = typeof snap.st === 'number' ? snap.st : this.stormTarget;
    const wasShelter = this.shelter;
    this.shelter = !!snap.sh;
    if (this.shelter && !wasShelter) g.sendCrewToBed();
    if (!this.shelter && wasShelter && g.phase === 'day') g.wakeCrew();
    this._stormPath = snap.u || 0;
    if (snap.k !== 'hurricane' || snap.ph === 'clear' || !(snap.sc > 0.05)) {
      this.disposeStormMesh();
    } else {
      if (!this.stormMesh) this.spawnStormMesh();
      if (this.stormMesh) {
        this.stormMesh.position.set(snap.x, snap.y, snap.z);
        this.stormMesh.scale.setScalar(snap.sc);
      }
    }
    if (prev !== next) this.announcePhase(snap.k, snap.ph);
  }

  announcePhase(kind, phase) {
    const g = this.game;
    if (kind === 'hurricane' && phase === 'warn') {
      g.hud.banner(t('banner.hurricane'), t('banner.hurricaneWarn'), 3.4);
      g.talk.sys('sys.hurricaneWarn', null, 'warn');
      g.audio.sfx('night');
    } else if (kind === 'hurricane' && phase === 'rage') {
      g.hud.banner(t('banner.hurricane'), t('banner.hurricaneRage'), 3.0);
      g.talk.sys('sys.hurricaneShelter', null, 'warn');
      g.audio.sfx('boss_spawn');
    } else if (kind === 'hurricane' && phase === 'clear') {
      g.hud.banner(t('banner.hurricaneClear'), t('banner.hurricaneClearSub'), 2.4);
      g.talk.sys('sys.hurricaneClear');
    } else if (kind === 'tide' && phase === 'warn') {
      g.hud.banner(t('banner.tide'), t('banner.tideWarn'), 3.2);
      g.talk.sys('sys.tideWarn', null, 'warn');
    } else if (kind === 'tide' && phase === 'rage') {
      g.hud.banner(t('banner.tide'), t('banner.tideRage'), 2.8);
      g.talk.sys('sys.tideRise', null, 'warn');
    } else if (kind === 'stampede' && phase === 'warn') {
      g.hud.banner(t('banner.stampede'), t('banner.stampedeWarn'), 2.8);
      g.talk.sys('sys.stampedeWarn', null, 'warn');
    } else if (kind === 'stampede' && phase === 'rage') {
      g.hud.banner(t('banner.stampede'), t('banner.stampedeRage'), 2.6);
      g.talk.sys('sys.stampede', null, 'warn');
    }
  }

  update(dt) {
    const g = this.game;
    if (g.titleMode) return;
    if (g.isNetClient()) {
      this.storm = damp(this.storm, this.stormTarget, 2.2, dt);
      this.wind = damp(this.wind, this.shelter ? 1 : 0, 3, dt);
      this.updateStormMesh(dt, true);
      return;
    }
    const clock = g.clock;

    if (!this.active && this.queue.length && clock >= this.queue[0].t) {
      this.begin(this.queue.shift());
    }

    if (this.active) this.tickActive(dt);

    this.storm = damp(this.storm, this.stormTarget, this.stormTarget > this.storm ? 1.6 : 2.8, dt);
    this.wind = damp(this.wind, this.active?.kind === 'hurricane' && this.active.phase !== 'clear' ? 1 : 0, 3, dt);
    this.updateStormMesh(dt);

    if (this.storm > 0.55 && Math.random() < dt * 2.5) {
      g.shake = Math.max(g.shake || 0, 0.08 + this.storm * 0.2);
    }
  }

  begin(ev) {
    this.active = { ...ev, phase: 'warn', phaseT: 0, age: 0 };
    this._dmgT = 0;
    this._spawned = [];
    const g = this.game;
    this.announcePhase(ev.kind, 'warn');
    if (ev.kind === 'hurricane') {
      this.stormTarget = 0.45;
      this.spawnStormMesh();
    } else if (ev.kind === 'tide') {
      this.stormTarget = 0.25;
      g.audio.sfx('boss_spawn');
    } else if (ev.kind === 'stampede') {
      this.stormTarget = 0.15;
      g.audio.sfx('mob_spawn');
    }
    if (g.isNetHost()) g.pushNetSim(true);
  }

  spawnStormMesh() {
    this.disposeStormMesh();
    this.stormMesh = makeHurricaneMesh();
    // Enter from beach (+Z), sweep across fields toward the lodge
    const F = LAYOUT.farmZone;
    this._stormPath = 0;
    this.stormMesh.position.set(
      (F.x0 + F.x1) * 0.5,
      GY + 1,
      F.z1 + 6,
    );
    this.stormMesh.scale.setScalar(0.4);
    this.game.scene.add(this.stormMesh);
  }

  updateStormMesh(dt, followHost = false) {
    const mesh = this.stormMesh;
    if (!mesh) return;
    const ev = this.active;
    const live = ev?.kind === 'hurricane' && ev.phase !== 'clear';
    const spin = live ? 1 : 0.35;
    const bits = mesh.userData.bits || [];
    for (const b of bits) {
      b.userData.ang += dt * b.userData.spin * spin;
      const wobble = 1 + Math.sin(b.userData.ang * 0.35) * 0.08;
      const rad = b.userData.rad * wobble;
      b.position.set(Math.cos(b.userData.ang) * rad, b.userData.y, Math.sin(b.userData.ang) * rad);
      b.rotation.y = b.userData.ang;
      b.rotation.x += dt * 2.2;
    }
    for (const ring of mesh.userData.rings || []) {
      ring.rotation.z += dt * ring.userData.spin * spin;
    }
    if (mesh.userData.dust) mesh.userData.dust.rotation.z += dt * 2.4 * spin;
    if (mesh.userData.eye) {
      mesh.userData.eye.rotation.y += dt * 3.2 * spin;
      const pulse = 1 + Math.sin(performance.now() * 0.006) * 0.06;
      mesh.userData.eye.scale.set(pulse, 1, pulse);
    }
    if (mesh.userData.funnel) {
      mesh.userData.funnel.rotation.z = Math.sin(performance.now() * 0.0015) * 0.12;
      mesh.userData.funnel.rotation.x = Math.sin(performance.now() * 0.0011) * 0.06;
    }

    if (!live) {
      this.disposeStormMesh();
      return;
    }

    // Host drives the path across the farm and off the north side. Clients copy position.
    if (!followHost) {
      const dur = Math.max(16, ev.rage || 22);
      this._stormPath = Math.min(1, this._stormPath + dt / dur);
      const F = LAYOUT.farmZone;
      const u = this._stormPath;
      const zStart = F.z1 + 14;
      const zEnd = -18;
      const xMid = (F.x0 + F.x1) * 0.5;
      mesh.position.x = xMid + Math.sin(u * Math.PI * 2.5) * 7;
      mesh.position.z = zStart + (zEnd - zStart) * u;
      mesh.position.y = GY + 1.2;
      mesh.scale.setScalar(u < 0.08 ? 0.45 + u * 6 : 1.05);
      if (u >= 1) this.disposeStormMesh();
    }
    mesh.rotation.y += dt * 1.8;

    // Debris trail particles
    if (live && Math.random() < dt * 18) {
      const p = mesh.position;
      this.game.particles?.burst(p.x, p.y + 0.4, p.z, 0xd8c8a4, 6, 1.6);
      this.game.particles?.burst(p.x, p.y + 8, p.z, 0xc5d0dc, 3, 1.1);
    }
  }

  tickActive(dt) {
    const ev = this.active;
    const g = this.game;
    ev.age += dt;
    ev.phaseT += dt;

    if (ev.phase === 'warn') {
      this.stormTarget = ev.kind === 'hurricane' ? 0.65 : 0.35;
      if (ev.phaseT >= ev.warn) {
        ev.phase = 'rage';
        ev.phaseT = 0;
        this.onRageStart(ev);
      }
      return;
    }

    if (ev.phase === 'rage') {
      if (ev.kind === 'hurricane') this.tickHurricane(dt);
      else if (ev.kind === 'tide') this.tickTide(dt);
      else if (ev.kind === 'stampede') this.tickStampede(dt);

      const funnelLeft = ev.kind === 'hurricane' && this._stormPath >= 1 && !this.stormMesh;
      if (funnelLeft || ev.phaseT >= ev.rage || g.phase === 'dusk' || g.phase === 'night') {
        ev.phase = 'clear';
        ev.phaseT = 0;
        this.onClear(ev);
      }
      return;
    }

    if (ev.phase === 'clear') {
      this.stormTarget = 0;
      this.shelter = false;
      if (ev.phaseT >= 4) this.active = null;
    }
  }

  onRageStart(ev) {
    const g = this.game;
    if (ev.kind === 'hurricane') {
      this.shelter = true;
      this.stormTarget = 1;
      g.sendCrewToBed();
      g.hud.banner(t('banner.hurricane'), t('banner.hurricaneRage'), 3.0);
      g.talk.sys('sys.hurricaneShelter', null, 'warn');
      g.talk.say('astra.hurricane', { cool: 0 });
      g.shake = Math.max(g.shake || 0, 0.45);
      g.audio.sfx('boss_spawn');
      if (!this.stormMesh) this.spawnStormMesh();
    } else if (ev.kind === 'tide') {
      this.stormTarget = 0.7;
      g.hud.banner(t('banner.tide'), t('banner.tideRage'), 2.8);
      g.talk.sys('sys.tideRise', null, 'warn');
      this.spawnSea(ev);
    } else if (ev.kind === 'stampede') {
      this.stormTarget = 0.4;
      g.hud.banner(t('banner.stampede'), t('banner.stampedeRage'), 2.6);
      g.talk.sys('sys.stampede', null, 'warn');
      this.spawnDinos(ev);
    }
    if (g.isNetHost()) g.pushNetSim(true);
  }

  onClear(ev) {
    const g = this.game;
    this.shelter = false;
    this.stormTarget = 0;
    if (ev.kind === 'hurricane') this.disposeStormMesh();
    if (ev.kind === 'hurricane') {
      g.hud.banner(t('banner.hurricaneClear'), t('banner.hurricaneClearSub'), 2.4);
      g.talk.sys('sys.hurricaneClear');
      if (g.phase === 'day') g.wakeCrew();
    } else if (ev.kind === 'tide') {
      g.talk.sys('sys.tideClear');
    } else if (ev.kind === 'stampede') {
      g.talk.sys('sys.stampedeClear');
    }
    if (g.isNetHost()) g.pushNetSim(true);
  }

  spawnSea(ev) {
    const g = this.game;
    if (g.isNetClient()) return;
    const [x, z] = beachXZ(Math.random, 10);
    const m = g.makeMob(ev.big ? 'leviathan' : 'sea', x, z, { big: !!ev.big });
    if (!m) return;
    m.netId = g._mobNetSeq++;
    // Breach: body in the water, head clearly above the surface
    m.body.pos.set(x, SEA - 0.35, z);
    m.body.h = Math.max(m.body.h, 2.8);
    m.state = 'emerge';
    m.stateT = 0;
    m.afterEmerge = 'hunt';
    g.mobs.push(m);
    this._spawned.push(m);
    g.hud.banner(t(ev.big ? 'banner.leviathan' : 'banner.sea'), t('banner.seaSub'), 3.0);
    g.audio.sfx('boss_spawn', { pos: m.pos, refDistance: 14 });
    g.shake = Math.max(g.shake || 0, 0.7);
    g.particles?.burst(x, SEA + 0.5, z, 0x4a90c8, 28, 1.4);
    if (g.isNetHost()) g.pushNetSim(true);
  }

  spawnDinos(ev) {
    const g = this.game;
    if (g.isNetClient()) return;
    const n = ev.count || 2;
    for (let i = 0; i < n; i++) {
      const [x, z] = beachXZ(() => Math.random(), 14);
      const m = g.makeMob('dino', x + i * 1.4, z - 2, {});
      if (!m) continue;
      m.netId = g._mobNetSeq++;
      g.mobs.push(m);
      this._spawned.push(m);
    }
    g.audio.sfx('mob_spawn');
    if (g.isNetHost()) g.pushNetSim(true);
  }

  tickHurricane(dt) {
    const g = this.game;
    this.stormTarget = 1;
    this._dmgT -= dt;
    if (this._dmgT > 0) return;
    this._dmgT = 1.4 + Math.random() * 1.0;
    // Damage near the moving vortex when possible
    if (this.stormMesh) {
      const p = this.stormMesh.position;
      this.damageCropsNear(p.x, p.z, 5, 1 + (Math.random() < 0.4 ? 1 : 0), 0x88a0b8);
    } else {
      this.damageRandomCrops(1 + (Math.random() < 0.35 ? 1 : 0), 0x88a0b8);
    }
    if (g.state === 'play' && g.player?.alive) {
      const p = g.player.body.pos;
      const H = LAYOUT.house;
      const indoors = p.x > H.x0 + 0.5 && p.x < H.x1 - 0.5 && p.z > H.z0 + 0.5 && p.z < H.z1 - 0.5;
      if (!indoors) {
        g.player.damage(0.5, p);
        g.floats.add('!', p.x, p.y + 1.6, p.z, '#a0c8ff');
      }
    }
  }

  tickTide() {
    this.stormTarget = 0.75;
    const g = this.game;
    if (Math.random() < 0.1) {
      const [x, z] = beachXZ(Math.random, 16);
      g.particles?.burst(x, SEA + 0.2, z, 0x4a90c8, 8, 1.3);
    }
  }

  tickStampede() {
    this.stormTarget = 0.35;
  }

  damageCropsNear(cx, cz, radius, n, color) {
    const g = this.game;
    const w = g.world;
    const cells = [...g.crops.keys()].filter((idx) => {
      const x = idx % WX, z = (idx / WX) | 0;
      return Math.hypot(x + 0.5 - cx, z + 0.5 - cz) <= radius;
    });
    if (!cells.length) {
      this.damageRandomCrops(n, color);
      return;
    }
    let hit = 0;
    for (let i = 0; i < n && cells.length; i++) {
      const idx = cells.splice(Math.floor(Math.random() * cells.length), 1)[0];
      const x = idx % WX, z = (idx / WX) | 0;
      const y = GY + 1;
      if (!isCrop(w.get(x, y, z))) continue;
      w.set(x, y, z, B.AIR);
      g.crops.delete(idx);
      g.today.lost = (g.today.lost | 0) + 1;
      g.particles.burst(x, y, z, color, 8, 1.1);
      g.floats.add('!', x + 0.5, y + 1.2, z + 0.5, '#a8d0ff');
      hit++;
    }
    if (hit > 0) g.talk.sys('sys.stormCrop', null, 'warn');
  }

  damageRandomCrops(n, color) {
    const g = this.game;
    const w = g.world;
    const cells = [...g.crops.keys()];
    if (!cells.length) return;
    for (let i = 0; i < n && cells.length; i++) {
      const idx = cells.splice(Math.floor(Math.random() * cells.length), 1)[0];
      const x = idx % WX, z = (idx / WX) | 0;
      const y = GY + 1;
      if (!isCrop(w.get(x, y, z))) continue;
      w.set(x, y, z, B.AIR);
      g.crops.delete(idx);
      g.today.lost = (g.today.lost | 0) + 1;
      g.particles.burst(x, y, z, color, 8, 1.1);
      g.floats.add('!', x + 0.5, y + 1.2, z + 0.5, '#a8d0ff');
    }
    if (n > 0) g.talk.sys('sys.stormCrop', null, 'warn');
  }
}
