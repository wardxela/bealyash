import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { z, ZodError } from 'zod';
import { BotCommand } from '../../../../core';
import { db } from '../../../../services/db';
import { createWrongArgsErrorMessage } from '../../../../utils';
import { parseCommandArgs } from '../../../../utils/parseCommandArgs';

const DeleteRoleArgumentsSchema = z.object({
  name: z.string(),
});

export const deleteRole: BotCommand = async event => {
  try {
    const notSafeArgs = parseCommandArgs(event.object.message.text);
    const args = DeleteRoleArgumentsSchema.parse(notSafeArgs);
    const role = await db.role.delete({
      where: {
        name: args.name,
      },
    });
    return {
      message: `Роль ${role.name} успешно удалена`,
    };
  } catch (e) {
    let message = 'error';
    if (e instanceof PrismaClientKnownRequestError) {
      message = `Такой роли не существует`;
    } else if (e instanceof ZodError) {
      message = createWrongArgsErrorMessage({
        name: 'string',
      });
    }
    return {
      message,
    };
  }
};
