"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.vkAxios = void 0;
const axios_1 = __importDefault(require("axios"));
const settings_1 = require("./settings");
exports.vkAxios = axios_1.default.create({
    baseURL: 'https://api.vk.com/',
    params: {
        access_token: settings_1.settings.vkApiAccessToken,
        v: settings_1.settings.vkApiVersion,
    },
});
async function sendMessage() {
    return exports.vkAxios.post('/method/messages.send', {
        peer_id: 671443259,
        message: 'hello world',
    });
}
exports.sendMessage = sendMessage;
