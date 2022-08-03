import { VkNewMessageEvent } from '../vk';
import { BotCommandResponse } from './BotCommandResponse';

export type BotSyncCommand = (event: VkNewMessageEvent) => BotCommandResponse;
export type BotAsyncCommand = (
  event: VkNewMessageEvent
) => Promise<BotCommandResponse>;
export type BotCommand = BotSyncCommand | BotAsyncCommand;

export type BotCommands = Map<RegExp, BotCommand>;
