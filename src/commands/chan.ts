import { BotAsyncCommand, getVkMediaURL, uploadPhoto } from '../core';
import { getRandomPicture } from '../services/waifu';

export const chan: BotAsyncCommand = async body => {
  const file = await getRandomPicture('sfw');
  const uploadedPhotos = await uploadPhoto(body.object.message.peer_id, file);

  const { owner_id, id, access_key } = uploadedPhotos.response[0];

  return {
    message: 'Держи красавицу',
    attachment: getVkMediaURL('photo', owner_id, id, access_key),
  };
};
