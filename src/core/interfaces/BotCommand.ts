import { VkGroupEvent } from '../vk';
import { Pattern } from './Pattern';
import { VkWeakSendMessagesRequestParams } from '../vk';

export type BotCommandResponse = VkWeakSendMessagesRequestParams | null;
export type BotVerifiedCommandResponse = VkWeakSendMessagesRequestParams;

export type BotCommand = (
  event: VkGroupEvent<'message_new'>,
  match: RegExpMatchArray
) => Promise<BotCommandResponse> | BotCommandResponse;

export type BotCommands = Map<Pattern, BotCommand>;
