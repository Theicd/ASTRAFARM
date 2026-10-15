// アストラのじゃがいも畑：ゲーム全体のまとめ役。
//   - 状態は STATES の表（title / intro / play / paused / dead / report / ending）。画面・HUD・入力・曲の出し入れは setState() が表を見て行う
//   - step(dt) で 1 コマ進める（入力 → 状態ごとの処理 → 世界の更新 → 入力の endFrame）。描画は render() だけ
//   - 1 日 = 昼（畑しごと）→ 夕方（アストラは家へ）→ 夜（緑のアレが増える）→ 朝 → 報告。5 日でおしまい
import * as THREE from 'three';
import { t } from '../core/i18n.js';
import { events } from '../core/events.js';
import { createStore } from '../core/save.js';
import { clamp, damp, lerp } from '../core/math.js';
import { mulberry32 } from '../core/rng.js';
import { buildAtlas } from './world/atlas.js';
import { buildCropAtlas } from './world/cropAtlas.js';
import { World, LAYOUT, GY, WX, WZ, inRect } from './world/World.js';
import { Mesher } from './world/Mesher.js';
import { B, BLOCKS, isCrop, isFarm, needsSupport } from './world/blocks.js';
import {
  CROPS, CROP_BY_ID, SEED_TOOLS, PLANT_ORDER, cropDefOf, isRipe, cropHeight, cropYield, nextStageId,
  fertilizeStageId, defBySeedTool, emptyBags,
} from './crops.js';
import {
  BUY, MAX_HELPERS, MAX_TURRETS, SEED_RESERVE, PIG_SELL, MAX_PIGS,
  PIG_RESPAWN_MIN, PIG_RESPAWN_MAX, sellValue,
  helperSlots, hoeLevelFromStars,
} from './economy.js';
import { shared } from './world/materials.js';
import { Sky } from './Sky.js';
import { Player } from './Player.js';
import { Robot } from './Robot.js';
import { Turret } from './Turret.js';
import { PigGates } from './PigGates.js';
import { ChargeBay } from './ChargeBay.js';
import { Green, Pig } from './Mobs.js';
import { Golem, CropThief, Dragon, Chomper, Hopper, SeaBeast, Dino } from './Enemies.js';
import { ArcadeEvents } from './ArcadeEvents.js';
import { BeachDecor } from './BeachDecor.js';
import { Patrol } from './Patrol.js';
import { StrategyMode } from './Strategy.js';
import { preloadMobVisuals } from './mobVisuals.js';
import { syncMobLabel } from './mobLabel.js';
import { Drops } from './items.js';
import { Particles, FloatTexts, selectionBox } from './fx.js';
import { Talk } from './talk.js';
import { drawFace } from './models.js';
import { GameHud } from '../ui/GameHud.js';
import { addGameModals, fillReport, fillEnding, fillEndless } from '../ui/GameModals.js';
import { settings } from '../core/settings.js';
import { startNet, stopNet, netSupported, netHooks, netBroadcast, netRole } from '../net/SosNet.js';
import { RemotePlayers } from '../net/RemotePlayers.js';
import { names } from '../net/names.js';

// 1 日ごとの設定：目標（収穫する数）、昼と夜の長さ（秒）、出てくる緑のアレの数
export const DAYS = [
  { goal: 40, day: 170, night: 50, mobsDay: 1, mobsNight: 2 },
  { goal: 70, day: 145, night: 55, mobsDay: 1, mobsNight: 3 },
  { goal: 100, day: 145, night: 60, mobsDay: 2, mobsNight: 5 },
  { goal: 130, day: 145, night: 65, mobsDay: 4, mobsNight: 8 },
  { goal: 160, day: 145, night: 75, mobsDay: 5, mobsNight: 9, boss: true },
];
const DUSK = 12, DAWN = 7;
const REACH = 4.8;
const RANKS = [0, 300, 600, 900];   // 合計収穫数の称号のしきい（じゃがいも）
// Hotbar: one Seed tool cycles wheat→corn→potato→carrot from bags.
export const TOOLS = ['sword', 'hoe', 'seed', 'dirt', 'powder', 'turret'];
export { SEED_TOOLS, CROPS, PLANT_ORDER };

// title：タイトルを出す ／ hud：ゲーム中の表示 ／ touch：タッチの操作 ／ input：play・actions・menu ／ music：曲 ／ modal：開く画面 ／ duck：曲を下げる
export const STATES = {
  title: { title: true, input: 'menu', music: 'title' },
  intro: { input: 'menu', modal: 'intro', music: 'title' },
  play: { hud: true, touch: true, input: 'play' },
  paused: { hud: true, input: 'menu', modal: 'pause', duck: true },
  dead: { hud: true, input: 'actions' },
  report: { input: 'menu', modal: 'report', music: 'report' },
  ending: { input: 'menu', modal: 'ending', music: 'ending' },
};

export class Game {
  constructor({ renderer, input, audio, screens, touch, ui }) {
    Object.assign(this, { renderer, input, audio, screens, touch });
    // run：ストーリーの続き ／ endless：エンドレスじゃがいモードの続き（別の枠）／ cleared：5 日間をクリアした
    this.save = createStore('astra-potato-farm.save', { best: 0, run: null, cleared: false, endless: null, endlessBest: null }, 1);
    this.mode = 'story';
    this.time = 0;
    this.state = 'title';
    this.atlas = buildAtlas();
    this.cropAtlas = buildCropAtlas();

    const scene = (this.scene = new THREE.Scene());
    scene.background = new THREE.Color(0x8ec3ff);
    this.camera = new THREE.PerspectiveCamera(72, innerWidth / innerHeight, 0.05, 420);
    this.camera.name = 'camera';
    scene.add(this.camera);

    this.world = new World();
    this.mesher = new Mesher(this.world, this.atlas, this.cropAtlas);
    scene.add(this.mesher.group);
    this.sky = new Sky(scene, this.atlas);
    this.particles = new Particles(scene);
    this.floats = new FloatTexts(scene);
    this.sel = selectionBox();
    scene.add(this.sel);

    this.player = new Player(this, this.camera);
    this.robot = new Robot(this);
    this.helpers = [];
    this.turrets = [];
    this.pigGates = null;
    this.chargeBay = null;
    this.beachDecor = null;
    this.mobs = [];
    this.bombs = [];
    this.paints = [];
    this.lodge = { hp: 140, max: 140 };
    this.penHp = { hp: 90, max: 90 };
    this.pondHp = { hp: 70, max: 70 };
    this._lodgeWarn = false;
    this.strategy = new StrategyMode(this);
    this.pigs = [];
    this.arcade = new ArcadeEvents(this);
    this.drops = new Drops(this);
    this.crops = new Map();
    this.reserved = new Set();
    this.money = 20;
    this.lifetimeCoins = 0;
    this._alarmLit = false;
    this.seedCursor = 0;
    this.online = false;
    this.remotes = new RemotePlayers(scene);
    this._mobNetSeq = 1;
    this._netSyncT = 0;
    this._netPhase = null;

    this.hud = new GameHud(ui, {
      atlas: this.atlas,
      drawFace,
      glyphCtx: () => ({ device: input.device, padType: settings.padType === 'auto' ? input.padType : settings.padType }),
      onSlot: (k) => { if (this.state === 'play') this.selectTool(k); },
      onStrategy: () => this.strategy?.toggle(),
    });
    this.talk = new Talk({
      onLine: (text) => {
        this.hud.chat(text, 'astra', t('name.astra'));
        this.audio.sfx('robot_talk', { pos: this.robot.body.pos, refDistance: 6, n: Math.min(6, 2 + Math.floor(text.length / 10)) });
      },
      onSys: (text, kind) => this.hud.chat(text, kind),
    });
    addGameModals(screens, this.atlas);
    screens.cb.onAction = (act) => this.onAction(act);

    renderer.setScene(scene, this.camera);
    renderer.renderer.toneMapping = THREE.NoToneMapping;
    renderer.setLook({ exposure: 1, bloomStrength: 0.32, bloomRadius: 0.4, bloomThreshold: 0.92, vignette: 0.22, saturation: 1.06, contrast: 1.02 });
    this.meshBudget = 4;
    this.particleScale = 1;
    this.fogFar = 220; // deep-water ships stay readable on the horizon
    const applyPerf = (p = {}) => {
      this.meshBudget = p.meshBudget ?? 4;
      this.particleScale = p.particleScale ?? 1;
      this.fogFar = p.fogFar ?? 105;
      if (this.particles && p.particleScale != null) {
        this.particles.max = Math.max(200, Math.floor(1500 * Math.min(1, p.particleScale * 1.4)));
      }
      // Keep far plane past the sky sun/moon (~200) — shorter far clipped them into a blue disc.
      // World draw cost is already cut by shader fog (fogFar), not by camera.far.
      if (this.camera && Math.abs(this.camera.far - 420) > 1) {
        this.camera.far = 420;
        this.camera.updateProjectionMatrix();
      }
    };
    applyPerf(renderer.preset);
    renderer.onQuality = applyPerf;
    const onResize = () => {
      const r = renderer.renderer;
      const v = new THREE.Vector2();
      r.getDrawingBufferSize(v);
      this.particles.setScale(v.y, this.camera.fov);
    };
    renderer.onResize = onResize;
    onResize();

    this.titleMode = true;
    this.titleAng = 0.6;
    this.shake = 0;
    this.flash = 0;
    this.fade = 0;
    this.grace = 0;
    this.attackCool = 0;
    this.useCool = 0;
    this.eatCool = 0;
    this.target = null;
    this.targetMob = null;
    this.targetRobot = false;
    this.useDecision = null;
    this.tool = 'sword';
    this.bags = emptyBags({ potato: 6, wheat: 4, carrot: 4, corn: 3 });
    this.money = 20;
    this.lifetimeCoins = 0;
    this.powder = 0;
    this.green = 0;
    this.dayIndex = 0;
    this.clock = 30;
    this.phase = 'day';
    this.today = this.freshToday();
    this.totals = { harvest: 0, kills: 0, booms: 0, stars: 0, green: 0, wheat: 0, carrot: 0, corn: 0 };
  }

  /** Potato bag (legacy name used by Astra sack / eat / goals). */
  get stock() { return this.bags.potato; }
  set stock(n) { this.bags.potato = Math.max(0, n | 0); }

  /** Total seeds across all crops (single Seed hotbar slot). */
  get seedTotal() {
    return PLANT_ORDER.reduce((n, k) => n + (this.bags[k] | 0), 0);
  }
  /** Next crop that still has seeds (does not advance cursor). */
  peekNextSeed() {
    const n = PLANT_ORDER.length;
    for (let i = 0; i < n; i++) {
      const id = PLANT_ORDER[(this.seedCursor + i) % n];
      if (this.seedCount(id) > 0) return id;
    }
    return null;
  }
  advanceSeedCursor(plantedId) {
    const i = PLANT_ORDER.indexOf(plantedId);
    if (i >= 0) this.seedCursor = (i + 1) % PLANT_ORDER.length;
  }

  seedCount(kind) { return this.bags[kind] ?? 0; }
  addSeed(kind, n = 1) {
    if (!(kind in this.bags)) return;
    this.bags[kind] = Math.max(0, (this.bags[kind] | 0) + n);
  }
  takeSeed(kind, n = 1) {
    if (this.seedCount(kind) < n) return false;
    this.bags[kind] -= n;
    return true;
  }

  say(key, opts) { return this.titleMode ? false : this.talk.say(key, opts); }

  freshToday() {
    return {
      harvest: 0, kills: 0, booms: 0, lost: 0, goalDone: false,
      stolen: 0, turretsLost: 0, kidnapped: 0, rescued: 0,
    };
  }

  /** 読み込み：世界を作って、最初の形を作る。 */
  async init() {
    await document.fonts?.ready;
    await preloadMobVisuals();
    this.world.generate();
    this.sky.setSouthShore(LAYOUT.waterLineZ ?? 80);
    this.rebuildCrops();
    this.mesher.update(999);
    this.chargeBay?.dispose();
    this.chargeBay = new ChargeBay(this);
    this.beachDecor?.dispose();
    this.beachDecor = new BeachDecor(this);
    this._buildLodgeBar();
    this.spawnPigs();
    this.robot.reset();
    this.player.reset(LAYOUT.spawn);
    this.updateTitleCamera(0);
    this.sky.update(0.12, this.camera, 0, 0);
    this.screens.setContinue(!!this.save.data.run);
    this.screens.setEndless?.(!!this.save.data.cleared);
    this.updateBestLabel();
    this.setSplash();
    this.setState('title');
  }

  // ------------------------------------------------------------------ 状態
  setState(s) {
    const S = STATES[s];
    if (!S) throw new Error('状態がありません: ' + s);
    const prev = this.state;
    this.state = s;
    this.screens.showTitle(!!S.title);
    this.hud.show(!!S.hud);
    this.touch.setVisible(!!S.touch);
    this.input.mode = S.input || 'menu';
    if (!S.modal) this.screens.closeAll();
    else if (!this.screens.isOpen(S.modal)) { this.screens.closeAll(); this.screens.open(S.modal); }
    if (S.music) this.audio.music(S.music);
    this.audio.duck(!!S.duck);
    if (s !== 'play' && s !== 'paused' && s !== 'dead') this.input.unlockPointer?.();
    this[`enter_${s}`]?.(prev);
    if (prev !== s) events.emit('state', { from: prev, to: s });
  }

  enter_title() {
    this.titleMode = true;
    this.mode = 'story';
    this.screens.setContinue(!!this.save.data.run);
    this.screens.setEndless?.(!!this.save.data.cleared);
    this.updateBestLabel();
    this.setSplash();
    this.audio.setAmbience({ wind: 0.3 });
    this.audio.loop('birds', 'bird', { period: 2.6, jitter: 1.6 });
    this.audio.stopLoop('crickets');
  }
  enter_play(prev) {
    this.grace = 0.25;
    this.titleMode = false;
    if (prev !== 'paused') this.updateMusic(true);
  }
  enter_paused() {
    this.audio.sfx('pause');
    const btn = document.querySelector('#m-pause [data-act="strategy"]');
    if (!btn) return;
    const key = this.strategy?.on ? 'pause.eyes' : 'pause.strategy';
    btn.dataset.i18n = key;
    btn.textContent = t(key);
  }
  enter_dead() { this.deadT = 0; this.hud.setDead(true); this.audio.sfx('hurt', { big: true }); }

  /** PLAY — online quick-play like Kart / Quake (name + matchmake + farm together). */
  start() {
    if (this._netStarting) return;
    if (!netSupported()) {
      this.startSolo();
      return;
    }
    if (!names.player) names.setPlayer('Farmer');
    this._netStarting = true;
    this.screens.setPlayBusy(true);
    this.screens.setNetStatus(t('net.looking'));
    this.wireNetHooks();
    const net = startNet();
    if (!net) {
      this._netStarting = false;
      this.screens.setPlayBusy(false);
      this.startSolo();
    }
  }

  /** Offline story start (intro → day 1). Used when net is unavailable or ?solo=1. */
  startSolo() {
    this.online = false;
    stopNet();
    this.remotes.clear();
    this.mode = 'story';
    this.tool = 'sword';
    this.player.setTool('sword');
    this.save.data.run = null;
    this.save.save();
    this.newWorld();
    this.bags = emptyBags({ potato: 6, wheat: 4, carrot: 4, corn: 3 });
    this.money = 20; this.lifetimeCoins = 0;
    this.powder = 0; this.green = 0;
    this.totals = { harvest: 0, kills: 0, booms: 0, stars: 0, green: 0, wheat: 0, carrot: 0, corn: 0 };
    this.tut = { step: 0, harvest: 0, plant: 0, till: 0 };
    this.setState('intro');
  }

  wireNetHooks() {
    netHooks.setStatus = (text) => this.screens.setNetStatus(text);
    netHooks.getPose = () => {
      const p = this.player;
      if (!p) return null;
      const v = p.body.vel;
      const moving = Math.hypot(v.x, v.z) > 0.4 ? 1 : 0;
      return { x: p.pos.x, y: p.pos.y, z: p.pos.z, yaw: p.yaw, flags: moving };
    };
    netHooks.onRemotePose = (pk, x, y, z, yaw, flags) => {
      this.remotes.upsert(pk);
      this.remotes.applyPose(pk, x, y, z, yaw, flags);
    };
    netHooks.onRoster = (pk, nm, join) => {
      if (join) {
        this.remotes.upsert(pk, nm);
        this.hud.chat(t('net.joined', { name: nm || 'Farmer' }), 'sys');
      } else {
        this.remotes.remove(pk);
        this.hud.chat(t('net.left'), 'sys');
      }
    };
    netHooks.onGame = (ev) => this.onNetGame(ev);
    netHooks.beginFarm = () => this.beginOnlineFarm();
  }

