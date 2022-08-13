import { BotCommand } from '../../../core';
import { db } from '../../../services/db';
import {
  findMemberById,
  getConversationMembers,
  createVkLink,
} from '../../../services/vk';
import { ruNumberToString } from '../../../utils';

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
    const name = createVkLink(user);
    const gayCount = ruNumberToString(profile.gayCounter);
    return `${acc}${name} был пидором ${profile.gayCounter} ${gayCount}\n`;
  }, '');

  return {
    message,
  };
};
