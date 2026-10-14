// Top-down command view: click a building for its name and health,
// select the farmer or robots, right-click to send them.
import * as THREE from 'three';
import { t } from '../core/i18n.js';
import { LAYOUT, GY, inRect } from './world/World.js';
import { findPath } from './nav.js';
import { B, isCrop, isFarm } from './world/blocks.js';
import { isRipe } from './crops.js';

const GROUND = new THREE.Plane(new THREE.Vector3(0, 1, 0), -(GY + 1));

export class StrategyMode {
  constructor(game) {
    this.game = game;
    this.on = false;
    this.cx = LAYOUT.spawn[0];
    this.cz = LAYOUT.spawn[2];
    this.height = 28;
    this.yaw = 0;
    this.selected = [];
    this.focus = null;
    this._down = null;
    this._drag = false;
    this.rings = new THREE.Group();
    this.rings.name = 'rtsRings';
    game.scene.add(this.rings);
    this._ray = new THREE.Raycaster();
    this._hit = new THREE.Vector3();
    this._proj = new THREE.Vector3();
    this.marquee = document.createElement('div');
    this.marquee.id = 'rts-marquee';
    this.marquee.className = 'hidden';
    document.body.appendChild(this.marquee);
    this._buildOverlays();
    const dom = game.renderer.domElement;
    dom.addEventListener('contextmenu', (e) => { if (this.on) e.preventDefault(); });
    dom.addEventListener('pointerdown', (e) => this._pointerDown(e));
    window.addEventListener('pointermove', (e) => this._pointerMove(e));
    window.addEventListener('pointerup', (e) => this._pointerUp(e));
  }

  toggle() {
    const g = this.game;
    if (g.state !== 'play') return;
    this.on = !this.on;
    g.input.mouseNeedsLock = !this.on;
    g.hud.setStrategy?.(this.on);
    if (this.on) {
      g.input.unlockPointer();
      this.cx = g.player.pos.x;
      this.cz = g.player.pos.z;
      g.hud.el.classList.add('strategy');
    } else {
      g.hud.el.classList.remove('strategy');
      this.marquee.classList.add('hidden');
      for (const b of Object.values(this.bars)) b.g.visible = false;
      this.selected = [];
      this.focus = null;
      g.player.order = null;
      g.camera.fov = 72;
      g.camera.updateProjectionMatrix();
      g.hud.setRtsCard?.(null);
      this._syncRings();
    }
  }

  applyCamera() {
    const cam = this.game.camera;
    const h = this.height;
    const horiz = h * 0.62;
    cam.position.set(
      this.cx + Math.sin(this.yaw) * horiz,
      GY + 1 + h * 0.78,
      this.cz + Math.cos(this.yaw) * horiz,
    );
    cam.up.set(0, 1, 0);
    cam.lookAt(this.cx, GY + 1, this.cz);
    if (Math.abs(cam.fov - 46) > 0.2) {
      cam.fov = 46;
      cam.updateProjectionMatrix();
    }
  }

  update(dt) {
    const g = this.game;
    this._edgeScroll(dt);
    const m = g.input.move;
    const pan = this.height * 0.62;
    const fx = -Math.sin(this.yaw), fz = -Math.cos(this.yaw);
    const rx = Math.cos(this.yaw), rz = -Math.sin(this.yaw);
    this.cx += (m.x * rx + m.y * fx) * pan * dt;
    this.cz += (m.x * rz + m.y * fz) * pan * dt;
    this._clampView();
    // Wheel back (positive delta) moves the camera farther away.
    if (g.input.wheel) this.height = Math.max(14, Math.min(52, this.height + Math.sign(g.input.wheel) * 4));
    this._placeRings();
    this._updateOverlays();
    if (this.focus) g.hud.setRtsCard?.(this._card(this.focus));
    if (g._lodgeBar) g._lodgeBar.visible = false;
  }

