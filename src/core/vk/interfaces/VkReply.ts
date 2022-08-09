import { VkGroupEvent } from './VkEvent';
import { VkWeakSendMessagesRequestParams } from './VkSendMessagesRequestParams';

export type VkReply = (
  weakParams: VkWeakSendMessagesRequestParams,
  messageEvent: VkGroupEvent<'message_new'>
) => Promise<any>;
