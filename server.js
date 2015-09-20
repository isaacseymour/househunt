import express from 'express';
import http from 'http';

import routes from './routes/index';

import bodyParser from 'body-parser';

const app = express();

app.use(express.static('app'));
app.use(bodyParser.json());

app.use('/', routes);

const server = http.createServer(app);

server.listen(3001);

server.on('listening', () => {
  console.log('Server listening on port 3001');
});

server.on('error', (e) => {
  console.log('Server got error', e);
});

