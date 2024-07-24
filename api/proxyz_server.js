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
    // 在请求头中添加 User-Agent
    const options = {
        url: imageUrl,
        headers: {
            'User-Agent': 'atoposyz/proxyz'
        }
    };
    request(options).pipe(res);
});

module.exports = app;