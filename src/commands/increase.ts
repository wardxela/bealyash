import { loadVkData } from '../core/vk';
import { COMMUNITY_ID } from '../core/vk/constants';
import { BotCommand } from '../interfaces';
import { random, randomFrom } from '../utils';

const POSSIBLE_RESPONSES = [
  'Как неожиданно и приятно',
  'So fucking deep',
  "Without further interruption, let's celebrate and suck some dick",
  'That turns me on',
  'Boss of this gym',
  "That's amazing",
];

const ALBUM_ID = 285411529;

export const increase: BotCommand = async () => {
  const { data } = await loadVkData('photos.get', {
    owner_id: -COMMUNITY_ID,
    album_id: ALBUM_ID,
  });

  let attachment: string | undefined;

  if (data.error) {
    attachment = undefined;
  } else {
    const photo = randomFrom(data.response.items) as any;
    attachment = `photo${photo.owner_id}_${photo.id}`;
  }

  return {
    message: randomFrom(POSSIBLE_RESPONSES),
    attachment,
  };
};
