var express = require('express');
var app = express();

app.get('/', (req, res) => {
    res.send('hi');
});
app.get('/user/:name', (req, res) => {
    var name = req.params.name;
    res.send('Hello ' + name);
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});