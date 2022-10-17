import { BotCommand } from '../../../core';
import { db } from '../../../services/db';
import { randomFrom } from '../../../utils';

const POSSIBLE_RESPONSES = [
  'Жесть он выдал',
  'Ебать он умный',
  'Умные мысли часто преследуют его,\nно он быстрее',
  'Ебать важный\nхуй бумажный',
  'Нихуя он умный',
  'Какого хуя он еще не президент?',
];

export const addQuote: BotCommand = async (_, match) => {
  await db.quote.create({
    data: { text: match.input!.replace(/вцк добавь /i, '') },
  });
  return { message: randomFrom(POSSIBLE_RESPONSES) };
};
