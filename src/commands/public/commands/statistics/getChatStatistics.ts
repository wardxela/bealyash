import { BotCommand } from '../../../../core';
import { db } from '../../../../services/db';
import {
  createVkMemberName,
  findMemberById,
  getConversationMembers,
} from '../../../../services/vk';
import { ruNumberToString } from '../../../../utils';

export const getChatStatistics: BotCommand = async event => {
  const profilesPromise = db.profile.findMany({
    where: {
      chatId: event.object.message.peer_id,
    },
    orderBy: {
      gayCounter: 'desc',
    },
    select: {
      userId: true,
      gayCounter: true,
    },
  });
  const membersPromise = getConversationMembers(event.object.message.peer_id);
  const [profiles, members] = await Promise.all([
    profilesPromise,
    membersPromise,
  ]);
  const message = profiles.reduce((acc, profile) => {
    const user = findMemberById(profile.userId, members);
    if (!user) {
      return acc;
    }
    const name = createVkMemberName(user);
    const gayCount = ruNumberToString(profile.gayCounter);
    return `${acc}${name} - ${gayCount}\n`;
  }, 'Статистика пидорения:\n');

  return {
    message,
  };
};
