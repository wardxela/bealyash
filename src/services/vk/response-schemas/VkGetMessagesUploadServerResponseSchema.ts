import { z } from 'zod';

export const VkGetMessagesUploadServerResponseSchema = z.object({
  response: z.object({
    upload_url: z.string(),
    album_id: z.number(),
    user_id: z.number(),
    group_id: z.number(),
  }),
});
