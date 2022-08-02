import 'dotenv/config';
import { createBot } from './core';
import { config } from './config';

const bot = createBot(config);
bot.listen(process.env.PORT || 80);
