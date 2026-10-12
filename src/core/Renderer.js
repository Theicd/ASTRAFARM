// WebGLRenderer + post (RenderPass → Bloom? → OutputPass → Finish) + quality presets / auto.
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { isWeakDevice } from './perf.js';

export const PRESETS = {
  high: { pixelRatio: 2, bloom: true, shadows: true, shadowSize: 2048, msaa: 4, halfFloat: true, meshBudget: 6, particleScale: 1, fogFar: 105 },
  medium: { pixelRatio: 1.25, bloom: true, shadows: true, shadowSize: 1024, msaa: 0, halfFloat: true, meshBudget: 3, particleScale: 0.7, fogFar: 90 },
  low: { pixelRatio: 0.85, bloom: false, shadows: false, shadowSize: 512, msaa: 0, halfFloat: false, meshBudget: 2, particleScale: 0.35, fogFar: 62 },
};

const FinishShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uVignette: { value: 0.3 },
    uSaturation: { value: 1.05 },
    uContrast: { value: 1.03 },
    uGamma: { value: 1 },
    uLift: { value: new THREE.Color(0, 0, 0) },
    uGain: { value: new THREE.Color(1, 1, 1) },
    uGrain: { value: 0 },
    uCA: { value: 0 },
    uFlash: { value: 0 },
    uFlashColor: { value: new THREE.Color(1, 1, 1) },
    uFade: { value: 0 },
    uFadeColor: { value: new THREE.Color(0, 0, 0) },
    uBars: { value: 0 },
  },
  vertexShader: /* glsl */ `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uTime, uVignette, uSaturation, uContrast, uGamma, uGrain, uCA, uFlash, uFade, uBars;
    uniform vec3 uLift, uGain, uFlashColor, uFadeColor;
    varying vec2 vUv;
    float hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
    vec3 safe(vec3 c) { return (any(isnan(c)) || any(isinf(c))) ? vec3(0.0) : c; }
    void main() {
      vec2 dc = vUv - 0.5;
      vec3 col;
      if (uCA > 0.0) {
        vec2 off = dc * dot(dc, dc) * uCA * 0.03;
        col = vec3(texture2D(tDiffuse, vUv + off).r, texture2D(tDiffuse, vUv).g, texture2D(tDiffuse, vUv - off).b);
      } else col = texture2D(tDiffuse, vUv).rgb;
      col = clamp(safe(col), 0.0, 1.0);
      col = pow(max(col, vec3(0.0)), vec3(max(uGamma, 0.2)));
      col = uLift + col * (1.0 - uLift);
      col *= uGain;
      float l = dot(col, vec3(0.2126, 0.7152, 0.0722));
      col = mix(vec3(l), col, uSaturation);
      col = (col - 0.5) * uContrast + 0.5;
      float r = length(dc * vec2(1.0, 0.85));
      col *= 1.0 - uVignette * smoothstep(0.35, 0.95, r);
      col = mix(col, uFlashColor, clamp(uFlash, 0.0, 1.0));
      col = mix(col, uFadeColor, clamp(uFade, 0.0, 1.0));
      if (uGrain > 0.0) {
        float seed = floor(uTime * 24.0);
        float g = hash12(gl_FragCoord.xy + seed * 17.13) + hash12(gl_FragCoord.xy * 1.37 + seed * 3.7) - 1.0;
        col += g * uGrain * (1.0 - smoothstep(0.0, 0.85, dot(col, vec3(0.3333))) * 0.6);
      }
      float bar = uBars * 0.11;
      if (vUv.y < bar || vUv.y > 1.0 - bar) col = vec3(0.0);
      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }`,
};

