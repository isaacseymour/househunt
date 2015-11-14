import test from 'tape';
import readFile from 'fs-readfile-promise';
import crawl from '../crawl';
import nock from 'nock';

const rmStub = nock("https://rightmove.co.uk");

test('crawling something other than rightmove', (t) => {
  t.plan(2);

  crawl('https://lol.com/something')
    .then((response) => t.end(`responded with ${response} instead of an error!`))
    .catch(({ status, message }) => {
      t.equal(status, 400);
      t.equal(message, 'must be a Rightmove link');
    });
});

test('when Rightmove 404s', (t) => {
  t.plan(2);

  rmStub
    .get("/lolno.html")
    .reply(404, "nah m8");

  crawl('https://rightmove.co.uk/lolno.html')
    .then((response) => t.end(`responded with ${response} instead of an error!`))
    .catch(({ status, message }) => {
      t.equal(status, 404);
      t.equal(message, 'error from Rightmove');
    });
});

test('when Rightmove responds fine', (t) => {
  t.plan(1);

  readFile('./fixtures/rightmove-response.html')
    .then((file) => file.toString())
    .then((responseBody) => {
      rmStub
        .get("/property-123.html")
        .reply(200, responseBody);

      const crawlUrl = 'https://rightmove.co.uk/property-123.html';

      crawl(crawlUrl)
        .catch((error) => t.end(`responded with ${error}, not a response`))
        .then((response) => {
          t.deepEqual(response, {
            crawlUrl,
            address: 'The Heron, 5 Moor Lane, London',
            imageUrl: 'http://media.rightmove.co.uk/dir/94k/93814/55917461/93814_CRL130152_L_IMG_00_0000_max_656x437.JPG',
          });
        });
    });
});
