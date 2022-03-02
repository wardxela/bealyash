import { createServer } from 'http';

const PORT = process.env.PORT;
const HOST = '0.0.0.0';

const server = createServer((req, res) => {
  console.log(req);
  res.writeHead(200);
  res.end('hello');
});

server.listen(PORT, HOST);
