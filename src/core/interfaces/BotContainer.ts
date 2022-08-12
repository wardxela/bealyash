import { BotCommand, BotCommands } from './BotCommand';
import { BotGuard, BotGuards } from './BotGuards';
import { Pattern } from './Pattern';

export interface BotContainer {
  set(pattern: Pattern, command: BotCommand): void;
  protect(pattern: Pattern, command: BotGuard): void;
  group(container: BotContainer): void;
  commands: BotCommands;
  guards: BotGuards;
  containers: BotContainers;
}

export type BotContainers = BotContainer[];
