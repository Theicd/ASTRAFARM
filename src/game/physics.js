// 体（箱）を世界のブロックにぶつけながら動かす。軸ごとに動かして、ぶつかったらブロックの面で止める。
// 段差（1 ブロックまで）は、地面に立っているときだけ自動で上る。
//   body = { pos: Vector3（足もとの中心）, vel: Vector3, hw（横幅の半分）, h（高さ）, onGround, step（上れる段差）, inWater }
import { BLOCKS, B } from './world/blocks.js';
import { WX, WZ } from './world/World.js';

const EPS = 1e-4;
/** Ignore XZ grazing thinner than this (stops stair-to-stair micro-overlap bounce). */
const MIN_XZ = 0.14;

function overlap1(a0, a1, b0, b1) {
  return Math.min(a1, b1) - Math.max(a0, b0);
}

function aabbHit(ax0, ay0, az0, ax1, ay1, az1, bx0, by0, bz0, bx1, by1, bz1) {
  return ax0 < bx1 - EPS && ax1 > bx0 + EPS && ay0 < by1 - EPS && ay1 > by0 + EPS && az0 < bz1 - EPS && az1 > bz0 + EPS;
}

/**
 * Emit solid boxes for a block. Stairs = bottom slab + upper tread (half cell).
 * cb(x, y, z, top, sx0, sx1, sz0, sz1, yBot)
 */
function forSolidParts(b, x, y, z, x0, y0, z0, x1, y1, z1, cb) {
  if (b.stair === '+z' || b.stair === '+x') {
    if (aabbHit(x0, y0, z0, x1, y1, z1, x, y, z, x + 1, y + 0.5, z + 1)) {
      cb(x, y, z, y + 0.5, x, x + 1, z, z + 1, y);
    }
    let ux0 = x, ux1 = x + 1, uz0 = z, uz1 = z + 1;
    if (b.stair === '+z') { uz0 = z + 0.5; uz1 = z + 1; }
    else { ux0 = x + 0.5; ux1 = x + 1; }
    if (aabbHit(x0, y0, z0, x1, y1, z1, ux0, y + 0.5, uz0, ux1, y + 1, uz1)) {
      cb(x, y, z, y + 1, ux0, ux1, uz0, uz1, y + 0.5);
    }
    return;
  }
  const top = y + b.h;
  if (aabbHit(x0, y0, z0, x1, y1, z1, x, y, z, x + 1, top, z + 1)) {
    cb(x, y, z, top, x, x + 1, z, z + 1, y);
  }
}

/** 箱に重なっているブロックを cb(...) で返す。 */
function overlaps(world, x0, y0, z0, x1, y1, z1, cb) {
  const bx0 = Math.floor(x0), bx1 = Math.floor(x1 - EPS);
  const by0 = Math.floor(y0) - 1, by1 = Math.floor(y1 - EPS);
  const bz0 = Math.floor(z0), bz1 = Math.floor(z1 - EPS);
  for (let y = by0; y <= by1; y++) for (let z = bz0; z <= bz1; z++) for (let x = bx0; x <= bx1; x++) {
    const b = BLOCKS[world.get(x, y, z)];
    if (!b?.solid) continue;
    forSolidParts(b, x, y, z, x0, y0, z0, x1, y1, z1, (bx, by, bz, top, sx0, sx1, sz0, sz1, yBot) => {
      if (y0 + EPS >= top) return; // standing on this surface
      // Skip hairline XZ overlaps (player on one stair clipping the next)
      if (overlap1(x0, x1, sx0, sx1) < MIN_XZ || overlap1(z0, z1, sz0, sz1) < MIN_XZ) return;
      cb(bx, by, bz, top, sx0, sx1, sz0, sz1, yBot);
    });
  }
}

/** Lowest walkable ledge the body would hit as a wall at (px,py,pz). */
function lowestLedge(world, px, py, pz, hw, h, maxStep) {
  let best = Infinity;
  overlaps(world, px - hw, py, pz - hw, px + hw, py + h, pz + hw, (_x, _y, _z, top) => {
    if (top > py + EPS && top <= py + maxStep + EPS) best = Math.min(best, top);
  });
  return best === Infinity ? null : best;
}

export function collides(world, body, px = body.pos.x, py = body.pos.y, pz = body.pos.z) {
  let hit = false;
  overlaps(world, px - body.hw, py, pz - body.hw, px + body.hw, py + body.h, pz + body.hw, () => { hit = true; });
  return hit;
}

function sweep(world, body, axis, d) {
  if (d === 0) return false;
  const p = body.pos;
  p[axis] += d;
  let hit = false;
  let limit = d > 0 ? Infinity : -Infinity;
  overlaps(world, p.x - body.hw, p.y, p.z - body.hw, p.x + body.hw, p.y + body.h, p.z + body.hw, (x, y, z, top, sx0, sx1, sz0, sz1, yBot) => {
    hit = true;
    if (axis === 'y') {
      if (d < 0) limit = Math.max(limit, top);
      else limit = Math.min(limit, yBot); // underside of the part we hit
    } else if (axis === 'x') {
      limit = d > 0 ? Math.min(limit, sx0) : Math.max(limit, sx1);
    } else {
      limit = d > 0 ? Math.min(limit, sz0) : Math.max(limit, sz1);
    }
  });
  if (hit) {
    if (axis === 'y') p.y = d < 0 ? limit + EPS : limit - body.h - EPS;
    else p[axis] = d > 0 ? limit - body.hw - EPS : limit + body.hw + EPS;
  }
  return hit;
}

