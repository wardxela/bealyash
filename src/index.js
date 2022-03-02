import { createServer } from 'http';
import handler from './bot.js';

const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

const server = createServer((req, res) => {
  let _data = '';

  req.on('data', chunk => {
    _data += chunk;
  });

  req.on('end', () => {
    let data = JSON.parse(_data);
    const botResponse = handler(data);

    res.end(botResponse);
  });
});

server.listen(PORT, HOST);
