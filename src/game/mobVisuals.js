// Quaternius Ultimate Monsters (CC0) — rigged bodies with Walk/Run/Idle.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';

const FILES = {
  Ninja: './assets/mobs/Ninja.gltf',
  Orc: './assets/mobs/Orc.gltf',
  Dino: './assets/mobs/Dino.gltf',
  Fish: './assets/mobs/Fish.gltf',
  Yeti: './assets/mobs/Yeti.gltf',
  Bunny: './assets/mobs/Bunny.gltf',
  Birb: './assets/mobs/Birb.gltf',
  BlueDemon: './assets/mobs/BlueDemon.gltf',
  Cactoro: './assets/mobs/Cactoro.gltf',
  Frog: './assets/mobs/Frog.gltf',
  Alien: './assets/mobs/Alien.gltf',
  MushroomKing: './assets/mobs/MushroomKing.gltf',
};

const cache = {};
let ready = false;

function pickClip(clips, re) {
  return clips.find((c) => re.test(c.name)) || null;
}

const _paint = new Map();

function paintOf(color) {
  const key = color.getHexString();
  if (_paint.has(key)) return _paint.get(key);
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  g.fillStyle = '#' + key;
  g.fillRect(0, 0, 64, 64);
  for (let i = 0; i < 220; i++) {
    const x = (i * 13) % 64;
    const y = (i * 29) % 64;
    g.fillStyle = i % 3 === 0 ? 'rgba(255,255,255,0.16)' : 'rgba(0,0,0,0.2)';
    g.fillRect(x, y, i % 5 === 0 ? 3 : 2, 2);
  }
  g.fillStyle = 'rgba(0,0,0,0.1)';
  for (let y = 4; y < 64; y += 9) g.fillRect(0, y, 64, 2);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  tex.needsUpdate = true;
  _paint.set(key, tex);
  return tex;
}

/** Quaternius stores lit PBR albedos with no image. Lift them and paint grain so they read. */
function hidePaint(base, spots, stripe) {
  const key = base + '|' + spots;
  if (_paint.has(key)) return _paint.get(key);
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  g.fillStyle = base;
  g.fillRect(0, 0, 64, 64);
  g.fillStyle = spots;
  for (let i = 0; i < 18; i++) {
    const x = (i * 17) % 58;
    const y = (i * 23) % 56;
    g.beginPath();
    g.ellipse(x + 4, y + 4, 4 + (i % 3), 3, 0.4, 0, Math.PI * 2);
    g.fill();
  }
  if (stripe) {
    g.fillStyle = stripe;
    g.fillRect(0, 26, 64, 8);
    g.fillRect(0, 46, 64, 4);
  }
  g.strokeStyle = 'rgba(0,0,0,0.25)';
  for (let y = 6; y < 64; y += 8) g.strokeRect(0.5, y, 63, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.needsUpdate = true;
  _paint.set(key, tex);
  return tex;
}

function featherPaint(base, vane, shaft) {
  const key = 'feather|' + base + vane + shaft;
  if (_paint.has(key)) return _paint.get(key);
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  g.fillStyle = base;
  g.fillRect(0, 0, 128, 128);
  for (let row = 0; row < 8; row++) {
    const y = row * 16;
    g.fillStyle = row % 2 ? vane : shaft;
    for (let x = (row % 2) * 12; x < 128; x += 24) {
      g.beginPath();
      g.moveTo(x, y + 15);
      g.quadraticCurveTo(x + 12, y + 1, x + 24, y + 15);
      g.lineTo(x + 12, y + 16);
      g.closePath();
      g.fill();
    }
  }
  g.strokeStyle = 'rgba(40,28,16,0.35)';
  g.lineWidth = 1;
  for (let x = 12; x < 128; x += 24) {
    g.beginPath();
    g.moveTo(x, 0);
    g.lineTo(x, 128);
    g.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.needsUpdate = true;
  _paint.set(key, tex);
  return tex;
}

function namedPaint(modelKey, name) {
  if (modelKey === 'Birb') {
    if (name === 'birb_main') return featherPaint('#f4efe4', '#d7b48a', '#8d6848');
    if (name === 'birb_secondary') return featherPaint('#e7d7c2', '#7f93ad', '#3e5168');
    if (name === 'birb_beak') return hidePaint('#f0a030', '#c86818', '#ffe0a0');
    if (name === 'eye_white') return hidePaint('#f7f4ee', '#e4ddd0', null);
    if (name === 'eye_black') return hidePaint('#1a140e', '#000000', null);
    return null;
  }
  if (modelKey !== 'BlueDemon') return null;
  if (name === 'bluedemon_main') return hidePaint('#2a6fd6', '#143e86', '#8fd0ff');
  if (name === 'bluedemon_secondary') return hidePaint('#f0b24a', '#c47a22', '#ffe08a');
  if (name === 'wood') return hidePaint('#8a5a32', '#5c3a1e', '#c49262');
  if (name === 'straps') return hidePaint('#3a342c', '#1c1814', '#6a604e');
  return null;
}

function basicMats(root, modelKey) {
  root.traverse((o) => {
    if (!o.isMesh) return;
    const srcs = Array.isArray(o.material) ? o.material : [o.material];
    const next = srcs.map((src) => {
      const color = src?.color ? src.color.clone() : new THREE.Color(0xffffff);
      const name = (src?.name || '').toLowerCase();
      const painted = namedPaint(modelKey, name);
      if (painted) {
        return new THREE.MeshBasicMaterial({ color: 0xffffff, map: painted, side: THREE.DoubleSide });
      }
      const sum = color.r + color.g + color.b;
      if (name.includes('eye') && name.includes('black')) color.setRGB(0.015, 0.015, 0.02);
      else if (sum < 0.04) color.setRGB(0.22, 0.2, 0.24);
      else {
        const k = Math.min(6, Math.max(1, 0.55 / Math.max(0.08, sum)));
        color.multiplyScalar(k);
        color.r = Math.min(1, Math.pow(color.r, 0.8));
        color.g = Math.min(1, Math.pow(color.g, 0.8));
        color.b = Math.min(1, Math.pow(color.b, 0.8));
      }
      return new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: src?.map || paintOf(color),
        side: THREE.DoubleSide,
      });
    });
    o.material = next.length === 1 ? next[0] : next;
    o.castShadow = false;
    o.frustumCulled = false;
  });
}

