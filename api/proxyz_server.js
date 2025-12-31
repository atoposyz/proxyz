const express = require('express');
const request = require('request');
const cors = require('cors');
const app = express();

// 使用 CORS 中间件
app.use(cors({
    origin: 'https://atoposyz.github.io', // 替换为你的实际域名
    methods: ['GET'],
}));

app.get('/api/proxy-image', (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl) return res.status(400).send('Image URL is required');

  const targetUrl = decodeURIComponent(imageUrl);

  // 禁止任何缓存（浏览器 / CDN / Vercel）
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  const options = {
    url: targetUrl,
    headers: { 'User-Agent': 'atoposyz/proxyz' },
  };

  request(options)
    .on('response', (r) => {
      // 转发 content-type，html-to-image 更稳定
      if (r.headers['content-type']) {
        res.setHeader('Content-Type', r.headers['content-type']);
      }
    })
    .on('error', (err) => {
      console.error(err);
      res.status(502).send('Upstream fetch failed');
    })
    .pipe(res);
});


module.exports = app;
