import { createServer } from 'http';
import { isVerifyingError } from './predicates';
import { verifyRequest } from './verifyRequest';
import { getBody, sendResponse } from './helpers';
import { navigator } from './navigator';

export function createBot() {
  const server = createServer(async (req, res) => {
    const body = verifyRequest(req, await getBody(req));
    if (isVerifyingError(body)) {
      sendResponse(res, body);
      return;
    }
    const message = await navigator(body);
    sendResponse(res, message);
  });

  return server;
}
