import { db } from '../prisma';

export async function findOrCreateChat(id: number) {
  const chat = await db.chat.findUnique({
    where: {
      id,
    },
  });

  if (chat) {
    return chat;
  }

  return db.chat.create({
    data: {
      id,
    },
  });
}
