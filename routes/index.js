import express from 'express';
import url from 'url';
import fetch from 'isomorphic-fetch';
import cheerio from 'cheerio';

const router = express.Router();

function urlIsValid(urlString) {
  const parsed = url.parse(urlString);
  return parsed.hostname === 'rightmove.co.uk' ||
    parsed.hostname === 'www.rightmove.co.uk';
}

// This takes in a URL to crawl, and returns a house (url, postcode)
router.post('/crawl', (req, res) => {
  console.log('got body', req.body);
  const { crawlUrl } = req.body;

  if(!urlIsValid(crawlUrl)) {
    console.log('rejecting - not rightmove');

    return res.json({
      error: { message: "must be a Rightmove link" }
    });
  }

  fetch(crawlUrl).then((response) => {
    console.log('got status from RM', response.status);

    if(response.status !== 200) {
      return res.json({
        error: { message: "error from Rightmove" },
      });
    }

    return response.text();
  }).then((rawBody) => {
    console.log('raw body from RM', rawBody);

    const body = cheerio.load(rawBody);
    const address = body("address").first().text();

    if(address !== '') {
      return res.json({
        crawlUrl,
        address,
      });
    } else {
      return res.json({
        error: { message: "unable to find address" },
      });
    }
  });
});

export default router;
