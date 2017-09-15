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
    return res.render('index', {urls: data});
  });
})


// Handle retrieval of urls 
app.get('/:index', (req, res) => {
  const index = req.params.index;
  models.getUrl(index, (err, original_url) => {
    if (err) return res.send({error: err});
    res.redirect(original_url);
  });
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
