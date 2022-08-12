import { BotGuard } from '../core';

const EXCEPTIONS = [-193557157];

export const onlyUsers: BotGuard = event => {
  const fromId = event.object.message.from_id;

  if (EXCEPTIONS.includes(fromId)) {
    return true;
  }

  return event.object.message.from_id > 0;
};
