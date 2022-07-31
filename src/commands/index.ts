import { BotCommands } from '../interfaces';
import { test } from './test';

export const commands: BotCommands = new Map();

commands.set(/тест/, test);
