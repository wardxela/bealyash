import { BotGuard } from '../../core';
import { CREATOR_ID } from '../../services/vk';

export const onlyAdmin: BotGuard = event => {
  if (event.object.message.from_id === CREATOR_ID) {
    return {
      success: true,
    };
  }

  return {
    success: false,
    message: 'Эта команда доступна только создателю беляша',
  };
};