export class Renderer {
  constructor(container, { quality = 'auto' } = {}) {
    const weak = isWeakDevice();
    const r = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: weak ? 'low-power' : 'high-performance',
      stencil: false,
      depth: true,
      alpha: false,
    });
    r.outputColorSpace = THREE.SRGBColorSpace;
    r.toneMapping = THREE.ACESFilmicToneMapping;
    r.toneMappingExposure = 1;
    r.shadowMap.enabled = true;
    r.shadowMap.type = THREE.PCFShadowMap;
    r.shadowMap.autoUpdate = false;
    r.info.autoReset = false;
    container.appendChild(r.domElement);
    this.renderer = r;
    this.scene = null;
    this.camera = null;
    this.before = [];
    this.fx = {};
    this.weak = weak;

    // Cap DPR — Low always stays cheap; phones rarely need more than 1.25
    this.maxPixelRatio = Math.min(devicePixelRatio || 1, weak || quality === 'low' ? 1 : 2);
    this.composer = null;
    this._times = [];
    this._sinceAdjust = 0;
    this._bloomForcedOff = false;
    this.setQuality(quality);
    addEventListener('resize', () => this.resize());
  }

  get domElement() { return this.renderer.domElement; }

  setScene(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.renderPass.scene = scene;
    this.renderPass.camera = camera;
    this.resize();
  }

  setQuality(q) {
    this.quality = q;
    this.adaptive = q === 'auto';
    this._bloomForcedOff = false;

    let base;
    if (q === 'auto') {
      // Start cheap on weak devices; desktop auto starts near medium
      base = { ...(this.weak ? PRESETS.low : PRESETS.medium) };
      if (this.weak) {
        base.pixelRatio = Math.min(1, this.maxPixelRatio);
        base.bloom = false;
        base.shadows = false;
      } else {
        base.pixelRatio = Math.min(1.5, this.maxPixelRatio);
      }
    } else {
      base = { ...(PRESETS[q] || PRESETS.high) };
    }

    this.preset = base;
    this.pixelRatio = Math.min(this.maxPixelRatio, base.pixelRatio);
    this.minPixelRatio = this.weak ? 0.5 : 0.7;
    this.renderer.shadowMap.enabled = !!base.shadows;
    this._build(base);
    this.onQuality?.(base);
    this.resize();
  }

  setLook(look = {}) {
    const d = {
      exposure: 1, bloomStrength: 0.4, bloomRadius: 0.5, bloomThreshold: 0.9,
      vignette: 0.3, saturation: 1.05, contrast: 1.03,
      grain: 0, ca: 0, lift: [0, 0, 0], gain: [1, 1, 1],
    };
    const L = (this.look = { ...d, ...look });
    this.renderer.toneMappingExposure = L.exposure;
    if (this.bloom) Object.assign(this.bloom, { strength: L.bloomStrength, radius: L.bloomRadius, threshold: L.bloomThreshold });
    const u = this.finish.uniforms;
    u.uVignette.value = L.vignette;
    u.uSaturation.value = L.saturation;
    u.uContrast.value = L.contrast;
    // Grain/CA are expensive fragment work — mute on low / weak auto
    const lite = !this.preset?.bloom && (this.quality === 'low' || this.weak);
    u.uGrain.value = lite ? 0 : L.grain;
    u.uCA.value = lite ? 0 : L.ca;
    u.uLift.value.setRGB(...L.lift);
    u.uGain.value.setRGB(...L.gain);
  }

  setFx(v) {
    Object.assign(this.fx, v);
    const u = this.finish.uniforms;
    const num = { time: 'uTime', flash: 'uFlash', fade: 'uFade', bars: 'uBars', gamma: 'uGamma' };
    for (const [k, name] of Object.entries(num)) if (v[k] !== undefined && Number.isFinite(v[k])) u[name].value = v[k];
    if (v.flashColor) u.uFlashColor.value.set(v.flashColor);
    if (v.fadeColor) u.uFadeColor.value.set(v.fadeColor);
  }

  _build(p) {
    this.composer?.dispose();
    const type = p.halfFloat ? THREE.HalfFloatType : THREE.UnsignedByteType;
    const target = new THREE.WebGLRenderTarget(1, 1, { type, samples: p.msaa || 0 });
    this.composer = new EffectComposer(this.renderer, target);
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(this.renderPass);
    const wantBloom = !!p.bloom && !this._bloomForcedOff;
    this.bloom = wantBloom ? new UnrealBloomPass(new THREE.Vector2(256, 256), 0.4, 0.5, 0.9) : null;
    if (this.bloom) this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());
    this.finish = new ShaderPass(FinishShader);
    this.composer.addPass(this.finish);
    this.setLook(this.look);
    this.setFx(this.fx);
  }

  resize(w = innerWidth, h = innerHeight) {
    this.renderer.setPixelRatio(this.pixelRatio);
    this.renderer.setSize(w, h, true);
    this.composer.setPixelRatio(this.pixelRatio);
    this.composer.setSize(w, h);
    if (this.camera?.isPerspectiveCamera) {
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
    }
    this.onResize?.(w, h);
  }

  /** Auto: react faster on phones; drop bloom if still struggling. */
  _adapt(dt) {
    if (!this.adaptive || document.hidden || !(dt > 0) || dt > 0.12) return;
    this._times.push(dt);
    this._sinceAdjust += dt;
    const windowN = this.weak ? 45 : 75;
    const wait = this.weak ? 1.1 : 2.2;
    if (this._times.length > windowN) this._times.shift();
    if (this._sinceAdjust < wait || this._times.length < (this.weak ? 30 : 50)) return;

    const sorted = [...this._times].sort((a, b) => a - b);
    const med = sorted[sorted.length >> 1];
    let next = this.pixelRatio;
    const slow = this.weak ? 1 / 42 : 1 / 50;
    const fast = this.weak ? 1 / 58 : 1 / 70;

    if (med > slow) next = Math.max(this.minPixelRatio, this.pixelRatio - (this.weak ? 0.2 : 0.15));
    else if (med < fast) next = Math.min(this.maxPixelRatio, this.pixelRatio + (this.weak ? 0.08 : 0.1));

    // If still very slow after lowering PR, kill bloom (biggest GPU cost)
    if (med > 1 / 36 && this.bloom && !this._bloomForcedOff) {
      this._bloomForcedOff = true;
      this.preset = { ...this.preset, bloom: false };
      this._build(this.preset);
      this.onQuality?.(this.preset);
      this._sinceAdjust = 0;
      this._times.length = 0;
      this.resize();
      return;
    }

    if (Math.abs(next - this.pixelRatio) > 0.01) {
      this.pixelRatio = next;
      this._sinceAdjust = 0;
      this._times.length = 0;
      this.resize();
    } else {
      this._sinceAdjust = 0;
      this._times.length = 0;
    }
  }

  render(dt = 1 / 60) {
    if (!this.scene || !this.camera) return;
    const r = this.renderer;
    r.info.reset();
    r.shadowMap.needsUpdate = !!this.preset?.shadows;
    for (const fn of this.before) fn(r, this.scene, this.camera);
    this.composer.render(dt);
    this._adapt(dt);
  }
}
