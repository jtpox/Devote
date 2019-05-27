var { Devote } = require('devote');

var app = new Devote();
app.listen(8080, () => {
  console.log('Running on port 8080');
});

function middleware(req, res, next) {
  console.log(req.url);
}

app.get('/', middleware, (req, res) => {
  res.send('o7');
});

/*
 * Or you can add as an array.
 */
app.get('/array', [middleware], (req, res) => {
  res.send('o7');
})