  isNetHost() { return this.online && netRole() === 'host'; }
  isNetClient() { return this.online && netRole() === 'client'; }

  onNetGame(ev) {
    if (!ev || !this.online) return;
    if (ev.t === 'pigSell' && ev.id != null) this.removePigNet(ev.id);
    else if (ev.t === 'sim' && this.isNetClient()) this.applyNetSim(ev);
    else if (ev.t === 'boom' && this.isNetClient()) this.applyNetBoom(ev);
    else if (ev.t === 'hitMob' && this.isNetHost()) this.applyNetHit(ev);
    else if (ev.t === 'endDay' && this.isNetClient()) this.endDay({ fromNet: true });
    else if (ev.t === 'turretPlaced') this.applyNetTurret(ev);
    else if (ev.t === 'turretDown' && this.isNetClient()) {
      const tr = this.turrets.find((x) => Math.hypot(x.x - (ev.x | 0), x.z - (ev.z | 0)) < 1.2);
      if (tr && !tr.dead) this.onTurretDestroyed(tr);
    }
    else if (ev.t === 'pigSpawn') this.applyNetPigSpawn(ev);
    else if (ev.t === 'world') this.applyNetWorld(ev);
  }

  /**
   * Run farm mutations and broadcast the resulting voxel patch so peers see
   * the same till / plant / harvest / repair (host AI + any player's tools).
   */
  syncFarm(fn) {
    if (!this.online) return fn();
    const w = this.world;
    const orig = w.set.bind(w);
    const raw = [];
    w.set = (x, y, z, id) => {
      orig(x, y, z, id);
      if (w.inside(x, y, z)) raw.push(w.idx(x, y, z), id & 0xff);
    };
    let out;
    try { out = fn(); }
    finally { w.set = orig; }
    if (!raw.length) return out;
    const last = new Map();
    for (let i = 0; i < raw.length; i += 2) last.set(raw[i], raw[i + 1]);
    const p = [];
    for (const [idx, id] of last) p.push(idx, id);
    netBroadcast({ t: 'world', p });
    return out;
  }

  applyNetWorld(ev) {
    if (!Array.isArray(ev.p) || !ev.p.length) return;
    const w = this.world;
    const plane = WX * WZ;
    const n = w.data.length;
    for (let i = 0; i + 1 < ev.p.length; i += 2) {
      const idx = ev.p[i] | 0;
      const id = ev.p[i + 1] | 0;
      if (idx < 0 || idx >= n) continue;
      const x = idx % WX;
      const z = ((idx / WX) | 0) % WZ;
      const y = (idx / plane) | 0;
      w.set(x, y, z, id);
      if (isCrop(id)) this.crops.set(idx, 0);
      else this.crops.delete(idx);
    }
  }

  makeMob(kind, x, z, { big = false } = {}) {
    let m;
    if (kind === 'golem') m = new Golem(this, x, z);
    else if (kind === 'thief') m = new CropThief(this, x, z);
    else if (kind === 'dragon') m = new Dragon(this, x, z);
    else if (kind === 'chomp') m = new Chomper(this, x, z);
    else if (kind === 'hop') m = new Hopper(this, x, z);
    else if (kind === 'sea' || kind === 'leviathan') m = new SeaBeast(this, x, z, { big: big || kind === 'leviathan' });
    else if (kind === 'dino') m = new Dino(this, x, z);
    else m = new Green(this, x, z, { big, night: this.phase === 'night' });
    return m;
  }

  /** Swarm pool — boom-style pests that show up often (not rare events). */
  pickSwarmKind(rng) {
    const r = rng();
    if (r < 0.22) return 'boom';
    if (r < 0.4) return 'chomp';
    if (r < 0.58) return 'hop';
    if (r < 0.78) return 'dino';
    if (r < 0.9) return 'sea';
    return 'boom';
  }

  /** Peer placed a guard tower — mirror without charging coins again. */
  applyNetTurret(ev) {
    const x = ev.x | 0, z = ev.z | 0;
    for (const tr of this.turrets) {
      if (Math.hypot(tr.x - x, tr.z - z) < 1.2) return;
    }
    this.spawnTurretAt(x, z, true);
  }

  /** Remove a pig mirrored from another peer (no payout). */
  removePigNet(id) {
    const pig = this.pigs.find((p) => p.netId === id);
    if (!pig || pig.dead) return;
    pig.dispose();
    this.pigs = this.pigs.filter((x) => x !== pig);
    if (!this.isNetClient()) {
      const alive = this.pigs.filter((x) => !x.dead).length;
      if (alive < MAX_PIGS) {
        this._pigRespawnT = Math.min(this._pigRespawnT ?? PIG_RESPAWN_MIN, alive === 0 ? 8 : 12);
      }
    }
  }

  /** Host → clients: day clock + every living green. */
  pushNetSim(force = false) {
    if (!this.isNetHost() || this.state === 'title') return;
    this._netSyncT = 0;
    const mobs = this.mobs.filter((m) => !m.dead).map((m) => ({
      id: m.netId,
      x: +m.pos.x.toFixed(2),
      y: +m.pos.y.toFixed(2),
      z: +m.pos.z.toFixed(2),
      yaw: +m.yaw.toFixed(2),
      big: !!m.big,
      kind: m.kind || 'boom',
      st: m.state,
      fuse: +(m.fuse || 0).toFixed(2),
      hp: m.hp | 0,
      mv: Math.hypot(m.body?.vel?.x || 0, m.body?.vel?.z || 0) > 0.35 ? 1 : 0,
      carry: m.kind === 'dragon' ? this.crewIndex(m.carrying) : -1,
    }));
    const hid = [];
    const crew = [this.robot, ...this.helpers];
    for (let i = 0; i < crew.length; i++) if (crew[i]?.netHidden) hid.push(i);
    netBroadcast({
      t: 'sim',
      clock: +this.clock.toFixed(2),
      phase: this.phase,
      day: this.dayIndex | 0,
      mobs,
      hid,
      arc: this.arcade?.netSnapshot() || null,
    });
  }

  applyNetSim(ev) {
    if (typeof ev.clock === 'number') this.clock = ev.clock;
    if (Number.isInteger(ev.day) && ev.day !== this.dayIndex && this.cfg) {
      // Late joiner / desync — stay on current day board; clock still applies.
    }
    if (typeof ev.phase === 'string' && ev.phase !== this.phase) {
      this.applyNetPhase(ev.phase);
    }
    if (this.isNetClient()) this.arcade?.applyNet(ev.arc || null);
    const list = Array.isArray(ev.mobs) ? ev.mobs : [];
    const seen = new Set();
    for (const d of list) {
      if (d == null || d.id == null) continue;
      seen.add(d.id);
      let m = this.mobs.find((x) => x.netId === d.id);
      if (!m) {
        m = this.makeMob(d.kind || 'boom', d.x, d.z, { big: !!d.big });
        m.netId = d.id;
        m.netPuppet = true;
        this.mobs.push(m);
      }
      m.netPuppet = true;
      m.big = !!d.big;
      m.kind = d.kind || m.kind || 'boom';
      m.body.pos.set(d.x, d.y, d.z);
      m.yaw = d.yaw;
      if (d.st && d.st !== m.state) {
        m.state = d.st;
        m.stateT = 0;
      }
      m.fuse = d.fuse || 0;
      if (typeof d.hp === 'number') m.hp = d.hp;
      m._netMoving = !!d.mv;
      m.dead = false;
      if (m.kind === 'dragon') this.syncDragonCarry(m, d.carry, ev.hid);
    }
    for (const m of [...this.mobs]) {
      if (m.netPuppet && !seen.has(m.netId)) this.removeMob(m);
    }
    if (Array.isArray(ev.hid)) this.applyNetHiddenCrew(ev.hid);
  }

  crewIndex(r) {
    if (!r) return -1;
    if (r === this.robot) return 0;
    const i = this.helpers.indexOf(r);
    return i >= 0 ? i + 1 : -1;
  }

  crewAt(i) {
    if (i === 0) return this.robot;
    return this.helpers[i - 1] || null;
  }

  /** Clients: hang the same robot under the puppet dragon the host is carrying. */
  syncDragonCarry(dragon, idx, hid) {
    const hidden = new Set(Array.isArray(hid) ? hid : []);
    if (typeof idx !== 'number' || idx < 0) {
      const r = dragon.carrying;
      dragon.carrying = null;
      if (r && !r.netHidden && !hidden.has(this.crewIndex(r))) r.releaseKidnap(dragon.body.pos, true);
      return;
    }
    const r = this.crewAt(idx);
    if (!r || r.netHidden) return;
    if (dragon.carrying !== r) {
      r.kidnapBy(dragon);
      dragon.carrying = r;
    }
    r.netHidden = false;
    r.captive = false;
    r.root.visible = true;
    r.body.pos.set(dragon.body.pos.x, dragon.body.pos.y - 0.9, dragon.body.pos.z);
    r.root.position.copy(r.body.pos);
  }

  applyNetHiddenCrew(hid) {
    const hide = new Set(hid);
    const crew = [this.robot, ...this.helpers];
    for (let i = 0; i < crew.length; i++) {
      const r = crew[i];
      if (!r) continue;
      if (!hide.has(i)) continue;
      r.netHidden = true;
      r.captive = true;
      r.root.visible = false;
      if (r.state !== 'kidnapped') r.setState('kidnapped');
    }
  }

  applyNetPhase(phase) {
    const prev = this.phase;
    this.phase = phase;
    this._netPhase = phase;
    if (phase === prev) return;
    const c = this.cfg;
    if (phase === 'dusk') {
      this.talk.sys('sys.dusk');
      this.talk.say('astra.dusk', { cool: 0 });
      this.sendCrewToBed();
    } else if (phase === 'night') {
      const towers = this.turrets.length;
      const sub = c?.boss
        ? t('banner.nightSubBoss')
        : towers > 0
          ? t('banner.nightSubTowers', { n: towers })
          : t('banner.nightSub');
      this.hud.banner(t('banner.night'), sub, 3.2);
      this.audio.sfx('night');
      this.updateMusic();
      this.sendCrewToBed();
    } else if (phase === 'dawn') {
      this.talk.sys('sys.dawn');
      this.audio.sfx('morning');
      this.updateMusic();
      this.wakeCrew();
    } else if (phase === 'day' && (prev === 'dawn' || prev === 'night')) {
      this.updateMusic();
    }
  }

  applyNetBoom(ev) {
    const x = +ev.x || 0, y = +ev.y || 0, z = +ev.z || 0;
    const big = !!ev.big;
    const c = new THREE.Vector3(x, y, z);
    // Host sends exact cleared voxel indices (blast is random — cannot rebuild locally).
    if (Array.isArray(ev.cells)) {
      const w = this.world;
      const plane = WX * WZ;
      const n = w.data.length;
      for (const raw of ev.cells) {
        const i = raw | 0;
        if (i < 0 || i >= n) continue;
        const bx = i % WX;
        const bz = ((i / WX) | 0) % WZ;
        const by = (i / plane) | 0;
        w.set(bx, by, bz, B.AIR);
      }
    }
    const lb = this.lightBright(x, y + 1, z);
    this.particles.smoke(x, y, z, big ? 60 : 36, big ? 2 : 1.2, Math.max(0.35, lb), big ? 1.8 : 1.2);
    this.audio.sfx('explode', { pos: c, refDistance: 6, big, dur: big ? 1.8 : 1.2 });
    const pd = this.player.pos.distanceTo(c);
    this.shake = Math.max(this.shake, Math.max(0, 1 - pd / (big ? 28 : 18)) * (big ? 1.6 : 1));
    this.flash = Math.max(this.flash, Math.max(0, 1 - pd / 14) * 0.55);
    const r = big ? 4.3 : 2.9;
    const pc = this.player.pos.clone(); pc.y += 0.9;
    const dd = pc.distanceTo(c);
    const dmg = Math.round(Math.max(0, 1 - dd / (r * 1.9)) * (big ? 24 : 15));
    if (dmg > 0 && this.state === 'play') {
      this.player.damage(dmg, c);
      this.hud.hurt(Math.min(1, 0.4 + dmg / 15));
      this.audio.sfx('hurt');
    }
  }

  applyNetHit(ev) {
    const m = this.mobs.find((x) => x.netId === ev.id);
    if (!m || m.dead) return;
    const dmg = Math.max(1, ev.dmg | 0);
    const from = new THREE.Vector3(+ev.x || m.pos.x, m.pos.y, +ev.z || m.pos.z);
    m.hit(dmg, from, ev.knock || 1);
    if (m.dead) this.onMobKilled(m, 'player');
  }

  beginOnlineFarm() {
    this._netStarting = false;
    this.screens.setPlayBusy(false);
    this.online = true;
    netHooks.booted = true;
    const idx = netHooks.myIdx | 0;
    this.mode = 'story';
    this.tool = 'sword';
    this.player.setTool('sword');
    this.save.data.run = null;
    this.save.save();
    this.newWorld();
    this.bags = emptyBags({ potato: 6, wheat: 4, carrot: 4, corn: 3 });
    this.money = 20; this.lifetimeCoins = 0;
    this.powder = 0; this.green = 0;
    this.totals = { harvest: 0, kills: 0, booms: 0, stars: 0, green: 0, wheat: 0, carrot: 0, corn: 0 };
    this.tut = null;
    const sp = LAYOUT.spawn;
    const ox = (idx % 2) * 1.4 - (idx > 0 ? 0.7 : 0);
    const oz = Math.floor(idx / 2) * 1.2;
    this.player.reset([sp[0] + ox, sp[1], sp[2] + oz]);
    this.startDay(0);
    this.setState('play');
    this.lockPointer?.();
    this.screens.setNetStatus('');
    this.hud.chat(t('net.welcome', { name: names.player || 'Farmer' }), 'sys');
  }

  /** つづきから（その日の朝から）。 */
  continueGame() {
    this.online = false;
    stopNet();
    this.remotes.clear();
    const r = this.save.data.run;
    if (!r) { this.startSolo(); return; }
    this.mode = 'story';
    this.loadRun(r);
    this.startDay(r.day, { fromSave: true });
    this.setState('play');
  }

  /** エンドレスじゃがいモード：fresh なら新しい島の 1 日目から、そうでなければセーブの日の朝から。 */
  startEndless(fresh = false) {
    const r = this.save.data.endless;
    this.mode = 'endless';
    if (r && !fresh) {
      this.loadRun(r);
      this.startDay(r.day, { fromSave: true });
    } else {
      this.newWorld();
      this.tool = 'sword';
      this.player.setTool('sword');
      this.bags = emptyBags({ potato: 6, wheat: 4, carrot: 4, corn: 3 });
      this.money = 20; this.lifetimeCoins = 0;
      this.powder = 0; this.green = 0;
      this.totals = { harvest: 0, kills: 0, booms: 0, stars: 0, green: 0, wheat: 0, carrot: 0, corn: 0 };
      this.tut = null;
      this.startDay(0, { endlessHello: true });
    }
    this.setState('play');
    this.lockPointer?.();
  }

  /** やりなおす（一時停止から）：この日の朝のセーブから。 */
  retry() { if (this.mode === 'endless') this.startEndless(); else this.continueGame(); }

  reset() {
    // タイトルへ戻るとき：世界を作り直して、タイトルの景色にする
    this.online = false;
    this._netStarting = false;
    netHooks.booted = false;
    stopNet();
    this.remotes.clear();
    this.screens.setPlayBusy(false);
    this.screens.setNetStatus('');
    this.newWorld();
    this.titleMode = true;
    this.hud.clearChat();
    this.renderer.setFx({ fade: 0, flash: 0 });
  }

  clearHired() {
    for (const h of this.helpers) h.root && this.scene.remove(h.root);
    this.helpers = [];
    for (const t of this.turrets) t.dispose();
    this.turrets = [];
    if (this.patrol) { this.patrol.dispose(); this.patrol = null; }
  }

