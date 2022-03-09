import 'dotenv/config';
import { createServer } from 'http';
import { CONFIRMATION } from './vk/types.js';
import bot from './bot/index.js';

const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

const server = createServer(async (request, response) => {
  let __requestBody = '';
  let vkRequest = null;

  response.setHeader('Content-Type', 'text/plain');

  for await (const chunk of request) {
    __requestBody += chunk;
  }

  if (__requestBody) {
    try {
      vkRequest = JSON.parse(__requestBody);
    } catch (e) {
      response.statusCode = 400;
      return response.end('Incorrect JSON');
    }
  } else {
    response.statusCode = 400;
    return response.end('Empty JSON');
  }

  if (vkRequest.secret !== process.env.SECRET_KEY) {
    response.statusCode = 403;
    return response.end('Not VK Callback API call');
  }

  if (vkRequest.type === CONFIRMATION) {
    response.statusCode = 200;
    return response.end(process.env.CONFIRMATION_STRING);
  }

  await bot(vkRequest);

  response.statusCode = 200;
  response.end('ok');
});

server.listen(PORT, HOST);
