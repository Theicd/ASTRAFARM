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

/** Visible swirling debris cloud that travels across the farm. */
function makeHurricaneMesh() {
  const root = new THREE.Group();
  root.name = 'hurricane';
  const mat = new THREE.MeshBasicMaterial({
    color: 0xb8c8d8, transparent: true, opacity: 0.72, depthWrite: false, fog: true,
  });
  const dark = new THREE.MeshBasicMaterial({
    color: 0x4a5568, transparent: true, opacity: 0.55, depthWrite: false, fog: true,
  });
  const bits = [];
  for (let i = 0; i < 28; i++) {
    const w = 0.6 + Math.random() * 1.8;
    const h = 0.4 + Math.random() * 1.4;
    const d = 0.4 + Math.random() * 1.2;
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), Math.random() < 0.45 ? dark : mat);
    const ang = (i / 28) * Math.PI * 2;
    const rad = 2.2 + (i % 5) * 1.1;
    m.userData = { ang, rad, y: 2 + (i % 7) * 0.85, spin: 1.2 + (i % 4) * 0.35 };
    m.position.set(Math.cos(ang) * rad, m.userData.y, Math.sin(ang) * rad);
    root.add(m);
    bits.push(m);
  }
  // Tall funnel core
  const core = new THREE.Mesh(new THREE.BoxGeometry(2.2, 10, 2.2), dark);
  core.position.y = 6;
  root.add(core);
  root.userData.bits = bits;
  root.userData.core = core;
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

  update(dt) {
    const g = this.game;
    if (g.titleMode || g.isNetClient()) {
      this.storm = damp(this.storm, this.stormTarget, 2.2, dt);
      this.updateStormMesh(dt);
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
    if (ev.kind === 'hurricane') {
      g.hud.banner(t('banner.hurricane'), t('banner.hurricaneWarn'), 3.4);
      g.talk.sys('sys.hurricaneWarn', null, 'warn');
      g.audio.sfx('night');
      this.stormTarget = 0.45;
      this.spawnStormMesh();
    } else if (ev.kind === 'tide') {
      g.hud.banner(t('banner.tide'), t('banner.tideWarn'), 3.2);
      g.talk.sys('sys.tideWarn', null, 'warn');
      g.audio.sfx('boss_spawn');
      this.stormTarget = 0.25;
    } else if (ev.kind === 'stampede') {
      g.hud.banner(t('banner.stampede'), t('banner.stampedeWarn'), 2.8);
      g.talk.sys('sys.stampedeWarn', null, 'warn');
      g.audio.sfx('mob_spawn');
      this.stormTarget = 0.15;
    }
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

  updateStormMesh(dt) {
    const mesh = this.stormMesh;
    if (!mesh) return;
    const ev = this.active;
    const live = ev?.kind === 'hurricane' && ev.phase !== 'clear';
    const bits = mesh.userData.bits || [];
    for (const b of bits) {
      b.userData.ang += dt * b.userData.spin * (live ? 2.8 : 1.2);
      const rad = b.userData.rad * (0.85 + Math.sin(b.userData.ang * 0.5) * 0.15);
      b.position.set(
        Math.cos(b.userData.ang) * rad,
        b.userData.y + Math.sin(b.userData.ang * 1.7) * 0.35,
        Math.sin(b.userData.ang) * rad,
      );
      b.rotation.y += dt * 3;
      b.rotation.x += dt * 1.5;
    }
    if (mesh.userData.core) {
      mesh.userData.core.rotation.y += dt * 4.5;
      mesh.userData.core.scale.y = 1 + Math.sin(performance.now() * 0.004) * 0.08;
    }

    if (!live) {
      mesh.scale.multiplyScalar(Math.exp(-dt * 1.8));
      if (mesh.scale.x < 0.08) this.disposeStormMesh();
      return;
    }

    // Travel: beach → fields → past lodge
    this._stormPath = Math.min(1, this._stormPath + dt / Math.max(12, (ev.rage || 22) * 0.85));
    const F = LAYOUT.farmZone;
    const H = LAYOUT.house;
    const z0 = F.z1 + 8;
    const z1 = H.z0 - 2;
    const x0 = F.x0 + 2;
    const x1 = F.x1 - 2;
    const u = this._stormPath;
    mesh.position.x = x0 + (x1 - x0) * (0.5 + Math.sin(u * Math.PI * 2) * 0.35);
    mesh.position.z = z0 + (z1 - z0) * u;
    mesh.position.y = GY + 1 + Math.sin(u * Math.PI) * 1.5;
    const sc = 0.5 + Math.sin(Math.min(1, u * 1.4) * Math.PI) * 1.6;
    mesh.scale.setScalar(sc);
    mesh.rotation.y += dt * 1.8;

    // Debris trail particles
    if (Math.random() < dt * 14) {
      const p = mesh.position;
      this.game.particles?.burst(p.x, p.y + 3, p.z, 0x9ab0c4, 4, 1.3);
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

      if (ev.phaseT >= ev.rage || g.phase === 'dusk' || g.phase === 'night') {
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
  }

  onClear(ev) {
    const g = this.game;
    this.shelter = false;
    this.stormTarget = 0;
    if (ev.kind === 'hurricane') {
      g.hud.banner(t('banner.hurricaneClear'), t('banner.hurricaneClearSub'), 2.4);
      g.talk.sys('sys.hurricaneClear');
      if (g.phase === 'day') g.wakeCrew();
    } else if (ev.kind === 'tide') {
      g.talk.sys('sys.tideClear');
    } else if (ev.kind === 'stampede') {
      g.talk.sys('sys.stampedeClear');
    }
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
