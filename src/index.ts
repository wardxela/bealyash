import 'dotenv/config';
import { createBot } from './core';
import { commands } from './commands';

const bot = createBot(commands);
bot.listen(process.env.PORT || 80);