  _pointerDown(e) {
    if (!this.on || e.button > 2) return;
    if (e.target?.closest?.('#rts-toggle, .rts-card, .slot, button')) return;
    this._down = { x: e.clientX, y: e.clientY, ax: e.clientX, ay: e.clientY, button: e.button, shift: e.shiftKey };
    this._cur = { x: e.clientX, y: e.clientY };
    this._drag = false;
  }

  _pointerMove(e) {
    if (this.on) this._cur = { x: e.clientX, y: e.clientY };
    if (!this.on || !this._down) return;
    const dx = e.clientX - this._down.x, dy = e.clientY - this._down.y;
    if (dx * dx + dy * dy > 16) this._drag = true;
    if (!this._drag) return;
    if (this._down.button === 0) this._showMarquee();
    else if (this._down.button === 2) this.yaw -= dx * 0.008;
    else if (this._down.button === 1) this._pan(dx, dy);
    this._down.x = e.clientX;
    this._down.y = e.clientY;
  }

  /** Mouse drag matches the arrow keys: up moves the view forward, right moves it right. */
  _pan(dx, dy) {
    const fx = -Math.sin(this.yaw), fz = -Math.cos(this.yaw);
    const rx = Math.cos(this.yaw), rz = -Math.sin(this.yaw);
    const s = this.height * 0.0024;
    const mx = dx;
    const my = -dy;
    this.cx += (mx * rx + my * fx) * s;
    this.cz += (mx * rz + my * fz) * s;
    this._clampView();
  }

  _clampView() {
    this.cx = Math.max(-80, Math.min(176, this.cx));
    this.cz = Math.max(2, Math.min(420, this.cz));
  }

  /** Mouse at the screen edge scrolls the map the same way as the arrow keys. Corners scroll diagonally. */
  _edgeScroll(dt) {
    if (!this._cur) return;
    const dom = this.game.renderer.domElement;
    const r = dom.getBoundingClientRect();
    const margin = 36;
    const lx = this._cur.x - r.left;
    const ly = this._cur.y - r.top;
    if (lx < 0 || ly < 0 || lx > r.width || ly > r.height) return;
    let mx = 0, my = 0;
    if (lx < margin) mx = -((margin - lx) / margin);
    else if (lx > r.width - margin) mx = (lx - (r.width - margin)) / margin;
    if (ly < margin) my = (margin - ly) / margin;
    else if (ly > r.height - margin) my = -((ly - (r.height - margin)) / margin);
    if (!mx && !my) return;
    const el = document.elementFromPoint(this._cur.x, this._cur.y);
    if (el?.closest?.('button, .rts-card, .warehouse, .bottom, .hotbar')) return;
    const pan = this.height * 0.9;
    const fx = -Math.sin(this.yaw), fz = -Math.cos(this.yaw);
    const rx = Math.cos(this.yaw), rz = -Math.sin(this.yaw);
    this.cx += (mx * rx + my * fx) * pan * dt;
    this.cz += (mx * rz + my * fz) * pan * dt;
    this._clampView();
  }

  _showMarquee() {
    const x0 = Math.min(this._down.ax, this._cur.x);
    const y0 = Math.min(this._down.ay, this._cur.y);
    const x1 = Math.max(this._down.ax, this._cur.x);
    const y1 = Math.max(this._down.ay, this._cur.y);
    this.marquee.classList.remove('hidden');
    this.marquee.style.left = x0 + 'px';
    this.marquee.style.top = y0 + 'px';
    this.marquee.style.width = (x1 - x0) + 'px';
    this.marquee.style.height = (y1 - y0) + 'px';
  }

  _pointerUp(e) {
    if (!this.on || !this._down || e.button !== this._down.button) return;
    const click = !this._drag;
    const down = this._down;
    const cur = this._cur;
    this._down = null;
    this.marquee.classList.add('hidden');
    if (!click && down.button === 0 && cur) {
      this._boxSelect(down, cur);
      return;
    }
    if (!click) return;
    const p = this._ground(down.x, down.y);
    if (!p) return;
    if (down.button === 2) this._command(p.x, p.z);
    else this._select(p.x, p.z, down.shift);
  }