function clampWorld(body) {
  const p = body.pos, v = body.vel;
  const m = body.hw + 0.2;
  if (p.x < m) { p.x = m; v.x = Math.max(0, v.x); }
  if (p.x > WX - m) { p.x = WX - m; v.x = Math.min(0, v.x); }
  if (p.z < m) { p.z = m; v.z = Math.max(0, v.z); }
  if (p.z > WZ - m) { p.z = WZ - m; v.z = Math.min(0, v.z); }
  if (p.y < -4) { p.y = 12; v.y = 0; }
}

/**
 * dt 秒ぶん動かす（重力は呼ぶ側で vel.y に足しておく）。
 * 戻り値 { hitX, hitZ, stepped }。body.onGround と body.inWater を更新する。
 */
export function moveBody(world, body, dt) {
  const p = body.pos, v = body.vel;
  const wasGround = body.onGround;
  const hy = sweep(world, body, 'y', v.y * dt);
  body.onGround = hy && v.y <= 0;
  if (hy) v.y = 0;

  const ox = p.x, oy = p.y, oz = p.z;
  const dx = v.x * dt, dz = v.z * dt;
  let hx = false, hz = false, stepped = 0;
  const grounded = body.onGround || wasGround;

  // Auto-step BEFORE sliding into the wall (avoids stair bounce)
  if (grounded && body.step > 0 && (dx !== 0 || dz !== 0)) {
    const ledge = lowestLedge(world, ox + dx, oy, oz + dz, body.hw, body.h, body.step);
    if (ledge != null) {
      const need = ledge - oy;
      if (need > EPS && need <= body.step + EPS) {
        // Headroom check at current XZ, then move across
        p.set(ox, oy, oz);
        if (!sweep(world, body, 'y', need + 0.002)) {
          hx = sweep(world, body, 'x', dx);
          hz = sweep(world, body, 'z', dz);
          sweep(world, body, 'y', -need - 0.12);
          const progressed = Math.hypot(p.x - ox, p.z - oz) > Math.hypot(dx, dz) * 0.2;
          const supported = p.y >= ledge - 0.15;
          if (progressed && supported) {
            stepped = Math.max(0, p.y - oy);
            body.onGround = true;
            v.y = 0;
            if (hx) v.x = 0;
            if (hz) v.z = 0;
            clampWorld(body);
            body.inWater = world.get(Math.floor(p.x), Math.floor(p.y + 0.3), Math.floor(p.z)) === B.WATER;
            body.headInWater = world.get(Math.floor(p.x), Math.floor(p.y + body.h * 0.85), Math.floor(p.z)) === B.WATER;
            return { hitX: hx, hitZ: hz, stepped };
          }
        }
        p.set(ox, oy, oz);
      }
    }
  }

  hx = sweep(world, body, 'x', dx);
  hz = sweep(world, body, 'z', dz);

  // Fallback step if we still hit a wall (full blocks / tight corners)
  if ((hx || hz) && grounded && body.step > 0) {
    const ledge = lowestLedge(world, ox + dx, oy, oz + dz, body.hw, body.h, body.step);
    if (ledge != null) {
      const need = ledge - oy;
      if (need > EPS && need <= body.step + EPS) {
        const bx = p.x, by = p.y, bz = p.z;
        p.set(ox, oy, oz);
        if (!sweep(world, body, 'y', need + 0.002)) {
          const hx2 = sweep(world, body, 'x', dx);
          const hz2 = sweep(world, body, 'z', dz);
          sweep(world, body, 'y', -need - 0.12);
          const got = Math.hypot(p.x - ox, p.z - oz);
          const had = Math.hypot(bx - ox, bz - oz);
          if (got > had + 1e-4 && p.y >= ledge - 0.15) {
            stepped = Math.max(0, p.y - oy);
            hx = hx2; hz = hz2;
            body.onGround = true;
            v.y = 0;
          } else p.set(bx, by, bz);
        } else p.set(bx, by, bz);
      }
    }
  }

  if (hx) v.x = 0;
  if (hz) v.z = 0;
  clampWorld(body);
  body.inWater = world.get(Math.floor(p.x), Math.floor(p.y + 0.3), Math.floor(p.z)) === B.WATER;
  body.headInWater = world.get(Math.floor(p.x), Math.floor(p.y + body.h * 0.85), Math.floor(p.z)) === B.WATER;
  return { hitX: hx, hitZ: hz, stepped };
}

/** 重力と水の抵抗をかける。 */
export function applyGravity(body, dt, g = 28) {
  if (body.inWater) {
    body.vel.y = Math.max(body.vel.y - g * 0.18 * dt, -2.2);
    body.vel.y *= Math.exp(-2 * dt);
  } else body.vel.y = Math.max(body.vel.y - g * dt, -40);
}
