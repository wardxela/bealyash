import { BotGuard } from '../../../core';

export const onlyUsers: BotGuard = event => {
  if (event.object.message.from_id > 0) {
    return {
      success: true,
    };
  }

  return {
    success: false,
    message: 'Эта команда доступна только для пользователей',
  };
};
