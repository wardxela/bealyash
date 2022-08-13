import { BotGuard } from '../../core';
import { ADMIN_ID } from '../../services/vk';

export const onlyAdmin: BotGuard = event => {
  return event.object.message.from_id === ADMIN_ID;
};
