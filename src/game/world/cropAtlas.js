// High-resolution crop cards. The world atlas is 16px, which looks soft up close.
// These sprites stay on their own texture so wheat, carrots, corn and potatoes read sharply.
import * as THREE from 'three';
import { mulberry32, hashString } from '../../core/rng.js';

const S = 64;
const COLS = 4;

const rgb = (hex) => [(hex >> 16) & 255, (hex >> 8) & 255, hex & 255];

class P {
  constructor(seed) {
    this.d = new Uint8ClampedArray(S * S * 4);
    this.r = mulberry32(seed);
  }
  set(x, y, c, a = 255) {
    x = x | 0; y = y | 0;
    if (x < 0 || y < 0 || x >= S || y >= S || a <= 0) return;
    const i = (y * S + x) * 4;
    const col = rgb(c);
    this.d[i] = col[0]; this.d[i + 1] = col[1]; this.d[i + 2] = col[2]; this.d[i + 3] = a;
  }
  alpha(x, y) {
    if (x < 0 || y < 0 || x >= S || y >= S) return 0;
    return this.d[(y * S + x) * 4 + 3];
  }
  disc(cx, cy, rx, ry, c) {
    for (let y = cy - ry - 1; y <= cy + ry + 1; y++) for (let x = cx - rx - 1; x <= cx + rx + 1; x++) {
      const dx = (x + 0.5 - cx) / rx, dy = (y + 0.5 - cy) / ry;
      if (dx * dx + dy * dy <= 1) this.set(x, y, c);
    }
  }
  line(x0, y0, x1, y1, c) {
    const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) | 0;
    for (let i = 0; i <= n; i++) {
      const t = n ? i / n : 0;
      this.set(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, c);
    }
  }
  outline(c) {
    const add = [];
    for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
      if (this.alpha(x, y)) continue;
      if (this.alpha(x - 1, y) > 180 || this.alpha(x + 1, y) > 180 || this.alpha(x, y - 1) > 180 || this.alpha(x, y + 1) > 180) add.push([x, y]);
    }
    for (const [x, y] of add) this.set(x, y, c);
  }
}

const G = [0x2f7a22, 0x3e9a2e, 0x57b83c, 0x1f5e18];
const GOLD = [0xf0d060, 0xe2b63a, 0xc89628, 0xffe48a];

function stem(p, x, y0, y1, c = G[1]) {
  for (let y = y0; y <= y1; y++) {
    p.set(x, y, y % 2 ? G[3] : c);
    p.set(x + 1, y, y % 3 ? G[2] : c);
  }
}

function blade(p, x, y, h, lean, c = G[1]) {
  for (let i = 0; i < h; i++) {
    const xx = x + Math.round(lean * i / h);
    p.set(xx, y - i, i < 2 ? G[3] : c);
    if (i > h * 0.45) p.set(xx + (lean >= 0 ? 1 : -1), y - i, G[2]);
  }
}

function wheat(p, stage) {
  const n = [3, 5, 6, 7][stage];
  const h = [16, 28, 40, 46][stage];
  for (let i = 0; i < n; i++) {
    const x = 6 + Math.round((i + 0.5) * (52 / n));
    const lean = (i % 2 ? 1 : -1) * (stage > 1 ? 3 : 1);
    blade(p, x, 62, h, lean, stage >= 2 && i % 2 === 0 ? 0x8a9a32 : G[1]);
    if (stage >= 2) {
      const top = 62 - h;
      const head = stage === 3 ? 12 : 7;
      for (let k = 0; k < head; k++) {
        const xx = x + Math.round(lean * 0.4);
        const yy = top - k;
        p.set(xx, yy, GOLD[k % 4]);
        p.set(xx + (k % 2 ? 1 : -1), yy, k < 3 ? GOLD[3] : GOLD[2]);
        if (stage === 3 && k % 2 === 0) {
          p.set(xx - 2, yy - 1, 0xf4e2a0);
          p.set(xx + 2, yy - 1, 0xd8b45a);
        }
      }
    }
  }
}

function leaflet(p, x, y, dx, dy, len) {
  p.line(x, y, x + dx * len, y + dy * len, G[3]);
  for (let i = 1; i < len; i++) {
    const px = x + dx * i, py = y + dy * i;
    const w = Math.max(1, Math.round((1 - i / len) * 3));
    for (let k = -w; k <= w; k++) p.set(px + k * dy, py + k * dx, i % 2 ? G[2] : G[1]);
    p.set(px, py, G[0]);
  }
}

