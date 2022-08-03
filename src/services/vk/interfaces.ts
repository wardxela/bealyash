export type VkMethod =
  | 'photos.get'
  | 'photos.getMessagesUploadServer'
  | 'photos.saveMessagesPhoto';

export interface VkRequestParams {
  'photos.get': VkGetPhotosRequestParams;
  'photos.getMessagesUploadServer': VkGetMessagesUploadServerRequestParams;
  'photos.saveMessagesPhoto': VKSaveMessagesPhotoRequestParams;
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
