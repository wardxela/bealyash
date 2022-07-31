import axios from 'axios';
import { settings } from '../settings';

export const vkAxios = axios.create({
  baseURL: 'https://api.vk.com/',
  params: {
    access_token: settings.vkApiAccessToken,
    v: settings.vkApiVersion,
  },
});
