import { BotCommand } from '../../../core';
import { db } from '../../../services/db';
import { createVkLink, getUsers } from '../../../services/vk';

export const giveRole: BotCommand = async (event, match) => {
  if (!event.object.message.reply_message) {
    return {
      message:
        'Отправь эту команду вместе с прикрепленным сообщением того человека, кому хочешь дать роль',
    };
  }

  const { from_id } = event.object.message.reply_message;
  const { peer_id } = event.object.message;

  const role = match[1];

  const userPromise = getUsers(from_id);
  const addRolePromise = db.rolesOnProfiles.create({
    data: {
      profile: {
        connectOrCreate: {
          where: {
            userId_chatId: {
              userId: from_id,
              chatId: peer_id,
            },
          },
          create: {
            userId: from_id,
            chat: {
              connectOrCreate: {
                where: {
                  id: peer_id,
                },
                create: {
                  id: peer_id,
                },
              },
            },
          },
        },
      },
      role: {
        connect: {
          name: role,
        },
      },
    },
  });

  try {
    const [user] = await Promise.all([userPromise, addRolePromise]);
    const name = createVkLink(user.response[0]);
    return {
      message: `${name} получил роль ${role}`,
    };
  } catch (e) {
    return {
      message: `Ошибка: роли ${role} не существует`,
    };
  }
};
