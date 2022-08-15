export type VkMethod =
  | 'photos.get'
  | 'photos.getMessagesUploadServer'
  | 'photos.saveMessagesPhoto'
  | 'messages.getConversationMembers'
  | 'users.get'
  | 'groups.getById';

export type VkCheckbox = 0 | 1;

export interface VkRequestParams {
  'photos.get': VkGetPhotosRequestParams;
  'photos.getMessagesUploadServer': VkGetMessagesUploadServerRequestParams;
  'photos.saveMessagesPhoto': VKSaveMessagesPhotoRequestParams;
  'messages.getConversationMembers': VkGetConversationMembersRequestParams;
  'users.get': VkGetUserRequestParams;
  'groups.getById': VkGetGroupsByIdRequestParams;
}

export interface VkGetPhotosRequestParams {
  owner_id: number;
  album_id: number;
}

export interface VkGetMessagesUploadServerRequestParams {
  peer_id: number;
}

export interface VKSaveMessagesPhotoRequestParams {
  photo: string;
  server: number;
  hash: string;
}

export interface VkGetConversationMembersRequestParams {
  peer_id: number;
  offset?: number;
  count?: number;
  extended?: VkCheckbox;
  fields?: string;
}

export interface VkGetUserRequestParams {
  user_ids: string;
  name_case?: 'nom' | 'gen' | 'dat' | 'acc' | 'ins' | 'abl';
  fields?: string;
}

interface VkGetGroupsByIdRequestParams {
  group_ids: string;
}
