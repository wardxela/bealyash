import 'dotenv/config';
import { createBot } from './core';
import { config } from './config';
import { decrease, increase, chan, myPenis, gayOfTheMinute } from './commands';
import { statistics } from './commands/statistics';
import { audio } from './commands/audio';

const bot = createBot(config);
bot.listen(+process.env.PORT! || 80);

// Bealyash
bot.set(/тян/i, chan);
bot.set(/кто пидор/i, gayOfTheMinute);
bot.set(/беляш статистика/i, statistics);
bot.set(/беляш трек/i, audio);

// Dick_Kraft_Bot | GACHI
bot.set(/твій пісюн зменшився/, decrease);
bot.set(/твій пісюн виріс/, increase);
bot.set(/довжина твого писюна \d+ см./, myPenis);
