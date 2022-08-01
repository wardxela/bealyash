import axios from 'axios';

export const vkAxios = axios.create({
  baseURL: 'https://api.vk.com/',
  params: {
    v: process.env.VK_API_VERSION,
  },
});
