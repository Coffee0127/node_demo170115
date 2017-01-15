var express = require('express');
var app = express();

// static files
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.send('hi');
});

// parameters needed
app.get('/user/:name', (req, res) => {
    var name = req.params.name;
    res.send(`Hello ${name}`);
});

// parameters not needed with '?'
app.get('/movies/:title?', (req, res) => {
    var title = req.params.title;
    res.send(`the title is ${title}`);
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});