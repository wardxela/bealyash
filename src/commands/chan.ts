import { BotAsyncCommand } from '../core';
import { getVkMediaURL, uploadPhoto } from '../services/vk';
import { getRandomPicture, PictureType } from '../services/waifu';

export const chan: BotAsyncCommand = async body => {
  const match = /хентай/i.test(body.object.message.text);
  let pictureType: PictureType = match ? 'nsfw' : 'sfw';

  const file = await getRandomPicture(pictureType);
  const uploadedPhotos = await uploadPhoto(body.object.message.peer_id, file);

  const { owner_id, id, access_key } = uploadedPhotos.response[0];

  return {
    message: 'Держи красавицу',
    attachment: getVkMediaURL('photo', owner_id, id, access_key),
  };
};
