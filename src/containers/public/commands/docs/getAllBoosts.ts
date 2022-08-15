import { BotCommand } from '../../../../core';
import { db } from '../../../../services/db';

export const getAllBoosts: BotCommand = async event => {
  const boosts = await db.booster.findMany();
  const message = boosts.reduce((a, boost) => {
    return `${a}"${boost.title}"\nОписание: ${
      boost.description
    }\nВремя жизни: ${boost.duration / 1000 / 60 / 60} ч.\n\n`;
  }, '');

  return {
    message,
  };
};
