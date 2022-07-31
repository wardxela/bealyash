"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./core");
const bot = (0, core_1.createBot)();
bot.listen(process.env.PORT || 80);
