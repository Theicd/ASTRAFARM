// ブロックの種類。1 マスに 1 個。見た目（shape）と性質（opaque / solid / blast…）をここで決める。
//   shape：cube（ふつうの立方体）／low（15/16 の高さ：畑・小道）／half（ベッド）／stairs（L字の階段）／
//          cross（草・花・サトウキビ）／crop（作物：# の形）／water／lantern（小さな箱）
//   full：隣が隠れるか　opaque：光を通さないか　solid：歩けるか（h で背の低いもの）
//   blast：爆発で消えるか　green：アストラがこわがる緑のもの　light：明るさ（0〜15）

export const B = {
  AIR: 0, GRASS: 1, DIRT: 2, FARM: 3, FARM_WET: 4, STONE: 5, SAND: 6, WATER: 7, LOG: 8, LEAVES: 9,
  PLANKS: 10, COBBLE: 11, GLASS: 12, LANTERN: 13, TALLGRASS: 14, FLOWER_R: 15, FLOWER_Y: 16, CANE: 17,
  POTATO0: 18, POTATO1: 19, POTATO2: 20, POTATO3: 21, BED: 22, HAY: 23, BEDROCK: 24, BOX: 25, MELON: 26,
  PATH: 27, GRAVEL: 28, BED_FOOT: 29,
  // New modular crops (do not renumber potato IDs — saves / world gen rely on them)
  WHEAT0: 30, WHEAT1: 31, WHEAT2: 32, WHEAT3: 33,
  CARROT0: 34, CARROT1: 35, CARROT2: 36, CARROT3: 37,
  CORN0: 38, CORN1: 39, CORN2: 40, CORN3: 41,
  APPLE: 42, // bait plant in the pig pen (cross)
  // Wooden stairs (L-shape). stair = climb direction of the upper tread.
  STAIRS_Z: 43, // ascends toward +Z
  STAIRS_X: 44, // ascends toward +X
};

const cube = (tex, o = {}) => ({ shape: 'cube', tex, full: true, opaque: true, solid: true, blast: true, ...o });
const plant = (tex, o = {}) => ({ shape: 'cross', tex, full: false, opaque: false, solid: false, blast: true, plant: true, ...o });
const crop = (kind, stage, tex, particle = 0x5d9e3a) => ({
  shape: 'crop', tex, full: false, opaque: false, solid: false, blast: true,
  crop: stage, cropKind: kind, particle,
});

export const BLOCKS = [];
BLOCKS[B.AIR] = { shape: 'none', full: false, opaque: false, solid: false, blast: false };
BLOCKS[B.GRASS] = cube({ top: 'grass_top', side: 'grass_side', bottom: 'dirt' }, { particle: 0x6aae43, restore: B.GRASS });
BLOCKS[B.DIRT] = cube('dirt', { particle: 0x8a6142, restore: B.DIRT });
BLOCKS[B.FARM] = cube({ top: 'farm_dry', side: 'dirt', bottom: 'dirt' }, { shape: 'low', full: false, h: 15 / 16, particle: 0x7a5636, farm: true, restore: B.DIRT });
BLOCKS[B.FARM_WET] = cube({ top: 'farm_wet', side: 'dirt', bottom: 'dirt' }, { shape: 'low', full: false, h: 15 / 16, particle: 0x4f3522, farm: true, wet: true, restore: B.DIRT });
BLOCKS[B.STONE] = cube('stone', { particle: 0x7d7d7d, restore: B.STONE });
BLOCKS[B.SAND] = cube('sand', { particle: 0xdbd3a0, restore: B.SAND });
BLOCKS[B.WATER] = { shape: 'water', tex: 'water', full: false, opaque: false, solid: false, blast: false, liquid: true, skyAtten: 2 };
BLOCKS[B.LOG] = cube({ top: 'log_top', side: 'log_side', bottom: 'log_top' }, { particle: 0x6b5233, blast: false });
BLOCKS[B.LEAVES] = cube('leaves', { full: false, opaque: false, cutout: true, particle: 0x4a9a32, skyAtten: 1, green: false });
BLOCKS[B.PLANKS] = cube('planks', { particle: 0xa47d4c, blast: false });
BLOCKS[B.COBBLE] = cube('cobble', { particle: 0x8a8a8a, blast: false });
BLOCKS[B.GLASS] = cube('glass', { full: false, opaque: false, cutout: true, particle: 0xd5ecf0, blast: false, glass: true });
BLOCKS[B.LANTERN] = { shape: 'lantern', tex: 'lantern', full: false, opaque: false, solid: false, blast: false, light: 14, particle: 0xffd27a };
BLOCKS[B.TALLGRASS] = plant('tallgrass', { particle: 0x5d9e3a });
BLOCKS[B.FLOWER_R] = plant('flower_r', { particle: 0xd23a3a });
BLOCKS[B.FLOWER_Y] = plant('flower_y', { particle: 0xf0d040 });
BLOCKS[B.CANE] = plant('cane', { particle: 0x8fcf5a, green: 'cane' });
BLOCKS[B.POTATO0] = crop('potato', 0, 'potato0');
BLOCKS[B.POTATO1] = crop('potato', 1, 'potato1');
BLOCKS[B.POTATO2] = crop('potato', 2, 'potato2');
BLOCKS[B.POTATO3] = crop('potato', 3, 'potato3');
BLOCKS[B.BED] = cube({ top: 'bed_top', side: 'bed_side', bottom: 'planks' }, { shape: 'half', full: false, opaque: false, h: 9 / 16, particle: 0xb83232, blast: false });
BLOCKS[B.BED_FOOT] = cube({ top: 'bed_foot', side: 'bed_side', bottom: 'planks' }, { shape: 'half', full: false, opaque: false, h: 9 / 16, particle: 0xb83232, blast: false });
BLOCKS[B.HAY] = cube({ top: 'hay_top', side: 'hay_side', bottom: 'hay_top' }, { particle: 0xd8b24a, blast: false });
BLOCKS[B.BEDROCK] = cube('bedrock', { particle: 0x3a3a3a, blast: false });
BLOCKS[B.BOX] = cube({ top: 'box_top', side: 'box_side', bottom: 'planks' }, { particle: 0xa47d4c, blast: false });
BLOCKS[B.MELON] = cube({ top: 'melon_top', side: 'melon_side', bottom: 'melon_top' }, { particle: 0x6f9a2a, green: 'melon', blast: false });
BLOCKS[B.PATH] = cube({ top: 'path_top', side: 'path_side', bottom: 'dirt' }, { shape: 'low', full: false, h: 15 / 16, particle: 0x9c7f4a, restore: B.PATH });
BLOCKS[B.GRAVEL] = cube('gravel', { particle: 0x847c78, restore: B.GRAVEL });

