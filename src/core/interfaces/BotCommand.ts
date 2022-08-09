import { VkGroupEvent } from '../vk';
import { BotCommandResponse } from './BotCommandResponse';

export type BotSyncCommand = (
  event: VkGroupEvent<'message_new'>
) => BotCommandResponse;
export type BotAsyncCommand = (
  event: VkGroupEvent<'message_new'>
) => Promise<BotCommandResponse>;
export type BotCommand = BotSyncCommand | BotAsyncCommand;

export type BotCommands = Map<RegExp, BotCommand>;
