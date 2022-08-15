import { VkGetGroupsByIdResponseSchema } from '../response-schemas';
import { vkAxios } from '../vkAxios';

export async function getGroups(ids: number | number[]) {
  const { data } = await vkAxios('groups.getById', {
    group_ids: ids.toString(),
  });
  return VkGetGroupsByIdResponseSchema.parse(data);
}
