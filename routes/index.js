import express from 'express';

const router = express.Router();

router.post('/crawl', (req, res) => {
  console.log('got body', req.body);
  const { crawlUrl } = req.body;

  return res.json({
    crawlUrl,
    listing: {},
  });
});

export default router;
