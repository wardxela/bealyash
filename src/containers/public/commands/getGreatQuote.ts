import { BotCommand } from '../../../core';
import { db } from '../../../services/db';
import { randomInt } from '../../../utils';

export const getGreatQuote: BotCommand = async () => {
  const count = await db.quote.count();
  const quote = await db.quote.findFirst({ skip: randomInt(0, count - 1) });
  return { message: quote ? `"${quote.text}"` : 'Цитат нет' };
};
