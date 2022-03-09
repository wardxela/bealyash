import { getVkUsers } from '../../vk/api.js';
import BotResponse from '../utilities/BotResponse.js';

export default async function presentBelyash(requestMessage, vkRequest) {
  if (!vkRequest.object.message.reply_message) {
    return new BotResponse({
      message: 'Вызывай команду в ответ на сообщение',
    });
  }

  const fromUser = await getVkUsers({
    user_ids: vkRequest.object.message.from_id,
  });

  const toUser = await getVkUsers({
    user_ids: vkRequest.object.message.reply_message.from_id,
    name_case: 'dat',
  });

  if (toUser.response.length === 0) {
    return new BotResponse({
      message: `Я не делюсь с роботами :(`,
    });
  }

  return new BotResponse({
    message: `[id${fromUser.response[0].id}|${fromUser.response[0].first_name} ${fromUser.response[0].last_name}] подарил беляш [id${toUser.response[0].id}|${toUser.response[0].first_name} ${toUser.response[0].last_name}]`,
    attachment: 'photo-210983855_457239017%2Falbum-210983855_0%2Frev',
  });
}
