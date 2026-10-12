// Other humans in the room — Astra models + name tags, driven by net poses.
import * as THREE from 'three';
import { createAstraModel } from '../game/models.js';
import { cleanName } from './names.js';

function nameSprite(text) {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 64;
  const g = c.getContext('2d');
  g.clearRect(0, 0, 256, 64);
  g.font = 'bold 28px system-ui,Segoe UI,sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillStyle = 'rgba(0,0,0,0.45)';
  g.fillRect(16, 12, 224, 40);
  g.fillStyle = '#fff6d8';
  g.fillText(text.slice(0, 14), 128, 34);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearFilter;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: true });
  const spr = new THREE.Sprite(mat);
  spr.scale.set(1.8, 0.45, 1);
  spr.position.y = 2.35;
  return spr;
}

export class RemotePlayers {
  constructor(scene) {
    this.scene = scene;
    this.byPk = new Map();
  }

  upsert(pk, name) {
    let r = this.byPk.get(pk);
    if (r) {
      if (name && name !== r.name) {
        r.name = cleanName(name) || r.name;
        this.scene.remove(r.label);
        r.label = nameSprite(r.name);
        r.root.add(r.label);
      }
      return r;
    }
    const model = createAstraModel();
    model.setFace('normal');
    const root = model.root;
    root.name = 'remote:' + pk.slice(0, 8);
    const label = nameSprite(cleanName(name) || 'Farmer');
    root.add(label);
    this.scene.add(root);
    r = {
      pk,
      name: cleanName(name) || 'Farmer',
      model,
      root,
      label,
      pos: new THREE.Vector3(),
      yaw: Math.PI,
      target: new THREE.Vector3(),
      targetYaw: Math.PI,
      moving: false,
      t: 0,
    };
    this.byPk.set(pk, r);
    return r;
  }

  remove(pk) {
    const r = this.byPk.get(pk);
    if (!r) return;
    this.scene.remove(r.root);
    this.byPk.delete(pk);
  }

  clear() {
    for (const pk of [...this.byPk.keys()]) this.remove(pk);
  }

  applyPose(pk, x, y, z, yaw, flags = 0) {
    const r = this.byPk.get(pk);
    if (!r) return;
    r.target.set(x, y, z);
    r.targetYaw = yaw;
    r.moving = !!(flags & 1);
  }

  update(dt, skyLight = 12) {
    for (const r of this.byPk.values()) {
      r.t += dt;
      r.pos.lerp(r.target, 1 - Math.exp(-12 * dt));
      let dy = r.targetYaw - r.yaw;
      while (dy > Math.PI) dy -= Math.PI * 2;
      while (dy < -Math.PI) dy += Math.PI * 2;
      r.yaw += dy * (1 - Math.exp(-10 * dt));
      r.root.position.copy(r.pos);
      r.root.rotation.y = r.yaw;
      const walk = r.moving ? Math.sin(r.t * 10) * 0.35 : 0;
      const { legL, legR, armL, armR } = r.model.parts;
      legL.rotation.x = walk;
      legR.rotation.x = -walk;
      armL.rotation.x = -walk * 0.6;
      armR.rotation.x = walk * 0.6;
      r.model.setLight(skyLight, 0);
    }
  }
}
