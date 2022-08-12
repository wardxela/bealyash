import { BotGuard } from '../core';
import { DICK_KRAFT_BOT_ID } from '../services/gachi';

export const dickKraftRegExp =
  /(твій пісюн зменшився|твій пісюн виріс|довжина твого писюна \d+ см)/;

export const onlyDickKraft: BotGuard = event => {
  return event.object.message.from_id === DICK_KRAFT_BOT_ID;
};
