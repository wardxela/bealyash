"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBot = void 0;
const http_1 = require("http");
const internals_1 = require("./internals");
const bot_1 = require("./bot");
function createBot() {
    const server = (0, http_1.createServer)(async (req, res) => {
        const body = await (0, internals_1.getBody)(req);
        const message = await (0, bot_1.bot)(body);
        (0, internals_1.sendResponse)(res, message);
    });
    return server;
}
exports.createBot = createBot;
