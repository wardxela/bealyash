import { db } from '../prisma';

export async function findOrCreateProfile(userId: number, chatId: number) {
  const profile = await db.profile.findUnique({
    where: {
      userId_chatId: {
        userId,
        chatId,
      },
    },
    include: {
      rolesOnProfile: {
        select: {
          role: {
            select: {
              name: true,
            },
          },
        },
      },
      booster: {
        select: {
          title: true,
        },
      },
    },
  });

  return profile ? profile : db.profile.create({
    data: {
      userId,
      chat: {
        connectOrCreate: {
          where: {
            id: chatId,
          },
          create: {
            id: chatId,
          },
        },
      },
    },
    include: {
      rolesOnProfile: {
        select: {
          role: {
            select: {
              name: true,
            },
          },
        },
      },
      booster: {
        select: {
          title: true,
        },
      },
    },
  });
}
