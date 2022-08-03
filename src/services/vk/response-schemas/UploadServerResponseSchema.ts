import { z } from 'zod';

export const UploadServerResponseSchema = z.object({
  server: z.number(),
  photo: z.string(),
  hash: z.string(),
});
