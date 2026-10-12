// Modular crop definitions. Potato keeps its original block IDs (18–21).
// New crops use IDs 30+. All plant/grow/harvest/fertilize logic should go through these helpers.
import { B, isCrop, cropStage } from './world/blocks.js';
export { isCrop, cropStage };

/** @typedef {{
 *   id: string,
 *   stages: number[],
 *   seedTool: string,
 *   dropKind: string,
 *   growWet: number,
 *   growDry: number,
 *   yieldMin: number,
 *   yieldMax: number,
 *   particle: number,
 *   sparkle: number,
 *   countsForGoal: boolean,
 *   edible: boolean,
 *   rareDrop?: string,
 *   rareChance?: number,
 *   heights: number[],
 * }} CropDef */

/** @type {CropDef[]} */
export const CROPS = [
  {
    id: 'potato',
    stages: [B.POTATO0, B.POTATO1, B.POTATO2, B.POTATO3],
    seedTool: 'potato',
    dropKind: 'potato',
    growWet: 25,
    growDry: 50,
    yieldMin: 1,
    yieldMax: 4,
    particle: 0x5d9e3a,
    sparkle: 0xd6ad62,
    countsForGoal: true,
    edible: true,
    rareDrop: 'green',
    rareChance: 0.035,
    heights: [0.25, 0.45, 0.65, 0.85],
  },
  {
    id: 'wheat',
    stages: [B.WHEAT0, B.WHEAT1, B.WHEAT2, B.WHEAT3],
    seedTool: 'wheat',
    dropKind: 'wheat',
    growWet: 22,
    growDry: 44,
    yieldMin: 1,
    yieldMax: 3,
    particle: 0x7bbf48,
    sparkle: 0xe8c85a,
    countsForGoal: true,
    edible: false,
    heights: [0.3, 0.5, 0.72, 0.95],
  },
  {
    id: 'carrot',
    stages: [B.CARROT0, B.CARROT1, B.CARROT2, B.CARROT3],
    seedTool: 'carrot',
    dropKind: 'carrot',
    growWet: 18,
    growDry: 36,
    yieldMin: 1,
    yieldMax: 2,
    particle: 0x5fae3a,
    sparkle: 0xf08a28,
    countsForGoal: true,
    edible: false,
    heights: [0.22, 0.38, 0.52, 0.7],
  },
  {
    id: 'corn',
    stages: [B.CORN0, B.CORN1, B.CORN2, B.CORN3],
    seedTool: 'corn',
    dropKind: 'corn',
    growWet: 28,
    growDry: 56,
    yieldMin: 1,
    yieldMax: 3,
    particle: 0x4f9a2e,
    sparkle: 0xf0d040,
    countsForGoal: true,
    edible: false,
    heights: [0.35, 0.55, 0.78, 0.98],
  },
];

export const CROP_BY_ID = Object.fromEntries(CROPS.map((c) => [c.id, c]));
export const SEED_TOOLS = CROPS.map((c) => c.seedTool);
/** Player sow order when holding the single Seed tool (skip empty bags). */
export const PLANT_ORDER = ['wheat', 'corn', 'potato', 'carrot'];
const DEF_OF = new Map();
for (const def of CROPS) {
  for (const id of def.stages) DEF_OF.set(id, def);
}

export function cropDefOf(id) {
  return DEF_OF.get(id) || null;
}

export function isRipe(id) {
  const def = DEF_OF.get(id);
  return !!def && id === def.stages[def.stages.length - 1];
}

export function cropHeight(id) {
  const def = DEF_OF.get(id);
  if (!def) return 1;
  const st = cropStage(id);
  return def.heights[st] ?? def.heights[def.heights.length - 1];
}

export function cropYield(def) {
  if (def.id === 'potato') {
    const r = Math.random();
    return r < 0.25 ? 1 : r < 0.7 ? 2 : r < 0.94 ? 3 : 4;
  }
  const span = def.yieldMax - def.yieldMin;
  return def.yieldMin + Math.floor(Math.random() * (span + 1));
}

export function nextStageId(id) {
  const def = DEF_OF.get(id);
  if (!def) return id;
  const st = cropStage(id);
  if (st >= def.stages.length - 1) return id;
  return def.stages[st + 1];
}

export function fertilizeStageId(id) {
  const def = DEF_OF.get(id);
  if (!def || isRipe(id)) return null;
  const st = cropStage(id);
  const bump = Math.random() < 0.45 ? 2 : 1;
  return def.stages[Math.min(def.stages.length - 1, st + bump)];
}

export function defBySeedTool(tool) {
  return CROPS.find((c) => c.seedTool === tool) || null;
}

export function emptyBags(extras = {}) {
  const bags = { potato: 0, wheat: 0, carrot: 0, corn: 0 };
  for (const [k, v] of Object.entries(extras)) if (k in bags) bags[k] = v | 0;
  return bags;
}