BLOCKS[B.WHEAT0] = crop('wheat', 0, 'wheat0', 0x7bbf48);
BLOCKS[B.WHEAT1] = crop('wheat', 1, 'wheat1', 0x7bbf48);
BLOCKS[B.WHEAT2] = crop('wheat', 2, 'wheat2', 0xc9a43a);
BLOCKS[B.WHEAT3] = crop('wheat', 3, 'wheat3', 0xe0bd55);

BLOCKS[B.CARROT0] = crop('carrot', 0, 'carrot0', 0x5fae3a);
BLOCKS[B.CARROT1] = crop('carrot', 1, 'carrot1', 0x5fae3a);
BLOCKS[B.CARROT2] = crop('carrot', 2, 'carrot2', 0x4f9a2e);
BLOCKS[B.CARROT3] = crop('carrot', 3, 'carrot3', 0xf08a28);

BLOCKS[B.CORN0] = crop('corn', 0, 'corn0', 0x4f9a2e);
BLOCKS[B.CORN1] = crop('corn', 1, 'corn1', 0x5fae3a);
BLOCKS[B.CORN2] = crop('corn', 2, 'corn2', 0x4f9a2e);
BLOCKS[B.CORN3] = crop('corn', 3, 'corn3', 0xf0d040);

BLOCKS[B.APPLE] = plant('apple', { particle: 0xd23a3a, apple: true });

// L-shaped stairs (planks). solid h=1 for reliable climbing; mesh is the stair silhouette.
BLOCKS[B.STAIRS_Z] = {
  shape: 'stairs', tex: 'planks', full: false, opaque: false, solid: true, blast: false,
  h: 1, stair: '+z', particle: 0xa47d4c,
};
BLOCKS[B.STAIRS_X] = {
  shape: 'stairs', tex: 'planks', full: false, opaque: false, solid: true, blast: false,
  h: 1, stair: '+x', particle: 0xa47d4c,
};

for (const d of BLOCKS) {
  if (!d) continue;
  d.h ??= 1;
  d.skyAtten ??= 0;
  d.light ??= 0;
  d.particle ??= 0x888888;
}

export const isCrop = (id) => !!BLOCKS[id]?.cropKind;
export const cropStage = (id) => (isCrop(id) ? BLOCKS[id].crop : -1);
export const isFarm = (id) => id === B.FARM || id === B.FARM_WET;
/** 草・作物など、下が消えたら一緒に消えるもの */
export const needsSupport = (id) => !!BLOCKS[id]?.plant || isCrop(id);