export async function preloadMobVisuals() {
  const loader = new GLTFLoader();
  await Promise.all(Object.entries(FILES).map(async ([key, url]) => {
    try {
      cache[key] = await loader.loadAsync(url);
    } catch (e) {
      console.warn('[mobs] missing', key, e);
    }
  }));
  ready = true;
}

export function takeMobVisual(key, height = 1.8, gameplayScale = null) {
  const gltf = cache[key];
  if (!gltf) return null;
  const visual = SkeletonUtils.clone(gltf.scene);
  basicMats(visual, key);
  visual.position.y = 0;
  const bounds = new THREE.Box3().setFromObject(visual);
  const rawH = Math.max(0.25, bounds.max.y - bounds.min.y);
  visual.position.y = -bounds.min.y;
  const scale = height / rawH;
  const scaleG = new THREE.Group();
  scaleG.name = 'scale';
  scaleG.add(visual);
  const root = new THREE.Group();
  root.name = key;
  root.add(scaleG);
  scaleG.scale.setScalar(scale);
  const mixer = new THREE.AnimationMixer(visual);
  const clips = gltf.animations || [];
  const idleClip = pickClip(clips, /idle/i) || clips[0];
  const walkClip = pickClip(clips, /^walk$/i) || pickClip(clips, /walk/i) || pickClip(clips, /run/i);
  const idle = idleClip ? mixer.clipAction(idleClip) : null;
  const walk = walkClip && walkClip !== idleClip ? mixer.clipAction(walkClip) : null;
  const legs = [];
  if (!walk) {
    visual.traverse((o) => {
      if (o.isBone && /upperleg/i.test(o.name)) legs.push(o);
    });
  }
  const pins = [];
  visual.traverse((o) => {
    if (o === visual) return;
    if (o.name === 'Root' || o.name === 'CharacterArmature' || o.parent === visual) {
      pins.push({ o, x: o.position.x, y: o.position.y, z: o.position.z });
    }
  });
  return {
    root,
    scale: scaleG,
    mixer,
    idle,
    walk,
    legs,
    pins,
    mat: { uniforms: {} },
    baseScale: gameplayScale ?? height * 0.82,
    fitScale: scale,
    glb: true,
  };
}

export function visualScale(model) {
  return model?.fitScale ?? model?.baseScale ?? 1;
}

export function stepMobVisual(model, dt, moving) {
  if (!model?.mixer) return false;
  if (!model._animOn) {
    model.idle?.reset().fadeIn(0.1).play();
    model.walk?.reset().fadeIn(0.1).play();
    model.walk?.setEffectiveWeight(0);
    model._animOn = true;
  }
  const w = moving ? 1 : 0;
  if (model.walk) model.walk.setEffectiveWeight(w);
  if (model.idle) model.idle.setEffectiveWeight(model.walk ? 1 - w : 1);
  model.mixer.update(dt);
  if (model.pins) {
    for (const pin of model.pins) pin.o.position.set(pin.x, pin.y, pin.z);
  }
  if (!model.walk && model.legs?.length) {
    model._step = (model._step || 0) + dt * (moving ? 9 : 2);
    const sw = Math.sin(model._step) * (moving ? 0.75 : 0.06);
    model.legs.forEach((bone, i) => {
      if (bone.userData.restX == null) bone.userData.restX = bone.rotation.x;
      bone.rotation.x = bone.userData.restX + (i % 2 === 0 ? sw : -sw);
    });
  }
  return true;
}

export function mobVisualsReady() { return ready; }
