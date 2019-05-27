// var { Devote } = require('devote');
var { Devote } = require('../dist');

var app = new Devote();
app.listen(8080, () => {
  console.log('Running on port 8080');
});

app.get('/', (req, res) => {
  res.send('o7');
});

/*
 * Regex example.
 * /user/[0-9]*
 */
app.get(/^\/user\/([0-9]*)$/, (req, res) => {
  res.json({
    params: req.params,
  })
});

app.post('/', (req, res) => {
  res.send('Post received.');
});

/* 
 * 404 error page.
 * Add this after all routes.
 */
app.get(/(^.)/, (req, res) => {
  res.notFound('Route is not found.');
});