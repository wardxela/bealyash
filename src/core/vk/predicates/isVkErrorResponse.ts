import { VkErrorResponse } from '../interfaces';

export function isVkErrorResponse(
  vkResponse: any
): vkResponse is VkErrorResponse {
  return 'error' in vkResponse;
}
