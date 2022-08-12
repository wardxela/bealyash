import 'dotenv/config';
import { createBot } from './core';
import { config, PORT } from './config';
import {
  decrease,
  increase,
  chan,
  myPenis,
  gayOfTheMinute,
  statistics,
  getAudio,
  addAudio,
} from './commands';
import { onlyUsers } from './guards';

const bot = createBot(config);
bot.listen(PORT);

// Guards
bot.protect(/.*/, onlyUsers);

// Bealyash
bot.set(/тян/i, chan);
bot.set(/кто пидор/i, gayOfTheMinute);
bot.set(/беляш статистика/i, statistics);
bot.set(/беляш трек/i, getAudio);
bot.set(/беляш добавь/i, addAudio);

// Dick_Kraft_Bot | GACHI
bot.set(/твій пісюн зменшився/, decrease);
bot.set(/твій пісюн виріс/, increase);
bot.set(/довжина твого писюна \d+ см./, myPenis);
