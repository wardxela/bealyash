import { BotCommand } from '../../../core';
import {
  createVkMediaURL,
  VkGetPhotosResponseSchema,
} from '../../../services/vk';
import { vkAxios } from '../../../services/vk/vkAxios';
import { randomInt } from '../../../utils';

const MAX_PHOTOS = 22161;

export const getGirlPicture: BotCommand = async (event, match) => {
  const n = parseInt(match[2]);
  const count = Number.isNaN(n) ? 1 : n % 11;
  const { data } = await vkAxios('photos.get', {
    owner_id: '-75420951',
    album_id: 'wall',
    count: count,
    offset: randomInt(0, MAX_PHOTOS),
  });
  const {
    response: { items },
  } = VkGetPhotosResponseSchema.parse(data);
  const photo = items[0];
  if (!photo) {
    return null;
  }
  return {
    attachment: items
      .map(({ owner_id, id }) => createVkMediaURL('photo', owner_id, id))
      .join(),
  };
};
