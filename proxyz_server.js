const express = require('express');
const request = require('request');
const app = express();

app.get('/proxy-image', (req, res) => {
    const imageUrl = req.query.url;  // 从查询参数中获取图片URL
    if (!imageUrl) {
        return res.status(400).send('Image URL is required');
    }
    request(imageUrl).pipe(res);
});

app.listen(3000, () => {
    console.log('Proxy server listening on port 3000');
});
