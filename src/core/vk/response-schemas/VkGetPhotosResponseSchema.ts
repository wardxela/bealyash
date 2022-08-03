import { z } from 'zod';

export const VkGetPhotosResponseSchema = z.object({
  response: z.object({
    count: z.number(),
    items: z
      .object({
        owner_id: z.number(),
        id: z.number(),
      })
      .array(),
  }),
});
