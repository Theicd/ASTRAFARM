// Wooden watchtower: tall post + platform, auto-targets nearby Green Things.
// Night: warm searchlight glow on the rotating head. Shots = arcade pops; kills = coins.
import * as THREE from 'three';
import { GY } from './world/World.js';
import { solidEntityMaterial, setEntityLight, shared } from './world/materials.js';
import { netBroadcast } from '../net/SosNet.js';

const COL = {
  plank: 0xa47d4c,
  plankLite: 0xae8655,
  log: 0x6b5233,
  brace: 0x8a6238,
  roof: 0x7a5539,
  lens: 0xffb060,
};

const _lensW = new THREE.Vector3();

export class Turret {
  constructor(game, x, z) {
    this.game = game;
    this.dead = false;
    this.cool = 0;
    this.range = 14;
    this.damage = 1;
    this.scan = 0;
    this._muzzle = 0;
    this.root = new THREE.Group();
    this.root.name = 'turret';

    const matPlank = solidEntityMaterial(COL.plank, { shade: 0.92 });
    const matLite = solidEntityMaterial(COL.plankLite, { shade: 0.98 });
    const matLog = solidEntityMaterial(COL.log, { shade: 0.75 });
    const matBrace = solidEntityMaterial(COL.brace, { shade: 0.85 });
    const matRoof = solidEntityMaterial(COL.roof, { shade: 0.8 });
    // Warm lantern glow (matches pen lanterns)
    const matLens = solidEntityMaterial(COL.lens, { shade: 1.35 });
    this.matLens = matLens;
    this._mats = [matPlank, matLite, matLog, matBrace, matRoof, matLens];

    const add = (mat, w, h, d, x0, y0, z0) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      m.position.set(x0, y0, z0);
      this.root.add(m);
      return m;
    };

