import { BotGuard } from '../../core';
import { DICK_KRAFT_BOT_ID } from '../../services/gachi';

export const onlyDickKraft: BotGuard = event => {
  if (event.object.message.from_id === DICK_KRAFT_BOT_ID) {
    return {
      success: true,
    };
  }

  return {
    success: false,
    message: 'Эту команду может использовать только Dick_Kraft_Bot',
  };
};
