import { VkGetConversationMembersResponseSchema } from '../response-schemas';
import { vkAxios } from '../vkAxios';

export async function getConversationMembers(peer_id: number) {
  const { data } = await vkAxios(
    'messages.getConversationMembers',
    { peer_id },
    false
  );

  return VkGetConversationMembersResponseSchema.parse(data);
}
