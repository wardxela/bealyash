import { CommandErrorResponse } from '../common_responses';
import { BotCommand, COMMUNITY_ID, getVkMediaURL } from '../core';
import { getPhotos } from '../services/vk';
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
  try {
    const photos = await getPhotos({
      owner_id: -COMMUNITY_ID,
      album_id: ALBUM_ID,
    });

    const { owner_id, id } = randomFrom(photos.response.items);

    return {
      message: randomFrom(POSSIBLE_RESPONSES),
      attachment: getVkMediaURL('photo', owner_id, id),
    };
  } catch (e) {
    return CommandErrorResponse;
  }
};
