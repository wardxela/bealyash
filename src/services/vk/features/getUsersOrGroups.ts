import * as R from 'rambda';
import { z } from 'zod';
import {
  VkGetGroupsByIdResponseSchema,
  VkGetUserResponseSchema,
} from '../response-schemas';
import { getGroups } from './getGroups';
import { getUsers } from './getUsers';

export async function getUsersOrGroups(
  members_ids: number | number[]
): Promise<
  z.infer<
    typeof VkGetUserResponseSchema | typeof VkGetGroupsByIdResponseSchema
  >['response']
> {
  if (Array.isArray(members_ids)) {
    return R.flatten(
      await Promise.all(members_ids.map(id => getUsersOrGroups(id)))
    ) as any;
  }
  return members_ids > 0
    ? (await getUsers(members_ids)).response
    : (await getGroups(-members_ids)).response;
}
