import { createServer } from 'https';

const PORT = process.env.PORT || 8080;

const server = createServer((req, res) => {
  res.end('hello');
});

server.listen(PORT);
