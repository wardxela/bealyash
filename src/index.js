import { createServer } from 'http';

const server = createServer((req, res) => {
  res.end('hello');
});

server.listen(8000);
