import { BotCommand } from '../core';
import { drawDick } from '../services/gachi';

export const myPenis: BotCommand = event => {
  const match = event.object.message.text.match(/(\d+) см/);

  if (match === null) {
    return null;
  }

  const length = parseInt(match[1]);

  if (Number.isNaN(length)) {
    return null;
  }

  return { message: drawDick(length) };
};