  newWorld() {
    for (const m of this.mobs) { m.releasePig?.(); m.dispose(); }
    this.mobs = [];
    this.clearHired();
    if (this.pigGates) { this.pigGates.dispose(); this.pigGates = null; }
    if (this.chargeBay) { this.chargeBay.dispose(); this.chargeBay = null; }
    if (this.beachDecor) { this.beachDecor.dispose(); this.beachDecor = null; }
    this.drops.clear();
    this.clearBombs();
    this.clearPaints();
    this.particles.clear();
    this.floats.clear();
    this.reserved.clear();
    this.world.generate();
    this.sky.setSouthShore(LAYOUT.waterLineZ ?? 80);
    this.rebuildCrops();
    this.mesher.update(999);
    this.robot.reset();
    this.player.reset(LAYOUT.spawn);
    this.pigGates = new PigGates(this);
    this.chargeBay = new ChargeBay(this);
    this.beachDecor = new BeachDecor(this);
    this.patrol = new Patrol(this);
    this.lodge = { hp: 140, max: 140 };
    this.penHp = { hp: 90, max: 90 };
    this.pondHp = { hp: 70, max: 70 };
    this._lodgeWarn = false;
    this._buildLodgeBar();
    this.spawnPigs();
    this.talk.reset();
    this.hud.clearChat();
    this.tut = null;
  }

  loadRun(r) {
    this.newWorld();
    this.world.applyDiff(r.diff || []);
    this.world.collectSpawns();
    this.rebuildCrops();
    this.mesher.update(999);
    this.bags = emptyBags({
      potato: r.stock ?? r.bags?.potato ?? 6,
      wheat: r.bags?.wheat ?? r.seeds?.wheat ?? 0,
      carrot: r.bags?.carrot ?? r.seeds?.carrot ?? 0,
      corn: r.bags?.corn ?? r.seeds?.corn ?? 0,
    });
    this.money = r.money ?? 20;
    this.lifetimeCoins = r.lifetimeCoins ?? this.money;
    this.powder = r.powder ?? 0;
    this.green = r.green ?? 0;
    this.totals = { harvest: 0, kills: 0, booms: 0, stars: 0, green: 0, wheat: 0, carrot: 0, corn: 0, ...(r.totals || {}) };
    const helpers = Math.min(MAX_HELPERS, r.helpers | 0);
    for (let i = 0; i < helpers; i++) this.spawnHelper(true);
    const turrets = Math.min(MAX_TURRETS, r.turrets | 0);
    for (let i = 0; i < turrets; i++) this.placeTurret(true);
    this.tut = null;
    if (r.lodgeHp != null && this.lodge) {
      this.lodge.hp = Math.max(0, Math.min(this.lodge.max, r.lodgeHp | 0));
      this.refreshLodgeBar();
    }
    this.syncHelpers(true);
  }

  saveRun() {
    this.save.data[this.mode === 'endless' ? 'endless' : 'run'] = {
      day: this.dayIndex, stock: this.stock, bags: { ...this.bags },
      money: this.money, lifetimeCoins: this.lifetimeCoins,
      helpers: this.helpers.length, turrets: this.turrets.length,
      powder: this.powder, green: this.green,
      totals: { ...this.totals }, diff: this.world.diff(),
      lodgeHp: this.lodge?.hp ?? 140,
    };
    this.save.save();
  }

  /** Day setup. After the 5-day trial, Shore Season scales gently; boss every 5 days. */
  dayConfig(i) {
    if (i < DAYS.length) return DAYS[i];
    const n = i + 1;
    const past = n - DAYS.length; // 1 on day 6
    return {
      goal: Math.min(160, 70 + past * 12),
      day: 150,
      night: Math.min(78, 55 + Math.floor(past * 1.5)),
      mobsDay: Math.min(5, 2 + Math.floor(past / 3)),
      mobsNight: Math.min(10, 4 + Math.floor(past * 0.7)),
      boss: n % 5 === 0,
    };
  }

  get lastDay() { return this.mode === 'story' && this.dayIndex >= DAYS.length - 1; }

  onAction(act) {
    if (act === 'introGo') { this.startDay(0); this.setState('play'); this.lockPointer?.(); }
    else if (act === 'nextDay') {
      if (this.lastDay) this.finish();
      else { this.startDay(this.dayIndex + 1); this.setState('play'); this.lockPointer?.(); }
    } else if (act === 'endlessGo') {
      // エンディングから：同じ畑のまま 6 日目へ
      this.mode = 'endless';
      this.startDay(DAYS.length, { endlessStart: true });
      this.setState('play');
      this.lockPointer?.();
    } else if (act === 'endless') {
      if (this.save.data.endless) { fillEndless(this.screens, this.save.data.endless.day + 1); this.screens.open('endless'); }
      else this.startEndless(true);
    } else if (act === 'endlessContinue') this.startEndless(false);
    else if (act === 'endlessNew') this.startEndless(true);
  }

  // ------------------------------------------------------------------ 1 日
  startDay(i, { fromSave = false, endlessStart = false, endlessHello = false } = {}) {
    this.dayIndex = i;
    // Copy — dusk may extend night for turret threat without mutating DAYS[].
    this.cfg = { ...this.dayConfig(i) };
    this.clock = 0;
    this.phase = 'day';
    this._turretNightApplied = false;
    this.today = this.freshToday();
    for (const m of this.mobs) { m.releasePig?.(); m.dispose(); }
    this.mobs = [];
    this.schedule = this.buildSchedule(this.cfg, i);
    this.arcade.planDay(i, this.cfg);
    this.player.reset(LAYOUT.spawn);
    this.talk.reset();
    this.hud.clearChat();
    this.renderer.setFx({ fade: 0, flash: 0 });
    this.fade = 0;
    this.hud.setDead(false);
    if (i === 0 && !fromSave && this.tut) {
      ['astra.hello.0', 'astra.hello.1', 'astra.hello.2', 'astra.hello.3', 'astra.hello.4'].forEach((k, n) => this.talk.say(k, { delay: 1.5 + n * 0.2, cool: 0 }));
    } else {
      this.tut = null;
      this.morningLine(i, { endlessStart, endlessHello });
    }
    this.hud.banner(t(this.mode === 'endless' ? 'banner.dayEndless' : 'banner.day', { n: i + 1 }), t('banner.daySub', { m: this.cfg.goal }), 3.6);
    this.audio.sfx('morning');
    this.wakeCrew();
    this.syncHelpers(true);
    this.saveRun();
    this.updateMusic(true);
  }

  sendCrewToBed() {
    for (const r of [this.robot, ...this.helpers]) {
      if (r.captive || r.state === 'kidnapped') continue;
      r.goToBed();
    }
  }

  wakeCrew() {
    for (const r of [this.robot, ...this.helpers]) {
      if (r.captive || r.state === 'kidnapped') {
        r.returnFromCaptivity();
        continue;
      }
      r.wake();
    }
    // Mend cracked towers overnight
    for (const tr of this.turrets) {
      if (!tr.dead && tr.hp < tr.maxHp) tr.mend(4);
    }
  }

  hoeLevel() { return hoeLevelFromStars(this.totals.stars | 0); }

  turretsAfford() {
    const left = MAX_TURRETS - this.turrets.length;
    if (left <= 0) return 0;
    return Math.min(left, Math.floor((this.money | 0) / BUY.turret));
  }

  helperCap() {
    return helperSlots({ stars: this.totals.stars | 0, lifetimeCoins: this.lifetimeCoins | 0 });
  }

  /** Spawn free helpers as progression unlocks them. */
  syncHelpers(silent = false) {
    const want = this.helperCap();
    while (this.helpers.length < want) {
      const h = this.spawnHelper(silent);
      if (!h) break;
      if (!silent) {
        this.audio.sfx('ding');
        this.talk.sys('sys.hired');
        this.hud.banner(t('banner.helper'), t('banner.helperSub'), 2.4);
      }
    }
  }

  /** Sell surplus above seed reserve; gold coins + SFX. */
  autoSellSurplus(at = null) {
    if (this.titleMode) return 0;
    let pay = 0, sold = 0;
    for (const c of CROPS) {
      const k = c.dropKind;
      const extra = (this.bags[k] | 0) - SEED_RESERVE;
      if (extra <= 0) continue;
      this.bags[k] -= extra;
      pay += sellValue(k, extra);
      sold += extra;
    }
    if (pay <= 0) return 0;
    this.money += pay;
    this.lifetimeCoins += pay;
    const p = at || this.player.pos;
    this.coinBurst(p.x, (p.y ?? GY + 1) + 1.2, p.z, pay);
    this.audio.sfx('coin', { pitch: 0.95 + Math.min(0.25, pay * 0.01) });
    this.floats.add('+' + pay + '¢', p.x, (p.y ?? GY + 1) + 1.5, p.z, '#ffe25a');
    this.syncHelpers(false);
    return pay;
  }

  coinBurst(x, y, z, pay = 1) {
    const n = Math.min(18, 6 + Math.floor(pay / 2));
    this.particles.sparkle(x - 0.4, y - 0.2, z - 0.4, n, 0xffd24a);
    this.particles.burst(x - 0.2, y, z - 0.2, 0xffc84a, Math.min(12, 4 + (pay / 3 | 0)), 1.2, 0.55);
  }

  spawnHelper(silent = false) {
    if (this.helpers.length >= MAX_HELPERS) return null;
    const h = new Robot(this, { helper: true });
    h.reset([LAYOUT.house.x0 + this.helpers.length * 0.8, GY + 1, LAYOUT.house.z1 + 5]);
    h.setState('work');
    this.helpers.push(h);
    if (!silent) this.floats.add('+AI', h.body.pos.x, h.body.pos.y + 1.6, h.body.pos.z, '#8ff4ff');
    return h;
  }

  /** Restore saved turrets onto fence posts (load only). */
  placeTurret(silent = false) {
    if (this.turrets.length >= MAX_TURRETS) return null;
    const posts = LAYOUT.posts;
    const [x, z] = posts[this.turrets.length % posts.length];
    const ox = x + (this.turrets.length > 3 ? 1 : 0);
    return this.spawnTurretAt(ox, z, silent);
  }

  canPlaceTurret(x, z) {
    const w = this.world;
    const standY = w.floorAt(x, z);
    if (standY < 1 || !w.inside(x, standY, z)) return false;
    const ground = w.get(x, standY - 1, z);
    const air = w.get(x, standY, z);
    if (!BLOCKS[ground]?.solid && !isFarm(ground)) return false;
    if (air !== B.AIR) return false;
    if (this.cellBlocked(x, standY, z)) return false;
    for (const tr of this.turrets) {
      if (Math.hypot(tr.x - x, tr.z - z) < 1.2) return false;
    }
    return true;
  }

  spawnTurretAt(x, z, silent = false) {
    if (this.turrets.length >= MAX_TURRETS) return null;
    const t = new Turret(this, x, z);
    this.turrets.push(t);
    if (!silent) {
      this.particles.sparkle(x + 0.5, GY + 1.2, z + 0.5, 10, 0xffd27a);
      this.audio.sfx('ding');
      this.talk.sys('sys.turretBuilt');
    }
    return t;
  }

  /** Guard towers open on day 3, after the paint cannon has carried the first nights. */
  turretUnlocked() { return (this.dayIndex | 0) >= 2; }

  /** Spend coins and place a guard tower at block xz (player use). */
  tryPlaceTurret(x, z) {
    if (!this.turretUnlocked()) { this.talk.sys('sys.turretLater'); return false; }
    if (this.turrets.length >= MAX_TURRETS) { this.talk.sys('sys.turretMax'); return false; }
    if (this.money < BUY.turret) { this.talk.sys('sys.noMoney'); return false; }
    if (!this.canPlaceTurret(x, z)) { this.talk.sys('sys.turretBlocked'); return false; }
    this.money -= BUY.turret;
    const ok = !!this.spawnTurretAt(x, z, false);
    if (ok && this.online) netBroadcast({ t: 'turretPlaced', x: x | 0, z: z | 0 });
    return ok;
  }

  /** 朝のアストラのひとこと（ストーリーは日ごと、エンドレスの 6 日目からは日数に合わせて）。 */
  morningLine(i, { endlessStart = false, endlessHello = false } = {}) {
    const n = i + 1;
    const say = (k, o = {}) => this.talk.say(k, { delay: 1.2, cool: 0, ...o });
    if (endlessHello) { say('astra.endless.hello'); return; }
    if (endlessStart) {
      say('astra.endless.start');
      this.hud.banner(t('banner.shore'), t('banner.shoreSub'), 4.2);
      return;
    }
    if (i < DAYS.length && !(this.mode === 'endless' && this.cfg.boss)) {
      say('astra.morning.' + i);
      if (i === 1) this.talk.say('astra.lesson', { delay: 1.4, cool: 0 });
      return;
    }
    if (this.cfg.boss) say('astra.endless.boss', { vars: { n } });
    else if (n % 10 === 0) say('astra.endless.milestone', { vars: { n } });
    else say('astra.endless.morning', { random: true, vars: { n } });
  }

  buildSchedule(cfg, i) {
    // Seeded so host/client would match if both simulated — host is authoritative online.
    const rng = mulberry32(((this.world?.seed || 1) ^ (i * 9973) ^ 0x5ced01) >>> 0);
    const list = [];
    const start = i === 0 ? 1e9 : 35, end = cfg.day - 15;
    const daySlots = [];
    for (let k = 0; k < cfg.mobsDay; k++) {
      // Day 0 first contact stays boom; later day slots mix swarm pests
      const kind = (i === 0 && k === 0) ? 'boom' : this.pickSwarmKind(rng);
      daySlots.push({ t: start + ((end - start) * (k + 0.3 + rng() * 0.4)) / Math.max(1, cfg.mobsDay), kind });
    }
    if (i === 0) for (let k = 0; k < daySlots.length; k++) daySlots[k].t = 130 + k * 15; // day-1 tutorial boom
    // Day raids (after tutorial day): mix special roles so robots still panic home
    if (i >= 1 && daySlots.length >= 1) {
      const roll = rng();
      daySlots[0].kind = roll < 0.4 ? 'thief' : roll < 0.7 ? 'golem' : this.pickSwarmKind(rng);
    }
    if (i >= 1 && daySlots.length >= 2) {
      daySlots[1].kind = rng() < 0.5 ? 'thief' : 'golem';
    }
    // Dragon only by day — robots sleep indoors at night, so night snatches are unfair
    if (i === 0) {
      daySlots.push({ t: 150, kind: 'dragon' }); // after tutorial boom settles
    } else {
      daySlots.push({ t: start + (end - start) * (0.4 + rng() * 0.35), kind: 'dragon' });
      if (rng() < 0.35) {
        daySlots.push({ t: start + (end - start) * (0.15 + rng() * 0.2), kind: 'dragon' });
      }
    }
    for (const s of daySlots) list.push(s);

    const ns = cfg.day + DUSK;
    const nightSlots = [];
    for (let k = 0; k < cfg.mobsNight; k++) {
      // Fill the swarm with chompers/hoppers/booms so nights aren't all green
      nightSlots.push({
        t: ns + 3 + ((cfg.night - 14) * (k + rng() * 0.6)) / Math.max(1, cfg.mobsNight),
        kind: this.pickSwarmKind(rng),
      });
    }
    // Guarantee special roles on top of the swarm mix (no dragon at night)
    if (nightSlots.length >= 2) nightSlots[1].kind = 'thief';
    if (nightSlots.length >= 3) nightSlots[2].kind = 'golem';
    if (nightSlots.length >= 4) nightSlots[3].kind = 'dino';
    if (nightSlots.length >= 5) nightSlots[4].kind = rng() < 0.5 ? 'sea' : 'dino';
    for (const s of nightSlots) list.push(s);
    if (cfg.boss) list.push({ t: ns + cfg.night * 0.35, big: true, kind: 'boom' });
    return list.sort((a, b) => a.t - b.t);
  }

  /**
   * More guard towers → louder nights: roughly +100% night mobs per tower
   * (1 tower ≈ double the base wave) and a longer night. Applied at dusk so
   * towers built the same day still count. Keeps the arcade tension climbing.
   */
  applyTurretNightPressure() {
    if (this._turretNightApplied || !this.cfg) return;
    this._turretNightApplied = true;
    const towers = this.turrets.length;
    if (towers <= 0) return;

    const baseNight = this.cfg.night;
    const baseMobs = this.cfg.mobsNight | 0;
    const mobMult = 1 + towers; // 1→×2, 2→×3, 3→×4…
    const targetMobs = Math.min(28, Math.max(baseMobs, Math.round(baseMobs * mobMult)));
    const extra = Math.max(0, targetMobs - baseMobs);
    // ~45% longer night per tower (capped) so the extra wave has room to breathe
    const nightBoost = Math.min(110, Math.round(baseNight * 0.45 * towers));
    this.cfg = { ...this.cfg, night: baseNight + nightBoost, mobsNight: targetMobs };

    const rng = mulberry32(((this.world?.seed || 1) ^ (this.dayIndex * 4243) ^ (towers * 9176) ^ 0xa11e) >>> 0);
    const ns = this.cfg.day + DUSK;
    const nightLen = this.cfg.night;
    // Stretch already-scheduled night spawns across the longer night
    for (const s of this.schedule) {
      if (s.t < ns || s.big) continue;
      const u = (s.t - ns) / Math.max(1, baseNight - 8);
      s.t = ns + 3 + Math.max(0, Math.min(0.95, u)) * (nightLen - 14);
    }
    for (let k = 0; k < extra; k++) {
      const u = (k + 0.15 + rng() * 0.7) / Math.max(1, extra);
      // Extra pressure: mix roles so towers attract variety, not just booms
      const roll = rng();
      const kind = roll < 0.25 ? 'thief' : roll < 0.4 ? 'golem' : this.pickSwarmKind(rng);
      this.schedule.push({ t: ns + 5 + u * (nightLen - 18), surge: true, kind });
    }
    // Surprise mid-night cluster when the farm is well defended
    if (towers >= 2 && rng() < 0.65) {
      const waveT = ns + nightLen * (0.38 + rng() * 0.22);
      const n = Math.min(4, 1 + towers);
      for (let i = 0; i < n; i++) this.schedule.push({ t: waveT + i * (0.9 + rng() * 0.4), surge: true, kind: this.pickSwarmKind(rng) });
    }
    this.schedule.sort((a, b) => a.t - b.t);
    this.talk.sys('sys.turretThreat', { n: towers, mobs: targetMobs });
  }

