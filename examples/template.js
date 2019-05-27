var { Devote } = require('devote');

var app = new Devote();
app.listen(8080, () => {
  console.log('Running on port 8080');
});

/*
 * An example on how to develop a template engine.
 * Template engines that work on Express will also work on Devote.
 * Example for Pug: app.engine('pug', './views', require('pug').__express);
 */

app.engine('tpl', './views', (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err, null);

    const render = content.toString()
      .replace('#header#', `<h1>${options.header}</h1>`);
    return callback(null, render);
  });
});

app.get('/', (req, res) => {
  res.render('template_file', { header: 'An example of how to use the template engine.' });
});