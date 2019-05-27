var { Devote, Tools } = require('devote');

var app = new Devote();
app.listen(8080, () => {
  console.log('Running on port 8080');
});

app.middleware(Tools.Body);

app.post('/', (req, res) => {
  res.json({
    data: req.body,
  });
});