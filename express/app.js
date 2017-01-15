var express = require('express');
var app = express();

app.get('/', (req, res) => {
    res.send('hi');
});
app.get('/user', (req, res) => {
    res.send('Hello user');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});