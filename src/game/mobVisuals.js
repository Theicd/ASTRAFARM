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

function skinKind(modelKey, name) {
  const n = (name || '').toLowerCase();
  const k = (modelKey || '').toLowerCase();
  if (n.includes('eye') && n.includes('black')) return 'pupil';
  if (n.includes('eye')) return 'eye';
  if (n.includes('mouth') || n.includes('beak') || n.includes('tooth')) return 'horn';
  if (n.includes('wood')) return 'wood';
  if (n.includes('strap') || n.includes('metal') || n.includes('armor')) return 'metal';
  if (k === 'fish' || k === 'dino' || n.includes('scale') || n.includes('flap')) return 'scale';
  if (k === 'cactoro' || n.includes('leaf')) return 'plant';
  if (k === 'ninja' || n.includes('cloth') || n.includes('cape')) return 'cloth';
  if (k === 'yeti') return 'fur';
  if (k === 'alien') return 'metal';
  return 'hide';
}

/** Sharp same-hue shading. Cream-mixing was turning green orcs and the rest into gray. */
function richPaint(color, kind) {
  const key = 'rich|' + kind + '|' + color.getHexString();
  if (_paint.has(key)) return _paint.get(key);
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  const mid = '#' + color.getHexString();
  const lightC = color.clone();
  lightC.offsetHSL(0, 0.04, 0.16);
  const darkC = color.clone();
  darkC.multiplyScalar(0.62);
  const accent = color.clone();
  accent.offsetHSL(kind === 'plant' ? 0.08 : 0.04, 0.12, 0.04);
  const light = '#' + lightC.getHexString();
  const dark = '#' + darkC.getHexString();
  const accentHex = '#' + accent.getHexString();
  if (kind === 'pupil') {
    g.fillStyle = '#140e0c';
    g.fillRect(0, 0, 128, 128);
    g.fillStyle = '#f4f7ff';
    g.beginPath();
    g.arc(46, 42, 10, 0, Math.PI * 2);
    g.fill();
  } else if (kind === 'eye') {
    g.fillStyle = light;
    g.fillRect(0, 0, 128, 128);
    g.strokeStyle = dark;
    g.lineWidth = 8;
    g.strokeRect(6, 6, 116, 116);
  } else {
    const grd = g.createLinearGradient(0, 0, 0, 128);
    grd.addColorStop(0, light);
    grd.addColorStop(0.42, mid);
    grd.addColorStop(1, dark);
    g.fillStyle = grd;
    g.fillRect(0, 0, 128, 128);
    if (kind === 'metal') {
      g.strokeStyle = dark;
      g.lineWidth = 3;
      for (let y = 8; y < 128; y += 32) g.strokeRect(6, y, 116, 26);
      g.fillStyle = light;
      for (let x = 14; x < 120; x += 28) for (let y = 16; y < 120; y += 32) g.fillRect(x, y, 5, 5);
      g.fillStyle = accentHex;
      g.fillRect(0, 58, 128, 8);
    } else if (kind === 'scale') {
      g.fillStyle = dark;
      for (let row = 0; row < 8; row++) {
        const y = row * 16;
        for (let x = (row % 2) * 12; x < 128; x += 24) {
          g.beginPath();
          g.ellipse(x + 12, y + 10, 11, 8, 0, 0, Math.PI * 2);
          g.fill();
        }
      }
      g.fillStyle = light;
      g.globalAlpha = 0.55;
      g.fillRect(0, 0, 128, 18);
      g.globalAlpha = 1;
    } else if (kind === 'plant') {
      g.strokeStyle = dark;
      g.lineWidth = 3;
      for (let x = 8; x < 128; x += 18) {
        g.beginPath();
        g.moveTo(x, 0);
        g.lineTo(x + 6, 128);
        g.stroke();
      }
      g.fillStyle = accentHex;
      for (let i = 0; i < 9; i++) g.fillRect(8 + (i * 13) % 110, 10 + (i * 29) % 100, 4, 14);
    } else if (kind === 'cloth') {
      g.strokeStyle = 'rgba(20,16,28,0.35)';
      g.lineWidth = 1;
      for (let i = -128; i < 256; i += 8) {
        g.beginPath();
        g.moveTo(i, 0);
        g.lineTo(i + 128, 128);
        g.stroke();
      }
      g.fillStyle = accentHex;
      g.fillRect(0, 24, 128, 10);
      g.fillRect(0, 92, 128, 6);
    } else if (kind === 'wood') {
      g.fillStyle = dark;
      for (let y = 0; y < 128; y += 14) g.fillRect(0, y, 128, 3);
      g.fillStyle = 'rgba(255,220,160,0.25)';
      g.fillRect(0, 4, 128, 4);
    } else if (kind === 'fur') {
      g.strokeStyle = dark;
      g.lineWidth = 2;
      for (let i = 0; i < 40; i++) {
        const x = (i * 17) % 128;
        const y = (i * 29) % 120;
        g.beginPath();
        g.moveTo(x, y);
        g.lineTo(x + 3, y + 10);
        g.stroke();
      }
      g.fillStyle = light;
      g.globalAlpha = 0.7;
      g.fillRect(0, 86, 128, 28);
      g.globalAlpha = 1;
    } else if (kind === 'horn') {
      g.fillStyle = light;
      g.fillRect(0, 0, 128, 36);
      g.fillStyle = accentHex;
      g.fillRect(0, 70, 128, 16);
    } else {
      g.fillStyle = accentHex;
      g.globalAlpha = 0.55;
      for (let i = 0; i < 8; i++) {
        g.beginPath();
        g.ellipse(16 + (i * 31) % 100, 20 + (i * 23) % 70, 16, 11, i * 0.4, 0, Math.PI * 2);
        g.fill();
      }
      g.globalAlpha = 1;
      g.fillStyle = light;
      g.fillRect(0, 84, 128, 26);
      g.strokeStyle = dark;
      g.lineWidth = 2;
      for (let y = 10; y < 128; y += 18) {
        g.beginPath();
        g.moveTo(0, y);
        g.bezierCurveTo(40, y - 6, 90, y + 6, 128, y);
        g.stroke();
      }
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 4;
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

const PALETTE = {
  Orc: {
    orc_main: ['#46c83a', 'hide'],
    orc_secondary: ['#1e8a34', 'hide'],
    belt: ['#a86a32', 'wood'],
    orc_mouth: ['#f0989a', 'hide'],
    tongue: ['#e23b48', 'hide'],
    gold: ['#f2c14a', 'metal'],
    orc_hair: ['#2a3f86', 'fur'],
    wood: ['#c48a48', 'wood'],
    metal: ['#d7e2ee', 'metal'],
  },
  Alien: {
    alien_main: ['#7a32e0', 'metal'],
    alien_secondary: ['#3dce4a', 'plant'],
    tongue: ['#ff5a8a', 'hide'],
  },
  Cactoro: {
    cactoro_main: ['#3ecf45', 'plant'],
    'cactoro_main.001': ['#3ecf45', 'plant'],
    cactoro_secondary: ['#e0a24a', 'wood'],
    cactoro_red: ['#e23b3b', 'hide'],
  },
  Dino: {
    dino_main: ['#e4456a', 'scale'],
    dino_secondary: ['#f0a030', 'scale'],
    dino_teeth: ['#f7f3ea', 'horn'],
    dino_tongue: ['#e23b4a', 'hide'],
  },
  Fish: {
    fish_main: ['#1a92e0', 'scale'],
    fish_secondary: ['#22d4c8', 'scale'],
    fish_flaps: ['#f0a030', 'scale'],
    mouth: ['#f07888', 'hide'],
  },
  Frog: {
    frog_main: ['#46d24a', 'hide'],
    frog_secondary: ['#f0d24a', 'hide'],
  },
  MushroomKing: {
    mushroomking_main: ['#e23b3b', 'hide'],
    mushroomking_secondary: ['#f6efe2', 'hide'],
    orc_main: ['#46c840', 'plant'],
  },
  Ninja: {
    ninja_main: ['#242433', 'cloth'],
    ninja_secondary: ['#c48a4a', 'cloth'],
    belt: ['#2a241c', 'wood'],
    gold: ['#f0c040', 'metal'],
    birb_secondary: ['#d8d4cc', 'cloth'],
  },
  Yeti: {
    yeti_main: ['#f7f4ee', 'fur'],
    yeti_secondary: ['#3aa0e8', 'fur'],
    yeti_teeth: ['#f4efe4', 'horn'],
    tongue: ['#e07080', 'hide'],
  },
};

function paletteOf(modelKey, name) {
  return PALETTE[modelKey]?.[name] || null;
}

function punch(color) {
  const hsl = { h: 0, s: 0, l: 0 };
  color.getHSL(hsl);
  const s = hsl.s < 0.08 ? hsl.s : Math.min(0.82, Math.max(0.48, hsl.s * 1.6));
  const l = hsl.s < 0.08 ? Math.min(0.7, Math.max(0.28, hsl.l)) : Math.min(0.58, Math.max(0.4, hsl.l));
  color.setHSL(hsl.h, s, l);
}

function namedPaint(modelKey, name) {
  if (modelKey === 'Bunny') {
    if (name === 'bunny_main') return hidePaint('#fff7f1', '#f6c9d4', '#ffe4c8');
    if (name === 'bunny_secondary') return hidePaint('#ff7eae', '#e4548c', '#ffd0e4');
    if (name === 'eye_white') return hidePaint('#fffdf8', '#ffe0ea', null);
    if (name === 'eye_black') return hidePaint('#1a120e', '#000000', null);
    if (name === 'material.024') return hidePaint('#ff8c1a', '#e25c08', '#ffe08a');
    if (name === 'material.011') return hidePaint('#3dce45', '#178a28', '#d6ff8a');
    return hidePaint('#fff4ea', '#f3c4b0', '#ffe8d4');
  }
  if (modelKey === 'Birb') {
    if (name === 'birb_main') return featherPaint('#f4efe4', '#d7b48a', '#8d6848');
    if (name === 'birb_secondary') return featherPaint('#e7d7c2', '#7f93ad', '#3e5168');
    if (name === 'birb_beak') return hidePaint('#f0a030', '#c86818', '#ffe0a0');
    if (name === 'eye_white') return hidePaint('#f7f4ee', '#e4ddd0', null);
    if (name === 'eye_black') return hidePaint('#1a140e', '#000000', null);
    return null;
  }
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
      const look = paletteOf(modelKey, name);
      let kind = skinKind(modelKey, name);
      if (look) {
        color.set(look[0]);
        kind = look[1];
      } else if (name.includes('eye') && name.includes('black')) {
        color.setRGB(0.04, 0.03, 0.03);
        kind = 'pupil';
      } else if (name.includes('eye')) {
        color.setRGB(0.96, 0.97, 0.98);
        kind = 'eye';
      } else {
        const sum = color.r + color.g + color.b;
        if (sum < 0.04) color.setRGB(0.22, 0.2, 0.24);
        else {
          const k = Math.min(6, Math.max(1, 0.55 / Math.max(0.08, sum)));
          color.multiplyScalar(k);
          color.r = Math.min(1, color.r);
          color.g = Math.min(1, color.g);
          color.b = Math.min(1, color.b);
        }
        punch(color);
      }
      return new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: src?.map || richPaint(color, kind),
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
