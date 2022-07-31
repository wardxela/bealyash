import { createServer } from 'http';
import { getBody, sendResponse } from './internals';
import { bot } from './bot';

export function createBot() {
  const server = createServer(async (req, res) => {
    const body = await getBody(req);
    const message = await bot(body);
    sendResponse(res, message);
  });

  return server;
}
