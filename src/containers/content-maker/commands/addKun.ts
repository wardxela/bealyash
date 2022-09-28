import { BotCommand } from '../../../core';
import { VkAttachment } from '../../../core/vk';
import { db } from '../../../services/db';

export const addKun: BotCommand = async event => {
  const kuns = event.object.message.attachments.filter(attachment => {
    return attachment.type === 'photo';
  }) as VkAttachment<'photo'>[];

  if (!kuns.length) {
    return { message: 'Прикрепи фото кунчика' };
  }

  const { length } = await Promise.all(
    kuns.map(({ photo }) => {
      return db.kun.create({
        data: {
          photo: {
            create: {
              ownerId: photo.owner_id,
              mediaId: photo.id,
              accessKey: photo.access_key,
              type: {
                connectOrCreate: {
                  where: { name: 'photo' },
                  create: { name: 'photo' },
                },
              },
            },
          },
        },
      });
    })
  );
  return {
    message: `Добавил ${length} ${length < 5 ? 'куна' : 'кунов'}`,
  };
};
