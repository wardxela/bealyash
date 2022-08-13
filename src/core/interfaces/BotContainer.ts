import { BotCommand, BotCommands } from './BotCommand';
import { BotGuard, BotGuards } from './BotGuard';
import { Pattern } from './Pattern';

export interface BotContainer {
  readonly commands: BotCommands;
  readonly guards: BotGuards;
  readonly containers: BotContainers;
}

export type BotContainers = BotContainer[];

export interface BotContainerManager {
  set(pattern: Pattern, command: BotCommand): void;
  protect(pattern: Pattern, guard: BotGuard): void;
  group(containerBuilder: BotContainerBuilder): void;
}

export type BotContainerBuilder = (
  containerManager: BotContainerManager
) => void;
