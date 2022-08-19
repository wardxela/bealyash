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
  getProbabilities,
  getHelp,
  getProfile,
  onlyUsers,
  useBoost,
  getXP,
} from './commands/public';
import {
  createRole,
  deleteRole,
  giveRole,
  onlyAdmin,
  updateRole,
} from './commands/private';
import { changeSize, onlyDickKraft, showSize } from './commands/dick-kraft';
import { addAudio, onlyContentMakers } from './commands/content-maker';

const bot = createBot(config);

// Public
bot.set(/(кто|я|ты|вы|она?) пидо?р/i, getGayOfTheMinute);
bot.set(/тян/i, getChan);
bot.set(/б(еляш)? (трек|музыка|микс|музло)/i, getAudio);
bot.set(/б(еляш)? буст/i, useBoost);
bot.set(/б(еляш)? фарм/i, getXP);

// Users
bot.group(builder => {
  // Guards
  builder.protect(/.*/, onlyUsers);

  // Documentation
  builder
    .set(/б(еляш)? (помощь|х(э|е)лп|дока|инфа|help)/i, getHelp)
    .set(/б(еляш)? все бусты/i, getAllBoosts)
    .set(/б(еляш)? все роли/i, getAllRoles);

  // Statistics
  builder
    .set(/б(еляш)? чат/i, getChatStatistics)
    .set(/б(еляш)? профиль/i, getProfile)
    .set(/б(еляш)? шансы? (опидорения)/i, getProbabilities);
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
    .set(/^б(еляш)? дай роль ([а-яА-Я-_]+)$/i, giveRole)
    .set(/^б(еляш)? создай роль/i, createRole)
    .set(/^б(еляш)? обнови роль/i, updateRole)
    .set(/^б(еляш)? удали роль/i, deleteRole);
});

// Content maker
bot.group(builder => {
  builder.protect(/.*/, onlyContentMakers).set(/беляш добавь трек/i, addAudio);
});
