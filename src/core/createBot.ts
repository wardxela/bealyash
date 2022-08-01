import { createServer } from 'http';
import { bot } from './bot';
import { getBody } from './getBody';
import { isError } from './predicates';
import { sendResponse } from './sendResponse';
import { verifyRequest } from './verifyRequest';

export function createBot() {
  const server = createServer(async (req, res) => {
    const body = verifyRequest(req, await getBody(req));
    if (isError(body)) {
      sendResponse(res, body);
      return;
    }
    const message = await bot(body);
    sendResponse(res, message);
  });

  return server;
}
