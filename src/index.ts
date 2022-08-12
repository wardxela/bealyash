import 'dotenv/config';
import { createBot } from './core';
import { config, PORT } from './config';
import {
  getChan,
  gayOfTheMinute,
  getStatistics,
  getAudio,
  addAudio,
} from './commands/public';
import { changeSize, showSize } from './commands/dick-kraft';
import { dickKraftRegExp, onlyDickKraft, onlyUsers } from './guards';

const bot = createBot(config);
bot.listen(PORT);

// Guards
bot.protect(/.*/, onlyUsers);
bot.protect(dickKraftRegExp, onlyDickKraft);

// Bealyash
bot.set(/тян/i, getChan);
bot.set(/кто пидор/i, gayOfTheMinute);
bot.set(/беляш статистика/i, getStatistics);
bot.set(/беляш трек/i, getAudio);
bot.set(/беляш добавь/i, addAudio);

// Dick_Kraft_Bot | GACHI
bot.set(/твій пісюн (зменшився|виріс)/, changeSize);
bot.set(/довжина твого писюна \d+ см/, showSize);
