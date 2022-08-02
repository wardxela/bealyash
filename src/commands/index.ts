import { Commands } from '../core';
import { chan } from './chan';
import { decrease } from './decrease';
import { increase } from './increase';
import { test } from './test';

export const commands: Commands = new Map();

commands.set(/тест/, test);
commands.set(/твій пісюн зменшився/, decrease);
commands.set(/твій пісюн виріс/, increase);
commands.set(/тян/, chan);
