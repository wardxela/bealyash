import axios from 'axios';
import FormData from 'form-data';
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

  form.append('v', process.env.VK_API_VERSION);

  form.append(
    'access_token',
    isUser
      ? process.env.USER_VK_API_ACCESS_TOKEN
      : process.env.CHAT_BOT_VK_API_ACCESS_TOKEN
  );

  if (payload) {
    for (const [key, value] of Object.entries(payload)) {
      if (value === undefined) {
        continue;
      }

      form.append(key, value);
    }
  }

  return vkInternalAxiosInstance.post<VkResponse<M>>(
    `method/${vkMethod}`,
    form
  );
}
