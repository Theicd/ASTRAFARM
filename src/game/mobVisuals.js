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

function basicMats(root) {
  root.traverse((o) => {
    if (!o.isMesh) return;
    const srcs = Array.isArray(o.material) ? o.material : [o.material];
    const next = srcs.map((src) => {
      const color = src?.color ? src.color.clone() : new THREE.Color(0xffffff);
      // Some packs ship near-black base colors (ninja cloth). Lift them so the body reads.
      if (color.r + color.g + color.b < 0.12) color.setRGB(0.22, 0.24, 0.32);
      return new THREE.MeshBasicMaterial({
        color,
        map: src?.map || null,
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
