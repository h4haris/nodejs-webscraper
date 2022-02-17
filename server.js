const express = require("express");
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require("cors");
const https = require('https');

const app = express();

app.use(cors());

const url = 'https://www.theguardian.com/uk';

app.get('/', (req, res) => {
    res.json('This is my webscraper')
});

app.get('/results', (req, res) => {
    axios(url, {
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        })
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []

            $('.fc-item__title', html).each(function() { //<-- cannot be a function expression
                const title = $(this).text()
                const url = $(this).find('a').attr('href')
                articles.push({
                    title,
                    url
                })
            })
            res.json(articles)
        }).catch(err => console.log(err))
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
});