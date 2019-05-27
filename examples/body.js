var { Devote, Tools } = require('devote');

var app = new Devote();
app.listen(8080, () => {
  console.log('Running on port 8080');
});

app.middleware(Toos.Body);

/*
 * req.body will be unparsed.
 */
app.post('/', (req, res) => {
  res.json({
    data: req.body,
  });
});