function carrot(p, stage) {
  const leaves = [2, 4, 7, 9][stage];
  for (let i = 0; i < leaves; i++) {
    const ang = -0.9 + (i / Math.max(1, leaves - 1)) * 1.8;
    const len = 6 + stage * 4 + (i % 3);
    leaflet(p, 32, 58 - stage, Math.sin(ang), -Math.cos(ang) * 0.85, len);
  }
  if (stage >= 2) {
    const roots = stage === 3 ? 3 : 1;
    for (let i = 0; i < roots; i++) {
      const x = 24 + i * 8;
      p.disc(x, 60, 3, stage === 3 ? 5 : 3, 0xe07020);
      p.disc(x - 1, 59, 1.2, 2, 0xffb060);
      p.set(x, 56, 0x8a4a12);
    }
  }
}

function corn(p, stage) {
  const h = [14, 28, 44, 56][stage];
  stem(p, 31, 63 - h, 62, 0x3a8a28);
  const leaves = [1, 2, 4, 6][stage];
  for (let i = 0; i < leaves; i++) {
    const y = 62 - 6 - i * (h / leaves);
    const dir = i % 2 ? 1 : -1;
    const len = 8 + stage * 3;
    for (let k = 0; k < len; k++) {
      const droop = k > len * 0.6 ? 1 : 0;
      p.set(32 + dir * k, y + droop + (k > 4 ? 1 : 0), k % 2 ? G[2] : G[1]);
      if (k > 2) p.set(32 + dir * k, y + droop + 1, G[0]);
    }
  }
  if (stage >= 2) {
    const ears = stage === 3 ? [[22, 40], [42, 36]] : [[24, 44]];
    for (const [x, y] of ears) {
      p.disc(x, y, stage === 3 ? 5 : 3, stage === 3 ? 8 : 5, 0x6aaa30);
      p.disc(x, y + 1, stage === 3 ? 3 : 2, stage === 3 ? 6 : 3, 0xf0d040);
      for (let row = -4; row <= 4; row++) for (let col = -1; col <= 1; col++) {
        p.set(x + col * 2, y + row, (row + col) % 2 ? 0xffe060 : 0xe2b020);
      }
      p.set(x, y - (stage === 3 ? 8 : 5), 0xc9a43a);
    }
  }
}

function potato(p, stage) {
  const clumps = [2, 3, 5, 6][stage];
  for (let i = 0; i < clumps; i++) {
    const x = 10 + (i * 9) % 44;
    const y = 36 + (i % 3) * 8;
    const rx = 6 + stage * 2;
    p.disc(x, y, rx, 4 + stage, G[(i + stage) % 4]);
    p.disc(x - 2, y - 1, Math.max(2, rx - 3), 2, G[2]);
    p.line(x, y + 4, x, 62, G[3]);
  }
  if (stage >= 2) {
    const flowers = stage === 3 ? [[16, 22], [34, 16], [48, 24], [28, 30]] : [[30, 24]];
    for (const [x, y] of flowers) {
      for (const [dx, dy] of [[-3, 0], [3, 0], [0, -3], [0, 3], [-2, -2], [2, -2]]) p.set(x + dx, y + dy, 0xf2e8ff);
      p.disc(x, y, 2, 2, 0xf6c945);
      p.set(x, y, 0xe0a020);
    }
  }
  if (stage === 3) {
    p.disc(14, 60, 4, 2.4, 0xd6ad62);
    p.disc(46, 61, 3, 2, 0xc99c52);
    p.set(13, 60, 0x9c7438);
    p.set(47, 60, 0x9c7438);
  }
}

const DRAW = {
  potato0: (p) => potato(p, 0),
  potato1: (p) => potato(p, 1),
  potato2: (p) => potato(p, 2),
  potato3: (p) => potato(p, 3),
  wheat0: (p) => wheat(p, 0),
  wheat1: (p) => wheat(p, 1),
  wheat2: (p) => wheat(p, 2),
  wheat3: (p) => wheat(p, 3),
  carrot0: (p) => carrot(p, 0),
  carrot1: (p) => carrot(p, 1),
  carrot2: (p) => carrot(p, 2),
  carrot3: (p) => carrot(p, 3),
  corn0: (p) => corn(p, 0),
  corn1: (p) => corn(p, 1),
  corn2: (p) => corn(p, 2),
  corn3: (p) => corn(p, 3),
};

let cache = null;

export function buildCropAtlas() {
  if (cache) return cache;
  const names = Object.keys(DRAW);
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = S * COLS;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const index = {};
  names.forEach((name, i) => {
    const p = new P(hashString('crop:' + name));
    DRAW[name](p);
    p.outline(0x1a2a14);
    ctx.putImageData(new ImageData(p.d, S, S), (i % COLS) * S, Math.floor(i / COLS) * S);
    index[name] = i;
  });
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  const SIZE = S * COLS;
  cache = {
    texture,
    uv(name) {
      const i = index[name] ?? 0;
      const col = i % COLS, row = Math.floor(i / COLS);
      const u0 = (col * S) / SIZE, u1 = ((col + 1) * S) / SIZE;
      const v1 = 1 - (row * S) / SIZE, v0 = 1 - ((row + 1) * S) / SIZE;
      return [u0, v0, u1, v1];
    },
  };
  return cache;
}
