import { BotCommand } from '../../../core';
import { db } from '../../../services/db';

export const getAllRoles: BotCommand = async () => {
  const roles = await db.role.findMany();

  const message = !roles.length
    ? 'У беляша нет ролей :('
    : `У беляша существуют следующие роли:
${roles.reduce((acc, { name }) => `${acc ? `${acc}, ` : acc} ${name}`, '')}`;

  return {
    message,
  };
};
