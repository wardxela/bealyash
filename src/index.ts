import 'dotenv/config';
import { createBot } from './core';
import { config } from './config';
import {
  getChan,
  gayOfTheMinute,
  getStatistics,
  getAudio,
  addAudio,
  onlyUsers,
  getProfile,
  getAllRoles,
} from './containers/public';
import { changeSize, onlyDickKraft, showSize } from './containers/dick-kraft';
import { giveRole, onlyAdmin } from './containers/creator';

const bot = createBot(config);

// Guards
bot.protect(/.*/, onlyUsers);

// Commands
bot.set(/тян/i, getChan);
bot.set(/кто пидор/i, gayOfTheMinute);
bot.set(/беляш статистика/i, getStatistics);
bot.set(/беляш трек/i, getAudio);
bot.set(/беляш добавь/i, addAudio);
bot.set(/беляш профиль/i, getProfile);
bot.set(/беляш роли/i, getAllRoles);

// Dick_Kraft_Bot
bot.group(builder => {
  builder.protect(/.*/, onlyDickKraft);
  builder.set(/твій пісюн (зменшився|виріс)/, changeSize);
  builder.set(/довжина твого писюна \d+ см/, showSize);
});

// Private
bot.group(builder => {
  builder.protect(/.*/, onlyAdmin);
  builder.set(/беляш дай роль ([а-яА-Я]+)/i, giveRole);
});
