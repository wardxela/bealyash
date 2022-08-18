import { BotCommand } from '../../../../core';
import { findOrCreateProfile } from '../../../../services/db';
import {
  createVkMemberLink,
  getGroups,
  getUsers,
} from '../../../../services/vk';
import { getTimeDiff, ruNumberToString, timeToString } from '../../../../utils';

export const getProfile: BotCommand = async event => {
  const { from_id, peer_id } = event.object.message;

  const profilePromise = findOrCreateProfile(from_id, peer_id);
  const memberPromise = from_id > 0 ? getUsers(from_id) : getGroups(-from_id);

  const [profile, member] = await Promise.all([profilePromise, memberPromise]);

  const name = createVkMemberLink(member.response[0]);
  const roles = !profile.rolesOnProfile.length
    ? 'Не имеешь ни одной роли'
    : `Имеешь роли: ${profile.rolesOnProfile.reduce(
        (acc, { role }) => `${!acc ? acc : `${acc}, `}${role.name}`,
        ''
      )}`;

  let booster = 'Не имеешь буста';

  if (
    profile.booster &&
    profile.boosterExpirationDate &&
    profile.boosterExpirationDate > new Date()
  ) {
    const expiresIn = timeToString(-getTimeDiff(profile.boosterExpirationDate));
    booster = `Буст - "${profile.booster.title}" (${expiresIn})`;
  }

  const gayCount = `Был пидором ${ruNumberToString(profile.gayCounter)}`;
  const message = `${name}, в этой беседе ты:\n${gayCount}\n${roles}\n${booster}`;

  return {
    message,
  };
};
