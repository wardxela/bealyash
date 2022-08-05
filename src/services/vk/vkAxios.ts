import axios from 'axios';
import FormData from 'form-data';
import { VkMethod, VkRequestParams } from './interfaces';

export function vkAxios<M extends VkMethod>(
  vkMethod: M,
  payload: VkRequestParams[M],
  isClient = true
) {
  const form = new FormData();

  const accessToken = isClient
    ? process.env.USER_VK_API_ACCESS_TOKEN
    : process.env.CHAT_BOT_VK_API_ACCESS_TOKEN;
  const apiVersion = process.env.VK_API_VERSION;

  form.append('access_token', accessToken || '');
  form.append('v', apiVersion || '');
  form.append('lang', 0);

  if (payload) {
    for (const [key, value] of Object.entries(payload)) {
      if (value !== undefined) {
        form.append(key, value);
      }
    }
  }

  return axios.post(`https://api.vk.com/method/${vkMethod}`, form);
}
