import { commands } from '../../commands';
import {
  randomId,
  vkAxios,
  VkNewMessageEvent,
  VkSendMessagesRequestParams,
} from '../vk';

export async function newMessage(event: VkNewMessageEvent) {
  for (const [pattern, command] of commands) {
    if (pattern.test(event.object.message.text)) {
      const payload = await command(event);
      const options: VkSendMessagesRequestParams = {
        ...payload,
        random_id: randomId(),
        peer_id: payload.peer_id
          ? payload.peer_id
          : event.object.message.peer_id,
      };

      return vkAxios('messages.send', options, false);
    }
  }
}
