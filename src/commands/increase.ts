import { BotAsyncCommand } from '../core';
import {
  POSITIVE_REACTIONS,
  POSITIVE_REACTIONS_ALBUM_ID,
} from '../services/gachi';
import { COMMUNITY_ID, getPhotos, createVkMediaURL } from '../services/vk';
import { randomFrom } from '../utils';

export const increase: BotAsyncCommand = async () => {
  const photos = await getPhotos({
    owner_id: -COMMUNITY_ID,
    album_id: POSITIVE_REACTIONS_ALBUM_ID,
  });

  const { owner_id, id } = randomFrom(photos.response.items);

  return {
    message: randomFrom(POSITIVE_REACTIONS),
    attachment: createVkMediaURL('photo', owner_id, id),
  };
};
