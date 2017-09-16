var express = require('express');
var app = express();
const apiRouter = require('./api');
const models = require('./models/data.js');

// This won't work as Google URL Shortener won't accept routes
// const thisURL = 'https://goo.gl/9SULQU';

app.use(express.static('/public'));
app.set('view engine', 'pug');


app.use('/api', apiRouter);


app.get('/', (req, res) => {
  models.getUrls(data => {
    if (!data) {
      return res.render('index', {error: "Error retrieving data from the DB"})
    }
    return res.render('index', {urls: data.slice(0, 6)});
  });
});

// Catch request for favicon.ico as it was causing the get /:index request (below) to throw an error
app.get('/favicon.ico', function(req, res) {
  res.status(204);
});

// Handle retrieval of urls 
app.get('/:index', (req, res, next) => {
  const index = req.params.index;
  if (index.match(/([0-9])+/)) {
    models.getUrl(index, (err, original_url) => {
      if (err) return res.send({error: err});
      res.redirect(original_url);
    });
  } else {
    next();
  }
});

app.get('/*', (req, res) => {
  res.render('not-found');
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