  _boxSelect(down, cur) {
    const x0 = Math.min(down.ax, cur.x), y0 = Math.min(down.ay, cur.y);
    const x1 = Math.max(down.ax, cur.x), y1 = Math.max(down.ay, cur.y);
    const hit = this._allUnits().filter((u) => {
      const p = u.kind === 'player' ? u.ref.pos : u.ref.body.pos;
      const s = this._project(p.x, p.y + 1, p.z);
      return s && s.x >= x0 && s.x <= x1 && s.y >= y0 && s.y <= y1;
    });
    if (!down.shift) this.selected = hit;
    else for (const u of hit) if (!this.selected.some((s) => s.ref === u.ref)) this.selected.push(u);
    this.focus = null;
    this.game.hud.setRtsCard?.(hit.length ? this._cardUnits() : null);
    this._syncRings();
  }

  _allUnits() {
    const g = this.game;
    const list = [];
    if (g.player.alive) list.push({ kind: 'player', ref: g.player });
    const crew = [g.robot, ...g.helpers];
    for (const r of crew) if (r && r.root?.visible !== false && r.state !== 'kidnapped') list.push({ kind: 'robot', ref: r });
    return list;
  }

  _project(x, y, z) {
    const dom = this.game.renderer.domElement;
    const r = dom.getBoundingClientRect();
    this._proj.set(x, y, z).project(this.game.camera);
    if (this._proj.z > 1) return null;
    return {
      x: r.left + (this._proj.x * 0.5 + 0.5) * r.width,
      y: r.top + (-this._proj.y * 0.5 + 0.5) * r.height,
    };
  }

  _footprint(kind) {
    if (kind === 'lodge') {
      const H = LAYOUT.house;
      return { x0: H.x0, z0: H.z0, x1: H.x1 + 1, z1: H.z1 + 1, y: GY + 7.2 };
    }
    if (kind === 'pen') {
      const P = LAYOUT.pigPen;
      return { x0: P.x0, z0: P.z0, x1: P.x1 + 1, z1: P.z1 + 1, y: GY + 3.4 };
    }
    const [px, pz] = LAYOUT.pond;
    return { x0: px - 3.4, z0: pz - 3.4, x1: px + 3.4, z1: pz + 3.4, y: GY + 2.8 };
  }

  _buildOverlays() {
    this.bars = {};
    for (const [kind, width] of [['lodge', 5.2], ['pen', 3.6], ['pond', 2.8]]) {
      const g = new THREE.Group();
      const bg = new THREE.Mesh(new THREE.PlaneGeometry(width, 0.72), new THREE.MeshBasicMaterial({ color: 0x141414, depthTest: false }));
      const fill = new THREE.Mesh(new THREE.PlaneGeometry(width - 0.22, 0.4), new THREE.MeshBasicMaterial({ color: 0x3ddc6a, depthTest: false }));
      fill.position.z = 0.03;
      bg.renderOrder = 6;
      fill.renderOrder = 7;
      g.add(bg, fill);
      g.visible = false;
      this.game.scene.add(g);
      this.bars[kind] = { g, fill, width: width - 0.2 };
    }
  }

  _updateOverlays() {
    const show = this.on;
    for (const kind of ['lodge', 'pen', 'pond']) {
      const fp = this._footprint(kind);
      const bar = this.bars[kind];
      const selected = show && this.focus === kind;
      bar.g.visible = selected;
      const cx = (fp.x0 + fp.x1) * 0.5;
      const cz = (fp.z0 + fp.z1) * 0.5;
      bar.g.position.set(cx, fp.y + 2.4, cz);
      const cam = this.game.camera.position;
      bar.g.rotation.set(0, Math.atan2(cam.x - cx, cam.z - cz), 0);
      const stat = this._stats(kind);
      const k = Math.max(0, Math.min(1, (stat?.hp ?? 0) / (stat?.max || 1)));
      bar.fill.scale.x = Math.max(0.04, k);
      bar.fill.position.x = (k - 1) * bar.width * 0.5;
      bar.fill.material.color.setHex(k > 0.55 ? 0x3ddc6a : k > 0.28 ? 0xf0c040 : 0xe23b3b);
    }
  }

