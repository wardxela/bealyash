import { BotCommand } from '../../../../core';
import { db } from '../../../../services/db';

export const getAllRoles: BotCommand = async () => {
  const roles = await db.role.findMany();

  const message = !roles.length
    ? 'У беляша нет ролей :('
    : `Роли:\n${roles.reduce(
        (acc, role) => `${acc}${role.name} - ${role.description}\n`,
        ''
      )}`;

  return {
    message,
  };
};
