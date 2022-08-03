import 'dotenv/config';
import { createBot } from './core';
import { config } from './config';
import { test, decrease, increase, chan } from './commands';

const bot = createBot(config);
bot.listen(+process.env.PORT! || 80);

bot.add(/asdf/, () => {
  return { message: 'asdf' };
});

bot.add(/тест/, test);
bot.add(/твій пісюн зменшився/, decrease);
bot.add(/твій пісюн виріс/, increase);
bot.add(/тян/, chan);
