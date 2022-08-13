import { BotCommand } from '../../../core';
import { db } from '../../../services/db';

export const createRole: BotCommand = async (event, match) => {
  const name = match[1];
  const description = match[2];

  if (description === ' ') {
    return {
      message: 'Добавь описание к роли',
    };
  }

  try {
    await db.role.create({
      data: {
        name,
        description,
      },
    });
    return {
      message: `Роль ${name} успешно создана`,
    };
  } catch (e) {
    return {
      message: `Ошибка: роль ${name} уже существует`,
    };
  }
};
