import { BotCommand } from '../../../core';
import { VkAttachment } from '../../../core/vk';
import { db } from '../../../services/prisma';

export const addAudio: BotCommand = async event => {
  const audios = event.object.message.attachments.filter(
    attachment => attachment.type === 'audio'
  ) as VkAttachment<'audio'>[];

  if (!audios.length) {
    return {
      message: 'Прикрепи аудио к своему сообщению',
    };
  }

  let audioTypeId: number;

  const audioType = await db.attachmentType.findUnique({
    where: {
      name: 'audio',
    },
  });

  if (!audioType) {
    const createdAudioType = await db.attachmentType.create({
      data: {
        name: 'audio',
      },
    });
    audioTypeId = createdAudioType.id;
  } else {
    audioTypeId = audioType.id;
  }

  const addedAudios = await db.attachment.createMany({
    data: audios.map(({ audio }) => {
      return {
        mediaId: audio.id,
        ownerId: audio.owner_id,
        typeId: audioTypeId,
        accessKey: audio.access_key ? audio.access_key : undefined,
      };
    }),
  });

  return {
    message: `Добавил ${addedAudios.count} аудио`,
  };
};
