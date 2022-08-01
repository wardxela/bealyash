import { VkMethod } from './VkMethod';

export interface VkResponseMap {
  'photos.get': VkGetPhotosResponse;
}

export type VkResponse<M extends VkMethod> = VkErrorResponse | VkResponseMap[M];

export interface VkErrorResponse {
  error: string;
}

export interface VkPhoto {
  owner_id: number;
  id: number;
}

export interface VkGetPhotosResponse {
  response: {
    count: number;
    items: VkPhoto[];
  };
}
