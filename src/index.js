import http from 'http';

const server = createServer((req, res) => {
  res.send('hello');
});

server.listen(8000);
