"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const settings_1 = require("../settings");
function auth() {
    return {
        status: 200,
        message: settings_1.settings.confirmationToken,
    };
}
exports.auth = auth;
