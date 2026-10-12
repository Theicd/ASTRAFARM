// Static gate: modular crop defs, block IDs, and helper contracts.
import assert from 'node:assert/strict';
import { B, BLOCKS, isCrop, cropStage, isFarm } from '../src/game/world/blocks.js';
import {
  CROPS, CROP_BY_ID, SEED_TOOLS, cropDefOf, isRipe, cropHeight,
  nextStageId, fertilizeStageId, defBySeedTool, emptyBags, cropYield,
} from '../src/game/crops.js';

assert.equal(B.POTATO0, 18, 'potato IDs must stay 18–21 for save compat');
assert.equal(B.POTATO3, 21);
assert.equal(B.WHEAT0, 30);
assert.equal(B.CORN3, 41);

for (const def of CROPS) {
  assert.ok(CROP_BY_ID[def.id], def.id);
  assert.equal(def.stages.length, 4, def.id + ' stages');
  def.stages.forEach((id, i) => {
    assert.ok(BLOCKS[id], `block ${id}`);
    assert.equal(BLOCKS[id].cropKind, def.id);
    assert.equal(BLOCKS[id].crop, i);
    assert.equal(BLOCKS[id].shape, 'crop');
    assert.equal(cropStage(id), i);
    assert.equal(cropDefOf(id)?.id, def.id);
    assert.equal(isCrop(id), true);
    assert.equal(isRipe(id), i === 3);
    assert.ok(cropHeight(id) > 0 && cropHeight(id) <= 1);
  });
  assert.equal(defBySeedTool(def.seedTool)?.id, def.id);
  assert.ok(SEED_TOOLS.includes(def.seedTool));
  assert.equal(nextStageId(def.stages[0]), def.stages[1]);
  assert.equal(nextStageId(def.stages[3]), def.stages[3]);
  const fert = fertilizeStageId(def.stages[0]);
  assert.ok(def.stages.includes(fert));
  assert.equal(fertilizeStageId(def.stages[3]), null);
  for (let k = 0; k < 20; k++) {
    const y = cropYield(def);
    assert.ok(y >= def.yieldMin && y <= def.yieldMax);
  }
}

assert.equal(isCrop(B.GRASS), false);
assert.equal(isFarm(B.FARM_WET), true);
assert.deepEqual(emptyBags({ potato: 6, wheat: 2 }), { potato: 6, wheat: 2, carrot: 0, corn: 0 });

assert.equal(CROPS.find((c) => c.id === 'potato').countsForGoal, true);
assert.equal(CROPS.find((c) => c.id === 'wheat').countsForGoal, true);

console.log('crops-modular-gate: OK', CROPS.map((c) => c.id).join(', '));
