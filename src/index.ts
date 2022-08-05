import 'dotenv/config';
import { createBot } from './core';
import { config } from './config';
import { decrease, increase, chan, myPenis, gayOfTheMinute } from './commands';

const bot = createBot(config);
bot.listen(+process.env.PORT! || 80);

bot.set(/твій пісюн зменшився/, decrease);
bot.set(/твій пісюн виріс/, increase);
bot.set(/тян/i, chan);
bot.set(/довжина твого писюна \d+ см./, myPenis);
bot.set(/кто пидор/i, gayOfTheMinute);
