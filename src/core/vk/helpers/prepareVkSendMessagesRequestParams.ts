import {
  VkMessageObject,
  VkSendMessagesRequestParams,
  VkWeakSendMessagesRequestParams,
} from '../interfaces';
import { randomId } from './randomId';

export function prepareVkSendMessagesRequestParams(
  params: VkWeakSendMessagesRequestParams,
  messageObject: VkMessageObject
): VkSendMessagesRequestParams {
  const random_id = randomId();
  const message = params.message;
  const peer_id = params.peer_id
    ? params.peer_id
    : messageObject.message.peer_id;
  const attachment = params.attachment;

  return {
    random_id,
    message,
    peer_id,
    attachment,
  };
}
