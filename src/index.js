import 'dotenv/config';
import { createServer } from 'http';
import { CONFIRMATION_STRING } from './config.js';
import bot from './bot/index.js';

const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

const server = createServer((req, res) => {
  let _data = '';
  let data = null;

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

    if (data.type === 'confirmation') {
      return res.end(CONFIRMATION_STRING);
    }

    bot(data, message => {
      res.end(message);
    });
  });
});

server.listen(PORT, HOST);
