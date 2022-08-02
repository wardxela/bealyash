import { prepareVkSendMessagesRequestParams } from '../helpers';
import {
  VkMessageObject,
  VkWeakSendMessagesRequestParams,
} from '../interfaces';
import { vkAxios } from '../vkAxios';

export async function sendMessage(
  weakParams: VkWeakSendMessagesRequestParams,
  requestMessageObject: VkMessageObject
) {
  const params = prepareVkSendMessagesRequestParams(
    weakParams,
    requestMessageObject
  );
  return vkAxios('messages.send', params, false);
}