  get dayLength() { return this.cfg.day + DUSK + this.cfg.night + DAWN; }
  get isNightish() { return this.phase === 'dusk' || this.phase === 'night'; }
  get robotCanPanic() { return !this.titleMode; }

  /** 見た目の時刻（0〜1）。 */
  get skyTime() {
    if (this.titleMode) return 0.13;
    const c = this.cfg, k = this.clock;
    if (k < c.day) return 0.02 + 0.44 * (k / c.day);
    if (k < c.day + DUSK) return 0.46 + 0.12 * ((k - c.day) / DUSK);
    if (k < c.day + DUSK + c.night) return 0.58 + 0.36 * ((k - c.day - DUSK) / c.night);
    return 0.94 + 0.08 * Math.min(1, (k - c.day - DUSK - c.night) / DAWN);
  }

  updateDay(dt) {
    // Clients follow the host clock/mobs — do not simulate a parallel day.
    if (this.isNetClient()) return;
    const c = this.cfg;
    this.clock += dt;
    const k = this.clock;
    const phase = k < c.day ? 'day' : k < c.day + DUSK ? 'dusk' : k < c.day + DUSK + c.night ? 'night' : 'dawn';
    if (phase !== this.phase) {
      this.phase = phase;
      if (phase === 'dusk') {
        this.applyTurretNightPressure();
        this.talk.sys('sys.dusk');
        this.talk.say('astra.dusk', { cool: 0 });
        this.sendCrewToBed();
      } else if (phase === 'night') {
        const towers = this.turrets.length;
        const sub = c.boss
          ? t('banner.nightSubBoss')
          : towers > 0
            ? t('banner.nightSubTowers', { n: towers })
            : t('banner.nightSub');
        this.hud.banner(t('banner.night'), sub, 3.2);
        this.audio.sfx('night');
        this.updateMusic();
        this.sendCrewToBed();
      } else if (phase === 'dawn') {
        for (const m of this.mobs) m.leave();
        this.talk.sys('sys.dawn');
        this.audio.sfx('morning');
        this.updateMusic();
        this.wakeCrew();
      }
      if (this.isNetHost()) this.pushNetSim(true);
    }
    // 緑のアレ — night cap rises with towers so the bigger waves can actually land
    let alive = this.mobs.filter((m) => !m.dead && m.state !== 'leave').length;
    const towers = this.turrets.length;
    const cap = phase === 'night'
      ? Math.min(this.dayIndex < 2 ? 3 : 8, 3 + this.dayIndex + towers)
      : (this.dayIndex < 1 ? 1 : 2);
    let spawned = 0;
    while (this.schedule.length && k >= this.schedule[0].t) {
      if (phase === 'dawn') { this.schedule.shift(); continue; }
      const s = this.schedule[0];
      // 一度に出すのは 1 体まで。多すぎるときは少し待たせる
      if ((alive >= cap && !s.big) || spawned >= 1) { s.t = Math.max(s.t, k) + (spawned ? 1.5 : 4); this.schedule.sort((a, b) => a.t - b.t); break; }
      this.schedule.shift();
      if (this.spawnMob({ big: !!s.big, kind: s.kind || 'boom' })) { alive++; spawned++; }
    }
    // Arcade set-pieces (hurricane / tide / stampede) — synced with sky & farm damage
    this.arcade.update(dt);
    // あそびかた（1 日目）
    this.updateTutorial();
    if (k >= this.dayLength) this.endDay();
  }

  updateTutorial() {
    const T = this.tut;
    if (!T || T.step < 0) return;
    if (T.step === 0 && T.harvest >= 3) { T.step = 1; this.talk.say('astra.tut.harvest', { cool: 0 }); this.audio.sfx('ding'); }
    else if (T.step === 1 && T.plant >= 3) { T.step = 2; this.talk.say('astra.tut.plant', { cool: 0 }); this.audio.sfx('ding'); }
    else if (T.step === 2 && T.till >= 2) {
      T.step = 3; this.talk.say('astra.tut.till', { cool: 0 }); this.audio.sfx('ding');
      T.mobAt = this.clock + 6;
    } else if (T.step === 3) {
      if (T.mobAt && this.clock >= T.mobAt) {
        T.mobAt = 0;
        T.mob = this.spawnMob({ near: true });
        this.talk.say('astra.tut.mob', { cool: 0, delay: 0.5 });
        // 予定していた昼の 1 体はこれに替える
        this.schedule = this.schedule.filter((s) => s.t > this.cfg.day);
      }
      if (T.mob && (T.mob.dead || !this.mobs.includes(T.mob))) {
        T.step = -1;
        this.talk.say('astra.tut.done', { cool: 0, delay: 1 });
        this.talk.sys('sys.goalHint', { m: this.cfg.goal });
      }
    }
  }

  objectiveText() {
    if (this.arcade?.outdoorUnsafe) return t('obj.shelter');
    const T = this.tut;
    if (T && T.step >= 0) {
      if (T.step === 0) return t('obj.harvest', { n: Math.min(3, T.harvest), m: 3 });
      if (T.step === 1) return t('obj.plant', { n: Math.min(3, T.plant), m: 3 });
      if (T.step === 2) return t('obj.till', { n: Math.min(2, T.till), m: 2 });
      return t('obj.mob');
    }
    const live = this.mobs.filter((m) => !m.dead && m.state !== 'leave' && m.state !== 'emerge');
    if (live.length) {
      const m = live[0];
      const key = m.kind === 'boom' && m.big ? 'alien' : (m.kind || 'boom');
      return t('obj.fight', { name: t('mob.name.' + key), n: live.length });
    }
    if (this.mobs.some((m) => m.big && !m.dead)) return t('obj.boss');
    if (this.phase === 'night' || this.phase === 'dusk') return t('obj.night');
    if (this.phase === 'dawn') return t('obj.dawn');
    if (!this.today.goalDone && this.cfg) return t('obj.grow', { n: this.today.harvest | 0, m: this.cfg.goal });
    return t('obj.done');
  }

  endDay({ fromNet = false } = {}) {
    if (this.isNetHost() && !fromNet) netBroadcast({ t: 'endDay' });
    if (this.isNetClient() && !fromNet) return;
    const c = this.cfg;
    const ok = this.today.harvest >= c.goal;
    for (const m of this.mobs) { m.releasePig?.(); m.dispose(); }
    this.mobs = [];
    const last = this.lastDay;
    if (this.mode === 'endless') {
      const b = this.save.data.endlessBest || { day: 0, harvest: 0 };
      this.save.data.endlessBest = { day: Math.max(b.day, this.dayIndex + 1), harvest: Math.max(b.harvest, this.totals.harvest) };
    }
    let line = t(`astra.report.${ok ? 'good' : 'ok'}.${Math.floor(Math.random() * 3)}`);
    if (this.today.stolen || this.today.turretsLost || this.today.kidnapped || this.today.rescued) {
      line = t('astra.report.night', {
        stolen: this.today.stolen | 0,
        towers: this.today.turretsLost | 0,
        taken: this.today.kidnapped | 0,
        saved: this.today.rescued | 0,
      });
    }
    const holes = this.countHoles();
    if (holes > 0) line = t('astra.report.holes', { n: holes });
    fillReport(this.screens, { day: this.dayIndex + 1, harvest: this.today.harvest, kills: this.today.kills, booms: this.today.booms, goal: c.goal, line, last, endless: this.mode === 'endless' });
    // Craters stay. Players fill them, or the robots do it as a morning job.
    if (!last) {
      // つぎの日の朝として保存（いま「つづきから」を選ぶと、つぎの日から）
      const keep = this.dayIndex;
      this.dayIndex = keep + 1;
      this.saveRun();
      this.dayIndex = keep;
    }
    this.audio.sfx(ok ? 'goal' : 'ding');
    this.setState('report');
  }

  finish() {
    const total = this.totals.harvest;
    let rank = 0;
    for (let i = 0; i < RANKS.length; i++) if (total >= RANKS[i]) rank = i;
    const newBest = total > (this.save.data.best || 0);
    if (newBest) this.save.data.best = total;
    const unlocked = !this.save.data.cleared;
    this.save.data.cleared = true;
    this.save.data.run = null;
    this.save.save();
    fillEnding(this.screens, { harvest: total, kills: this.totals.kills, stars: this.totals.stars, green: this.totals.green, rank, best: this.save.data.best, newBest, unlocked });
    this.setState('ending');
  }

  updateMusic(force = false) {
    if (this.state !== 'play' && !force) return;
    const night = this.phase === 'night' || this.phase === 'dusk';
    const id = night ? (this.cfg?.boss ? 'boss' : 'night') : 'day';
    this.audio.music(id, { crossfade: 2 });
    if (night) {
      this.audio.setAmbience({ wind: 0.18, crickets: 0.8 });
      this.audio.stopLoop('birds');
    } else {
      this.audio.setAmbience({ wind: 0.28 });
      this.audio.loop('birds', 'bird', { period: 2.4, jitter: 1.6 });
    }
  }

  // ------------------------------------------------------------------ 出てくるもの
  spawnPigs() {
    for (const p of this.pigs) p.dispose();
    this.pigs = [];
    this._pigNetSeq = 0;
    this._pigRespawnT = PIG_RESPAWN_MIN + Math.random() * (PIG_RESPAWN_MAX - PIG_RESPAWN_MIN);
    // Same seed → same pig slots/ids on every peer (needed for pigSell sync).
    const rng = mulberry32((this.world.seed ^ 0x50494753) >>> 0);
    const cells = this.world.pigCells;
    for (let i = 0; i < 4 && cells.length; i++) {
      const c = cells[Math.floor((i + 0.5) / 4 * cells.length + rng() * 20) % cells.length];
      this.makePig((c % WX) + 0.5, ((c / WX) | 0) + 0.5, {});
    }
    // One already in the sty
    const P = LAYOUT.pigPen;
    const pcx = (P.x0 + P.x1) * 0.5 + 0.5, pcz = (P.z0 + P.z1) * 0.5 + 0.5;
    this.makePig(pcx + 1.2, pcz - 0.8, { penned: true });
  }

  makePig(x, z, { penned = false, netId = null } = {}) {
    const pig = new Pig(this, x, z, { penned });
    if (netId != null) {
      pig.netId = netId | 0;
      this._pigNetSeq = Math.max(this._pigNetSeq | 0, (netId | 0) + 1);
    } else {
      pig.netId = this._pigNetSeq | 0;
      this._pigNetSeq = (this._pigNetSeq | 0) + 1;
    }
    this.pigs.push(pig);
    return pig;
  }

  pickPigSpawnCell() {
    const cells = this.world.pigCells;
    if (!cells.length) return null;
    for (let tries = 0; tries < 48; tries++) {
      const c = cells[Math.floor(Math.random() * cells.length)];
      const x = (c % WX) + 0.5, z = ((c / WX) | 0) + 0.5;
      if (this.pigs.some((p) => !p.dead && Math.hypot(p.pos.x - x, p.pos.z - z) < 3.5)) continue;
      return { x, z, penned: false };
    }
    const c = cells[Math.floor(Math.random() * cells.length)];
    return { x: (c % WX) + 0.5, z: ((c / WX) | 0) + 0.5, penned: false };
  }

  /** Host/solo: trickle new pigs when below cap so the sty never stays empty. */
  tickPigRespawn(dt) {
    if (this.titleMode || this.state === 'title' || this.state === 'intro') return;
    if (this.isNetClient()) return;
    const alive = this.pigs.filter((p) => !p.dead).length;
    if (alive >= MAX_PIGS) return;
    // Empty island respawns a bit faster so the farm is never pig-less for long.
    if ((this._pigHold || 0) > 0) { this._pigHold -= dt; return; }
    this._pigRespawnT = (this._pigRespawnT ?? PIG_RESPAWN_MIN) - dt * (alive === 0 ? 1.75 : 1);
    if (this._pigRespawnT > 0) return;
    this._pigRespawnT = PIG_RESPAWN_MIN + Math.random() * (PIG_RESPAWN_MAX - PIG_RESPAWN_MIN);
    const penned = this.pigs.filter((p) => !p.dead && p.penned).length;
    let spot = null;
    if (penned === 0 && alive <= 1 && Math.random() < 0.5) {
      const P = LAYOUT.pigPen;
      spot = {
        x: (P.x0 + P.x1) * 0.5 + 0.5 + (Math.random() - 0.5) * 2.2,
        z: (P.z0 + P.z1) * 0.5 + 0.5 + (Math.random() - 0.5) * 2.2,
        penned: true,
      };
    } else {
      spot = this.pickPigSpawnCell();
    }
    if (!spot) return;
    const pig = this.makePig(spot.x, spot.z, { penned: spot.penned });
    if (this.online) {
      netBroadcast({
        t: 'pigSpawn',
        id: pig.netId,
        x: +spot.x.toFixed(2),
        z: +spot.z.toFixed(2),
        penned: !!spot.penned,
      });
    }
  }

  applyNetPigSpawn(ev) {
    if (ev?.id == null) return;
    const id = ev.id | 0;
    if (this.pigs.some((p) => p.netId === id)) return;
    this.makePig(+ev.x || 0, +ev.z || 0, { penned: !!ev.penned, netId: id });
  }

  sellPig(pig) {
    if (!pig || pig.dead || !pig.penned) return false;
    const pay = PIG_SELL;
    const netId = pig.netId;
    this.money += pay;
    this.lifetimeCoins += pay;
    const p = pig.pos;
    this.coinBurst(p.x, p.y + 0.8, p.z, pay);
    this.floats.add('+' + pay + '¢', p.x, p.y + 1.3, p.z, '#ffe25a');
    this.audio.sfx('coin', { pitch: 1.05 });
    this.talk.sys('sys.soldPig', { pay });
    pig.dispose();
    this.pigs = this.pigs.filter((x) => x !== pig);
    this.syncHelpers(false);
    if (this.online && netId != null) netBroadcast({ t: 'pigSell', id: netId });
    // Don't wait a full cycle after a sale when the herd is thin.
    const alive = this.pigs.filter((x) => !x.dead).length;
    if (alive < MAX_PIGS) {
      this._pigRespawnT = Math.min(this._pigRespawnT ?? PIG_RESPAWN_MIN, alive === 0 ? 8 : 12);
    }
    return true;
  }

