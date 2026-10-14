// ボクセルの世界：ブロックの並び、島の生成、光（空の光・ランタンの光）、視線の当たり（raycast）、歩ける床の高さ。
// 座標はブロック 1 個 = 1。ブロック (x, y, z) は [x, x+1] × [y, y+1] × [z, z+1] を占める。
import { B, BLOCKS, isCrop } from './blocks.js';
import { CROPS, cropHeight } from '../crops.js';
import { mulberry32 } from '../../core/rng.js';
import { smoothstep, lerp } from '../../core/math.js';

export const WX = 96, WY = 32, WZ = 96;
export const CHUNK = 16;
export const SEA = 8;      // 海の水は y < SEA（水面は y = 7 の上）
export const GY = 9;       // 台地の地面（草）の y。立つ高さは 10
const N = WX * WY * WZ;

// Farm stays the same footprint; island grew around it (+16 offset from old 64³ map).
const OX = 16, OZ = 16;
export const LAYOUT = {
  center: [32 + OX, 32 + OZ],
  fieldA: { x0: 21 + OX, x1: 29 + OX, z0: 30 + OZ, z1: 38 + OZ, water: [25 + OX, 34 + OZ] },
  fieldB: { x0: 31 + OX, x1: 39 + OX, z0: 30 + OZ, z1: 38 + OZ, water: [35 + OX, 34 + OZ] },
  pathX: 30 + OX,
  // Larger lodge: room for charging dock, 3 beds (player + 2 guests), stairs to roof
  house: { x0: 24 + OX, x1: 36 + OX, z0: 16 + OZ, z1: 26 + OZ, door: [30 + OX, 26 + OZ] },
  bed: [25 + OX, 18 + OZ], // player bed (head); foot at z+1
  beds: [
    [25 + OX, 18 + OZ], // player
    [25 + OX, 21 + OZ], // guest 1
    [25 + OX, 24 + OZ], // guest 2
  ],
  // Night charging row — backs to north wall, faces into the room (main + 2 helpers)
  charge: [
    [27 + OX, 17 + OZ],
    [30 + OX, 17 + OZ],
    [33 + OX, 17 + OZ],
  ],
  box: [38 + OX, 27 + OZ],
  pond: [42.5 + OX, 42.5 + OZ],
  farmZone: { x0: 19 + OX, x1: 41 + OX, z0: 28 + OZ, z1: 40 + OZ },
  spawn: [30.5 + OX, GY + 1, 27.5 + OZ],
  posts: [[20 + OX, 29 + OZ], [40 + OX, 29 + OZ], [20 + OX, 39 + OZ], [40 + OX, 39 + OZ]],
  // Open-air pig sty east of the fields (gate faces the farm)
  pigPen: { x0: 43 + OX, x1: 51 + OX, z0: 29 + OZ, z1: 37 + OZ, gateX: 43 + OX, gateZ0: 32 + OZ, gateZ1: 34 + OZ },
  // Beach opens past the fields (+Z), in front of the lodge door — not behind the house
  beachDir: Math.PI / 2,
  beachHalfWidth: 0.95,
};

