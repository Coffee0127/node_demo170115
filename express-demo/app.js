var express = require('express');
var app = express();
var fs = require('fs');

// static files
app.use(express.static(__dirname + '/public'));

// set Render engine
app.set('view engine', 'pug');
// by default, scanning "view" folder
app.set('views', __dirname + '/views');

// set route for indexRoute
// var indexRoute = require('./routes/indexRoute.js');
// app.user('/', indexRoute);

// set route via foreach loop
fs.readdirSync(__dirname + '/routes').forEach((fileName) => {
    fileName = fileName.slice(0, -3);
    fileName = require('./routes/' + fileName + '.js');
    app.use('/', fileName);
});

// parameters not needed with '?'
app.get('/movies/:title?', (req, res) => {
    var title = req.params.title;
    res.send(`the title is ${title}`);
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});