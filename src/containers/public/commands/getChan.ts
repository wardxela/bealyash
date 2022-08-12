import { BotCommand } from '../../../core';
import { createVkMediaURL, uploadPhoto } from '../../../services/vk';
import { getRandomPicture, PictureType } from '../../../services/waifu';

export const getChan: BotCommand = async event => {
  const match = /хентай/i.test(event.object.message.text);
  let pictureType: PictureType = match ? 'nsfw' : 'sfw';

  const file = await getRandomPicture(pictureType);
  const uploadedPhotos = await uploadPhoto(event.object.message.peer_id, file);

  const { owner_id, id, access_key } = uploadedPhotos.response[0];

  return {
    message: 'Держи красавицу',
    attachment: createVkMediaURL('photo', owner_id, id, access_key),
  };
};
