import { createServer } from 'https';

const server = createServer((req, res) => {
  res.end('hello');
});

server.listen(8000);
