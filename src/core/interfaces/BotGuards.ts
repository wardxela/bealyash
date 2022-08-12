import { VkGroupEvent } from '../vk';
import { Pattern } from './Pattern';

export type BotGuard = (
  event: VkGroupEvent<'message_new'>
) => Promise<boolean> | boolean;

export type BotGuards = Map<Pattern, BotGuard>;
