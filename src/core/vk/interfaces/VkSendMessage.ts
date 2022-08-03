import { VkNewMessageEvent } from './VkEvent';
import { VkWeakSendMessagesRequestParams } from './VkSendMessagesRequestParams';

export type VkSendMessage = (
  weakParams: VkWeakSendMessagesRequestParams,
  messageEvent: VkNewMessageEvent
) => Promise<any>;
