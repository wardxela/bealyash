"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
const internals_1 = require("./internals");
const errors_1 = require("./errors");
async function bot(body) {
    if (body === null) {
        return errors_1.JSON_ERROR;
    }
    if (!(0, internals_1.isValidSecretKey)(body)) {
        return errors_1.VK_ERROR;
    }
    if (body.type === 'confirmation') {
        return (0, internals_1.auth)();
    }
    console.log('hello');
    // await sendMessage();
    return {
        status: 200,
        message: 'ok',
    };
}
exports.bot = bot;
