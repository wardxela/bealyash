import { VkMethod } from './VkMethod';

export interface VkRequestParamsMap {
  'messages.send': VkSendMessagesRequestParams;
  'photos.get': VkGetPhotosRequestParams;
  'photos.getMessagesUploadServer': VkGetMessagesUploadServerRequestParams;
  'photos.saveMessagesPhoto': VKSaveMessagesPhotoRequestParams;
}

export type VkRequest<M extends VkMethod> = VkRequestParamsMap[M];

export interface VkSendMessagesRequestParams {
  random_id: number;
  peer_id: number;
  message: string;
  attachment?: string;
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
