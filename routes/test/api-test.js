import test from 'tape';
import readFile from 'fs-readfile-promise';
import api from '../../api';
import nock from 'nock';
import request from 'supertest';

const rmStub = nock("https://rightmove.co.uk");

test('when Rightmove responds fine', (t) => {
  t.plan(2);

  readFile('./fixtures/rightmove-response.html')
    .then((responseBody) => {
      rmStub
        .get("/property-123.html")
        .reply(200, responseBody.toString());

      const crawlUrl = 'https://rightmove.co.uk/property-123.html';

      request(api)
        .post('/crawl')
        .send({ crawlUrl })
        .end((error, response) => {
          t.equal(response.status, 200);
          t.deepEqual(response.body, {
            crawlUrl,
            address: 'The Heron, 5 Moor Lane, London',
            imageUrl: 'http://media.rightmove.co.uk/dir/94k/93814/55917461/93814_CRL130152_L_IMG_00_0000_max_656x437.JPG',
          });
        });
  });
});
