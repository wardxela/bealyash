import { BotCommands } from '../core';
import { decrease } from './decrease';
import { increase } from './increase';
import { test } from './test';

export const commands: BotCommands = new Map();

commands.set(/тест/, test);
commands.set(/твій пісюн зменшився/, decrease);
commands.set(/твій пісюн виріс/, increase);
