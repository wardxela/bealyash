import axios from 'axios';
import FormData from 'form-data';
import { DEFAULT_VK_API_VERSION } from './constants';
import { VkMethod, VkRequest, VkResponse } from './interfaces';

export const vkInternalAxiosInstance = axios.create({
  baseURL: 'https://api.vk.com/',
});

/**
 * Proxy over axios for VK API
 * @param vkMethod
 * @param payload FormData object
 * @param isUser determines who makes request
 */
export async function vkAxios<M extends VkMethod>(
  vkMethod: M,
  payload: VkRequest<M>,
  isUser = true
) {
  const form = new FormData();
  const apiVersion = process.env.VK_API_VERSION || DEFAULT_VK_API_VERSION;
  const accessToken =
    (isUser
      ? process.env.USER_VK_API_ACCESS_TOKEN
      : process.env.CHAT_BOT_VK_API_ACCESS_TOKEN) || '';

  form.append('v', apiVersion);
  form.append('access_token', accessToken);

  if (payload) {
    for (const [key, value] of Object.entries(payload)) {
      if (value === undefined) {
        continue;
      }

      form.append(key, value);
    }
  }

  return vkInternalAxiosInstance.post(`method/${vkMethod}`, form);
}
