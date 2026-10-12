// Static gate: sell prices, tower cost, progression helpers.
import assert from 'node:assert/strict';
import {
  BUY, MAX_HELPERS, MAX_TURRETS, SEED_RESERVE, SELL_PRICE, PIG_SELL,
  FIRST_HELPER_COINS, helperSlots, hoeLevelFromStars, sellValue,
} from '../src/game/economy.js';
import { CROPS } from '../src/game/crops.js';

for (const c of CROPS) {
  assert.ok(SELL_PRICE[c.id] > 0, c.id);
  assert.equal(sellValue(c.id, 3), SELL_PRICE[c.id] * 3);
}
assert.ok(BUY.turret > 0);
assert.ok(PIG_SELL > 0);
assert.ok(SEED_RESERVE >= 1);
assert.ok(MAX_HELPERS >= 1 && MAX_TURRETS >= 1);
assert.equal(helperSlots({ stars: 0, lifetimeCoins: 0 }), 0);
assert.equal(helperSlots({ stars: 0, lifetimeCoins: FIRST_HELPER_COINS }), 1);
assert.equal(helperSlots({ stars: 1, lifetimeCoins: FIRST_HELPER_COINS }), MAX_HELPERS);
assert.ok(helperSlots({ stars: 9, lifetimeCoins: FIRST_HELPER_COINS }) <= MAX_HELPERS);
assert.equal(1 + MAX_HELPERS, 3); // total growers cap
assert.equal(hoeLevelFromStars(0), 0);
assert.equal(hoeLevelFromStars(2), 2);
assert.equal(hoeLevelFromStars(9), 2);

console.log('economy-gate: OK');
