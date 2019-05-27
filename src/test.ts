import Devote from './index';

const app: Devote = new Devote();
app.listen(8080, () => {
    console.log('Started!');
});

app.get('/', (req, res): void => {
    res.send('This is a test send');
});

app.post('/', (req, res): void => {
    // res.send('This is a test send on a POST request.');
    res.json({
        it: 'works',
    });
});