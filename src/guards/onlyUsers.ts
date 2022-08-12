import { BotGuard } from '../core';
import { DICK_KRAFT_BOT_ID } from '../services/gachi';

const EXCEPTIONS = [DICK_KRAFT_BOT_ID];

export const onlyUsers: BotGuard = event => {
  const fromId = event.object.message.from_id;

  if (EXCEPTIONS.includes(fromId)) {
    return true;
  }

  return event.object.message.from_id > 0;
};
