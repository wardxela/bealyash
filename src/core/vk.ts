import axios from 'axios';
import FormData from 'form-data';
import { settings } from './settings';

export const vkAxios = axios.create({
  baseURL: 'https://api.vk.com/',
  params: {
    access_token: settings.vkApiAccessToken,
    v: settings.vkApiVersion,
  },
});

export async function sendMessage() {
  const form = new FormData();

  form.append('peer_id', 671443259);
  form.append('message', 'hello world');
  form.append('random_id', Math.random() * 10000000);

  return vkAxios.post('/method/messages.send', form, {
    headers: form.getHeaders(),
  });
}
