import { BotCommand, BotCommands } from './BotCommand';
import { BotGuard, BotGuards } from './BotGuard';
import { Pattern } from './Pattern';

export interface BotContainer {
  set(pattern: Pattern, command: BotCommand): void;
  protect(pattern: Pattern, command: BotGuard): void;
  group(container: BotContainer): void;
  readonly commands: BotCommands;
  readonly guards: BotGuards;
  readonly containers: BotContainers;
}

export type BotContainers = BotContainer[];
