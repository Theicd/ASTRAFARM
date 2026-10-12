// Farm economy: auto-sell prices, tower cost, progression unlocks.
import { CROPS } from './crops.js';

export const SELL_PRICE = {
  potato: 2,
  wheat: 3,
  carrot: 2,
  corn: 4,
};

/** Keep this many of each crop for replanting; the rest auto-sells. */
export const SEED_RESERVE = 4;

export const BUY = {
  turret: 100,
};

/** Coins for selling a penned pig. */
export const PIG_SELL = 50;

/** Extra farm AIs besides the main Astra. Total growers = 1 + helpers ≤ 3. */
export const MAX_HELPERS = 2;
export const MAX_GROWERS = 3; // main Astra + helpers
export const MAX_TURRETS = 4;

/** Lifetime coins that unlock the first helper (after first sales). */
export const FIRST_HELPER_COINS = 12;

/** Hoe till radius by upgrade level: 0 = 1 tile, 1 = +, 2 = 3×3. */
export function hoeLevelFromStars(stars = 0) {
  return Math.min(2, Math.max(0, stars | 0));
}

/** How many helper AIs are unlocked (free, automatic). Cap keeps total growers at 3. */
export function helperSlots({ stars = 0, lifetimeCoins = 0 } = {}) {
  let n = 0;
  if (lifetimeCoins >= FIRST_HELPER_COINS) n += 1;
  if ((stars | 0) >= 1) n += 1;
  return Math.min(MAX_HELPERS, n);
}

export function sellValue(crop, n) {
  return (SELL_PRICE[crop] || 1) * Math.max(0, n | 0);
}

/** @returns {{ crop: string, need: number, pay: number, id: number }} */
export function makeDemand(dayIndex = 0, rng = Math.random) {
  const crop = CROPS[Math.floor(rng() * CROPS.length)].id;
  const need = 6 + Math.floor(rng() * 6) + Math.min(8, dayIndex);
  const pay = need * SELL_PRICE[crop] + 4 + Math.floor(rng() * 8);
  return { crop, need, pay, id: (Date.now() % 1e9) + Math.floor(rng() * 999) };
}
