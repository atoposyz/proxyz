const express = require('express');
const request = require('request');
const app = express();

app.get('/api/proxy-image', (req, res) => {
    console.log(req)
    const imageUrl = req.query.url;  // 从查询参数中获取图片URL
    if (!imageUrl) {
        return res.status(400).send('Image URL is required');
    }
    console.log(imageUrl)
    request(imageUrl).pipe(res);
});

module.exports = app;