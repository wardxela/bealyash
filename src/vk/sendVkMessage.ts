import FormData from 'form-data';
import { randomInt32 } from '../utils';
import { vkAxios } from './vkAxios';

export interface SendOptions {
  peer_id: number;
  message: string;
}

export function sendVkMessage(options: SendOptions) {
  const formData = new FormData();
  formData.append('random_id', randomInt32());
  formData.append('peer_id', options.peer_id);
  formData.append('message', options.message);

  return vkAxios.post('/method/messages.send', formData, formData.getHeaders());
}
