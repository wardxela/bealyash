import { BotAsyncCommand } from '../core';
import {
  NEGATIVE_REACTIONS,
  NEGATIVE_REACTIONS_ALBUM_ID,
} from '../services/gachi';
import { COMMUNITY_ID, getPhotos, getVkMediaURL } from '../services/vk';
import { randomFrom } from '../utils';

export const decrease: BotAsyncCommand = async () => {
  const photos = await getPhotos({
    owner_id: -COMMUNITY_ID,
    album_id: NEGATIVE_REACTIONS_ALBUM_ID,
  });

  const { owner_id, id } = randomFrom(photos.response.items);

  return {
    message: randomFrom(NEGATIVE_REACTIONS),
    attachment: getVkMediaURL('photo', owner_id, id),
  };
};
