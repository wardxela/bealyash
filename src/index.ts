import { createBot } from './core';

const bot = createBot();
bot.listen(process.env.PORT);
