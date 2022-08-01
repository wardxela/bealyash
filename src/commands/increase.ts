import {
  BotCommand,
  COMMUNITY_ID,
  getVkMediaURL,
  isVkErrorResponse,
  loadVkData,
} from '../core';
import { randomFrom } from '../utils';

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

  if (isVkErrorResponse(data)) {
    attachment = undefined;
  } else {
    const photo = randomFrom(data.response.items);
    attachment = getVkMediaURL('photo', photo.owner_id, photo.id);
  }

  return {
    message: randomFrom(POSSIBLE_RESPONSES),
    attachment,
  };
};
