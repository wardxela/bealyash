import axios from 'axios';
import { Command, CommandError, getVkMediaURL, uploadPhoto } from '../core';
import { SFW, SFW_CATEGORIES, waifuAxios } from '../services/waifu';
import { randomFrom } from '../utils';

export const chan: Command = async body => {
  // const response = await waifuAxios.get(`${SFW}/${randomFrom(SFW_CATEGORIES)}`);
  // const file = await axios.get(response.data.url, { responseType: 'stream' });
  // const uploadedPhoto = await uploadPhotoToVk(
  //   body.object.message.peer_id,
  //   file.data
  // );

  // if (isVkErrorResponse(uploadedPhoto)) {
  //   return { message: 'Прости, но походу сервер приуныл' };
  // }

  // const { owner_id, id, access_key } = uploadedPhoto.response[0];

  throw new Error();
};
