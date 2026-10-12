// Arcade set-pieces: hurricane shelter, sea-beast tide, dino stampede.
// Visuals (sky/fog/shake) + farm damage + monster spawns stay in sync.
import { t } from '../core/i18n.js';
import { damp } from '../core/math.js';
import { mulberry32 } from '../core/rng.js';
import { LAYOUT, GY, WX, WZ, SEA } from './world/World.js';
import { B, isCrop } from './world/blocks.js';

function beachXZ(rng, spread = 10) {
  const x = LAYOUT.center[0] + (rng() - 0.5) * spread * 2;
  const z = 2.5 + rng() * 3.5; // southern open shore
  return [x, Math.max(1.5, Math.min(WZ - 2, z))];
}

export class ArcadeEvents {
  constructor(game) {
    this.game = game;
    this.queue = [];
    this.active = null;
    this.storm = 0;       // 0..1 sky/fog mix
    this.stormTarget = 0;
    this.wind = 0;
    this.shelter = false;
    this._dmgT = 0;
    this._spawned = [];
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
  }

  /** Plan 0–2 arcade beats for the day (skip heavy events on tutorial day 0). */
  planDay(dayIndex, cfg) {
    this.reset();
    const rng = mulberry32(((this.game.world?.seed || 1) ^ (dayIndex * 7919) ^ 0xa7cad3) >>> 0);
    const dayLen = cfg.day;
    const events = [];

    if (dayIndex === 0) {
      // Soft intro: short tide near end of day so the beach matters
      events.push({ kind: 'tide', t: dayLen * 0.72, warn: 6, rage: 28 });
    } else {
      // Hurricane: mid-day shelter scramble
      if (dayIndex >= 1 && (dayIndex === 2 || rng() < 0.55 + dayIndex * 0.08)) {
        events.push({
          kind: 'hurricane',
          t: dayLen * (0.28 + rng() * 0.22),
          warn: 8,
          rage: 22 + Math.min(18, dayIndex * 3),
        });
      }
      // Sea beast from the southern shore
      if (dayIndex >= 1 && (dayIndex % 2 === 1 || rng() < 0.5)) {
        events.push({
          kind: 'tide',
          t: dayLen * (0.45 + rng() * 0.35),
          warn: 7,
          rage: 32 + dayIndex * 2,
          big: dayIndex >= 3 || !!cfg.boss,
        });
      }
      // Dino stampede — arcade chase across the fields
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

    // Keep events from stacking on top of each other
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
      return;
    }
    const clock = g.clock;

    // Start next queued event
    if (!this.active && this.queue.length && clock >= this.queue[0].t) {
      this.begin(this.queue.shift());
    }

    if (this.active) this.tickActive(dt);

    this.storm = damp(this.storm, this.stormTarget, this.stormTarget > this.storm ? 1.6 : 2.8, dt);
    this.wind = damp(this.wind, this.active?.kind === 'hurricane' && this.active.phase === 'rage' ? 1 : 0, 3, dt);

    // Camera shake pulse during peak storm / tide
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
      this.stormTarget = 0.35;
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

  tickActive(dt) {
    const ev = this.active;
    const g = this.game;
    ev.age += dt;
    ev.phaseT += dt;

    if (ev.phase === 'warn') {
      this.stormTarget = ev.kind === 'hurricane' ? 0.55 : 0.35;
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
      // Wake crew if still daytime
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
    const rng = Math.random;
    const [x, z] = beachXZ(rng, 8);
    const m = g.makeMob(ev.big ? 'leviathan' : 'sea', x, z, { big: !!ev.big });
    if (!m) return;
    m.netId = g._mobNetSeq++;
    // Start submerged
    m.body.pos.y = SEA - 1.2;
    m.state = 'emerge';
    m.stateT = 0;
    g.mobs.push(m);
    this._spawned.push(m);
    g.hud.banner(t(ev.big ? 'banner.leviathan' : 'banner.sea'), t('banner.seaSub'), 3.0);
    g.audio.sfx('boss_spawn', { pos: m.pos, refDistance: 10 });
    g.shake = Math.max(g.shake || 0, 0.55);
    if (g.isNetHost()) g.pushNetSim(true);
  }

  spawnDinos(ev) {
    const g = this.game;
    if (g.isNetClient()) return;
    const n = ev.count || 2;
    for (let i = 0; i < n; i++) {
      const [x, z] = beachXZ(() => Math.random(), 14);
      const m = g.makeMob('dino', x + i * 1.2, z, {});
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
    this._dmgT = 1.6 + Math.random() * 1.2;
    // Wind rips a few crops / soft-blocks
    this.damageRandomCrops(1 + (Math.random() < 0.35 ? 1 : 0), 0x88a0b8);
    // Light outdoor chip damage
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
    // Sea beast AI handles eating; splash FX near shore
    const g = this.game;
    if (Math.random() < 0.08) {
      const [x, z] = beachXZ(Math.random, 16);
      g.particles?.burst(x, SEA, z, 0x4a90c8, 6, 1.2);
    }
  }

  tickStampede() {
    this.stormTarget = 0.35;
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
