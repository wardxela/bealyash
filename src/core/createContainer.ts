import {
  BotCommands,
  BotContainer,
  BotContainerBuilder,
  BotContainers,
  BotGuards,
} from './interfaces';

export function createContainer(): BotContainer {
  const commands: BotCommands = new Map();
  const guards: BotGuards = new Map();
  const containers: BotContainers = [];

  return { commands, guards, containers };
}

export function createContainerBuilder(container: BotContainer) {
  const containerBuilder: BotContainerBuilder = {
    set(pattern, command) {
      container.commands.set(pattern, command);
      return containerBuilder;
    },
    protect(pattern, guard) {
      container.guards.set(pattern, guard);
      return containerBuilder;
    },
    group(containerBuilderCallback) {
      const nestedContainer = createContainer();
      container.containers.push(nestedContainer);
      const nestedContainerBuilder = createContainerBuilder(nestedContainer);
      containerBuilderCallback(nestedContainerBuilder);
      return containerBuilder;
    },
  };

  return containerBuilder;
}
