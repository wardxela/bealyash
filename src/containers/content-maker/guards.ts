import { BotGuard } from '../../core';
import { findOrCreateProfile } from '../../services/db';

export const onlyContentMakers: BotGuard = async event => {
  const { from_id, peer_id } = event.object.message;
  const profile = await findOrCreateProfile(from_id, peer_id);
  const allow = profile.rolesOnProfile.some(
    ({ role }) => role.name === 'Контент-мейкер'
  );
  if (allow) {
    return {
      success: true,
    };
  }
  return {
    success: false,
    message: 'Данная команда доступна только контент-мейкерам',
  };
};
