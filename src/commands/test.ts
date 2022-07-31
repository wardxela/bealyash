import { BotCommand } from '../interfaces';
import { sendVkMessage } from '../vk';

export const test: BotCommand = body => {
  return sendVkMessage({
    peer_id: body.object.peer_id,
    message: 'Это лишь тест',
  });
};