  spawnMob({ big = false, near = false, kind = 'boom' } = {}) {
    const w = this.world;
    const pl = this.player.pos, rb = this.robot.body.pos;
    let best = null;
    for (let tries = 0; tries < 60; tries++) {
      const i = w.spawnCells[Math.floor(Math.random() * w.spawnCells.length)];
      if (i === undefined) break;
      const x = (i % WX) + 0.5, z = ((i / WX) | 0) + 0.5;
      if (z < LAYOUT.house.z0) continue;
      const f = w.floor[i];
      const dp = Math.hypot(x - pl.x, z - pl.z), dr = Math.hypot(x - rb.x, z - rb.z);
      if (w.lightAt(x, f, z)[1] >= 8) continue;
      if (dp < (near ? 10 : 13) || dr < 10) continue;
      if (near && dp > 22) continue;
      best = [x, z];
      break;
    }
    if (!best) return null;
    if (this.isNetClient()) return null; // host spawns; clients receive via sim
    // Keep scheduled roles — never silently downgrade to boom (that hid all new pests).
    let role = kind || 'boom';
    if (role === 'dragon' && this.mobs.some((m) => m.kind === 'dragon' && !m.dead)) role = 'thief';
    // Never spawn a kidnap-dragon while robots are sheltering (night or hurricane)
    if (role === 'dragon' && (this.isNightish || this.arcade?.shelter)) role = this.pickSwarmKind(() => Math.random());

    const m = this.makeMob(role, best[0], best[1], { big });
    m.netId = this._mobNetSeq++;
    this.mobs.push(m);
    if (this.isNetHost()) this.pushNetSim(true);
    const guide = settings.mobGuide !== 'off';
    const msgKey = big ? 'sys.boss'
      : role === 'golem' ? 'sys.golem'
      : role === 'thief' ? 'sys.thief'
      : role === 'dragon' ? 'sys.dragon'
      : role === 'chomp' ? 'sys.chomp'
      : role === 'hop' ? 'sys.hop'
      : role === 'sea' || role === 'leviathan' ? 'sys.tideRise'
      : role === 'dino' ? 'sys.stampede'
      : 'sys.mob';
    if (big || role !== 'boom' || (guide && this.time - (this.lastMobMsg ?? -99) > 10)) {
      this.lastMobMsg = this.time;
      this.talk.sys(msgKey, null, 'warn');
    }
    if (guide || big || role !== 'boom') this.audio.sfx(big || role === 'dragon' || role === 'leviathan' ? 'boss_spawn' : 'mob_spawn', { pos: m.pos, refDistance: 8 });
    if (big) this.hud.banner(t('banner.boss'), t('banner.bossSub'), 3.2);
    else if (role === 'golem') this.hud.banner(t('banner.golem'), t('banner.golemSub'), 2.6);
    else if (role === 'thief') this.hud.banner(t('banner.thief'), t('banner.thiefSub'), 2.4);
    else if (role === 'chomp') this.hud.banner(t('banner.chomp'), t('banner.chompSub'), 2.2);
    else if (role === 'hop') this.hud.banner(t('banner.hop'), t('banner.hopSub'), 2.2);
    else if (role === 'sea' || role === 'leviathan') this.hud.banner(t(role === 'leviathan' ? 'banner.leviathan' : 'banner.sea'), t('banner.seaSub'), 2.8);
    else if (role === 'dino') this.hud.banner(t('banner.stampede'), t('banner.stampedeRage'), 2.4);
    return m;
  }

  /** Chomper eats a crop in place (stays to binge — unlike the fleeing thief). */
  munchCrop(x, z, chomper) {
    const n = this.stealCrop(x, z, chomper);
    if (n > 0) this.talk.sys('sys.chompEat', null, 'warn');
    return n;
  }

  /** Hopper digs a small farm hole on landing. */
  hopperDig(x, z, hopper) {
    const w = this.world;
    if (!this.isFarmCell(x + z * WX) && !inRect(x, z, LAYOUT.farmZone)) return false;
    const y = GY;
    const above = w.get(x, y + 1, z);
    if (isCrop(above)) {
      this.crops.delete(w.idx(x, y + 1, z));
      this.today.lost++;
      w.set(x, y + 1, z, B.AIR);
    }
    // Punch a shallow hole like a mini boom
    if (BLOCKS[w.get(x, y, z)]?.solid || isFarm(w.get(x, y, z))) {
      w.set(x, y, z, B.AIR);
      this.particles.burst(x, y, z, 0x7a5539, 10, 1.1);
      this.floats.add('!', x + 0.5, y + 1.3, z + 0.5, '#80c0ff');
      this.today.lost++;
      return true;
    }
    return false;
  }

  /** Thief clears a ripe (or any) crop without rewarding the farm. */
  stealCrop(x, z, thief) {
    const w = this.world;
    const y = GY + 1;
    const id = w.get(x, y, z);
    if (!isCrop(id)) return 0;
    w.set(x, y, z, B.AIR);
    this.crops.delete(w.idx(x, y, z));
    this.today.stolen++;
    this.today.lost++;
    this.particles.burst(x, y, z, 0xc4a060, 8, 1);
    this.floats.add('-1', x + 0.5, y + 1.2, z + 0.5, '#ff8080');
    return 1;
  }

  nearestPig(pos) {
    let best = null, bd = 1e9;
    for (const pig of this.pigs) {
      if (pig.dead || pig.carried) continue;
      const d = Math.hypot(pig.pos.x - pos.x, pig.pos.z - pos.z);
      if (d < bd) { bd = d; best = pig; }
    }
    return best;
  }

  nearestPennedPig(pos) {
    let best = null, bd = 1e9;
    for (const pig of this.pigs) {
      if (pig.dead || !pig.penned || pig.carried) continue;
      const d = Math.hypot(pig.pos.x - pos.x, pig.pos.z - pos.z);
      if (d < bd) { bd = d; best = pig; }
    }
    return best;
  }

