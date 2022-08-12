import { BotCommands, BotGuards } from './interfaces';
import { BotContainer, BotContainers } from './interfaces';

export function createContainer(): BotContainer {
  const commands: BotCommands = new Map();
  const guards: BotGuards = new Map();
  const containers: BotContainers = [];

  const set: BotContainer['set'] = (pattern, command) => {
    commands.set(pattern, command);
  };

  const protect: BotContainer['protect'] = (pattern, guard) => {
    guards.set(pattern, guard);
  };

  const group: BotContainer['group'] = container => {
    containers.push(container);
  };

  return { set, protect, group, commands, guards, containers };
}
