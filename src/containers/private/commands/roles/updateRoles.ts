import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { z } from 'zod';
import { BotCommand } from '../../../../core';
import { db } from '../../../../services/db';
import { createWrongArgsErrorMessage, parseArgs } from '../../../../utils';

export const updateRole: BotCommand = async event => {
  try {
    const { name, description } = parseArgs(
      event.object.message.text,
      z.object({ name: z.string(), description: z.string() })
    );

    const role = await db.role.update({
      where: {
        name,
      },
      data: {
        description,
      },
    });

    return {
      message: `Роль ${role.name} успешно обновлена`,
    };
  } catch (e) {
    let message = 'error';
    if (e instanceof PrismaClientKnownRequestError) {
      message = 'Такой роли не существует';
    } else if (e instanceof z.ZodError) {
      message = createWrongArgsErrorMessage({
        name: 'string',
        description: 'string',
      });
    }
    return { message };
  }
};
