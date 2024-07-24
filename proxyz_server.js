const express = require('express');
const axios = require('axios');
const app = express();

app.get('/proxy', async function(req, res) {
    const imageUrl = req.query.url;

    if (!imageUrl) {
        return res.status(400).send('URL parameter is required');
    }

    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

        res.set({
            'Content-Type': response.headers['content-type'],
            'Content-Length': response.headers['content-length']
        });
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Error fetching the image');
    }
});

app.listen(3000, () => {
    console.log('Proxy server is running on port 3000');
});
