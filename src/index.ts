import 'dotenv/config';
import { createBot } from './core';
import { config } from './config';
import {
  getAllBoosts,
  getAllRoles,
  getAudio,
  getChan,
  getChatStatistics,
  getGayOfTheMinute,
  getGayProbabilities,
  getHelp,
  getProfile,
  onlyUsers,
  useBoost,
} from './containers/public';
import {
  createRole,
  deleteRole,
  giveRole,
  onlyAdmin,
  updateRole,
} from './containers/private';
import { changeSize, onlyDickKraft, showSize } from './containers/dick-kraft';
import { addAudio, onlyContentMakers } from './containers/content-maker';

const bot = createBot(config);

// Public
bot.set(/(кто|я|она?|ты) пидо?р/i, getGayOfTheMinute);
bot.set(/беляш (трек|музыка|микс|музло)/i, getAudio);
bot.set(/беляш (буст|баф)/i, useBoost);
bot.set(/беляш профиль/i, getProfile);
bot.set(/тян/i, getChan);

// Users
bot.group(builder => {
  // Guards
  builder.protect(/.*/, onlyUsers);

  // Documentation
  builder
    .set(/беляш (помощь|х(э|е)лп|дока|инфа|help)/i, getHelp)
    .set(/беляш все (бусты|бафф?ы)/i, getAllBoosts)
    .set(/беляш все роли/i, getAllRoles);

  // Statistics
  builder
    .set(/беляш стат(истика|а)?/i, getChatStatistics)
    .set(/беляш вероятности/i, getGayProbabilities);
});

// Dick_Kraft_Bot
bot.group(builder => {
  builder.protect(/.*/, onlyDickKraft);
  builder.set(/твій пісюн (зменшився|виріс)/, changeSize);
  builder.set(/довжина твого писюна \d+ см/, showSize);
});

// Private
bot.group(builder => {
  builder
    .protect(/.*/, onlyAdmin)
    .set(/^беляш дай роль ([а-яА-Я-_]+)$/i, giveRole)
    .set(/^беляш создай роль/i, createRole)
    .set(/^беляш обнови роль/i, updateRole)
    .set(/^беляш удали роль/i, deleteRole);
});

// Content maker
bot.group(builder => {
  builder.protect(/.*/, onlyContentMakers).set(/беляш добавь трек/i, addAudio);
});
