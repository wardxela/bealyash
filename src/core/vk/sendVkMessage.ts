import FormData from 'form-data';
import { randomInt32 } from '../helpers';
import { VkSendMessageOptions } from './interfaces';
import { vkAxios } from './vkAxios';

export function sendVkMessage(options: VkSendMessageOptions) {
  const formData = new FormData();
  formData.append('random_id', randomInt32());
  formData.append('peer_id', options.peer_id);
  formData.append('message', options.message);
  formData.append('access_token', process.env.CHAT_BOT_VK_API_ACCESS_TOKEN);

  if (options.attachment) {
    formData.append('attachment', options.attachment);
  }

  return vkAxios.post('/method/messages.send', formData, formData.getHeaders());
}
