"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
function sendResponse(res, botResponse) {
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = botResponse.status;
    res.end(botResponse.message);
}
exports.sendResponse = sendResponse;
