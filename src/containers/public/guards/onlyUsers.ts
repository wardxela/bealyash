import { BotGuard } from '../../../core';

export const onlyUsers: BotGuard = event => {
  return event.object.message.from_id > 0;
};
