import 'dotenv/config';
import { createServer } from 'http';
import { CONFIRMATION_STRING } from './config.js';
import { CONFIRMATION } from './vk/types.js';
import bot from './bot/index.js';

const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

const server = createServer((request, response) => {
  let __responseBody = '';

  request.on('data', chunk => {
    __responseBody += chunk;
  });

  request.on('end', () => {
    response.setHeader('Content-Type', 'text/plain');

    let data = null;

    if (__responseBody) {
      data = JSON.parse(__responseBody);
    } else {
      response.statusCode = 400;
      return response.end('Empty JSON');
    }

    if (data.type === CONFIRMATION) {
      response.statusCode = 200;
      return response.end(CONFIRMATION_STRING);
    }

    return bot(data, (code, message) => {
      response.statusCode = code;
      response.end(message);
    });
  });
});

server.listen(PORT, HOST);
