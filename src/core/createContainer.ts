import {
  BotCommands,
  BotContainer,
  BotContainerManager,
  BotContainers,
  BotGuards,
} from './interfaces';

export function createContainer(): BotContainer {
  const commands: BotCommands = new Map();
  const guards: BotGuards = new Map();
  const containers: BotContainers = [];

  return { commands, guards, containers };
}

export function createContainerManager(
  container: BotContainer
): BotContainerManager {
  return {
    set(pattern, command) {
      container.commands.set(pattern, command);
    },
    protect(pattern, guard) {
      container.guards.set(pattern, guard);
    },
    group(containerBuilder) {
      const nestedContainer = createContainer();
      container.containers.push(nestedContainer);
      const nestedContainerManager = createContainerManager(nestedContainer);
      containerBuilder(nestedContainerManager);
    },
  };
}
