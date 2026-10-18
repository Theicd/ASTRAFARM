// Small 3D HUD icons: a gold coin and the four seeds, rendered once.
import * as THREE from 'three';

const cache = new Map();

function mat(color) {
  return new THREE.MeshLambertMaterial({ color });
}

function coin() {
  const g = new THREE.Group();
  const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.14, 28), mat(0xf0b429));
  disc.rotation.z = Math.PI / 2;
  const edge = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.08, 28), mat(0xc48412));
  edge.rotation.z = Math.PI / 2;
  const face = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.16, 20), mat(0xffe27a));
  face.rotation.z = Math.PI / 2;
  const shine = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), mat(0xfff6c8));
  shine.position.set(0.08, 0.16, 0.18);
  g.add(disc, edge, face, shine);
  return g;
}

function potato() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.42, 16, 12), mat(0xd6ad62));
  body.scale.set(1.15, 0.78, 0.86);
  const eye = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 5), mat(0x8a5a28));
  eye.position.set(0.18, 0.08, 0.28);
  const eye2 = eye.clone();
  eye2.position.set(-0.16, -0.06, 0.22);
  g.add(body, eye, eye2);
  return g;
}

function wheat() {
  const g = new THREE.Group();
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 0.7, 6), mat(0x5fae3a));
  stem.position.y = -0.05;
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), mat(0xf0d040));
  head.scale.set(0.7, 1.35, 0.7);
  head.position.y = 0.38;
  const grain = new THREE.Mesh(new THREE.SphereGeometry(0.07, 6, 5), mat(0xe8c030));
  grain.position.set(0.1, 0.28, 0.08);
  const grain2 = grain.clone();
  grain2.position.set(-0.09, 0.42, 0.06);
  g.add(stem, head, grain, grain2);
  return g;
}

function carrot() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.72, 12), mat(0xf08a28));
  body.position.y = -0.08;
  const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.28, 6), mat(0x4f9a2e));
  leaf.position.set(-0.06, 0.34, 0);
  leaf.rotation.z = 0.5;
  const leaf2 = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.26, 6), mat(0x5fae3a));
  leaf2.position.set(0.07, 0.32, 0.02);
  leaf2.rotation.z = -0.45;
  g.add(body, leaf, leaf2);
  return g;
}

function corn() {
  const g = new THREE.Group();
  const cob = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.62, 10), mat(0xf0d040));
  const husk = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.28, 6), mat(0x4f9a2e));
  husk.position.y = 0.38;
  const husk2 = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.22, 5), mat(0x3e8424));
  husk2.position.set(0.08, 0.32, 0);
  husk2.rotation.z = -0.6;
  g.add(cob, husk, husk2);
  return g;
}

const BUILD = { coin, potato, wheat, carrot, corn };

/** Data URLs for the arcade strip. Falls back to null if WebGL cannot start. */
export function icon3dURLs() {
  if (cache.size) return Object.fromEntries(cache);
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
  } catch {
    return null;
  }
  renderer.setPixelRatio(1);
  renderer.setSize(96, 96);
  renderer.setClearColor(0x000000, 0);
  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(30, 1, 0.05, 12);
  cam.position.set(0.72, 0.42, 0.86);
  cam.lookAt(0, 0.02, 0);
  scene.add(new THREE.AmbientLight(0xffffff, 0.62));
  const sun = new THREE.DirectionalLight(0xfff4d8, 1.25);
  sun.position.set(2.2, 3.2, 1.6);
  scene.add(sun);
  const urls = {};
  for (const [name, make] of Object.entries(BUILD)) {
    const obj = make();
    obj.rotation.y = 0.55;
    scene.add(obj);
    renderer.render(scene, cam);
    urls[name] = renderer.domElement.toDataURL('image/png');
    cache.set(name, urls[name]);
    scene.remove(obj);
    obj.traverse((o) => {
      o.geometry?.dispose?.();
      if (o.material) {
        if (Array.isArray(o.material)) o.material.forEach((m) => m.dispose());
        else o.material.dispose();
      }
    });
  }
  renderer.dispose();
  renderer.forceContextLoss?.();
  return urls;
}
