const express = require('express');
const router = express.Router();
const models = require('./models/data.js');
const bodyParser = require('body-parser');


router.get('/all', (req, res) => {
  models.getUrls((urls) => {
    res.send(urls);
  })
})

// Handle GET requests - url passed as parameter
router.get('/*', (req, res) => {
  const url = req.params[0];
  if (url.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/im)) {
    models.addUrl(url, (urlObject) => {
      return res.send(urlObject );
    });
  } else {
    res.send({error: "Invalid URL"});
  }
});

// Handle POST requests from form
router.post('/', bodyParser.urlencoded({extended: true}), (req, res) => {
  const url = req.body.url;
  if (url.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/im)) {
    models.addUrl(url, (urlObject) => {
      return res.send(urlObject );
    });
  } else {
    res.send({error: "Invalid URL"});
  }
});

module.exports = router;