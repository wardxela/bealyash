import { VkGetUserResponseSchema } from '../response-schemas';
import { vkAxios } from '../vkAxios';

export async function getUsers(userIds: number | number[]) {
  const { data } = await vkAxios('users.get', { user_ids: userIds.toString() });
  return VkGetUserResponseSchema.parse(data);
}
