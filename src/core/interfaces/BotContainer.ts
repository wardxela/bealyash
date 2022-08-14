import { BotCommand, BotCommands } from './BotCommand';
import { BotGuard, BotGuards } from './BotGuard';
import { Pattern } from './Pattern';

export interface BotContainer {
  readonly commands: BotCommands;
  readonly guards: BotGuards;
  readonly containers: BotContainers;
}

export type BotContainers = BotContainer[];

export interface BotContainerBuilder {
  set(pattern: Pattern, command: BotCommand): BotContainerBuilder;
  protect(pattern: Pattern, guard: BotGuard): BotContainerBuilder;
  group(
    containerBuilderCallback: BotContainerBuilderCallback
  ): BotContainerBuilder;
}

export type BotContainerBuilderCallback = (
  containerManager: BotContainerBuilder
) => void;
