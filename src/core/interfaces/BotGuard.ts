import { VkGroupEvent, VkWeakSendMessagesRequestParams } from '../vk';
import { Pattern } from './Pattern';

export interface BotGuardSuccessfulResponse {
  success: true;
}
export type BotGuardFailedResponse = {
  success: false;
} & Partial<VkWeakSendMessagesRequestParams>;

export type BotGuardResponse =
  | BotGuardSuccessfulResponse
  | BotGuardFailedResponse;

export type BotGuard = (
  event: VkGroupEvent<'message_new'>,
  match: RegExpMatchArray
) => Promise<BotGuardResponse> | BotGuardResponse;

export type BotGuards = Map<Pattern, BotGuard>;
