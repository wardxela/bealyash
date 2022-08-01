import axios from 'axios';
import {
  BotCommand,
  getVkMediaURL,
  isVkErrorResponse,
  uploadPhotoToVk,
} from '../core';
import { SFW, SFW_CATEGORIES, waifuAxios } from '../services/waifu';
import 'dotenv/config';

export const chan: BotCommand = async () => {
  const response = await waifuAxios.get(`${SFW}/${SFW_CATEGORIES[3]}`);
  const file = await axios.get(response.data.url, { responseType: 'stream' });
  const uploadedPhoto = await uploadPhotoToVk(671443259, file.data);

  if (isVkErrorResponse(uploadedPhoto)) {
    return { message: 'Прости, но походу сервер приуныл' };
  }

  const { owner_id, id, access_key } = uploadedPhoto.response[0];

  return {
    message: 'держи красавицу',
    attachment: getVkMediaURL('photo', owner_id, id, access_key),
  };
};
