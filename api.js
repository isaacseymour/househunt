import express from 'express';
import crawl from './routes/crawl';
import bodyParser from 'body-parser';

const depromise = route => (req, res) => {
  route(req, res)
  .then((response) => res.json(response))
  // TODO: switch to `.catch(({ status, message } = error) => {` when Babel 6 is fixed
  .catch((error) => {
    let { status, message } = error;

    if(isNaN(status)) {
      console.log("EXCEPTION!", error, error.stack);
      status = 500;
      message = 'oops, server error';
    }

    return res.status(status).json({ error: { message } });
  });
};

const api = express();

api.use(express.static('app'));
api.use(bodyParser.json());

api.post('/crawl', depromise((req) => crawl(req.body.crawlUrl)));

export default api;
