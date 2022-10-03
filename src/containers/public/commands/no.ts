import { BotCommand } from '../../../core';
import { db } from '../../../services/db';

export const no: BotCommand = async event => {
  const { from_id, peer_id } = event.object.message;

  await db.profile.upsert({
    where: {
      userId_chatId: {
        userId: from_id,
        chatId: peer_id,
      },
    },
    create: {
      userId: from_id,
      gayCounter: 1,
      chat: {
        connectOrCreate: {
          where: { id: peer_id },
          create: { id: peer_id },
        },
      },
    },
    update: {
      gayCounter: { increment: 1 },
    },
  });

  return { attachment: 'photo-210983855_457240426' };
};
