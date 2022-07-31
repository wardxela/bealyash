"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBody = void 0;
async function getBody(req) {
    let body = '';
    for await (const chunk of req) {
        body += chunk;
    }
    if (body === '') {
        return null;
    }
    try {
        return JSON.parse(body);
    }
    catch (error) {
        return null;
    }
}
exports.getBody = getBody;
