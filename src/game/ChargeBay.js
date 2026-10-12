// Wall charging docks for the robot crew — commercial-bay look with bolt signage.
import * as THREE from 'three';
import { LAYOUT, GY } from './world/World.js';
import { solidEntityMaterial, setEntityLight } from './world/materials.js';

function boltTexture() {
  const c = document.createElement('canvas');
  c.width = 32; c.height = 32;
  const g = c.getContext('2d');
  g.fillStyle = '#1a2430';
  g.fillRect(0, 0, 32, 32);
  g.fillStyle = '#2a3a48';
  g.fillRect(2, 2, 28, 28);
  // Lightning bolt
  g.fillStyle = '#5ef0ff';
  g.beginPath();
  g.moveTo(18, 4);
  g.lineTo(10, 16);
  g.lineTo(15, 16);
  g.lineTo(12, 28);
  g.lineTo(22, 12);
  g.lineTo(17, 12);
  g.closePath();
  g.fill();
  g.fillStyle = '#b8ffff';
  g.fillRect(15, 8, 2, 3);
  const t = new THREE.CanvasTexture(c);
  t.magFilter = THREE.NearestFilter;
  t.minFilter = THREE.NearestFilter;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

let _boltTex = null;
function getBoltTex() {
  if (!_boltTex) _boltTex = boltTexture();
  return _boltTex;
}

export class ChargeBay {
  constructor(game) {
    this.game = game;
    this.root = new THREE.Group();
    this.root.name = 'chargeBay';
    this.docks = [];
    this._mats = [];
    game.scene.add(this.root);
    this.rebuild();
  }

  rebuild() {
    this.disposeMeshes();
    const docks = LAYOUT.charge || [];
    const H = LAYOUT.house;
    for (let i = 0; i < docks.length; i++) {
      const [cx, cz] = docks[i];
      const g = new THREE.Group();
      // Stand against north wall (z0): panel on inner face, pad on floor
      const x = cx + 0.5;
      const z = H.z0 + 0.08; // flush to inner north wall
      g.position.set(x, GY + 1, z);

      const matDark = solidEntityMaterial(0x2a3340, { shade: 0.85 });
      const matMetal = solidEntityMaterial(0x6a7888, { shade: 1.05 });
      const matGlow = solidEntityMaterial(0x4ad8ff, { shade: 1.4 });
      const matPad = solidEntityMaterial(0x3a4555, { shade: 0.9 });
      this._mats.push(matDark, matMetal, matGlow, matPad);

      const add = (mat, w, h, d, x0, y0, z0) => {
        const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
        m.position.set(x0, y0, z0);
        g.add(m);
        return m;
      };

      // Floor charge pad
      add(matPad, 0.85, 0.06, 0.7, 0, 0.03, 0.45);
      add(matGlow, 0.55, 0.04, 0.12, 0, 0.07, 0.55);
      add(matGlow, 0.12, 0.04, 0.45, 0, 0.07, 0.45);

      // Wall frame / bay housing
      add(matDark, 0.95, 1.35, 0.12, 0, 0.85, 0.06);
      add(matMetal, 0.08, 1.2, 0.14, -0.42, 0.8, 0.1);
      add(matMetal, 0.08, 1.2, 0.14, 0.42, 0.8, 0.1);
      add(matMetal, 0.95, 0.08, 0.14, 0, 1.45, 0.1);
      add(matMetal, 0.95, 0.08, 0.14, 0, 0.22, 0.1);

      // Contact strips (arms that "plug" into the robot back)
      add(matGlow, 0.08, 0.35, 0.18, -0.22, 0.75, 0.22);
      add(matGlow, 0.08, 0.35, 0.18, 0.22, 0.75, 0.22);

      // Bolt sign plate
      const boltMat = new THREE.MeshBasicMaterial({
        map: getBoltTex(),
        transparent: false,
        toneMapped: false,
      });
      this._mats.push(boltMat);
      const sign = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.55), boltMat);
      sign.position.set(0, 1.05, 0.14);
      g.add(sign);

      // Soft cyan lamp
      const lamp = new THREE.PointLight(0x5ad8ff, 0, 4.5, 2);
      lamp.position.set(0, 1.1, 0.4);
      g.add(lamp);

      this.root.add(g);
      this.docks.push({ root: g, lamp, mats: [matDark, matMetal, matGlow, matPad] });
    }
  }

  update(dt) {
    const night = !!this.game.isNightish;
    const t = this.game.time || 0;
    const pulse = 0.55 + 0.45 * Math.sin(t * 5);
    for (const d of this.docks) {
      d.lamp.intensity = night ? 0.9 + pulse * 0.8 : 0.15;
      for (const m of d.mats) {
        const [sk, bl] = this.game.world.lightAt?.(d.root.position.x, GY + 2, d.root.position.z) || [8, 6];
        setEntityLight(m, Math.max(sk, night ? 9 : sk), Math.max(bl, night ? 10 : bl));
      }
    }
    void dt;
  }

  disposeMeshes() {
    for (const d of this.docks) this.root.remove(d.root);
    this.docks = [];
    for (const m of this._mats) m.dispose?.();
    this._mats = [];
    this.root.traverse((o) => { if (o.geometry) o.geometry.dispose(); });
  }

  dispose() {
    this.disposeMeshes();
    this.game.scene.remove(this.root);
  }
}
