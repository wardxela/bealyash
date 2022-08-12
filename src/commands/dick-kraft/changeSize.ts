import { BotCommand } from '../../core';
import {
  NEGATIVE_REACTIONS,
  NEGATIVE_REACTIONS_ALBUM_ID,
  POSITIVE_REACTIONS,
  POSITIVE_REACTIONS_ALBUM_ID,
} from '../../services/gachi';
import { COMMUNITY_ID, getPhotos, createVkMediaURL } from '../../services/vk';
import { randomFrom } from '../../utils';

export const changeSize: BotCommand = async event => {
  let albumId: number;
  let reactions: string[];

  const doIncrease = event.object.message.text.includes('виріс');
  if (doIncrease) {
    albumId = POSITIVE_REACTIONS_ALBUM_ID;
    reactions = POSITIVE_REACTIONS;
  } else {
    albumId = NEGATIVE_REACTIONS_ALBUM_ID;
    reactions = NEGATIVE_REACTIONS;
  }

  const photos = await getPhotos({
    owner_id: -COMMUNITY_ID,
    album_id: albumId,
  });

  const { owner_id, id } = randomFrom(photos.response.items);

  return {
    message: randomFrom(reactions),
    attachment: createVkMediaURL('photo', owner_id, id),
  };
};