  _ground(clientX, clientY) {
    const dom = this.game.renderer.domElement;
    const r = dom.getBoundingClientRect();
    const ndc = new THREE.Vector2(
      ((clientX - r.left) / r.width) * 2 - 1,
      -((clientY - r.top) / r.height) * 2 + 1,
    );
    this._ray.setFromCamera(ndc, this.game.camera);
    if (!this._ray.ray.intersectPlane(GROUND, this._hit)) return null;
    return this._hit;
  }

  _select(x, z, shift) {
    const g = this.game;
    const unit = this._unitAt(x, z);
    const structure = this._structureAt(x, z);
    if (unit) {
      this.focus = null;
      if (!shift) this.selected = [unit];
      else if (!this.selected.some((s) => s.ref === unit.ref)) this.selected.push(unit);
      g.hud.setRtsCard?.(this._cardUnits());
      this._syncRings();
      return;
    }
    if (structure) {
      this.selected = [];
      this.focus = structure;
      g.hud.setRtsCard?.(this._card(structure));
      this._syncRings();
      return;
    }
    if (!shift) {
      this.selected = [];
      this.focus = null;
      g.hud.setRtsCard?.(null);
      this._syncRings();
    }
  }

  _command(x, z) {
    if (!this.selected.length) return;
    const structure = this._structureAt(x, z);
    const farm = this._farmOrder(Math.floor(x), Math.floor(z));
    let order;
    if (structure && !this.game.structureFull(structure)) {
      order = { type: 'mend', what: structure, x: this._door(structure).x, z: this._door(structure).z, y: GY + 1 };
    } else if (farm) order = farm;
    else order = { type: 'move', x: Math.floor(x), z: Math.floor(z), y: GY + 1 };
    const n = this.selected.length;
    this.selected.forEach((u, i) => {
      const ang = n > 1 ? (i / n) * Math.PI * 2 : 0;
      const spread = n > 1 ? 0.9 : 0;
      const ox = Math.cos(ang) * spread, oz = Math.sin(ang) * spread;
      const gx = (order.type === 'move' ? x : order.x + 0.5) + ox;
      const gz = (order.type === 'move' ? z : order.z + 0.5) + oz;
      if (u.kind === 'robot') {
        u.ref.assignOrder?.({ ...order, x: Math.floor(gx), z: Math.floor(gz) });
        return;
      }
      const path = findPath(this.game.world, u.ref.pos.x, u.ref.pos.z, gx, gz, { near: 0.4, maxNodes: 2500 });
      u.ref.order = {
        x: gx, z: gz, path: path.path, pathI: 0,
        near: order.type === 'move' ? 0.75 : 1.35,
        job: order.type === 'move' ? null : order,
      };
    });
  }

  finishPlayerJob(job) {
    const g = this.game;
    if (job.type === 'harvest') g.syncFarm?.(() => g.harvest(job.x, job.y, job.z, 'player'));
    else if (job.type === 'plant') g.syncFarm?.(() => g.plant(job.x, job.y, job.z, 'player', job.crop || g.peekNextSeed?.()));
    else if (job.type === 'till') g.syncFarm?.(() => g.till(job.x, job.y, job.z, 'player'));
    else if (job.type === 'repair') g.syncFarm?.(() => g.repair(job.x, job.y, job.z, 'player'));
    else if (job.type === 'mend') {
      if (job.what === 'lodge') g.repairLodge(22);
      else if (job.what === 'pen') g.repairPen(18);
      else if (job.what === 'pond') g.repairPond(16);
    }
  }

