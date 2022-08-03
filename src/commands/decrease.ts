import { BotAsyncCommand, getVkMediaURL } from '../core';
import { COMMUNITY_ID, getPhotos } from '../services/vk';
import { randomFrom } from '../utils';

const POSSIBLE_MESSAGES = [
  'Fuck you',
  'Fucking slave',
  'Another victim',
  'Do you like what you see?',
  'Come on college boy',
  'Ahh, like that?',
];

const ALBUM_ID = 285405543;

export const decrease: BotAsyncCommand = async () => {
  const photos = await getPhotos({
    owner_id: -COMMUNITY_ID,
    album_id: ALBUM_ID,
  });

  const { owner_id, id } = randomFrom(photos.response.items);

  return {
    message: randomFrom(POSSIBLE_MESSAGES),
    attachment: getVkMediaURL('photo', owner_id, id),
  };
};