  /** A small charge the ninja leaves in the doorway. It pops on its own. */
  plantBomb(x, z) {
    if (this.isNetClient?.()) return;
    const mesh = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(0.36, 0.28, 0.36),
      new THREE.MeshBasicMaterial({ color: 0x2c2c2c }),
    );
    const fuse = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.24, 0.08),
      new THREE.MeshBasicMaterial({ color: 0xff5a28 }),
    );
    fuse.position.y = 0.24;
    mesh.add(body, fuse);
    mesh.position.set(x, GY + 1.08, z);
    this.scene.add(mesh);
    this.bombs.push({ mesh, fuse, x, z, t: 0, dur: 2.35 });
    this.talk.sys('sys.thiefBomb', null, 'warn');
    this.audio.sfx('hiss', { pos: mesh.position, refDistance: 5 });
  }

  clearBombs() {
    for (const b of this.bombs || []) b.mesh.removeFromParent();
    this.bombs = [];
  }

  clearPaints() {
    for (const p of this.paints || []) p.mesh.removeFromParent();
    this.paints = [];
  }

  launchPaint(origin, dir, speed = 28, sound = 'turret_pop') {
    const colors = [0xff3b5c, 0x3dff7a, 0x3aa0ff, 0xffd23a, 0xd15cff, 0xff8a2a];
    const color = colors[(this._paintI = ((this._paintI | 0) + 1) % colors.length)];
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, 8, 6),
      new THREE.MeshBasicMaterial({ color }),
    );
    mesh.position.copy(origin);
    this.scene.add(mesh);
    const vel = dir.clone();
    if (vel.lengthSq() < 1e-6) vel.set(0, 0, 1);
    vel.normalize().multiplyScalar(speed);
    this.paints.push({ mesh, vel, life: 0, color });
    this.audio.sfx(sound, { pos: origin, pitch: sound === 'cannon' ? 1 : 1.45, refDistance: 9 });
  }

  firePaint() {
    const { o, d } = this.player.ray();
    this.launchPaint(o.clone().addScaledVector(d, 0.85), d, 28);
  }

  stepPaints(dt) {
    const targets = [
      ...this.mobs.filter((m) => !m.dead && m.state !== 'leave'),
      ...(this.beachDecor?._fish || []).filter((f) => f.v?.root?.visible && f.state !== 'under' && !f.dead),
    ];
    for (let i = (this.paints || []).length - 1; i >= 0; i--) {
      const p = this.paints[i];
      p.life += dt;
      p.vel.y -= 6 * dt;
      p.mesh.position.addScaledVector(p.vel, dt);
      let hit = null;
      for (const m of targets) {
        const c = m.center || m.pos;
        if (!c) continue;
        if (p.mesh.position.distanceTo(c) < 1.05) { hit = m; break; }
      }
      if (!hit && p.life < 1.15) continue;
      const x = p.mesh.position.x, y = p.mesh.position.y, z = p.mesh.position.z;
      this.particles.burst(x, y, z, p.color, 10, 1.1);
      if (hit?.hit) {
        hit.hit(2, { x, y, z }, 0.45);
        if (hit.dead && !hit.sea) this.onMobKilled(hit, 'player');
        this.audio.sfx('paint_hit', { pos: { x, y, z }, pitch: 0.94 + Math.random() * 0.14 });
      }
      p.mesh.removeFromParent();
      this.paints.splice(i, 1);
    }
  }

  stepBombs(dt) {
    for (let i = (this.bombs || []).length - 1; i >= 0; i--) {
      const b = this.bombs[i];
      b.t += dt;
      const k = b.t / b.dur;
      b.fuse.material.color.setHex(Math.sin(b.t * 18) > 0 ? 0xffe14a : 0xff3a1a);
      b.mesh.position.y = GY + 1.08 + Math.sin(b.t * 10) * 0.04;
      b.mesh.scale.setScalar(1 + k * 0.18);
      if (k < 1) continue;
      this.detonateBomb(b);
      b.mesh.removeFromParent();
      this.bombs.splice(i, 1);
    }
  }

  detonateBomb(b) {
    const x = b.x, z = b.z, y = GY + 1.2;
    this.damageLodge(22);
    this.particles.burst(x, y, z, 0xffc48a, 16, 1.3);
    this.particles.smoke?.(x, y, z, 10, 0.45);
    this.audio.sfx('explode', { pos: { x, y, z }, pitch: 1.35, dur: 0.45 });
    this.talk.sys('sys.thiefBoom', null, 'warn');
    this.shake = Math.max(this.shake || 0, 0.45);
    const p = this.player.pos;
    if (this.player.alive && Math.hypot(p.x - x, p.z - z) < 2.4) {
      this.player.damage(5, { x, z });
      this.hud.hurt(0.45);
    }
  }

  /** Bunny crew: nudge a growing carrot forward. */
  tendCarrot(x, z) {
    const w = this.world;
    const y = GY + 1;
    const id = w.get(x, y, z);
    const def = cropDefOf(id);
    if (!def || def.id !== 'carrot' || isRipe(id)) return false;
    const i = w.idx(x, y, z);
    const prog = (this.crops.get(i) || 0) + 0.42;
    if (prog >= 1) {
      const next = nextStageId(id);
      if (next == null) return false;
      w.set(x, y, z, next);
      this.crops.set(i, 0);
    } else this.crops.set(i, prog);
    this.particles.sparkle(x, y, z, 3, def.sparkle);
    return true;
  }

  /** Ninja got away with a pig. It does not pop back during this night. */
  removePig(pig) {
    if (!pig || pig.dead) return;
    pig.carried = null;
    pig.dead = true;
    pig.dispose();
    this.pigs = this.pigs.filter((x) => x !== pig);
    this._pigHold = Math.max(this._pigHold || 0, 240);
    this.syncHelpers(false);
  }

  onThiefEscaped(thief) {
    if (thief.carriedPig) {
      this.removePig(thief.carriedPig);
      thief.carriedPig = null;
      thief.loot = Math.max(thief.loot | 0, 1);
      this.talk.sys('sys.thiefPigGone', null, 'warn');
    } else if (thief.loot > 0) {
      this.talk.sys('sys.thiefEscaped', { n: thief.loot }, 'warn');
    }
    if (thief.loot > 0) this.audio.sfx('hurt', { pitch: 1.4 });
  }

  onThiefDropped(thief) {
    const n = thief.loot | 0;
    if (n <= 0) return;
    this.money += n * 2;
    this.lifetimeCoins = (this.lifetimeCoins | 0) + n * 2;
    this.floats.add('+' + (n * 2), thief.pos.x, thief.pos.y + 1.4, thief.pos.z, '#ffe080');
    this.talk.sys('sys.thiefCaught', { n: n * 2 });
    thief.loot = 0;
  }

  onTurretDestroyed(tr) {
    this.today.turretsLost++;
    this.particles.smoke(tr.root.position.x, tr.y + 1.5, tr.root.position.z, 16, 0.7);
    this.audio.sfx('explode', { pos: tr.root.position, pitch: 0.7, dur: 0.7 });
    this.talk.sys('sys.turretDown', null, 'warn');
    tr.dispose();
    this.turrets = this.turrets.filter((x) => x !== tr);
    if (this.isNetHost()) netBroadcast({ t: 'turretDown', x: tr.x, z: tr.z });
  }

  onDragonEscaped(dragon) {
    this.today.kidnapped++;
    this.talk.sys('sys.dragonEscaped', null, 'warn');
    this.audio.sfx('hurt', { pitch: 0.7 });
  }

  nearestMob(pos) {
    let best = null;
    for (const m of this.mobs) {
      if (m.dead || m.state === 'leave') continue;
      const d = Math.hypot(m.pos.x - pos.x, m.pos.z - pos.z);
      if (!best || d < best.dist) best = { mob: m, dist: d };
    }
    return best;
  }

  nearestCrop(pos) {
    let best = null, bd = Infinity;
    for (const i of this.crops.keys()) {
      const x = i % WX, z = Math.floor(i / WX) % WZ;
      const d = (x + 0.5 - pos.x) ** 2 + (z + 0.5 - pos.z) ** 2;
      if (d < bd) { bd = d; best = [x, z]; }
    }
    return best;
  }

  isFarmCell(i) {
    if (i < 0 || i >= WX * WZ) return false;
    const x = i % WX, z = (i / WX) | 0;
    return isFarm(this.world.get(x, GY, z)) || inRect(x, z, LAYOUT.farmZone);
  }

  reserve(x, z, on) { const k = x + z * WX; if (on) this.reserved.add(k); else this.reserved.delete(k); }
  isReserved(x, z) { return this.reserved.has(x + z * WX); }

  // ------------------------------------------------------------------ 畑
  rebuildCrops() {
    this.crops.clear();
    const w = this.world;
    for (let y = 1; y < 20; y++) for (let z = 0; z < WZ; z++) for (let x = 0; x < WX; x++) {
      if (isCrop(w.get(x, y, z))) this.crops.set(w.idx(x, y, z), Math.random() * 0.6);
    }
  }

  growCrops(dt) {
    const w = this.world;
    for (const [i, prog] of this.crops) {
      const id = w.data[i];
      const def = cropDefOf(id);
      if (!def || isRipe(id)) {
        if (!isCrop(id)) this.crops.delete(i);
        continue;
      }
      const below = w.data[i - WX * WZ];
      const wet = BLOCKS[below]?.wet;
      const jitter = 0.8 + ((i * 2654435761) >>> 0) % 1000 / 2500;
      const np = prog + dt * (wet ? 1 / def.growWet : 1 / def.growDry) * jitter;
      if (np >= 1) {
        const x = i % WX, z = Math.floor(i / WX) % WZ, y = Math.floor(i / (WX * WZ));
        const next = nextStageId(id);
        w.set(x, y, z, next);
        this.crops.set(i, 0);
        if (isRipe(next) && Math.random() < 0.3) this.particles.sparkle(x, y, z, 2, def.sparkle);
      } else this.crops.set(i, np);
    }
  }

  /** Harvest a ripe crop. Player: drops fly out. Robot: shared bags. All crops count toward the daily goal. */
  harvest(x, y, z, who) {
    const w = this.world;
    const id = w.get(x, y, z);
    const def = cropDefOf(id);
    if (!def || !isRipe(id)) return 0;
    const n = cropYield(def);
    w.set(x, y, z, B.AIR);
    this.crops.delete(w.idx(x, y, z));
    const lb = this.lightBright(x, y, z);
    this.particles.burst(x, y, z, def.particle, 10, lb, 0.8);
    this.audio.sfx('harvest', { pos: { x: x + 0.5, y: y + 0.5, z: z + 0.5 } });
    const rare = def.rareDrop && Math.random() < (def.rareChance ?? 0);
    if (who === 'player') {
      const vy = def.id === 'carrot' ? 5.5 + Math.random() * 2 : undefined;
      for (let k = 0; k < n; k++) this.drops.spawn(def.dropKind, x + 0.5, y + 0.4, z + 0.5, vy != null ? { vy } : {});
      if (rare) this.drops.spawn(def.rareDrop, x + 0.5, y + 0.5, z + 0.5);
      if (this.tut) this.tut.harvest++;
    } else {
      this.addSeed(def.dropKind, n);
      this.floats.add('+' + n, x + 0.5, y + 1.3, z + 0.5);
      if (rare) { this.green++; this.totals.green++; this.talk.say('astra.greenPotato', { cool: 30 }); this.robot.emote.show('!', 1.5); }
    }
    this.totals[def.id] = (this.totals[def.id] || 0) + n;
    if (def.countsForGoal) this.countHarvest(n);
    this.autoSellSurplus({ x: x + 0.5, y: y + 1, z: z + 0.5 });
    return n;
  }

  /** Pick a crop kind the farm can plant from shared bags (keep a small reserve). */
  pickPlantSeed(reserve = 2) {
    const opts = CROPS.filter((c) => this.seedCount(c.dropKind) > reserve).map((c) => c.id);
    if (!opts.length) return null;
    return opts[Math.floor(Math.random() * opts.length)];
  }

  countHarvest(n) {
    this.today.harvest += n;
    this.totals.harvest += n;
    if (!this.today.goalDone && this.cfg && this.today.harvest >= this.cfg.goal && !this.titleMode) {
      this.today.goalDone = true;
      this.totals.stars = (this.totals.stars | 0) + 1;
      this.hud.banner(t('banner.goal'), t('banner.goalSub', { hoe: this.hoeLevel() + 1 }), 2.8);
      this.audio.sfx('goal');
      this.talk.say('astra.goal', { random: true, cool: 0, delay: 0.8 });
      if (this.hoeLevel() > 0) this.talk.sys('sys.hoeUp', { n: this.hoeLevel() + 1 });
      this.syncHelpers(false);
    }
  }

  /** Plant a crop seed. kind defaults to potato (Astra) or the held seed tool (player). */
  plant(x, y, z, who, kind = 'potato') {
    const w = this.world;
    const def = CROP_BY_ID[kind] || defBySeedTool(kind);
    if (!def) return false;
    if (!isFarm(w.get(x, y - 1, z)) || w.get(x, y, z) !== B.AIR) return false;
    if (this.isHole(x, y, z)) return false;
    if (!this.takeSeed(def.dropKind, 1)) return false;
    w.set(x, y, z, def.stages[0]);
    this.crops.set(w.idx(x, y, z), 0);
    this.audio.sfx('plant', { pos: { x: x + 0.5, y: y + 0.2, z: z + 0.5 } });
    this.particles.burst(x + 0.2, y - 0.05, z + 0.2, 0x7a5539, 5, this.lightBright(x, y, z), 0.6);
    if (who === 'player' && this.tut) this.tut.plant++;
    return true;
  }

  isWetSpot(x, y, z) {
    const w = this.world;
    for (let dz = -4; dz <= 4; dz++) for (let dx = -4; dx <= 4; dx++) for (const dy of [0, 1]) if (w.get(x + dx, y + dy, z + dz) === B.WATER) return true;
    return false;
  }

  till(x, y, z, who) {
    const level = who === 'player' ? this.hoeLevel() : Math.min(1, this.hoeLevel());
    const cells = [[0, 0]];
    if (level >= 1) cells.push([1, 0], [-1, 0], [0, 1], [0, -1]);
    if (level >= 2) cells.push([1, 1], [1, -1], [-1, 1], [-1, -1]);
    let n = 0;
    for (const [dx, dz] of cells) {
      if (this.tillOne(x + dx, y, z + dz, who)) n++;
    }
    if (n > 0) this.audio.sfx('till', { pos: { x: x + 0.5, y: y + 1, z: z + 0.5 }, pitch: 0.9 + level * 0.08 });
    return n > 0;
  }

  tillOne(x, y, z, who) {
    const w = this.world;
    const id = w.get(x, y, z), up = w.get(x, y + 1, z);
    if (id !== B.GRASS && id !== B.DIRT) return false;
    if (up !== B.AIR && !(BLOCKS[up].plant && up !== B.CANE)) return false;
    if (this.isHole(x, y + 1, z)) return false;
    if (up !== B.AIR) w.set(x, y + 1, z, B.AIR);
    w.set(x, y, z, this.isWetSpot(x, y, z) ? B.FARM_WET : B.FARM);
    this.particles.burst(x, y + 0.9, z, 0x7a5539, 6, this.lightBright(x, y + 1, z), 1);
    if (who === 'player' && this.tut) this.tut.till++;
    return true;
  }

  /** 穴（爆発で消えた地面）か：元は地面で、いまは空気・草・作物のマス。 */
  isHole(x, y, z) {
    const w = this.world;
    if (!w.inside(x, y, z)) return false;
    const base = w.baseAt(x, y, z);
    if (!BLOCKS[base].restore && !isFarm(base)) return false;
    const cur = w.get(x, y, z);
    return cur !== B.WATER && !BLOCKS[cur].solid;
  }

  /** 穴を埋めるときに戻すブロック（畑だったところは土。上がまだ穴なら草ではなく土）。 */
  restoreId(x, y, z) {
    const base = this.world.baseAt(x, y, z);
    let id = isFarm(base) ? B.DIRT : BLOCKS[base].restore;
    if (id === B.GRASS && (BLOCKS[this.world.get(x, y + 1, z)].solid || this.isHole(x, y + 1, z))) id = B.DIRT;
    return id;
  }

  /** 穴を 1 マス埋める。中に植えてしまった作物は、種に戻る。 */
  repair(x, y, z, who = 'player') {
    const w = this.world;
    if (!this.isHole(x, y, z)) return false;
    const cur = w.get(x, y, z);
    if (isCrop(cur)) {
      this.crops.delete(w.idx(x, y, z));
      const kind = cropDefOf(cur)?.dropKind || 'potato';
      if (who === 'player') this.drops.spawn(kind, x + 0.5, y + 1.1, z + 0.5);
      else this.addSeed(kind, 1);
    }
    const id = this.restoreId(x, y, z);
    w.set(x, y, z, id);
    // 下の草は、上に積んだので土に
    if (w.get(x, y - 1, z) === B.GRASS) w.set(x, y - 1, z, B.DIRT);
    this.audio.sfx('place', { pos: { x: x + 0.5, y: y + 0.5, z: z + 0.5 } });
    this.particles.burst(x, y + 0.9, z, BLOCKS[id].particle, 6, this.lightBright(x, y + 1, z), 1);
    if (who === 'player' && this.tut) this.tut.fill = (this.tut.fill || 0) + 1;
    return true;
  }

  /** How many blast craters are still open. */
  countHoles() {
    let n = 0;
    for (let y = 1; y < 24; y++) for (let z = 0; z < WZ; z++) for (let x = 0; x < WX; x++) {
      if (this.isHole(x, y, z)) n++;
    }
    return n;
  }

  /** 島じゅうの穴を全部埋める（夜のあいだにアストラがやっておく）。穴に植えた作物はじゃがいもに戻す。 */
  repairAll() {
    const w = this.world;
    let n = 0;
    for (let y = 1; y < 24; y++) for (let z = 0; z < WZ; z++) for (let x = 0; x < WX; x++) {
      if (!this.isHole(x, y, z)) continue;
      const cur = w.get(x, y, z);
      if (isCrop(cur)) {
        this.crops.delete(w.idx(x, y, z));
        this.addSeed(cropDefOf(cur)?.dropKind || 'potato', 1);
      }
      w.set(x, y, z, this.restoreId(x, y, z));
      n++;
    }
    return n;
  }

  fertilize(x, y, z) {
    const w = this.world;
    const id = w.get(x, y, z);
    const next = fertilizeStageId(id);
    if (next == null || this.powder <= 0) return false;
    this.powder--;
    w.set(x, y, z, next);
    this.crops.set(w.idx(x, y, z), 0);
    this.particles.sparkle(x, y, z, 12, 0xb8ff8a);
    this.audio.sfx('fertilize', { pos: { x: x + 0.5, y: y + 0.5, z: z + 0.5 } });
    return true;
  }

  collect(kind) {
    if (kind in this.bags) {
      this.addSeed(kind, 1);
      if (kind !== 'potato') this.totals[kind] = (this.totals[kind] || 0);
      this.autoSellSurplus(this.player.pos);
    } else if (kind === 'powder') {
      this.powder++;
      if (!this.powderHinted) { this.powderHinted = true; this.talk.sys('sys.powder'); this.talk.say('astra.powder', { cool: 0, delay: 0.8 }); }
    } else if (kind === 'green') {
      this.green++; this.totals.green++;
      this.talk.sys('sys.greenPotato');
      this.talk.say('astra.greenPotato', { cool: 30, delay: 0.6 });
    }
    this.audio.sfx('pickup', { pitch: 0.9 + Math.random() * 0.3 });
  }

  lightBright(x, y, z) {
    const [s, b] = this.world.lightAt(x, y, z);
    return Math.max(0.12, Math.max((s / 15) ** 1.6 * shared.uSky.value, (b / 15) ** 1.7));
  }

  // ------------------------------------------------------------------ 緑のアレ
  onFuse(m) {
    this.audio.sfx('hiss', { pos: m.pos, refDistance: 3, big: m.big });
  }
  onDefuse() {}

  explode(m) {
    const w = this.world;
    const c = m.center;
    const r = m.radius;
    const R = Math.ceil(r + 1);
    const removed = [];
    const cleared = [];
    let lost = 0;
    const cx = Math.floor(c.x), cy = Math.floor(c.y), cz = Math.floor(c.z);
    for (let dy = -R; dy <= R; dy++) for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
      const x = cx + dx, y = cy + dy, z = cz + dz;
      const id = w.get(x, y, z);
      if (!id || !BLOCKS[id].blast || y <= 1) continue;
      const d = Math.hypot(x + 0.5 - c.x, y + 0.5 - c.y, z + 0.5 - c.z);
      if (d > r - Math.random() * 0.9) continue;
      removed.push([x, y, z, id]);
    }
    for (const [x, y, z, id] of removed) {
      if (isCrop(id)) {
        lost++;
        const def = cropDefOf(id);
        const kind = def?.dropKind || 'potato';
        if (isRipe(id) || Math.random() < 0.35) this.drops.spawn(kind, x + 0.5, y + 0.5, z + 0.5, { vy: 5 + Math.random() * 3 });
      }
      w.set(x, y, z, B.AIR);
      cleared.push(w.idx(x, y, z));
    }
    // 支えがなくなった草・作物も消える
    for (const [x, y, z] of removed) {
      for (let yy = y + 1; yy < y + 4; yy++) {
        const up = w.get(x, yy, z);
        if (!needsSupport(up)) break;
        if (isCrop(up)) lost++;
        w.set(x, yy, z, B.AIR);
        cleared.push(w.idx(x, yy, z));
      }
    }
    this._chipStructures(c.x, c.z, r, m.big ? 16 : 7);
    const lb = this.lightBright(c.x, c.y + 1, c.z);
    this.particles.smoke(c.x, c.y, c.z, m.big ? 60 : 36, r * 0.5, Math.max(0.35, lb), m.big ? 1.8 : 1.2);
    removed.slice(0, 22).forEach(([x, y, z, id]) => this.particles.burst(x, y, z, BLOCKS[id].particle, 4, lb, 1));
    this.audio.sfx('explode', { pos: c, refDistance: 6, big: m.big, dur: m.big ? 1.8 : 1.2 });
    const pd = this.player.pos.distanceTo(c);
    this.shake = Math.max(this.shake, Math.max(0, 1 - pd / (m.big ? 28 : 18)) * (m.big ? 1.6 : 1));
    this.flash = Math.max(this.flash, Math.max(0, 1 - pd / 14) * 0.55);
    // プレイヤー
    const pc = this.player.pos.clone(); pc.y += 0.9;
    const dd = pc.distanceTo(c);
    const dmg = Math.round(Math.max(0, 1 - dd / (r * 1.9)) * (m.big ? 24 : 15));
    if (dmg > 0 && this.state === 'play') { this.player.damage(dmg, c); this.hud.hurt(Math.min(1, 0.4 + dmg / 15)); this.audio.sfx('hurt'); }
    // アストラ
    const rb = this.robot.body.pos;
    const rd = Math.hypot(rb.x - c.x, rb.y + 0.6 - c.y, rb.z - c.z);
    if (rd < r * 1.7 && this.robot.state !== 'flung') this.robot.fling(c, 1 - rd / (r * 1.7));
    // ほかの緑のアレ・ブタ
    for (const o of this.mobs) {
      if (o === m || o.dead) continue;
      const od = o.center.distanceTo(c);
      if (od < r * 1.6 && o.hit(m.big ? 6 : 2, c, 1.3) && o.dead) this.onMobKilled(o, 'boom');
    }
    for (const p of this.pigs) if (p.pos.distanceTo(c) < r * 1.8) p.hit(c);
    this.today.booms++;
    this.totals.booms++;
    this.today.lost += lost;
    if (this.isNetHost()) {
      netBroadcast({ t: 'boom', x: c.x, y: c.y, z: c.z, big: !!m.big, cells: cleared });
    }
    m.dead = true;
    this.removeMob(m);
    if (this.isNetHost()) this.pushNetSim(true);
    if (lost > 0 && !this.robot.state.match(/sleep|flung/)) this.talk.say('astra.farmHit', { random: true, delay: 1.6, cool: 12 });
    events.emit('explode', { lost });
  }

  removeMob(m) {
    m.dispose();
    const i = this.mobs.indexOf(m);
    if (i >= 0) this.mobs.splice(i, 1);
  }

  onMobKilled(m, by = 'player') {
    const c = m.center;
    this.particles.smoke(c.x, c.y - 0.2, c.z, m.big ? 30 : 14, 0.4, Math.max(0.4, this.lightBright(c.x, c.y, c.z)), m.big ? 1.3 : 0.8);
    this.audio.sfx('poof', { pos: c });
    if (by === 'turret') {
      // Arcade payout jingle when a tower clears a green
      this.audio.sfx('turret_coin', { pos: c, pitch: m.big ? 0.85 : 1 });
      this.floats.add(m.big ? '$$$' : '¢', c.x, c.y + 1.35, c.z, '#ffe25a');
      this.particles.sparkle(c.x, c.y + 0.5, c.z, m.big ? 16 : 8, 0xffe25a);
    }
    const n = m.big ? 6 : 1 + (Math.random() < 0.5 ? 1 : 0);
    for (let k = 0; k < n; k++) this.drops.spawn('powder', c.x, c.y, c.z);
    if (m.big) for (let k = 0; k < 10; k++) this.drops.spawn('potato', c.x, c.y + 0.3, c.z, { vy: 5 + Math.random() * 3 });
    this.today.kills++;
    this.totals.kills++;
    this.removeMob(m);
    if (by === 'player' || by === 'turret') {
      const killKey = m.big ? 'sys.bossKill'
        : m.kind === 'golem' ? 'sys.golemKill'
        : m.kind === 'thief' ? 'sys.thiefKill'
        : m.kind === 'dragon' ? 'sys.dragonKill'
        : m.kind === 'chomp' ? 'sys.chompKill'
        : m.kind === 'hop' ? 'sys.hopKill'
        : m.kind === 'sea' || m.kind === 'leviathan' ? 'sys.tideClear'
        : m.kind === 'dino' ? 'sys.stampedeClear'
        : 'sys.kill';
      if (by === 'player') this.talk.sys(killKey);
      const rd = this.robot.body.pos.distanceTo(c);
      if (by === 'player' && rd < 16 && !['sleep', 'flung', 'sulk', 'toBed', 'kidnapped'].includes(this.robot.state) && (this.thankCool ?? 0) <= this.time) {
        this.thankCool = this.time + 25;
        this.talk.say(m.big ? 'astra.bossThanks' : 'astra.thanks', { random: !m.big, delay: 0.8, cool: 0 });
        this.stock += 1;
        const rp = this.robot.body.pos;
        this.floats.add('+1', rp.x, rp.y + 1.9, rp.z);
        this.robot.emote.show('heart', 1.8);
      }
    }
  }

  // ------------------------------------------------------------------ 毎フレーム
  step(dt) {
    const input = this.input;
    input.update(dt);
    this.time += dt;
    this[`update_${this.state}`]?.(dt);
    const live = this.state === 'play' || this.state === 'dead' || this.titleMode && (this.state === 'title' || this.state === 'intro');
    if (live) this.updateWorld(dt);
    this.updateView(dt);
    this.audio.listen(this.camera);
    this.audio.tick(dt);
    input.endFrame();
  }

  update_title() {
    if (this.input.menu.back && this.screens.back()) this.audio.sfx('ui_back');
  }
  update_intro() {
    if (this.input.menu.back) { this.audio.sfx('ui_back'); this.setState('title'); }
  }

  update_paused() {
    const input = this.input;
    if (input.menu.back || input.menu.start || input.pressed('pause')) {
      if (this.screens.top !== this.screens.modals.pause) { this.screens.back(); this.audio.sfx('ui_back'); }
      else { this.setState('play'); this.lockPointer?.(); }
    }
  }

  update_dead(dt) {
    this.deadT += dt;
    this.player.update(dt, this.input, false);
    this.updateDay(dt);
    this.fade = Math.min(0.55, this.deadT * 0.4);
    if (this.deadT > 2.8 && this.state === 'dead') {
      this.player.reset(LAYOUT.spawn);
      this.hud.setDead(false);
      this.fade = 0;
      this.talk.say('astra.death', { cool: 0, delay: 0.5 });
      this.setState('play');
    }
  }

  update_play(dt) {
    const input = this.input;
    if (input.pressed('pause') || input.menu.start) { this.setState('paused'); return; }
    this.grace = Math.max(0, this.grace - dt);
    if (this.strategy?.on) {
      this.strategy.update(dt);
      this.player.update(dt, input, false);
    } else {
      this.player.update(dt, input, true);
      this.updateTargeting();
      this.handleActions(dt);
    }
    this.updateDay(dt);
    if (!this.player.alive && this.state === 'play') this.setState('dead');
  }

  // 狙っているもの（ブロック・緑のアレ・ブタ・アストラ）
  updateTargeting() {
    const { o, d } = this.player.ray();
    this.target = this.world.raycast(o.x, o.y, o.z, d.x, d.y, d.z, REACH + 0.5);
    if (this.target && this.target.dist > REACH) this.target = null;
    const bd = this.target ? this.target.dist : REACH;
    // 生きもの（箱と光線）
    let best = null, bt = Math.min(bd, 4.2);
    const test = (ent, x, y, z, hw, h) => {
      const tt = rayBox(o, d, x - hw, y, z - hw, x + hw, y + h, z + hw);
      if (tt !== null && tt < bt) { bt = tt; best = ent; }
    };
    for (const m of this.mobs) if (!m.dead && m.state !== 'emerge') test(m, m.pos.x, m.pos.y, m.pos.z, m.body.hw + 0.12, m.body.h + 0.1);
    for (const f of this.beachDecor?._fish || []) {
      if (!f.v?.root?.visible || f.state === 'under' || f.dead) continue;
      const p = f.pos;
      test(f, p.x, p.y, p.z, 0.75, 2.1);
    }
    for (const p of this.pigs) test(p, p.pos.x, p.pos.y, p.pos.z, 0.5, 0.95);
    const rb = this.robot.body.pos;
    test(this.robot, rb.x, rb.y, rb.z, 0.4, 1.35);
    // ねらいを少し助ける（近くの緑のアレが、照準のそばにいれば当てる）
    if (!best) {
      let ba = 0.32;
      const aim = [...this.mobs, ...(this.beachDecor?._fish || []).filter((f) => f.v?.root?.visible && f.state !== 'under' && !f.dead)];
      for (const m of aim) {
        if (m.dead || m.state === 'emerge' || m.state === 'under') continue;
        const v = m.center.sub(o);
        const dist = v.length();
        if (dist > 3.6 || dist > bd + 0.5) continue;
        const a = v.normalize().angleTo(d);
        if (a < ba) { ba = a; best = m; }
      }
    }
    this.targetMob = best && typeof best.hit === 'function' && !(best instanceof Pig) ? best : null;
    this.targetPig = best instanceof Pig ? best : null;
    this.targetRobot = best === this.robot;
    if (best) this.target = null;
  }

  /** 持ちもの tool で、狙っているブロックにできること（なければ null）。off：できないけれど理由を出すもの。 */
  useFor(tool, tg) {
    const w = this.world, id = tg.id;
    const above = w.get(tg.x, tg.y + 1, tg.z);
    switch (tool) {
      case 'hoe':
        if ((id === B.GRASS || id === B.DIRT) && (above === B.AIR || (BLOCKS[above].plant && above !== B.CANE))) {
          return this.isHole(tg.x, tg.y + 1, tg.z) ? { act: 'holeFirst', off: true } : { act: 'till' };
        }
        return null;
      case 'seed': {
        if (isFarm(id) && above === B.AIR) {
          if (this.isHole(tg.x, tg.y + 1, tg.z)) return { act: 'holeFirst', off: true };
          const crop = this.peekNextSeed();
          return crop ? { act: 'plant', crop } : { act: 'noSeed', off: true };
        }
        return null;
      }
      case 'powder':
        if (isCrop(id) && !isRipe(id)) return this.powder > 0 ? { act: 'fertilize' } : { act: 'noPowder', off: true };
        return null;
      case 'dirt': {
        // 穴に植えてしまった作物・草：そのマスを埋める
        if (!BLOCKS[id].solid && this.isHole(tg.x, tg.y, tg.z) && !this.cellBlocked(tg.x, tg.y, tg.z)) return { act: 'fill', at: [tg.x, tg.y, tg.z] };
        // 狙った面のとなりが穴なら、そこを埋める
        const f = [tg.x + tg.nx, tg.y + tg.ny, tg.z + tg.nz];
        if (this.isHole(...f)) return this.cellBlocked(...f) ? { act: 'blocked', off: true } : { act: 'fill', at: f };
        return null;
      }
      case 'turret': {
        if (!this.turretUnlocked()) return { act: 'turretLater', off: true };
        // Place on top of the looked-at solid block (or the column below a plant).
        let x = tg.x, z = tg.z;
        if (tg.ny === 1 || BLOCKS[id]?.solid || isFarm(id)) {
          x = tg.x; z = tg.z;
        } else if (tg.nx || tg.nz) {
          x = tg.x + (tg.nx || 0); z = tg.z + (tg.nz || 0);
        }
        if (this.turrets.length >= MAX_TURRETS) return { act: 'turretMax', off: true };
        if (this.money < BUY.turret) return { act: 'noMoney', off: true };
        if (!this.canPlaceTurret(x, z)) return { act: 'turretBlocked', off: true };
        return { act: 'placeTurret', x, z };
      }
      default:
        return null;
    }
  }

  nearHouse(r = 3.2) {
    const p = this.player?.pos;
    if (!p) return false;
    const H = LAYOUT.house;
    const x = Math.max(H.x0, Math.min(H.x1 + 1, p.x));
    const z = Math.max(H.z0, Math.min(H.z1 + 1, p.z));
    return Math.hypot(p.x - x, p.z - z) <= r;
  }

  _buildLodgeBar() {
    if (this._lodgeBar) {
      this.scene.remove(this._lodgeBar);
      this._lodgeBar.traverse((o) => o.geometry?.dispose?.());
    }
    const H = LAYOUT.house;
    const g = new THREE.Group();
    g.name = 'lodgeBar';
    g.position.set((H.x0 + H.x1) * 0.5 + 0.5, GY + 7.4, H.z1 + 0.85);
    const bg = new THREE.Mesh(
      new THREE.BoxGeometry(4.4, 0.34, 0.08),
      new THREE.MeshBasicMaterial({ color: 0x141414 }),
    );
    const fill = new THREE.Mesh(
      new THREE.BoxGeometry(4.1, 0.2, 0.1),
      new THREE.MeshBasicMaterial({ color: 0x3ddc6a }),
    );
    fill.position.set(0, 0, 0.04);
    g.add(bg, fill);
    g.visible = false;
    this.scene.add(g);
    this._lodgeBar = g;
    this._lodgeFill = fill;
    this.refreshLodgeBar();
  }

  refreshLodgeBar() {
    if (!this._lodgeFill || !this.lodge) return;
    const k = Math.max(0, Math.min(1, this.lodge.hp / this.lodge.max));
    this._lodgeBar.visible = k < 0.995;
    this._lodgeFill.scale.x = Math.max(0.04, k);
    this._lodgeFill.position.x = (k - 1) * 2.05;
    const col = k > 0.55 ? 0x3ddc6a : k > 0.28 ? 0xf0c040 : 0xe23b3b;
    this._lodgeFill.material.color.setHex(col);
  }

  /** Cactoro club hits. Returns false when the lodge is already down. */
  damageLodge(amount) {
    if (!this.lodge) this.lodge = { hp: 140, max: 140 };
    if (this.lodge.hp <= 0) return false;
    this.lodge.hp = Math.max(0, this.lodge.hp - amount);
    this.refreshLodgeBar();
    const H = LAYOUT.house;
    const x = H.door[0] + 0.5, y = GY + 3.2, z = H.z1 + 0.15;
    this.particles.burst(x, y, z, 0xc4a060, 8, 1.1);
    this.shake = Math.max(this.shake || 0, 0.22);
    this.audio.sfx('hit', { pos: { x, y, z }, pitch: 0.55 });
    this.floats.add(String(-amount), x, y + 0.8, z + 0.4, '#ffb4b4');
    if (this.lodge.hp <= 0) this.talk.sys('sys.lodgeDown', null, 'warn');
    else if (!this._lodgeWarn && this.lodge.hp < this.lodge.max * 0.85) {
      this._lodgeWarn = true;
      this.talk.sys('sys.lodgeHit', null, 'warn');
    }
    return this.lodge.hp > 0;
  }

  structureFull(kind) {
    const s = kind === 'lodge' ? this.lodge : kind === 'pen' ? this.penHp : this.pondHp;
    return !s || s.hp >= s.max;
  }

  repairPen(n = 16) {
    return this._repairStat(this.penHp, n, 'sys.penFixed');
  }

  repairPond(n = 14) {
    return this._repairStat(this.pondHp, n, 'sys.pondFixed');
  }

  _chipStructures(x, z, radius, amount) {
    const H = LAYOUT.house;
    const hc = [(H.x0 + H.x1) * 0.5, (H.z0 + H.z1) * 0.5];
    if (Math.hypot(x - hc[0], z - hc[1]) < radius + 6) this.damageLodge(amount);
    const P = LAYOUT.pigPen;
    const pc = [(P.x0 + P.x1) * 0.5, (P.z0 + P.z1) * 0.5];
    if (Math.hypot(x - pc[0], z - pc[1]) < radius + 4 && this.penHp) {
      this.penHp.hp = Math.max(0, this.penHp.hp - amount);
      if (this.penHp.hp <= 0) this.talk.sys('sys.penDown', null, 'warn');
    }
    const [px, pz] = LAYOUT.pond;
    if (Math.hypot(x - px, z - pz) < radius + 3 && this.pondHp) {
      this.pondHp.hp = Math.max(0, this.pondHp.hp - amount);
      if (this.pondHp.hp <= 0) this.talk.sys('sys.pondDown', null, 'warn');
    }
    if (this.strategy?.focus) this.hud.setRtsCard?.(this.strategy._card(this.strategy.focus));
  }

  _repairStat(stat, n, doneKey) {
    if (!stat || stat.hp >= stat.max) return false;
    stat.hp = Math.min(stat.max, stat.hp + n);
    this.audio.sfx('place', { pitch: 1.1 });
    if (stat.hp >= stat.max) this.talk.sys(doneKey);
    if (this.strategy?.focus) this.hud.setRtsCard?.(this.strategy._card(this.strategy.focus));
    return true;
  }

  repairLodge(n = 16) {
    if (!this.lodge || this.lodge.hp >= this.lodge.max) return false;
    const wasDown = this.lodge.hp <= 0;
    this.lodge.hp = Math.min(this.lodge.max, this.lodge.hp + n);
    this.refreshLodgeBar();
    const H = LAYOUT.house;
    const x = H.door[0] + 0.5, y = GY + 2.4, z = H.z1 + 0.4;
    this.particles.burst(x, y, z, 0xd8c090, 6, 0.8);
    this.audio.sfx('place', { pos: { x, y, z }, pitch: 1.15 });
    if (this.lodge.hp >= this.lodge.max) {
      this._lodgeWarn = false;
      this.talk.sys('sys.lodgeFixed');
    } else if (wasDown) this.talk.sys('sys.lodgePatch', null, 'warn');
    return true;
  }

  decideUse() {
    if (this.targetPig) {
      return this.targetPig.penned
        ? { act: 'sellPig' }
        : { act: 'pigWild', off: true };
    }
    if (this.targetRobot) return { act: this.robot.state === 'sulk' ? 'cheer' : 'talk' };
    const tg = this.target;
    if (tg && isRipe(tg.id)) return { act: 'harvest' };
    if (this.lodge && this.lodge.hp < this.lodge.max && this.nearHouse(3.6)) return { act: 'repairHouse' };
    if (!tg) return null;
    const u = this.useFor(this.tool, tg);
    if (u) return u;
    for (const k of TOOLS) {
      if (k === this.tool) continue;
      const v = this.useFor(k, tg);
      if (v && !v.off) return { act: 'switch', tool: k, want: v.act, off: true };
    }
    if (tg.id === B.BOX) return { act: 'box' };
    if (tg.id === B.BED || tg.id === B.BED_FOOT) return { act: 'bed' };
    return null;
  }

  promptLabel(u) {
    if (u.act === 'switch') return t('prompt.switch', { item: t('item.' + u.tool), act: t('prompt.' + u.want) });
    if (u.act === 'noSeed' && u.crop) return t('prompt.noSeedCrop', { crop: t('item.' + u.crop) });
    if (u.act === 'plant' && u.crop) return t('prompt.plantCrop', { crop: t('item.' + u.crop) });
    if (u.act === 'placeTurret') return t('prompt.placeTurret', { n: BUY.turret });
    if (u.act === 'noMoney') return t('prompt.noMoney', { n: BUY.turret });
    if (u.act === 'sellPig') return t('prompt.sellPig', { n: PIG_SELL });
    if (u.act === 'pigWild') return t('prompt.pigWild');
    return t('prompt.' + u.act);
  }

  /** 持ちものを選ぶ（1〜5・ホイール・LB/RB・持ちもの欄をタップ）。 */
  selectTool(k) {
    if (!TOOLS.includes(k) || this.tool === k) return;
    if (k === 'turret' && !this.turretUnlocked()) { this.talk.sys('sys.turretLater'); return; }
    this.tool = k;
    this.player.setTool(k);
    this.audio.sfx('ui_move');
    if (this.tut) this.tut.switched = true;
  }

  decideAttack() {
    if (this.targetMob || this.targetPig) return { act: 'attack' };
    if (this.targetRobot) return { act: 'bonk' };
    const tg = this.target;
    if (!tg) return null;
    // Only ripe crops can be harvested — immature crops ignore hits
    if (isRipe(tg.id)) return { act: 'harvest' };
    if (isCrop(tg.id)) return null;
    if (BLOCKS[tg.id].plant) return { act: 'cut' };
    return null;
  }

  cellBlocked(x, y, z) {
    const inside = (p, hw, h) => x + 1 > p.x - hw && x < p.x + hw && z + 1 > p.z - hw && z < p.z + hw && y + 1 > p.y && y < p.y + h;
    if (inside(this.player.pos, 0.3, 1.8)) return true;
    if (inside(this.robot.body.pos, 0.3, 1.2)) return true;
    return this.mobs.some((m) => inside(m.pos, m.body.hw, m.body.h));
  }

  handleActions(dt) {
    const input = this.input;
    this.attackCool -= dt;
    this.useCool -= dt;
    this.eatCool -= dt;
    // 持ちかえ：1〜5、ホイール、LB / RB
    for (let i = 0; i < TOOLS.length; i++) if (input.keysPressed.has('Digit' + (i + 1)) || input.keysPressed.has('Numpad' + (i + 1))) this.selectTool(TOOLS[i]);
    // ホイールはトラックパッドだと続けて届くので、少し間をあける
    this.wheelCool = Math.max(0, (this.wheelCool || 0) - dt);
    let wheel = 0;
    if (input.wheel && this.wheelCool <= 0) { wheel = Math.sign(input.wheel); this.wheelCool = 0.14; }
    const step = (input.pressed('slotNext') ? 1 : 0) - (input.pressed('slotPrev') ? 1 : 0) + wheel;
    if (step) this.selectTool(TOOLS[(TOOLS.indexOf(this.tool) + step + TOOLS.length) % TOOLS.length]);
    const use = this.decideUse();
    const atk = this.decideAttack();
    this.useDecision = use;
    // 案内（照準の下）。持ちかえればできるときは、持ちものの番号を出す
    if (this.targetMob) this.hud.setPrompt('attack', t('prompt.attack'));
    else if (use && !use.off) this.hud.setPrompt('use', this.promptLabel(use));
    else if (atk) this.hud.setPrompt('attack', t('prompt.' + atk.act));
    else if (use?.act === 'switch') this.hud.setPrompt('slot:' + (TOOLS.indexOf(use.tool) + 1), this.promptLabel(use), true);
    else if (use) this.hud.setPrompt('use', this.promptLabel(use), true);
    else this.hud.setPrompt(null, '');
    this.touch.setLabel('use', use && !use.off ? this.promptLabel(use) : null);
    this.touch.setLabel('attack', atk && atk.act !== 'attack' && atk.act !== 'bonk' ? t('prompt.' + atk.act) : null);
    // 選択の枠
    const tg = this.target;
    if (tg) {
      const b = BLOCKS[tg.id];
      const h = isCrop(tg.id) ? cropHeight(tg.id) : b.shape === 'lantern' ? 0.5 : b.h;
      this.sel.visible = true;
      this.sel.scale.set(1.004, h + 0.004, 1.004);
      this.sel.position.set(tg.x + 0.5, tg.y + h / 2 - (isCrop(tg.id) ? 1 / 16 : 0), tg.z + 0.5);
    } else this.sel.visible = false;
    if (this.grace > 0) return;
    // 左：たたく・収穫
    if ((input.down('attack') || input.pressed('attack')) && this.attackCool <= 0) {
      this.attackCool = this.tool === 'sword' ? 0.22 : 0.36;
      this.player.swingHand();
      if (this.tool === 'sword' && atk?.act !== 'harvest' && atk?.act !== 'cut') this.firePaint();
      else this.doAttack(atk);
    }
    // 右：つかう
    if ((input.down('use') || input.pressed('use')) && this.useCool <= 0 && use) {
      const did = this.doUse(use, input.pressed('use'));
      this.useCool = did ? 0.24 : 0.12;
    }
    if (input.pressed('eat') && this.eatCool <= 0) this.eat();
  }

  doAttack(atk) {
    const pl = this.player;
    this.audio.sfx('swing');
    if (!atk) return;
    if (atk.act === 'attack' && this.targetMob) {
      const m = this.targetMob;
      const crit = pl.body.vel.y < -1 && !pl.body.onGround;
      const dmg = crit ? 2 : 1;
      const knock = (pl.sprinting ? 1.5 : 1) * (this.tool === 'sword' ? 1 : 0.6);
      this.audio.sfx('hit', { pos: m.pos, crit });
      const c = m.center;
      this.particles.burst(c.x - 0.3, c.y - 0.2, c.z - 0.3, crit ? 0xffffff : 0x5aa83e, crit ? 10 : 6, 1, 0.6);
      // Online: host owns HP — clients report hits so everyone sees the same greens.
      if (this.isNetClient() && m.netId != null) {
        netBroadcast({ t: 'hitMob', id: m.netId, dmg, knock, x: pl.pos.x, z: pl.pos.z });
        m.hurt = 0.35;
        return;
      }
      m.hit(dmg, pl.pos, knock);
      if (m.dead && !m.sea) this.onMobKilled(m, 'player');
      return;
    }
    if (atk.act === 'attack' && this.targetPig) {
      this.targetPig.hit(pl.pos);
      this.talk.say('astra.pig', { cool: 40, delay: 0.5 });
      return;
    }
    if (atk.act === 'bonk') {
      this.robot.emote.show('?', 1.2);
      this.audio.sfx('bonk', { pos: this.robot.body.pos });
      this.talk.say('astra.bonk', { random: true, cool: 6 });
      return;
    }
    const tg = this.target;
    if (!tg) return;
    if (atk.act === 'harvest') this.syncFarm(() => this.harvest(tg.x, tg.y, tg.z, 'player'));
    else if (atk.act === 'cut') {
      this.syncFarm(() => {
        const id = tg.id;
        let y = tg.y;
        // サトウキビは上の段もいっしょに
        while (this.world.get(tg.x, y + 1, tg.z) === id && id === B.CANE) y++;
        for (let yy = y; yy >= tg.y; yy--) this.world.set(tg.x, yy, tg.z, B.AIR);
        this.particles.burst(tg.x, tg.y, tg.z, BLOCKS[id].particle, 8, this.lightBright(tg.x, tg.y, tg.z), 0.8);
        this.audio.sfx('pluck', { pos: { x: tg.x + 0.5, y: tg.y + 0.3, z: tg.z + 0.5 } });
        if (id === B.CANE) this.talk.say('astra.caneBroken', { cool: 60, delay: 0.6 });
      });
    }
  }

  doUse(u, fresh) {
    const tg = this.target;
    const pl = this.player;
    switch (u.act) {
      case 'harvest': pl.swingHand(); return this.syncFarm(() => this.harvest(tg.x, tg.y, tg.z, 'player') > 0);
      case 'plant': {
        pl.swingHand();
        const crop = u.crop || this.peekNextSeed();
        if (!crop) return false;
        const ok = this.syncFarm(() => this.plant(tg.x, tg.y + 1, tg.z, 'player', crop));
        if (ok) this.advanceSeedCursor(crop);
        return ok;
      }
      case 'till': pl.swingHand(); return this.syncFarm(() => this.till(tg.x, tg.y, tg.z, 'player'));
      case 'fertilize': pl.swingHand(); return this.syncFarm(() => this.fertilize(tg.x, tg.y, tg.z));
      case 'repairHouse': pl.swingHand(); return this.repairLodge(16);
      case 'fill': pl.swingHand(); return this.syncFarm(() => this.repair(...u.at, 'player'));
      case 'placeTurret': pl.swingHand(); return this.tryPlaceTurret(u.x, u.z);
      case 'sellPig': if (fresh) { pl.swingHand(); return this.sellPig(this.targetPig); } return false;
      case 'pigWild': if (fresh) this.talk.sys('sys.pigWild'); return false;
      case 'talk': if (fresh) { this.robot.emote.show('note', 1.4); this.talk.say(this.robot.state === 'hide' ? 'astra.talkHide' : this.robot.state === 'sleep' ? 'astra.talkSleep' : 'astra.talk', { random: true, cool: 1.5 }); } return fresh;
      case 'cheer': if (fresh) this.robot.cheer(); return fresh;
      case 'box': if (fresh) { this.talk.sys('sys.box'); this.talk.say('astra.box', { cool: 20, delay: 0.4 }); } return fresh;
      case 'bed': if (fresh) this.talk.say('astra.bed', { cool: 20 }); return fresh;
      case 'noSeed': if (fresh) this.talk.sys(u.crop && u.crop !== 'potato' ? 'sys.noSeedCrop' : 'sys.noSeed', u.crop ? { crop: t('item.' + u.crop) } : undefined); return false;
      case 'holeFirst': if (fresh) this.talk.sys('sys.holeFirst'); return false;
      case 'noPowder': if (fresh) this.talk.sys('sys.noPowder'); return false;
      case 'noMoney': if (fresh) this.talk.sys('sys.noMoney'); return false;
      case 'turretMax': if (fresh) this.talk.sys('sys.turretMax'); return false;
      case 'turretBlocked': if (fresh) this.talk.sys('sys.turretBlocked'); return false;
      default: return false;
    }
  }

  eat() {
    const pl = this.player;
    if (pl.hp >= pl.maxHp) { this.talk.sys('sys.full'); this.eatCool = 0.6; return; }
    if (this.stock <= 0) { this.talk.sys('sys.noSeed'); this.eatCool = 0.6; return; }
    this.stock--;
    pl.heal(5);
    pl.show('potato', 0.7);
    pl.swingHand();
    this.eatCool = 0.9;
    this.audio.sfx('eat');
    const cam = this.camera;
    const f = new THREE.Vector3(0, -0.25, -0.6).applyQuaternion(cam.quaternion).add(cam.position);
    this.particles.burst(f.x - 0.15, f.y - 0.1, f.z - 0.15, 0xd6ad62, 6, 1, 0.3);
  }

  // ------------------------------------------------------------------ 世界の更新
  updateWorld(dt) {
    this.world.flushNav();
    this.talk.update(dt);
    if (!this.titleMode) this.growCrops(dt);
    else this.growCrops(dt * 0.5);
    this.robot.update(dt);
    for (const h of this.helpers) h.update(dt);
    for (const tr of this.turrets) tr.update(dt);
    this.pigGates?.update(dt);
    this.chargeBay?.update(dt);
    this.beachDecor?.update(dt);
    this.patrol?.update(dt);
    this.stepBombs(dt);
    this.stepPaints(dt);
    for (const m of [...this.mobs]) {
      m.update(dt);
      syncMobLabel(m, this.camera);
      if (m.dead && this.mobs.includes(m)) this.removeMob(m);
    }
    for (const p of this.pigs) p.update(dt);
    this.tickPigRespawn(dt);
    if (!this.titleMode) this.drops.update(dt);
    if (this.online) this.remotes.update(dt, (shared.uSky?.value ?? 1) * 15);
    if (this.isNetHost() && this.state === 'play') {
      this._netSyncT = (this._netSyncT || 0) + dt;
      if (this._netSyncT >= 0.12) this.pushNetSim();
    }
    this.mesher.update(this.meshBudget | 0 || 4);
  }

  /** カメラ・空・粒・表示（止まっているときも描けるように毎回）。 */
  updateView(dt) {
    const tm = this.titleMode && (this.state === 'title' || this.state === 'intro');
    if (this.strategy?.on && this.state === 'play') this.strategy.applyCamera();
    else if (tm) this.updateTitleCamera(dt);
    else this.player.updateCamera(dt, this.time);
    this.player.hand.visible = !tm && !this.strategy?.on && (this.state === 'play' || this.state === 'dead' || this.state === 'paused');
    // 揺れ
    if (this.shake > 0.001) {
      const s = this.shake * 0.22;
      this.camera.position.x += (Math.random() - 0.5) * s;
      this.camera.position.y += (Math.random() - 0.5) * s;
      this.camera.position.z += (Math.random() - 0.5) * s;
      this.shake = Math.max(0, this.shake - dt * 2.2);
    }
    this.camera.updateMatrixWorld(true);
    shared.uTime.value = this.time;
    const storm = this.arcade?.storm || 0;
    this.sky.update(this.skyTime, this.camera, dt, this.time, { storm, strategy: !!this.strategy?.on });
    // Fog closer on low/mobile presets (fewer far chunks shaded); tighter in arcade storms
    const night = 1 - shared.uSky.value;
    const far = (this.fogFar || 105) * (1 - storm * 0.42);
    if (this.strategy?.on) {
      shared.uFogNear.value = 1400;
      shared.uFogFar.value = 2200;
    } else {
      shared.uFogNear.value = lerp(far * 0.4, far * 0.22, Math.max(night, storm * 0.85));
      shared.uFogFar.value = lerp(far, far * 0.62, Math.max(night, storm * 0.9));
    }
    if (this.state !== 'paused' && this.state !== 'report' && this.state !== 'ending') {
      this.particles.update(dt);
      this.floats.update(dt);
    }
    this.flash = Math.max(0, this.flash - dt * 2.5);
    this.renderer.setFx({ flash: this.flash, flashColor: '#fff6e0', fade: this.fade, fadeColor: '#3a0808', time: this.time });
    if (this.state === 'play' || this.state === 'dead' || this.state === 'paused') this.updateHud(dt);
    this.hud.update(dt);
  }

  updateTitleCamera(dt) {
    this.titleAng += dt * 0.045;
    const a = this.titleAng;
    const cx = LAYOUT.spawn[0], cz = (LAYOUT.fieldA.z0 + LAYOUT.fieldA.z1) * 0.5, r = 18;
    this.camera.position.set(cx + Math.sin(a) * r, 17.5, cz + Math.cos(a) * r);
    this.camera.rotation.order = 'YXZ';
    this.camera.lookAt(cx, 10.2, cz);
    if (Math.abs(this.camera.fov - 60) > 0.01) { this.camera.fov = 60; this.camera.updateProjectionMatrix(); }
    this.sel.visible = false;
  }

  updateHud() {
    const hud = this.hud;
    const pl = this.player;
    hud.setHearts(pl.hp, pl.maxHp);
    hud.setInventory({
      bags: this.bags, powder: this.powder, green: this.green,
      turretsAfford: this.turretsAfford(), seedTotal: this.seedTotal, nextSeed: this.peekNextSeed(),
      turretOpen: this.turretUnlocked(),
    });
    hud.setWarehouse({
      money: this.money, bags: this.bags,
      helpers: this.helpers.length, helperCap: this.helperCap(),
      hoeLevel: this.hoeLevel(),
    });
    const danger = this.mobs.some((m) => !m.dead && m.state !== 'leave');
    const alarmOn = danger && this.state === 'play';
    if (alarmOn && !this._alarmLit) {
      this._alarmLit = true;
      if (this.tool !== 'sword') this.selectTool('sword');
      else this.player.show('sword', 0.55);
    } else if (!alarmOn) this._alarmLit = false;
    hud.setAlarm(alarmOn);
    hud.setHeld(this.tool, this.tool === 'seed' ? this.peekNextSeed() : null);
    if (this.cfg) {
      hud.setDay(this.dayIndex + 1, this.phase, clamp(this.clock / this.dayLength), this.mode === 'endless');
      hud.setGoal(this.today.harvest, this.cfg.goal);
    }
    hud.setObjective(this.objectiveText());
    const st = this.robot.status;
    hud.setRobot(st, this.robot.model.face || 'normal', this.time);
    // 画面の外の緑のアレ
    const list = [];
    const cam = this.camera;
    const inv = cam.matrixWorldInverse;
    for (const m of this.mobs) {
      if (m.dead || m.state === 'leave') continue;
      const c = m.center;
      if (c.distanceTo(cam.position) > 40) continue;
      const ndc = c.clone().project(cam);
      const v = c.clone().applyMatrix4(inv);
      if (v.z < 0 && Math.abs(ndc.x) < 0.95 && Math.abs(ndc.y) < 0.92) continue;
      let dx = v.x, dy = v.y;
      if (v.z > 0) { dx = v.x; dy = -Math.abs(v.y) - 0.01; }
      const l = Math.hypot(dx, dy) || 1;
      dx /= l; dy /= l;
      list.push({ x: 0.5 + dx * 0.44, y: 0.5 - dy * 0.4, ang: Math.atan2(dx, dy), fuse: m.state === 'fuse', big: m.big });
    }
    hud.setArrows(settings.mobGuide === 'off' ? [] : list);
  }

  render(dt) { this.renderer.render(dt); }

  updateBestLabel() {
    const el = document.querySelector('#title .best');
    if (!el) return;
    const lines = [];
    if (this.save.data.best) lines.push(t('title.best', { n: this.save.data.best }));
    const eb = this.save.data.endlessBest;
    if (eb?.day) lines.push(t('title.bestEndless', { d: eb.day, n: eb.harvest }));
    el.textContent = lines.join('　');
  }

  setSplash() {
    const el = document.querySelector('#title .splash');
    if (!el) return;
    let n = 0;
    while (t('splash.' + n) !== 'splash.' + n) n++;
    const k = 'splash.' + Math.floor(Math.random() * Math.max(1, n));
    el.dataset.i18n = k;
    el.textContent = t(k);
  }

  /** window.__dev.state() に出す値。 */
  snapshot() {
    const p = this.player.pos, r = this.robot.body.pos;
    const f = (v) => +v.toFixed(2);
    return {
      state: this.state, mode: this.mode, day: this.dayIndex + 1, phase: this.phase, clock: f(this.clock),
      hp: this.player.hp, stock: this.stock, powder: this.powder, green: this.green,
      today: { ...this.today }, goal: this.cfg?.goal, totals: { ...this.totals }, tut: this.tut ? this.tut.step : null,
      crops: this.crops.size, mature: [...this.crops.keys()].filter((i) => this.world.data[i] === B.POTATO3).length,
      mobs: this.mobs.map((m) => ({ s: m.state, big: m.big, hp: m.hp, p: [f(m.pos.x), f(m.pos.y), f(m.pos.z)] })),
      robot: { s: this.robot.state, task: this.robot.task?.type || null, p: [f(r.x), f(r.y), f(r.z)] },
      player: [f(p.x), f(p.y), f(p.z)], yaw: f(this.player.yaw), pitch: f(this.player.pitch),
      target: this.target ? { id: this.target.id, at: [this.target.x, this.target.y, this.target.z] } : this.targetMob ? 'mob' : this.targetRobot ? 'robot' : null,
      use: this.useDecision?.act || null,
    };
  }

  // ---- 確認用（__dev.extra.game から）
  debugSkip(sec) { if (this.cfg) this.clock += sec; }
  debugLook(x, y, z) {
    const e = this.player.pos.clone(); e.y += this.player.eye;
    const d = new THREE.Vector3(x, y, z).sub(e);
    this.player.yaw = Math.atan2(-d.x, -d.z);
    this.player.pitch = Math.atan2(d.y, Math.hypot(d.x, d.z));
  }
}

/** 光線と箱の交わり（入る距離。当たらなければ null）。 */
function rayBox(o, d, x0, y0, z0, x1, y1, z1) {
  let tmin = 0, tmax = Infinity;
  for (const [oo, dd, a, b] of [[o.x, d.x, x0, x1], [o.y, d.y, y0, y1], [o.z, d.z, z0, z1]]) {
    if (Math.abs(dd) < 1e-9) { if (oo < a || oo > b) return null; continue; }
    let t1 = (a - oo) / dd, t2 = (b - oo) / dd;
    if (t1 > t2) [t1, t2] = [t2, t1];
    tmin = Math.max(tmin, t1); tmax = Math.min(tmax, t2);
    if (tmin > tmax) return null;
  }
  return tmin;
}
