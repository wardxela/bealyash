import 'dotenv/config';
import { createServer } from 'http';
import { CONFIRMATION_STRING } from './config.js';
import { CONFIRMATION } from './vk/types.js';
import bot from './bot/index.js';

const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

const server = createServer((req, res) => {
  let _data = '';

  req.on('data', chunk => {
    _data += chunk;
  });

  req.on('end', () => {
    let data = null;

    if (_data) {
      data = JSON.parse(_data);
    } else {
      data = {
        error: 'Empty JSON',
      };
    }

    res.setHeader('Content-Type', 'text/plain');
    res.writeHead(200);

    if (data.type === CONFIRMATION) {
      return res.end(CONFIRMATION_STRING);
    }

    return bot(data, message => {
      res.end(message);
    });
  });
});

server.listen(PORT, HOST);
