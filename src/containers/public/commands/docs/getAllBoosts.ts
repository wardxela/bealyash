import { BotCommand } from '../../../../core';
import { db } from '../../../../services/db';

export const getAllBoosts: BotCommand = async event => {
  const boosts = await db.booster.findMany({
    select: { title: true, duration: true },
  });
  const message = boosts.reduce((a, boost) => {
    return `${a}"${boost.title}" (${boost.duration / 1000 / 60 / 60} ч.)\n`;
  }, '');

  return {
    message,
  };
};
