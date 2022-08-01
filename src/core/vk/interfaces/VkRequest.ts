import { VkMethod } from './VkMethod';

export interface VkRequestMap {
  'messages.send': VkSendMessagesRequest;
  'photos.get': VkGetPhotosRequest;
  'photos.getMessagesUploadServer': VkGetMessagesUploadServerRequest;
  'photos.saveMessagesPhoto': VKSaveMessagesPhotoRequest;
}

export type VkRequest<M extends VkMethod> = VkRequestMap[M];

export interface VkSendMessagesRequest {
  random_id: number;
  peer_id: number;
  message: string;
  attachment?: string;
}

export interface VkGetPhotosRequest {
  owner_id: number;
  album_id: number;
}

export interface VkGetMessagesUploadServerRequest {
  peer_id: number;
}

export interface VKSaveMessagesPhotoRequest {
  photo: string;
  server: number;
  hash: string;
}
