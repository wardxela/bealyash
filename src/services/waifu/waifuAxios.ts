import axios from 'axios';

export const waifuAxios = axios.create({
  baseURL: 'https://api.waifu.pics',
});
