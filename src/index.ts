import 'dotenv/config';
import { createBot } from './core';
import { config } from './config';
import { decrease, increase, chan, myPenis, gayOfTheMinute } from './commands';

const bot = createBot(config);
bot.listen(+process.env.PORT! || 80);

// Bealyash
bot.set(/тян/i, chan);
bot.set(/кто пидор/i, gayOfTheMinute);

// Dick_Kraft_Bot | GACHI
bot.set(/твій пісюн зменшився/, decrease);
bot.set(/твій пісюн виріс/, increase);
bot.set(/довжина твого писюна \d+ см./, myPenis);
