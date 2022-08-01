import FormData from 'form-data';
import { VkSendMessageOptions } from '../../interfaces';
import { randomInt32 } from '../helpers';
import { vkAxios } from './vkAxios';

export function sendVkMessage(options: VkSendMessageOptions) {
  const formData = new FormData();
  formData.append('random_id', randomInt32());
  formData.append('peer_id', options.peer_id);
  formData.append('message', options.message);

  if (options.attachment) {
    formData.append('attachment', options.attachment);
  }

  return vkAxios.post('/method/messages.send', formData, formData.getHeaders());
}