  _unitAt(x, z) {
    const g = this.game;
    let best = null, bd = 1.5;
    const test = (kind, ref, px, pz) => {
      const d = Math.hypot(px - x, pz - z);
      if (d < bd) { bd = d; best = { kind, ref }; }
    };
    if (g.player.alive) test('player', g.player, g.player.pos.x, g.player.pos.z);
    test('robot', g.robot, g.robot.body.pos.x, g.robot.body.pos.z);
    for (const h of g.helpers) if (!h.dead && h.root?.visible !== false) test('robot', h, h.body.pos.x, h.body.pos.z);
    return best;
  }

  _structureAt(x, z) {
    const H = LAYOUT.house;
    if (inRect(Math.floor(x), Math.floor(z), H, 1)) return 'lodge';
    const P = LAYOUT.pigPen;
    if (inRect(Math.floor(x), Math.floor(z), P, 1)) return 'pen';
    const [px, pz] = LAYOUT.pond;
    if (Math.hypot(x - px, z - pz) < 4.4) return 'pond';
    return null;
  }

  _door(kind) {
    if (kind === 'lodge') {
      const H = LAYOUT.house;
      return { x: H.door[0], z: H.z1 + 1 };
    }
    if (kind === 'pen') {
      const P = LAYOUT.pigPen;
      return { x: P.gateX - 1, z: (P.gateZ0 + P.gateZ1) * 0.5 };
    }
    const [px, pz] = LAYOUT.pond;
    return { x: Math.floor(px), z: Math.floor(pz + 3) };
  }

  _farmOrder(x, z) {
    const g = this.game, w = g.world;
    if (!w.inside(x, GY, z)) return null;
    const below = w.get(x, GY, z);
    const at = w.get(x, GY + 1, z);
    if (g.isHole(x, GY, z)) return { type: 'repair', x, y: GY, z };
    if (g.isHole(x, GY + 1, z)) return { type: 'repair', x, y: GY + 1, z };
    if (isRipe(at)) return { type: 'harvest', x, y: GY + 1, z };
    if (isFarm(below) && at === B.AIR) return { type: 'plant', x, y: GY + 1, z, crop: g.peekNextSeed?.() };
    if ((below === B.GRASS || below === B.DIRT) && (at === B.AIR || (isCrop(at) === false && at !== B.AIR))) {
      if (inRect(x, z, LAYOUT.farmZone, 1) && at === B.AIR) return { type: 'till', x, y: GY, z };
    }
    return null;
  }

  _stats(kind) {
    const g = this.game;
    if (kind === 'lodge') return g.lodge;
    if (kind === 'pen') return g.penHp;
    return g.pondHp;
  }

  _card(kind) {
    const s = this._stats(kind);
    return {
      name: t('rts.' + kind),
      hp: s?.hp ?? 0,
      max: s?.max ?? 1,
    };
  }

  _cardUnits() {
    const n = this.selected.length;
    const robots = this.selected.filter((s) => s.kind === 'robot').length;
    const player = n - robots;
    const name = player && robots ? t('rts.both', { n }) : player ? t('rts.player') : t('rts.robots', { n: robots });
    return { name, hp: null, hint: t('rts.orderHint') };
  }

  _syncRings() {
    while (this.rings.children.length) this.rings.remove(this.rings.children[0]);
    const geo = new THREE.RingGeometry(0.45, 0.62, 20);
    const mat = new THREE.MeshBasicMaterial({ color: 0x7dff6a, side: THREE.DoubleSide, depthTest: false });
    for (const u of this.selected) {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.renderOrder = 4;
      this.rings.add(mesh);
    }
    this._placeRings();
  }

  _placeRings() {
    this.selected.forEach((u, i) => {
      const mesh = this.rings.children[i];
      if (!mesh) return;
      const p = u.kind === 'player' ? u.ref.pos : u.ref.body.pos;
      mesh.position.set(p.x, p.y + 0.08, p.z);
    });
  }
}
