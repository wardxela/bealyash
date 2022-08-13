import { BotCommand } from '../../../core';
import { findOrCreateProfile } from '../../../services/db';
import { createVkLink, getUsers } from '../../../services/vk';
import { ruNumberToString } from '../../../utils';

export const getProfile: BotCommand = async event => {
  const { from_id, peer_id } = event.object.message;

  const profilePromise = findOrCreateProfile(from_id, peer_id);
  const userPromise = getUsers(from_id);

  const [profile, user] = await Promise.all([profilePromise, userPromise]);

  if (!user.response[0]) {
    return { message: 'Не нашел' };
  }

  const name = createVkLink(user.response[0]);
  const roles = !profile.rolesOnProfile.length
    ? 'не имеешь ролей'
    : `имеешь роли: ${profile.rolesOnProfile.reduce(
        (acc, { role }) => `${!acc ? acc : `${acc}, `}${role.name}`,
        ''
      )}`;
  const gayCount = ruNumberToString(profile.gayCounter);
  const message = `${name}, в этой беседе ты:\nбыл пидором ${gayCount}\n${roles}`;

  return {
    message,
  };
};
