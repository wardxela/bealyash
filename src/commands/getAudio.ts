import { BotCommand } from '../core';
import { db } from '../services/prisma';
import { createVkMediaURL } from '../services/vk';
import { random } from '../utils';

export const getAudio: BotCommand = async event => {
  const count = await db.attachment.count({
    where: {
      type: {
        name: 'audio',
      },
    },
  });

  if (count === 0) {
    return {
      message:
        'Пока что не загружено ни одного трека.\nТы можешь добавить его с помощью команды `беляш добавь`, прикрепив нужное аудио',
    };
  }

  const skip = random(0, count - 1);

  const attachment = await db.attachment.findFirst({
    skip: skip,
    where: {
      type: {
        name: 'audio',
      },
    },
    include: {
      type: true,
    },
  });

  if (!attachment) {
    return {
      message: 'Музыки нет, но вы держитесь',
    };
  }

  const media = createVkMediaURL(
    attachment.type.name,
    attachment.ownerId,
    attachment.mediaId,
    attachment.accessKey ? attachment.accessKey : undefined
  );

  return {
    message: '',
    attachment: media,
  };
};
