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
function basicMats(root) {
  root.traverse((o) => {
    if (!o.isMesh) return;
    const srcs = Array.isArray(o.material) ? o.material : [o.material];
    const next = srcs.map((src) => {
      const color = src?.color ? src.color.clone() : new THREE.Color(0xffffff);
      const name = (src?.name || '').toLowerCase();
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
  basicMats(visual);
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
  const walkClip = pickClip(clips, /^walk$/i) || pickClip(clips, /walk/i) || pickClip(clips, /run/i) || idleClip;
  const idle = idleClip ? mixer.clipAction(idleClip) : null;
  const walk = walkClip ? mixer.clipAction(walkClip) : null;
  return {
    root,
    scale: scaleG,
    mixer,
    idle,
    walk,
    legs: [],
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
  if (model.idle) model.idle.setEffectiveWeight(1 - w);
  model.mixer.update(dt);
  return true;
}

export function mobVisualsReady() { return ready; }
