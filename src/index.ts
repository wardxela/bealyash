import 'dotenv/config';
import { createBot } from './core';
import { config, PORT } from './config';
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
import { dickKraftContainer } from './containers/dick-kraft';
import { adminContainer } from './containers/admin';

const bot = createBot(config);
bot.listen(PORT);

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

// Containers
bot.group(dickKraftContainer);
bot.group(adminContainer);
