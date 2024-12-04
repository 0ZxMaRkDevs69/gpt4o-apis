const express = require('express');
const axios = require('axios');

const app = express();

const text = require("fontstyles");
const fonts = {
  bold: msg => text.bold(msg)
};

const tin = txt => fonts.bold(txt);


app.get('/api/gpt4o', async (req, res, next) => {
    try {
        const q = encodeURIComponent(req.query.q);
        const apiUrl = `https://facebookai-x5l1.onrender.com/facebook_ai?message=${q}`;

        const response = await axios.get(apiUrl);

        const filteredResponse = {
            status: true,
            response: response.data.message.replace(/\*\*(.*?)\*\*/g, (_, text) => tin(text))
        };

        res.json(filteredResponse);
    } catch (error) {
        next(error);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
