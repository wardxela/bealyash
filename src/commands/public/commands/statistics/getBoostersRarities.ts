import { BotCommand } from '../../../../core';
import { db } from '../../../../services/db';
import { createMap } from '../../../../utils';

export const getBoostersRarities: BotCommand = async () => {
  const raritiesPromise = db.rarity.findMany({
    orderBy: { probability: 'desc' },
  });
  const boostersCountByRarityPromise = db.booster.groupBy({
    by: ['rarityId'],
    _count: true,
  });

  const [rarities, boostersCountByRarity] = await Promise.all([
    raritiesPromise,
    boostersCountByRarityPromise,
  ]);

  const boostersCountByRarityMap = createMap(boostersCountByRarity, 'rarityId');

  const totalOutcomes = rarities.reduce((a, rarity) => {
    const currentRarityCount = boostersCountByRarityMap[rarity.id]?._count;
    if (!currentRarityCount) {
      return a;
    }
    return a + currentRarityCount * rarity.probability;
  }, 0);

  const message = rarities.reduce((a, rarity) => {
    const currentRarityCount = boostersCountByRarityMap[rarity.id]?._count;
    if (!currentRarityCount) {
      return a;
    }
    const probability =
      Math.round(
        (10000 * currentRarityCount * rarity.probability) / totalOutcomes
      ) / 100;
    return `${a}${rarity.title} - ${probability}%`;
  }, 'Редкости:\n');

  return { message };
};
