import 'dotenv/config';
import { createBot } from './core';
import { config } from './config';
import { decrease, increase, chan } from './commands';
import { myPenis } from './commands/myPenis';

const bot = createBot(config);
bot.listen(+process.env.PORT! || 80);

bot.add(/твій пісюн зменшився/, decrease);
bot.add(/твій пісюн виріс/, increase);
bot.add(/тян/i, chan);
bot.add(/довжина твого писюна \d+ см./, myPenis);