// ---- 値ノイズ（生成用）
function hash2(x, y, s) {
  let h = Math.imul(x | 0, 0x27d4eb2d) ^ Math.imul(y | 0, 0x165667b1) ^ Math.imul(s | 0, 0x9e3779b9);
  h = Math.imul(h ^ (h >>> 15), 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}
function vnoise(x, y, s) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = hash2(xi, yi, s), b = hash2(xi + 1, yi, s), c = hash2(xi, yi + 1, s), d = hash2(xi + 1, yi + 1, s);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function fbm(x, y, s, oct = 3) {
  let sum = 0, amp = 1, f = 1, norm = 0;
  for (let i = 0; i < oct; i++) { sum += amp * vnoise(x * f, y * f, s + i * 17); norm += amp; amp *= 0.5; f *= 2; }
  return sum / norm;
}

const inRect = (x, z, r, pad = 0) => x >= r.x0 - pad && x <= r.x1 + pad && z >= r.z0 - pad && z <= r.z1 + pad;

export class World {
  constructor(seed = 20261007) {
    this.seed = seed;
    this.data = new Uint8Array(N);
    this.base = null;            // 生成した直後の並び（セーブの差分と、穴を埋めるときの元の形）
    this.sky = new Uint8Array(N);
    this.blk = new Uint8Array(N);
    this.floor = new Int8Array(WX * WZ);   // 歩ける床の高さ（立つ y）。-1 は立てない
    this.water = new Uint8Array(WX * WZ); // 床が水の中なら 1
    this.dirty = new Set();       // 作り直すチャンク（cx + cz * 4）
    this.lightDirty = false;
    this.navDirty = new Set();
    this.spawnCells = [];         // 緑のアレが出てくる候補
    this.pigCells = [];
  }

  idx(x, y, z) { return x + WX * (z + WZ * y); }
  inside(x, y, z) { return x >= 0 && y >= 0 && z >= 0 && x < WX && y < WY && z < WZ; }
  get(x, y, z) {
    if (y < 0) return B.BEDROCK;
    if (x < 0 || z < 0 || x >= WX || z >= WZ || y >= WY) return B.AIR;
    return this.data[x + WX * (z + WZ * y)];
  }
  def(x, y, z) { return BLOCKS[this.get(x, y, z)]; }
  baseAt(x, y, z) { return this.inside(x, y, z) ? this.base[this.idx(x, y, z)] : B.AIR; }

  /** ブロックを置き換える。見た目・光・歩ける床の作り直しを予約する。 */
  set(x, y, z, id) {
    if (!this.inside(x, y, z)) return;
    const i = this.idx(x, y, z);
    const old = this.data[i];
    if (old === id) return;
    this.data[i] = id;
    const a = BLOCKS[old], b = BLOCKS[id];
    if (a.opaque !== b.opaque || a.light !== b.light || a.skyAtten !== b.skyAtten) this.lightDirty = true;
    this.markDirty(x, z);
    for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) {
      const nx = x + dx, nz = z + dz;
      if (nx >= 0 && nz >= 0 && nx < WX && nz < WZ) this.navDirty.add(nx + nz * WX);
    }
  }

  markDirty(x, z) {
    const cx = x >> 4, cz = z >> 4;
    for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) {
      // AO と光は隣のブロックも見るので、チャンクの端なら隣のチャンクも
      const ex = (x + dx) >> 4, ez = (z + dz) >> 4;
      if (ex < 0 || ez < 0 || ex >= WX / CHUNK || ez >= WZ / CHUNK) continue;
      if (ex !== cx || ez !== cz || (dx === 0 && dz === 0)) this.dirty.add(ex + ez * (WX / CHUNK));
    }
  }

  // ------------------------------------------------------------------ 生成
  generate() {
    const S = this.seed;
    const rng = mulberry32(S);
    const d = this.data;
    d.fill(0);
    const [cx, cz] = LAYOUT.center;
    const top = new Int8Array(WX * WZ);
    const angDist = (a, b) => {
      let dd = Math.abs(a - b) % (Math.PI * 2);
      if (dd > Math.PI) dd = Math.PI * 2 - dd;
      return dd;
    };
    for (let z = 0; z < WZ; z++) for (let x = 0; x < WX; x++) {
      const dx = x + 0.5 - cx, dz = z + 0.5 - cz;
      const r = Math.hypot(dx, dz);
      const ang = Math.atan2(dz, dx);
      // Island stretches farther toward the beach (+Z) so green lawn stays large
      let R = 40.5 + (fbm(Math.cos(ang) * 1.6 + 7, Math.sin(ang) * 1.6 + 7, S, 2) - 0.5) * 9;
      const beachGate = angDist(ang, LAYOUT.beachDir) < LAYOUT.beachHalfWidth;
      if (beachGate) R += 10;
      const t = r / R;
      let h;
      if (t >= 1) h = SEA - 2 - Math.min(3, (t - 1) * 14);
      else {
        const hill = fbm(x * 0.09, z * 0.09, S + 1, 3);
        const shore = smoothstep(1.0, 0.86, t);
        let ring = smoothstep(0.5, 0.7, t) * (1 - smoothstep(0.84, 0.97, t));
        // Never lower the grass / crop plateau — only open water far past the lawn
        if (beachGate) ring *= 0.04;
        const deepSea = z > LAYOUT.farmZone.z1 + 16;
        if (deepSea) ring *= 0.05;
        h = SEA - 1 + shore * 2.2 + ring * (hill * 6.5 + 0.5) + (hill - 0.5) * 1.2 * shore;
        if (beachGate && deepSea && t > 0.6) {
          const beachH = SEA + 0.15 + shore * 1.2 + (1 - t) * 1.5;
          h = lerp(h, beachH, smoothstep(0.6, 0.88, t));
        }
        const flat = 1 - smoothstep(15.5, 19.5, r);
        // Keep GY plateau further toward the sea before any drop
        const lawnFlat = beachGate ? (1 - smoothstep(20, 30, r)) : 0;
        h = lerp(h, GY, Math.max(flat, lawnFlat));
        // Cap height only deep past the lawn — never next to the fields
        if (deepSea && t > 0.78) h = Math.min(h, SEA + 1.0);
      }
      const gy = Math.max(2, Math.min(WY - 8, Math.round(h)));
      top[x + z * WX] = gy;
      const beach = (gy <= SEA + 1 && t > 0.72) || (beachGate && t > 0.58 && gy <= GY - 1);
      for (let y = 0; y <= gy; y++) {
        let id;
        if (y === 0) id = B.BEDROCK;
        else if (y < gy - 3) id = B.STONE;
        else if (y < gy) id = beach || gy < SEA - 1 ? B.SAND : B.DIRT;
        else id = beach || gy < SEA - 1 ? (gy < SEA - 2 && hash2(x, z, S + 5) < 0.25 ? B.GRAVEL : B.SAND) : B.GRASS;
        d[this.idx(x, y, z)] = id;
      }
      for (let y = gy + 1; y < SEA; y++) d[this.idx(x, y, z)] = B.WATER;
    }

    const put = (x, y, z, id) => { if (this.inside(x, y, z)) d[this.idx(x, y, z)] = id; };
    const at = (x, y, z) => (this.inside(x, y, z) ? d[this.idx(x, y, z)] : B.AIR);

    // 畑（A は耕して植えてある、B はまだ草地）と、水路
    // Planted plots cycle potato / wheat / carrot / corn evenly (same stage layout as before).
    const A = LAYOUT.fieldA, Bf = LAYOUT.fieldB;
    let plantI = 0;
    for (let z = A.z0; z <= A.z1; z++) for (let x = A.x0; x <= A.x1; x++) {
      put(x, GY, z, B.FARM_WET);
      const col = x - A.x0;
      let stage = -1;
      if (col <= 1) stage = 3;
      else if (col <= 5) stage = Math.floor(rng() * 3);
      if (stage >= 0) {
        const def = CROPS[plantI % CROPS.length];
        plantI++;
        put(x, GY + 1, z, def.stages[stage]);
      }
    }
    put(A.water[0], GY, A.water[1], B.WATER);
    put(A.water[0], GY + 1, A.water[1], B.AIR);
    put(Bf.water[0], GY, Bf.water[1], B.WATER);
    // 小道（家から畑のあいだへ）— 3 wide to match the door
    for (let z = LAYOUT.house.z1 + 1; z <= A.z1 + 1; z++) {
      for (let dx = -1; dx <= 1; dx++) put(LAYOUT.pathX + dx, GY, z, B.PATH);
    }
    for (let x = A.x0 - 1; x <= Bf.x1 + 1; x++) put(x, GY, A.z0 - 1, B.PATH);

    // Lodge — larger interior, beds for players, charging dock for robots, stairs to roof
    const H = LAYOUT.house;
    for (let z = H.z0; z <= H.z1; z++) for (let x = H.x0; x <= H.x1; x++) {
      put(x, GY, z, B.COBBLE);
      const edge = x === H.x0 || x === H.x1 || z === H.z0 || z === H.z1;
      const corner = (x === H.x0 || x === H.x1) && (z === H.z0 || z === H.z1);
      for (let y = GY + 1; y <= GY + 3; y++) put(x, y, z, edge ? (corner ? B.LOG : B.PLANKS) : B.AIR);
    }
    const hx = (H.x0 + H.x1) >> 1;
    // Windows
    // Windows — keep north wall solid behind the charging bays
    for (const [x, z] of [
      [H.x0, H.z0 + 3], [H.x0, H.z0 + 5], [H.x0, H.z0 + 7],
      [H.x1, H.z0 + 3], [H.x1, H.z0 + 5], [H.x1, H.z0 + 7],
      [hx - 3, H.z1], [hx + 3, H.z1],
    ]) put(x, GY + 2, z, B.GLASS);
    // Door (farm side) — 3 wide × 3 tall
    for (let dx = -1; dx <= 1; dx++) {
      for (let y = GY + 1; y <= GY + 3; y++) put(H.door[0] + dx, y, H.door[1], B.AIR);
    }
    // Flat walkable roof + low parapet (stair hatch carved below)
    for (let z = H.z0; z <= H.z1; z++) for (let x = H.x0; x <= H.x1; x++) {
      put(x, GY + 4, z, B.PLANKS);
      for (let y = GY + 5; y <= GY + 7; y++) put(x, y, z, B.AIR);
    }
    for (let z = H.z0; z <= H.z1; z++) for (let x = H.x0; x <= H.x1; x++) {
      const edge = x === H.x0 || x === H.x1 || z === H.z0 || z === H.z1;
      if (edge) put(x, GY + 5, z, B.COBBLE);
    }
    // L-shaped plank stairs (SE) floor → roof — wide open shaft for 1.8-tall player
    const sx = H.x1 - 2, sz0 = H.z1 - 5;
    for (let i = 0; i < 3; i++) {
      const sz = sz0 + i;
      const sy = GY + 1 + i;
      put(sx, sy, sz, B.STAIRS_Z);
      put(sx - 1, sy, sz, B.STAIRS_Z);
      // Clear headroom above each tread (through roof + parapet)
      for (let y = sy + 1; y <= GY + 6; y++) {
        put(sx, y, sz, B.AIR);
        put(sx - 1, y, sz, B.AIR);
      }
    }
    // Approach cell — open ceiling so the first step-up isn't a head-bonk
    for (let y = GY + 2; y <= GY + 5; y++) {
      put(sx, y, sz0 - 1, B.AIR);
      put(sx - 1, y, sz0 - 1, B.AIR);
    }
    // Hatch out onto the roof
    put(sx, GY + 4, sz0 + 2, B.AIR);
    put(sx - 1, GY + 4, sz0 + 2, B.AIR);
    put(sx, GY + 5, sz0 + 2, B.AIR);
    put(sx - 1, GY + 5, sz0 + 2, B.AIR);
    // Roof lantern
    put(hx, GY + 5, (H.z0 + H.z1) >> 1, B.LANTERN);

    // Three beds along west wall (player + 2 guests) — robots do NOT use these
    for (const [bx, bz] of (LAYOUT.beds || [LAYOUT.bed])) {
      put(bx, GY + 1, bz, B.BED);
      put(bx, GY + 1, bz + 1, B.BED_FOOT);
    }
    // Charging bay floor strips (north wall) — keep clear for dock meshes + robots
    for (const [cx, cz] of (LAYOUT.charge || [])) {
      put(cx, GY, cz, B.COBBLE);
      put(cx, GY + 1, cz, B.AIR);
      put(cx, GY + 2, cz, B.AIR);
      // Solid wall panel cell behind each bay (no glass)
      put(cx, GY + 1, H.z0, B.PLANKS);
      put(cx, GY + 2, H.z0, B.PLANKS);
      put(cx, GY + 3, H.z0, B.PLANKS);
    }
    put(hx - 4, GY + 1, H.z0 + 2, B.HAY);
    put(hx - 3, GY + 1, H.z0 + 2, B.HAY);
    // 家のまわり
    put(LAYOUT.box[0], GY + 1, LAYOUT.box[1], B.BOX);
    put(H.x1 + 2, GY + 1, H.z0 + 2, B.HAY); put(H.x1 + 2, GY + 1, H.z0 + 3, B.HAY); put(H.x1 + 2, GY + 2, H.z0 + 2, B.HAY);
    // Lanterns flanking the wider doorway
    put(hx - 2, GY + 1, H.z1 + 1, B.LANTERN); put(hx + 2, GY + 1, H.z1 + 1, B.LANTERN);
    for (const [x, z] of LAYOUT.posts) { put(x, GY + 1, z, B.LOG); put(x, GY + 2, z, B.LANTERN); }
    // Short path from farm edge toward the shore (only on already-non-crop cells)
    for (let z = LAYOUT.farmZone.z1 + 1; z <= Math.min(WZ - 3, LAYOUT.farmZone.z1 + 6); z++) {
      for (let dx = -1; dx <= 1; dx++) {
        const x = LAYOUT.pathX + dx;
        const gnd = at(x, GY, z);
        if (gnd === B.GRASS || gnd === B.DIRT || gnd === B.SAND) {
          put(x, GY, z, B.PATH);
          put(x, GY + 1, z, B.AIR);
        }
      }
    }

    // ── Beach shelf PAST the green lawn, expanding INTO the sea ──
    // Lawn (house → fields → belt) stays grass forever.
    // Past lawnZ1 we FORCE a wide flat sand pad (convert leftover island grass + water).
    {
      const Fz = LAYOUT.farmZone;
      const lawnZ1 = Fz.z1 + 12; // protected green — never sand
      const sandStart = lawnZ1 + 1;
      // Sand shelf, then FORCE open water. The enlarged island radius runs off the
      // 96-map, so z past the shelf was still GY land and boats sat in the sand.
      const depth = 11;
      const xMid = LAYOUT.pathX;
      const halfW = 28;
      const hy = GY;

      // 1) Restore lawn grass (undo any prior sand eat)
      for (let z = LAYOUT.house.z0; z <= lawnZ1; z++) {
        for (let x = Math.min(LAYOUT.house.x0, Fz.x0) - 2; x <= Math.max(LAYOUT.pigPen.x1, Fz.x1) + 2; x++) {
          if (!this.inside(x, GY, z)) continue;
          if (inRect(x, z, A, 0) || inRect(x, z, Bf, 0)) continue;
          if (inRect(x, z, LAYOUT.house, 0)) continue;
          if (at(x, GY, z) === B.SAND || at(x, GY, z) === B.GRAVEL || at(x, GY, z) === B.WATER) {
            put(x, GY, z, B.GRASS);
            for (let y = GY + 1; y <= GY + 2; y++) {
              if (at(x, y, z) === B.SAND || at(x, y, z) === B.WATER) put(x, y, z, B.AIR);
            }
            top[x + z * WX] = GY;
          }
        }
      }

      const stampSand = (x, z) => {
        if (!this.inside(x, hy, z)) return;
        if (z < sandStart || z > sandStart + depth) return;
        if (inRect(x, z, LAYOUT.house, 2)) return;
        if (inRect(x, z, LAYOUT.pigPen, 1)) return;
        if (inRect(x, z, LAYOUT.farmZone, 0)) return;
        if (inRect(x, z, A, 0) || inRect(x, z, Bf, 0)) return;
        if (isCrop(at(x, GY + 1, z))) return;
        // Flat GY sand pad — may replace grass/water/air ONLY past the lawn
        for (let y = 1; y <= hy; y++) {
          put(x, y, z, y === hy ? B.SAND : (y > hy - 3 ? B.SAND : B.STONE));
        }
        for (let y = hy + 1; y < WY - 1; y++) put(x, y, z, B.AIR);
        top[x + z * WX] = hy;
      };

      for (let z = sandStart; z <= Math.min(WZ - 5, sandStart + depth); z++) {
        for (let x = xMid - halfW; x <= xMid + halfW; x++) {
          const side = Math.abs(x - xMid) / halfW;
          if (side > 0.93) continue;
          stampSand(x, z);
        }
      }

      // Path on lawn (grass) then onto beach sand — same GY, no drop
      for (let z = Fz.z1 + 1; z <= lawnZ1; z++) {
        for (let dx = -1; dx <= 1; dx++) {
          const x = LAYOUT.pathX + dx;
          if (!this.inside(x, GY, z)) continue;
          if (at(x, GY, z) === B.SAND) put(x, GY, z, B.GRASS);
          put(x, GY, z, B.PATH);
          put(x, GY + 1, z, B.AIR);
          top[x + z * WX] = GY;
        }
      }
      // Short entrance only — do not cut a dirt road through the resort sand
      const beachEnd = Math.min(WZ - 8, sandStart + depth);
      for (let z = sandStart; z <= sandStart + 2; z++) {
        for (let dx = -1; dx <= 1; dx++) {
          const x = LAYOUT.pathX + dx;
          if (at(x, GY, z) === B.SAND) {
            put(x, GY, z, B.PATH);
            put(x, GY + 1, z, B.AIR);
          }
        }
      }
      // Shallow sea that belongs to the map: one-block steps down from the sand,
      // then a wading floor at the waterline so you can walk out and back.
      // No voxel water — that reads as a dark pool above the ocean sheet.
      const seaZ0 = beachEnd + 1;
      for (let z = seaZ0; z < WZ; z++) {
        const steps = Math.min(2, z - seaZ0);
        const topY = GY - steps;
        for (let x = 0; x < WX; x++) {
          if (!this.inside(x, GY, z)) continue;
          if (z <= lawnZ1 || inRect(x, z, LAYOUT.farmZone, 0) || inRect(x, z, LAYOUT.house, 1)) continue;
          for (let y = 1; y <= topY; y++) put(x, y, z, y >= topY - 1 ? B.SAND : B.STONE);
          for (let y = topY + 1; y < WY - 1; y++) put(x, y, z, B.AIR);
          top[x + z * WX] = topY;
        }
      }
      // Wooden pier from the sand path out over the shallows, with posts.
      const pierZ0 = Math.max(sandStart, beachEnd - 1);
      const pierZ1 = Math.min(WZ - 3, seaZ0 + 14);
      for (let z = pierZ0; z <= pierZ1; z++) {
        for (let dx = -1; dx <= 1; dx++) {
          const x = xMid + dx;
          if (!this.inside(x, GY, z)) continue;
          if ((z - pierZ0) % 3 === 0) {
            for (let y = 5; y < GY; y++) put(x, y, z, B.LOG);
          }
          put(x, GY, z, B.PLANKS);
          for (let y = GY + 1; y < WY - 1; y++) if (at(x, y, z) !== B.AIR) put(x, y, z, B.AIR);
          top[x + z * WX] = GY;
        }
      }
      LAYOUT.pier = { x: xMid, z0: pierZ0, z1: pierZ1 };
      LAYOUT.beach = { x0: xMid - halfW, x1: xMid + halfW, z0: sandStart, z1: beachEnd };
      LAYOUT.lawnZ1 = lawnZ1;
      LAYOUT.waterLineZ = seaZ0;
    }

    // Re-stamp crop beds
    {
      for (let z = A.z0; z <= A.z1; z++) for (let x = A.x0; x <= A.x1; x++) {
        if (at(x, GY, z) !== B.FARM_WET && at(x, GY, z) !== B.FARM) put(x, GY, z, B.FARM_WET);
      }
      for (let z = Bf.z0; z <= Bf.z1; z++) for (let x = Bf.x0; x <= Bf.x1; x++) {
        if (at(x, GY, z) === B.SAND || at(x, GY, z) === B.WATER) put(x, GY, z, B.GRASS);
      }
      for (let z = LAYOUT.farmZone.z0; z <= LAYOUT.farmZone.z1; z++) {
        for (let x = LAYOUT.farmZone.x0; x <= LAYOUT.farmZone.x1; x++) {
          if (inRect(x, z, A, 0) || inRect(x, z, Bf, 0)) continue;
          if (at(x, GY, z) === B.SAND || at(x, GY, z) === B.WATER) {
            put(x, GY, z, B.GRASS);
            put(x, GY + 1, z, B.AIR);
            top[x + z * WX] = GY;
          }
        }
      }
    }

    // Pig sty — open wooden fence, clear sky, ground apples (not a leaf bunker)
    const PP = LAYOUT.pigPen;
    const isGate = (x, z) => x === PP.gateX && z >= PP.gateZ0 && z <= PP.gateZ1;
    const isCorner = (x, z) => (x === PP.x0 || x === PP.x1) && (z === PP.z0 || z === PP.z1);
    const isPost = (x, z) => {
      if (!(x === PP.x0 || x === PP.x1 || z === PP.z0 || z === PP.z1)) return false;
      if (isCorner(x, z)) return true;
      if (x === PP.x0 || x === PP.x1) return ((z - PP.z0) % 2) === 0;
      return ((x - PP.x0) % 2) === 0;
    };
    // Clear yard: grass floor, empty air above
    for (let z = PP.z0; z <= PP.z1; z++) for (let x = PP.x0; x <= PP.x1; x++) {
      put(x, GY, z, B.GRASS);
      for (let y = GY + 1; y <= GY + 5; y++) put(x, y, z, B.AIR);
    }
    // Path from farm → gate → short aisle inside
    for (let x = LAYOUT.fieldB.x1 + 1; x <= PP.gateX + 2; x++) {
      for (let z = PP.gateZ0; z <= PP.gateZ1; z++) {
        put(x, GY, z, B.PATH);
        put(x, GY + 1, z, B.AIR);
      }
    }
    // Fence: log posts + plank rails; lanterns on corners + gate posts
    const isGatePost = (x, z) => x === PP.gateX && (z === PP.gateZ0 - 1 || z === PP.gateZ1 + 1);
    for (let z = PP.z0; z <= PP.z1; z++) for (let x = PP.x0; x <= PP.x1; x++) {
      const edge = x === PP.x0 || x === PP.x1 || z === PP.z0 || z === PP.z1;
      if (!edge || isGate(x, z)) continue;
      if (isPost(x, z)) {
        put(x, GY + 1, z, B.LOG);
        if (isCorner(x, z) || isGatePost(x, z)) put(x, GY + 2, z, B.LANTERN);
      } else put(x, GY + 1, z, B.PLANKS);
    }
    const penCx = (PP.x0 + PP.x1) >> 1;
    const penCz = (PP.z0 + PP.z1) >> 1;
    // Hay piles along the back (away from gate)
    put(penCx - 1, GY + 1, PP.z1 - 1, B.HAY);
    put(penCx, GY + 1, PP.z1 - 1, B.HAY);
    put(penCx + 1, GY + 1, PP.z1 - 1, B.HAY);
    put(penCx, GY + 2, PP.z1 - 1, B.HAY);
    // Small central sapling — leaf cross only at the top, far from the fence
    put(penCx, GY, penCz, B.DIRT);
    put(penCx, GY + 1, penCz, B.LOG);
    put(penCx, GY + 2, penCz, B.LOG);
    put(penCx, GY + 3, penCz, B.LEAVES);
    for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) put(penCx + dx, GY + 3, penCz + dz, B.LEAVES);
    put(penCx, GY + 4, penCz, B.LEAVES);
    // Apples on the ground (bait)
    for (const [ax, az] of [[penCx - 2, penCz], [penCx + 2, penCz], [penCx, penCz + 2], [penCx - 1, penCz + 1], [penCx + 1, penCz - 1], [penCx + 2, penCz + 1]]) {
      if (ax > PP.x0 && ax < PP.x1 && az > PP.z0 && az < PP.z1 && at(ax, GY + 1, az) === B.AIR) put(ax, GY + 1, az, B.APPLE);
    }

    // 池とサトウキビ（アストラがこわがる）
    const [px, pz] = LAYOUT.pond;
    for (let z = Math.floor(pz - 5); z <= pz + 5; z++) for (let x = Math.floor(px - 5); x <= px + 5; x++) {
      const r = Math.hypot(x + 0.5 - px, z + 0.5 - pz);
      if (r <= 2.7) { put(x, GY, z, B.WATER); if (r <= 1.6) put(x, GY - 1, z, B.WATER); for (let y = GY + 1; y < GY + 4; y++) put(x, y, z, B.AIR); }
      else if (r <= 3.7 && at(x, GY, z) === B.GRASS) put(x, GY, z, B.SAND);
    }
    for (let z = Math.floor(pz - 5); z <= pz + 5; z++) for (let x = Math.floor(px - 5); x <= px + 5; x++) {
      if (at(x, GY, z) !== B.SAND) continue;
      const nearWater = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([a, b]) => at(x + a, GY, z + b) === B.WATER);
      if (nearWater && rng() < 0.55) { const h = 2 + Math.floor(rng() * 2); for (let k = 1; k <= h; k++) put(x, GY + k, z, B.CANE); }
    }
    // スイカ（緑。アストラは育てない）
    let melons = 0;
    for (let tries = 0; tries < 80 && melons < 2; tries++) {
      const a = rng() * Math.PI * 2, r = 4.6 + rng();
      const x = Math.floor(px + Math.cos(a) * r), z = Math.floor(pz + Math.sin(a) * r);
      if (at(x, GY, z) === B.GRASS && at(x, GY + 1, z) === B.AIR && !inRect(x, z, LAYOUT.farmZone)) { put(x, GY + 1, z, B.MELON); melons++; }
    }

    // 木（台地のまわりと丘）
    const trees = [];
    const keepOut = (x, z) => inRect(x, z, LAYOUT.farmZone, 2) || inRect(x, z, H, 3) || inRect(x, z, LAYOUT.pigPen, 2) || Math.hypot(x - px, z - pz) < 7;
    for (let tries = 0; tries < 520 && trees.length < 28; tries++) {
      const x = 3 + Math.floor(rng() * (WX - 6)), z = 3 + Math.floor(rng() * (WZ - 6));
      const gy = top[x + z * WX];
      const r = Math.hypot(x + 0.5 - cx, z + 0.5 - cz);
      if (r < 14 || gy < SEA || at(x, gy, z) !== B.GRASS || keepOut(x, z)) continue;
      // Keep the farm-facing beach opening clear of trees
      if (angDist(Math.atan2(z + 0.5 - cz, x + 0.5 - cx), LAYOUT.beachDir) < LAYOUT.beachHalfWidth * 0.9 && r > 16) continue;
      if (z > LAYOUT.farmZone.z1 + 2) continue;
      if (trees.some(([a, b]) => Math.hypot(a - x, b - z) < 4.2)) continue;
      trees.push([x, z]);
      const h = 4 + Math.floor(rng() * 2);
      put(x, gy, z, B.DIRT);
      for (let k = 1; k <= h; k++) put(x, gy + k, z, B.LOG);
      for (let ly = gy + h - 2; ly <= gy + h + 1; ly++) {
        const rad = ly >= gy + h ? 1 : 2;
        for (let dz = -rad; dz <= rad; dz++) for (let dx = -rad; dx <= rad; dx++) {
          if (Math.abs(dx) === rad && Math.abs(dz) === rad && (ly === gy + h + 1 || rng() < 0.5)) continue;
          if (at(x + dx, ly, z + dz) === B.AIR) put(x + dx, ly, z + dz, B.LEAVES);
        }
      }
    }

    // 草と花
    for (let z = 1; z < WZ - 1; z++) for (let x = 1; x < WX - 1; x++) {
      const gy = top[x + z * WX];
      if (at(x, gy, z) !== B.GRASS || at(x, gy + 1, z) !== B.AIR) continue;
      if (inRect(x, z, LAYOUT.farmZone, 1) || inRect(x, z, H, 2) || inRect(x, z, LAYOUT.pigPen, 1) || x === LAYOUT.pathX) continue;
      const n = fbm(x * 0.2, z * 0.2, S + 9, 2);
      const v = rng();
      if (v < 0.03) put(x, gy + 1, z, rng() < 0.5 ? B.FLOWER_R : B.FLOWER_Y);
      else if (v < 0.03 + n * 0.32) put(x, gy + 1, z, B.TALLGRASS);
    }

    this.base = d.slice();
    this.recomputeLight(true);
    this.computeNav();
    this.collectSpawns();
    for (let i = 0; i < (WX / CHUNK) * (WZ / CHUNK); i++) this.dirty.add(i);
  }

  collectSpawns() {
    const [cx, cz] = LAYOUT.center;
    this.spawnCells = [];
    this.pigCells = [];
    const beach = LAYOUT.beach;
    const shore = LAYOUT.waterLineZ ?? (beach?.z1 ?? 80) + 1;
    const z0 = Math.max(LAYOUT.house.z1 + 2, (beach?.z0 ?? shore - 8));
    const z1 = Math.min(WZ - 3, shore + 8);
    const x0 = Math.max(2, (beach?.x0 ?? 8) + 1);
    const x1 = Math.min(WX - 3, (beach?.x1 ?? WX - 8) - 1);
    for (let z = 2; z < WZ - 2; z++) for (let x = 2; x < WX - 2; x++) {
      const i = x + z * WX;
      const f = this.floor[i];
      if (f < SEA || this.water[i]) continue;
      if (BLOCKS[this.get(x, f - 1, z)].cutout) continue;
      const r = Math.hypot(x + 0.5 - cx, z + 0.5 - cz);
      if (z < LAYOUT.house.z0) continue;
      // Every pest comes out of the shore and the shallows, never from behind the lodge.
      if (z >= z0 && z <= z1 && x >= x0 && x <= x1) this.spawnCells.push(i);
      if (r > 14 && r < 28 && !inRect(x, z, LAYOUT.farmZone, 2)) this.pigCells.push(i);
    }
  }

  /** 生成した直後からの変化（セーブ用）。[[番号, id], …] */
  diff() {
    const out = [];
    for (let i = 0; i < N; i++) if (this.data[i] !== this.base[i]) out.push(i, this.data[i]);
    return out;
  }
  applyDiff(flat) {
    this.data.set(this.base);
    for (let k = 0; k + 1 < flat.length; k += 2) {
      const i = flat[k], id = flat[k + 1];
      if (i >= 0 && i < N && BLOCKS[id]) this.data[i] = id;
    }
    this.recomputeLight(true);
    this.computeNav();
    for (let i = 0; i < (WX / CHUNK) * (WZ / CHUNK); i++) this.dirty.add(i);
  }

  // ------------------------------------------------------------------ 光
  /** 空の光とランタンの光を全部計算し直す。変わったところのチャンクを作り直しに入れる。 */
  recomputeLight(all = false) {
    const oldSky = all ? null : this.sky.slice();
    const oldBlk = all ? null : this.blk.slice();
    const sky = this.sky, blk = this.blk, d = this.data;
    sky.fill(0); blk.fill(0);
    const opaque = new Uint8Array(BLOCKS.length), atten = new Uint8Array(BLOCKS.length), emit = new Uint8Array(BLOCKS.length);
    BLOCKS.forEach((b, i) => { if (b) { opaque[i] = b.opaque ? 1 : 0; atten[i] = b.skyAtten; emit[i] = b.light; } });
    const Q = new Int32Array(1 << 20);
    const MASK = Q.length - 1;
    const PLANE = WX * WZ;

    const bfs = (L, head, tail) => {
      while (head !== tail) {
        const i = Q[head]; head = (head + 1) & MASK;
        const lv = L[i];
        if (lv <= 1) continue;
        const x = i % WX, z = ((i / WX) | 0) % WZ, y = (i / PLANE) | 0;
        const nb = [x > 0 ? i - 1 : -1, x < WX - 1 ? i + 1 : -1, z > 0 ? i - WX : -1, z < WZ - 1 ? i + WX : -1, y > 0 ? i - PLANE : -1, y < WY - 1 ? i + PLANE : -1];
        for (let k = 0; k < 6; k++) {
          const j = nb[k];
          if (j < 0) continue;
          const id = d[j];
          if (opaque[id]) continue;
          const nl = lv - 1 - atten[id];
          if (nl > L[j]) { L[j] = nl; Q[tail] = j; tail = (tail + 1) & MASK; }
        }
      }
    };

    let tail = 0;
    for (let z = 0; z < WZ; z++) for (let x = 0; x < WX; x++) {
      let L = 15;
      for (let y = WY - 1; y >= 0; y--) {
        const i = x + WX * (z + WZ * y);
        const id = d[i];
        if (opaque[id]) break;
        L -= atten[id];
        if (L <= 0) break;
        sky[i] = L;
        Q[tail] = i; tail = (tail + 1) & MASK;
      }
    }
    bfs(sky, 0, tail);
    tail = 0;
    for (let i = 0; i < N; i++) if (emit[d[i]]) { blk[i] = emit[d[i]]; Q[tail++] = i; }
    bfs(blk, 0, tail);
    this.lightDirty = false;

    if (oldSky) {
      const per = WX / CHUNK;
      for (let i = 0; i < N; i++) {
        if (sky[i] !== oldSky[i] || blk[i] !== oldBlk[i]) {
          const x = i % WX, z = ((i / WX) | 0) % WZ;
          this.dirty.add((x >> 4) + (z >> 4) * per);
          // 頂点の光は隣のブロックも混ぜるので、端なら隣のチャンクも
          if ((x & 15) === 0 && x > 0) this.dirty.add(((x - 1) >> 4) + (z >> 4) * per);
          if ((x & 15) === 15 && x < WX - 1) this.dirty.add(((x + 1) >> 4) + (z >> 4) * per);
          if ((z & 15) === 0 && z > 0) this.dirty.add((x >> 4) + ((z - 1) >> 4) * per);
          if ((z & 15) === 15 && z < WZ - 1) this.dirty.add((x >> 4) + ((z + 1) >> 4) * per);
        }
      }
    }
  }

  /** その場所の明るさ（0〜15 の空の光とランタンの光）。範囲の外は空の光 15。 */
  lightAt(x, y, z) {
    x = Math.floor(x); y = Math.floor(y); z = Math.floor(z);
    if (!this.inside(x, y, z)) return [y >= 0 ? 15 : 0, 0];
    const i = this.idx(x, y, z);
    return [this.sky[i], this.blk[i]];
  }

  // ------------------------------------------------------------------ 歩ける床
  floorAt(x, z) {
    // 下から見て、ぶつかるブロックの上に 2 マスの空きがある最初の高さ
    for (let y = 1; y < WY - 2; y++) {
      const below = BLOCKS[this.get(x, y - 1, z)];
      if (!below.solid) continue;
      if (BLOCKS[this.get(x, y, z)].solid || BLOCKS[this.get(x, y + 1, z)].solid) continue;
      return y;
    }
    return -1;
  }
  computeNav() {
    for (let z = 0; z < WZ; z++) for (let x = 0; x < WX; x++) this.updateNavCell(x, z);
    this.navDirty.clear();
  }
  updateNavCell(x, z) {
    const i = x + z * WX;
    const f = this.floorAt(x, z);
    this.floor[i] = f;
    this.water[i] = f >= 0 && (this.get(x, f, z) === B.WATER || this.get(x, f - 1, z) === B.WATER) ? 1 : 0;
  }
  flushNav() {
    if (!this.navDirty.size) return;
    for (const i of this.navDirty) this.updateNavCell(i % WX, (i / WX) | 0);
    this.navDirty.clear();
  }

  /** 上から見て、いちばん上の「乗れるもの」の上面の高さ（落ちてくるアイテムなど）。 */
  groundBelow(x, y, z) {
    const bx = Math.floor(x), bz = Math.floor(z);
    for (let by = Math.min(WY - 1, Math.floor(y)); by >= 0; by--) {
      const b = BLOCKS[this.get(bx, by, bz)];
      if (b.solid && by + b.h <= y + 1e-3) return by + b.h;
    }
    return 0;
  }

  // ------------------------------------------------------------------ 視線
  /**
   * DDA で視線の先のブロックを探す。pick(id) が true のブロックで止まる（既定は空気と水以外）。
   * 戻り値 { x, y, z, id, nx, ny, nz, dist } か null。n は当たった面の向き（そのブロックの外側）。
   */
  raycast(ox, oy, oz, dx, dy, dz, maxDist, pick = (id) => id !== B.AIR && id !== B.WATER) {
    let x = Math.floor(ox), y = Math.floor(oy), z = Math.floor(oz);
    const sx = dx > 0 ? 1 : dx < 0 ? -1 : 0, sy = dy > 0 ? 1 : dy < 0 ? -1 : 0, sz = dz > 0 ? 1 : dz < 0 ? -1 : 0;
    const adx = Math.abs(dx) || 1e-9, ady = Math.abs(dy) || 1e-9, adz = Math.abs(dz) || 1e-9;
    let tx = sx > 0 ? (x + 1 - ox) / adx : sx < 0 ? (ox - x) / adx : Infinity;
    let ty = sy > 0 ? (y + 1 - oy) / ady : sy < 0 ? (oy - y) / ady : Infinity;
    let tz = sz > 0 ? (z + 1 - oz) / adz : sz < 0 ? (oz - z) / adz : Infinity;
    const ddx = 1 / adx, ddy = 1 / ady, ddz = 1 / adz;
    let nx = 0, ny = 0, nz = 0, t = 0;
    for (let n = 0; n < 64 && t <= maxDist; n++) {
      const id = this.get(x, y, z);
      if (pick(id, x, y, z)) {
        // 背の低いブロック（作物・畑）は、上のほうを素通りする
        const b = BLOCKS[id];
        const hTop = isCrop(id) ? 0.25 + 0.2 * (id - B.POTATO0) : b.h;
        if (hTop >= 0.999 || this._hitsLow(ox, oy, oz, dx, dy, dz, x, y, z, hTop, t)) return { x, y, z, id, nx, ny, nz, dist: t };
      }
      if (tx < ty && tx < tz) { x += sx; t = tx; tx += ddx; nx = -sx; ny = 0; nz = 0; }
      else if (ty < tz) { y += sy; t = ty; ty += ddy; nx = 0; ny = -sy; nz = 0; }
      else { z += sz; t = tz; tz += ddz; nx = 0; ny = 0; nz = -sz; }
      if (y < 0 || y >= WY + 2) break;
    }
    return null;
  }
  _hitsLow(ox, oy, oz, dx, dy, dz, x, y, z, h, t0) {
    // 光線が [x,x+1]×[y,y+h]×[z,z+1] を通るか（入った点 t0 から、出る点まで）
    let tmin = t0, tmax = Infinity;
    const slab = (o, d, lo, hi) => {
      if (Math.abs(d) < 1e-9) return o >= lo && o <= hi;
      let a = (lo - o) / d, b = (hi - o) / d;
      if (a > b) [a, b] = [b, a];
      tmin = Math.max(tmin, a); tmax = Math.min(tmax, b);
      return tmin <= tmax;
    };
    return slab(ox, dx, x, x + 1) && slab(oy, dy, y, y + h) && slab(oz, dz, z, z + 1);
  }
}

export { inRect };
