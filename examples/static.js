var { Devote, Tools } = require('devote');

var app = new Devote();
app.listen(8080, () => {
  console.log('Running on port 8080');
});

/*
 * Serve static files in a directory.
 * Must start with a "/"
 * Directories must end in a "/"
 */
app.middleware(Tools.Static('/examples/')); // http://localhost:8080/examples/basic.js||body.js||middleware.js||static.js etc

app.middleware(Tools.Static('/dist/index.js')); // http://localhost:8080/dist/index.js

app.get('/', (req, res) => {
    res.send('o7');
});