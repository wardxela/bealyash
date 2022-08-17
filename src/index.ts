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
bot.set(/беляш (трек|музыка|микс|музло)/i, getAudio);
bot.set(/беляш буст (антигей)/i, useBoost);
bot.set(/тян/i, getChan);

// Users
bot.group(builder => {
  // Guards
  builder.protect(/.*/, onlyUsers);

  // Documentation
  builder
    .set(/беляш (помощь|х(э|е)лп|дока|инфа|help)/i, getHelp)
    .set(/беляш бусты (антигей)/i, getAllBoosts)
    .set(/беляш все роли/i, getAllRoles);

  // Statistics
  builder
    .set(/беляш чат/i, getChatStatistics)
    .set(/беляш профиль/i, getProfile)
    .set(/беляш (вероятност(и|ь)|шансы?) (опидорения)/i, getProbabilities);
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
