import { z } from 'zod';

export const VkSaveMessagesPhotoResponseSchema = z.object({
  response: z
    .object({
      id: z.number(),
      owner_id: z.number(),
      access_key: z.string(),
    })
    .array(),
});
