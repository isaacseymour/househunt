import http from 'http';
import api from './api';

const server = http.createServer(api);

server.listen(3001);

server.on('listening', () => {
  console.log('Server listening on port 3001');
});

server.on('error', (e) => {
  console.log('Server got error', e);
});

