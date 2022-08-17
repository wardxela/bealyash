import { BotCommand } from '../../../../core';
import { db } from '../../../../services/db';

export const getAllBoosts: BotCommand = async (event, match) => {
  const category = 'Gay';

  const coefficientSumPromise = db.booster.aggregate({
    where: { category: { title: category } },
    _sum: { probabilityCoefficient: true },
  });
  const boostsPromise = db.booster.findMany({
    where: { category: { title: category } },
    orderBy: { probabilityCoefficient: 'desc' },
    select: { title: true, duration: true, probabilityCoefficient: true },
  });
  const [coefficientSum, boosts] = await Promise.all([
    coefficientSumPromise,
    boostsPromise,
  ]);

  const message = boosts.reduce((a, boost) => {
    const duration = boost.duration / 1000 / 60 / 60;
    const probability =
      Math.round(
        (boost.probabilityCoefficient /
          coefficientSum._sum.probabilityCoefficient!) *
          10000
      ) / 100;
    return `${a}"${boost.title}"\nДействителен: ${duration} ч.\nШанс выпадения: ${probability}%\n\n`;
  }, '');

  return {
    message,
  };
};
