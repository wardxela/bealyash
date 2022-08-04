import { VkNewMessageEvent } from './VkEvent';
import { VkWeakSendMessagesRequestParams } from './VkSendMessagesRequestParams';

export type VkReply = (
  weakParams: VkWeakSendMessagesRequestParams,
  messageEvent: VkNewMessageEvent
) => Promise<any>;
