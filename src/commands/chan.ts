import { BotAsyncCommand } from '../core';
import { getVkMediaURL, uploadPhoto } from '../services/vk';
import {
  getRandomPicture,
  PictureNsfwType,
  PictureType,
  TYPES,
} from '../services/waifu';
import { randomFrom } from '../utils';

interface PictureTypeMap {
  хентай: PictureNsfwType;
  рандом: PictureType;
}

export const chan: BotAsyncCommand = async body => {
  const match = body.object.message.text.match(/тян (хентай|рандом)/i);
  let pictureType: PictureType;

  if (match === null) {
    pictureType = 'sfw';
  } else {
    const option = match[1] as keyof PictureTypeMap;
    const pictureTypeMap: PictureTypeMap = {
      хентай: 'nsfw',
      рандом: randomFrom(TYPES),
    };
    pictureType = pictureTypeMap[option];
  }

  const file = await getRandomPicture(pictureType);
  const uploadedPhotos = await uploadPhoto(body.object.message.peer_id, file);

  const { owner_id, id, access_key } = uploadedPhotos.response[0];

  return {
    message: 'Держи красавицу',
    attachment: getVkMediaURL('photo', owner_id, id, access_key),
  };
};
