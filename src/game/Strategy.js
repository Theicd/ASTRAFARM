// Top-down command view: click a building for its name and health,
// select the farmer or robots, right-click to send them.
import * as THREE from 'three';
import { t } from '../core/i18n.js';
import { LAYOUT, GY, inRect } from './world/World.js';
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
    this.selected = [];
    this.focus = null;
    this._down = null;
    this._drag = false;
    this.rings = new THREE.Group();
    this.rings.name = 'rtsRings';
    game.scene.add(this.rings);
    this._ray = new THREE.Raycaster();
    this._hit = new THREE.Vector3();
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
    cam.position.set(this.cx, GY + 1 + h * 0.78, this.cz + h * 0.52);
    cam.up.set(0, 1, 0);
    cam.lookAt(this.cx, GY + 1, this.cz);
    if (Math.abs(cam.fov - 46) > 0.2) {
      cam.fov = 46;
      cam.updateProjectionMatrix();
    }
  }

  update(dt) {
    const g = this.game;
    const m = g.input.move;
    const pan = this.height * 0.62;
    this.cx = Math.max(6, Math.min(90, this.cx + m.x * pan * dt));
    this.cz = Math.max(6, Math.min(90, this.cz - m.y * pan * dt));
    if (g.input.wheel) this.height = Math.max(14, Math.min(48, this.height - Math.sign(g.input.wheel) * 3));
    this._placeRings();
    if (this.focus) g.hud.setRtsCard?.(this._card(this.focus));
  }

  _pointerDown(e) {
    if (!this.on || e.button > 2) return;
    if (e.target?.closest?.('#rts-toggle, .rts-card, .slot, button')) return;
    this._down = { x: e.clientX, y: e.clientY, button: e.button, shift: e.shiftKey };
    this._drag = false;
  }

  _pointerMove(e) {
    if (!this.on || !this._down) return;
    const dx = e.clientX - this._down.x, dy = e.clientY - this._down.y;
    if (dx * dx + dy * dy > 36) this._drag = true;
    if (this._drag && this._down.button === 0) {
      const s = this.height * 0.012;
      this.cx -= dx * s * 0.15;
      this.cz += dy * s * 0.15;
      this._down.x = e.clientX;
      this._down.y = e.clientY;
    }
  }

  _pointerUp(e) {
    if (!this.on || !this._down || e.button !== this._down.button) return;
    const click = !this._drag;
    const down = this._down;
    this._down = null;
    if (!click) return;
    const p = this._ground(down.x, down.y);
    if (!p) return;
    if (down.button === 2) this._command(p.x, p.z);
    else this._select(p.x, p.z, down.shift);
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
    for (const u of this.selected) {
      if (u.kind === 'robot') u.ref.assignOrder?.(order);
      else {
        const spot = order.type === 'move'
          ? { x: x, z }
          : { x: order.x + 0.5, z: order.z + 0.5 };
        u.ref.order = { ...spot, near: order.type === 'move' ? 0.7 : 1.3, job: order.type === 'move' ? null : order };
      }
    }
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
