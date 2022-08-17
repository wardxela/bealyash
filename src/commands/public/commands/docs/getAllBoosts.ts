import { BotCommand } from '../../../../core';
import { db } from '../../../../services/db';

export const getAllBoosts: BotCommand = async () => {
  const category = 'Gay';

  const coefficientSumPromise = db.booster.aggregate({
    where: { category: { title: category } },
    _sum: { probabilityCoefficient: true },
  });
  const boostersPromise = db.booster.findMany({
    where: { category: { title: category } },
    orderBy: { probabilityCoefficient: 'desc' },
    select: { title: true, duration: true, probabilityCoefficient: true },
  });
  const [coefficientSum, boosters] = await Promise.all([
    coefficientSumPromise,
    boostersPromise,
  ]);

  const message = boosters.reduce((a, booster) => {
    const duration = booster.duration / 1000 / 60 / 60;
    const probability =
      Math.round(
        (booster.probabilityCoefficient /
          coefficientSum._sum.probabilityCoefficient!) *
          10000
      ) / 100;
    return `${a}"${booster.title}"\nДействителен: ${duration} ч.\nШанс выпадения: ${probability}%\n\n`;
  }, '');

  return {
    message,
  };
};
