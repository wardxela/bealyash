import { VkNewMessageEvent } from '../vk';
import { BotCommandResponse } from './BotCommandResponse';

export type BotCommand = (
  body: VkNewMessageEvent
) => Promise<BotCommandResponse> | BotCommandResponse;

export type BotCommands = Map<RegExp, BotCommand>;