    // Tall log mast (~3 blocks)
    const mastH = 2.85;
    add(matLog, 0.32, mastH, 0.32, 0, mastH * 0.5, 0);
    // Mid wrap band
    add(matBrace, 0.42, 0.12, 0.42, 0, mastH * 0.45, 0);
    // Cross braces
    for (const yaw of [Math.PI * 0.25, -Math.PI * 0.25]) {
      const brace = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 1.1), matBrace);
      brace.position.set(0, mastH * 0.55, 0);
      brace.rotation.y = yaw;
      this.root.add(brace);
    }

    // Lookout platform
    const deckY = mastH + 0.06;
    add(matPlank, 1.15, 0.12, 1.15, 0, deckY, 0);
    // Corner posts + rail
    for (const [px, pz] of [[-0.48, -0.48], [0.48, -0.48], [-0.48, 0.48], [0.48, 0.48]]) {
      add(matLog, 0.1, 0.55, 0.1, px, deckY + 0.28, pz);
    }
    for (const [px, pz, sx, sz] of [
      [0, -0.48, 0.95, 0.08], [0, 0.48, 0.95, 0.08],
      [-0.48, 0, 0.08, 0.95], [0.48, 0, 0.08, 0.95],
    ]) add(matLite, sx, 0.08, sz, px, deckY + 0.48, pz);

    // Rotating head (cupola + lens)
    this.head = new THREE.Group();
    this.head.position.y = deckY + 0.55;
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.38, 0.62), matPlank);
    cabin.position.y = 0.12;
    this.head.add(cabin);
    const roof = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.14, 0.78), matRoof);
    roof.position.y = 0.38;
    this.head.add(roof);
    const peak = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.12, 0.28), matLog);
    peak.position.y = 0.5;
    this.head.add(peak);
    this.lens = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.18, 0.16), matLens);
    this.lens.position.set(0, 0.14, 0.36);
    this.head.add(this.lens);

    // Soft additive halo — reads as a lantern while the head turns at night
    this.glowMat = new THREE.MeshBasicMaterial({
      color: 0xffc070,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.glow = new THREE.Mesh(new THREE.SphereGeometry(0.34, 10, 8), this.glowMat);
    this.glow.position.copy(this.lens.position);
    this.glow.renderOrder = 2;
    this.head.add(this.glow);

    // Soft search cone that sweeps with the head (night only)
    this.beamMat = new THREE.MeshBasicMaterial({
      color: 0xffe0a0,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    this.beam = new THREE.Mesh(new THREE.ConeGeometry(0.55, 3.2, 8, 1, true), this.beamMat);
    this.beam.rotation.x = Math.PI / 2;
    this.beam.position.set(0, 0.14, 1.85);
    this.beam.renderOrder = 1;
    this.head.add(this.beam);

    this.lamp = new THREE.PointLight(0xffc070, 0, 14, 2);
    this.lamp.position.copy(this.lens.position);
    this.head.add(this.lamp);

    this.root.add(this.head);

    const standY = game.world.floorAt?.(x, z);
    const y = standY >= 1 ? standY : GY + 1;
    this.root.position.set(x + 0.5, y, z + 0.5);
    game.scene.add(this.root);
    this.x = x;
    this.z = z;
    this.y = y;
  }

  update(dt) {
    const g = this.game;
    this.cool = Math.max(0, this.cool - dt);
    this._muzzle = Math.max(0, this._muzzle - dt * 5);
    this.scan += dt;
    let best = null, bestD = this.range;
    for (const m of g.mobs) {
      if (m.dead || m.state === 'leave') continue;
      const d = Math.hypot(m.pos.x - this.root.position.x, m.pos.z - this.root.position.z);
      if (d < bestD) { bestD = d; best = m; }
    }
    if (best) {
      const yaw = Math.atan2(best.pos.x - this.root.position.x, best.pos.z - this.root.position.z);
      this.head.rotation.y = yaw;
      if (this.cool <= 0) {
        this.cool = 0.75;
        this._muzzle = 1;
        this.lens.getWorldPosition(_lensW);
        g.particles.sparkle(_lensW.x, _lensW.y, _lensW.z, 6, 0xffe08a);
        g.particles.sparkle(best.pos.x - 0.2, best.pos.y + 0.45, best.pos.z - 0.2, 5, 0xff8a4a);
        g.audio.sfx('turret_pop', {
          pos: _lensW,
          pitch: 0.92 + Math.random() * 0.2,
          refDistance: 5,
        });
        if (g.isNetClient?.() && best.netId != null) {
          netBroadcast({
            t: 'hitMob', id: best.netId, dmg: this.damage, knock: 0.55,
            x: this.root.position.x, z: this.root.position.z,
          });
          best.hurt = 0.35;
        } else {
          best.hit(this.damage, this.root.position, 0.55);
          if (best.dead) g.onMobKilled(best, 'turret');
        }
      }
    } else {
      this.head.rotation.y = this.scan * 1.1;
    }

    const sky = shared.uSky?.value ?? 1;
    const night = sky < 0.55 || !!g.isNightish;
    const pulse = 0.5 + 0.5 * Math.sin(this.scan * (best ? 10 : 5));
    const flash = this._muzzle;
    const lensGlow = (night ? 1.55 + pulse * 0.45 : 1.05) + flash * 1.4;
    if (this.matLens.uniforms?.uShade) this.matLens.uniforms.uShade.value = lensGlow;

    this.glowMat.opacity = night ? 0.35 + pulse * 0.25 + flash * 0.45 : flash * 0.35;
    this.glow.scale.setScalar(night ? 1 + pulse * 0.15 + flash * 0.35 : 0.7 + flash * 0.4);
    this.beamMat.opacity = night ? 0.12 + pulse * 0.08 + flash * 0.2 : flash * 0.1;
    this.lamp.intensity = night ? 1.6 + pulse * 0.5 + flash * 2.2 : flash * 1.4;
    this.lamp.distance = night ? 14 : 6;
    this.lamp.color.setHex(flash > 0.2 ? 0xfff0c0 : 0xffb060);

    const [sk, bl] = g.world.lightAt?.(this.x, (this.y | 0) + 2, this.z) || [15, 8];
    // Keep the lens a little brighter than the wood at night so it reads as lit
    for (const m of this._mats) {
      if (m === this.matLens) setEntityLight(m, Math.max(sk, night ? 10 : sk), Math.max(bl, night ? 8 : bl));
      else setEntityLight(m, sk, bl);
    }
  }

  dispose() {
    this.game.scene.remove(this.root);
    for (const m of this._mats) m.dispose();
    this.glowMat.dispose();
    this.beamMat.dispose();
    this.root.traverse((o) => { if (o.geometry) o.geometry.dispose(); });
  }
}
