import FormData from 'form-data';
import { vkAxios } from './vkAxios';

type FormDataOptions = Record<string, string | number | boolean>;

/**
 * Loads any kind of data from VK API
 */
export async function loadVkData(vkMethod: string, payload: FormDataOptions) {
  const form = new FormData();

  form.append('access_token', process.env.USER_VK_API_ACCESS_TOKEN);

  for (const [key, value] of Object.entries(payload)) {
    form.append(key, value);
  }

  return vkAxios.post(`/method/${vkMethod}`, form, form.getHeaders());
}
