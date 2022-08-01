import axios from 'axios';

export const vkAxios = axios.create({
  baseURL: 'https://api.vk.com/',
  params: {
    access_token: process.env.VK_API_ACCESS_TOKEN,
    v: process.env.VK_API_VERSION,
  },
});
