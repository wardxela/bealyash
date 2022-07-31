import axios from 'axios';
import { settings } from './settings';

export const vkAxios = axios.create({
  baseURL: 'https://api.vk.com/',
  params: {
    access_token: settings.vkApiAccessToken,
    v: settings.vkApiVersion,
  },
});

export async function sendMessage() {
  return vkAxios.post('/method/messages.send', {
    peer_id: 671443259,
    message: 'hello world',
  });
}
