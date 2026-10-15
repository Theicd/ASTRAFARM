// Name + job above each monster, readable up close and from the strategy camera.
import * as THREE from 'three';
import { t } from '../core/i18n.js';

const FONT = '"Segoe UI", "Arial Hebrew", "David", "Noto Sans Hebrew", sans-serif';
const SPECS = {
  boom: ['mob.name.boom', 'mob.job.boom', '#d6ff9a'],
  alien: ['mob.name.alien', 'mob.job.alien', '#9af0c8'],
  golem: ['mob.name.golem', 'mob.job.golem', '#ffb067'],
  thief: ['mob.name.thief', 'mob.job.thief', '#d7b0ff'],
  chomp: ['mob.name.chomp', 'mob.job.chomp', '#ff9a8a'],
  hop: ['mob.name.hop', 'mob.job.hop', '#b8ff6a'],
  sea: ['mob.name.sea', 'mob.job.sea', '#8ad8ff'],
  leviathan: ['mob.name.leviathan', 'mob.job.leviathan', '#d0e8ff'],
  dino: ['mob.name.dino', 'mob.job.dino', '#e2d27a'],
  dragon: ['mob.name.dragon', 'mob.job.dragon', '#ff7a6a'],
  fish: ['mob.name.fish', 'mob.job.fish', '#9ad4ff'],
  demon: ['mob.name.demon', 'mob.job.demon', '#8aa6ff'],
  bunny: ['mob.name.bunny', 'mob.job.bunny', '#ffd0ea'],
};

const cache = new Map();
const _box = new THREE.Box3();
const _wp = new THREE.Vector3();

function plate(name, job, color) {
  const key = name + '\n' + job + '|' + color;
  if (cache.has(key)) return cache.get(key);
  const probe = document.createElement('canvas').getContext('2d');
  probe.font = `bold 44px ${FONT}`;
  const nw = probe.measureText(name).width;
  probe.font = `28px ${FONT}`;
  const jw = probe.measureText(job).width;
  const w = Math.max(160, Math.ceil(Math.max(nw, jw) + 40));
  const h = 92;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d');
  g.fillStyle = 'rgba(8, 12, 18, 0.82)';
  g.fillRect(0, 0, w, h);
  g.fillStyle = color;
  g.fillRect(0, 0, w, 5);
  g.font = `bold 44px ${FONT}`;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.lineWidth = 6;
  g.strokeStyle = 'rgba(0,0,0,0.85)';
  g.strokeText(name, w / 2, 34);
  g.fillStyle = color;
  g.fillText(name, w / 2, 34);
  g.font = `28px ${FONT}`;
  g.strokeStyle = 'rgba(0,0,0,0.8)';
  g.strokeText(job, w / 2, 70);
  g.fillStyle = '#f4f7fb';
  g.fillText(job, w / 2, 70);
  const map = new THREE.CanvasTexture(c);
  map.colorSpace = THREE.SRGBColorSpace;
  map.magFilter = THREE.LinearFilter;
  map.minFilter = THREE.LinearFilter;
  map.generateMipmaps = false;
  const tex = { map, aspect: w / h };
  cache.set(key, tex);
  return tex;
}

function headHeight(root) {
  root.updateMatrixWorld(true);
  _box.makeEmpty();
  root.traverse((o) => {
    if (!o.isMesh || o.name === 'mob-label') return;
    _box.expandByObject(o);
  });
  if (_box.isEmpty()) return 0;
  const h = _box.max.y - root.position.y;
  return Number.isFinite(h) && h > 0.45 && h < 14 ? h + 0.2 : 0;
}

function fit(sprite, camera) {
  sprite.getWorldPosition(_wp);
  const dist = Math.max(4, camera.position.distanceTo(_wp));
  const h = Math.min(6.4, Math.max(0.9, dist * 0.042));
  sprite.scale.set(h * (sprite.userData.aspect || 4), h, 1);
}

function barSprite(color) {
  const s = new THREE.Sprite(new THREE.SpriteMaterial({
    color, transparent: true, depthTest: false, depthWrite: false, toneMapped: false,
  }));
  s.center.set(0.5, 1);
  s.renderOrder = 39;
  return s;
}

function ensureHpBar(mob) {
  if (mob._hpBar || !(mob.maxHp > 0)) return mob._hpBar;
  const border = barSprite(0xf4f7f2);
  const bg = barSprite(0x241814);
  const fill = barSprite(0x3dff6a);
  bg.renderOrder = 40;
  fill.renderOrder = 41;
  mob.root.add(border, bg, fill);
  mob._hpBar = { border, bg, fill };
  return mob._hpBar;
}

function syncHpBar(mob, label) {
  const bar = ensureHpBar(mob);
  if (!bar) return;
  const show = label.visible && mob.hp > 0;
  bar.border.visible = show;
  bar.bg.visible = show;
  bar.fill.visible = show;
  if (!show) return;
  const ratio = Math.max(0, Math.min(1, mob.hp / mob.maxHp));
  const bw = Math.max(0.9, label.scale.x * 0.82);
  const bh = Math.max(0.11, label.scale.y * 0.2);
  const y = label.position.y;
  const inset = bh * 0.22;
  bar.border.position.set(0, y, 0);
  bar.border.scale.set(bw, bh, 1);
  bar.bg.position.set(0, y - inset * 0.5, 0);
  bar.bg.scale.set(bw - inset, bh - inset, 1);
  const fw = Math.max(0.04, (bw - inset * 2) * ratio);
  bar.fill.position.set(-bw / 2 + inset + fw / 2, y - inset * 0.5, 0);
  bar.fill.scale.set(fw, bh - inset * 1.15, 1);
  bar.fill.material.color.setHex(ratio > 0.55 ? 0x3dff6a : ratio > 0.28 ? 0xffcc33 : 0xff3b3b);
}

function ensure(holder, root, key) {
  if (!holder._labelY) {
    const y = headHeight(root);
    if (y) holder._labelY = y;
  }
  if (holder._label) {
    if (holder._labelY) holder._label.position.y = holder._labelY;
    return holder._label;
  }
  const spec = SPECS[key] || SPECS.boom;
  const tex = plate(t(spec[0]), t(spec[1]), spec[2]);
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: tex.map,
    transparent: true,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
  }));
  sprite.name = 'mob-label';
  sprite.center.set(0.5, 0);
  sprite.renderOrder = 40;
  sprite.userData.aspect = tex.aspect;
  sprite.position.y = holder._labelY || 2.2;
  root.add(sprite);
  holder._label = sprite;
  return sprite;
}

export function syncMobLabel(mob, camera) {
  if (!mob?.root || !camera) return;
  const key = mob.kind === 'boom' && mob.big ? 'alien' : (mob.kind || 'boom');
  const sprite = ensure(mob, mob.root, key);
  sprite.visible = !mob.dead && mob.state !== 'leave';
  if (sprite.visible) fit(sprite, camera);
  syncHpBar(mob, sprite);
}

export function syncDecorLabel(holder, root, key, camera) {
  if (!root || !camera) return;
  const sprite = ensure(holder, root, key);
  sprite.visible = true;
  fit(sprite, camera);
}
