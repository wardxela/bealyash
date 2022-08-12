import {
  VkMessageObject,
  VkSendMessagesRequestParams,
  VkWeakSendMessagesRequestParams,
} from '../interfaces';
import { randomId } from './randomId';

export function prepareVkSendMessagesRequestParams(
  weakParams: VkWeakSendMessagesRequestParams,
  clientMessageObject: VkMessageObject
): VkSendMessagesRequestParams {
  const random_id = randomId();
  const message = weakParams.message as string;
  const peer_id = weakParams.peer_id
    ? weakParams.peer_id
    : clientMessageObject.message.peer_id;
  const attachment = weakParams.attachment;

  return {
    random_id,
    message,
    peer_id,
    attachment,
  };
}
