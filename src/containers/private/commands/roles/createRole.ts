import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { z, ZodError } from 'zod';
import { BotCommand } from '../../../../core';
import { db } from '../../../../services/db';
import { createWrongArgsErrorMessage, parseArgs } from '../../../../utils';

export const createRole: BotCommand = async event => {
  try {
    const { name, description } = parseArgs(
      event.object.message.text,
      z.object({
        name: z.string(),
        description: z.string(),
      })
    );
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
    let message = 'error';
    if (e instanceof PrismaClientKnownRequestError) {
      message = 'Такая роль уже существует';
    } else if (e instanceof ZodError) {
      message = createWrongArgsErrorMessage({
        name: 'string',
        description: 'string',
      });
    }
    return { message };
  }
};
