import { BotCommand } from '../../core';
import { db } from '../../services/prisma';
import {
  findMemberById,
  getConversationMembers,
  createVkLink,
} from '../../services/vk';

export const getStatistics: BotCommand = async event => {
  const profilesPromise = db.profile.findMany({
    where: {
      chatId: event.object.message.peer_id,
    },
    orderBy: {
      gayCounter: 'desc',
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
    const link = createVkLink(user);
    const russianException =
      ![12, 13, 14].includes(profile.gayCounter) &&
      [2, 3, 4].includes(profile.gayCounter % 10);
    const times = russianException ? 'раза' : 'раз';
    return `${acc}${link} был пидором ${profile.gayCounter} ${times}\n`;
  }, '');

  return {
    message,
  };
};
