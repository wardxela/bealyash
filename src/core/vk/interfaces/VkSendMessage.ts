import { VkNewMessageEvent } from './VkEvent';
import { VkWeakSendMessagesRequestParams } from './VkRequestParams';

export type VkSendMessage = (
  weakParams: VkWeakSendMessagesRequestParams,
  messageEvent: VkNewMessageEvent
) => Promise<any>;
