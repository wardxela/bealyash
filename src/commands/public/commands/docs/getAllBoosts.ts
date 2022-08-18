import { BotCommand } from '../../../../core';
import { db } from '../../../../services/db';

export const getAllBoosts: BotCommand = async () => {
  const category = 'Gay';

  const boosters = await db.booster.findMany({
    where: { category: { title: category } },
    orderBy: { rarity: { probability: 'desc' } },
    select: {
      title: true,
      duration: true,
      rarity: { select: { title: true } },
    },
  });

  const message = boosters.reduce((a, booster) => {
    const duration = booster.duration / 1000 / 60 / 60;
    return `${a}"${booster.title}"\nВремя действия: ${duration} ч.\nРедкость: ${booster.rarity.title}\n\n`;
  }, '');

  return {
    message: message ? message : 'У беляша нет бустов',
  };
};
