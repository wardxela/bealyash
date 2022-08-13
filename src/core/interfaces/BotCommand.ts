import { VkGroupEvent } from '../vk';
import { BotCommandResponse } from './BotCommandResponse';
import { Pattern } from './Pattern';

export type BotCommand = (
  event: VkGroupEvent<'message_new'>,
  match: RegExpMatchArray
) => BotCommandResponse | Promise<BotCommandResponse>;

export type BotCommands = Map<Pattern, BotCommand>;
