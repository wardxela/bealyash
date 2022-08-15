import { z } from 'zod';

export const UploadServerResponseSchema = z.object({
  server: z.number(),
  photo: z.string(),
  hash: z.string(),
});

export const VkGetMessagesUploadServerResponseSchema = z.object({
  response: z.object({
    upload_url: z.string(),
    album_id: z.number(),
    user_id: z.number(),
    group_id: z.number(),
  }),
});

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

export const VkSaveMessagesPhotoResponseSchema = z.object({
  response: z
    .object({
      id: z.number(),
      owner_id: z.number(),
      access_key: z.string(),
    })
    .array(),
});

export const VkUserSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
});

export const VkGroupSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const VkGetConversationMembersResponseSchema = z.object({
  response: z.object({
    count: z.number(),
    items: z
      .object({
        member_id: z.number(),
      })
      .array(),
    profiles: VkUserSchema.array(),
    groups: z
      .object({
        id: z.number(),
        name: z.string(),
      })
      .array(),
  }),
});

export type VkGetConversationMembersResponseSchema = z.infer<
  typeof VkGetConversationMembersResponseSchema
>;

export const VkGetUserResponseSchema = z.object({
  response: VkUserSchema.array(),
});

export const VkGetGroupsByIdResponseSchema = z.object({
  response: VkGroupSchema.array(),
});
