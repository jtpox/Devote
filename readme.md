
# Devote

A Typescript version of [ChoirJS](https://github.com/jtpox/ChoirJS) but without the route events.

  

```
const Devote = require('devote');

const app = new Devote();
app.listen(8080, () => {
  console.log('Listening on port 8080');
});

app.get('/', (req, res) => {
res.send('o7');
});
```

  

# Installation
```
$ npm install devote
```