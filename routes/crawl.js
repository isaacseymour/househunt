import url from 'url';
import fetch from 'isomorphic-fetch';
import cheerio from 'cheerio';

export default function crawl(crawlUrl) {
  return checkUrl(crawlUrl)
    .then(fetch)
    .then(checkRightmoveResponse)
    .then(cheerio.load)
    .then(extractParams)
    .then((response) => Object.assign({}, response, { crawlUrl }));
}

function urlIsValid(urlString) {
  const hostname = url.parse(urlString).hostname;

  return hostname === 'rightmove.co.uk' || hostname === 'www.rightmove.co.uk';
}

function checkUrl(crawlUrl) {
  if(!urlIsValid(crawlUrl)) {
    return Promise.reject({ status: 400, message: 'must be a Rightmove link' });
  } else {
    return Promise.resolve(crawlUrl);
  }
}

function checkRightmoveResponse(response) {
  if(response.status !== 200) {
    throw { status: response.status, message: "error from Rightmove" };
  }

  return response.text();
}

function extractParams(body) {
  const address = body(".property-header-bedroom-and-price address").first().text();
  const imageUrl = body("div.gallery img").first().attr("src");

  return { address, imageUrl };
}
