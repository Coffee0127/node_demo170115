var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var langCheck = require('./middleware/langCheck');

// cookies
app.use(cookieParser());
// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// static files
app.use(express.static(__dirname + '/public'));

// set Render engine
app.set('view engine', 'pug');
// by default, scanning "view" folder
app.set('views', __dirname + '/views');

// set route for indexRoute
// var indexRoute = require('./routes/indexRoute.js');
// app.user('/', indexRoute);

// intercept all request
// app.all('/*', langCheck, function (req, res, next) {
//     console.log('Intercepting requests ...');
//     next();  // call next() here to move on to next middleware/router
// });

// set route via foreach loop
fs.readdirSync(__dirname + '/routes').forEach((fileName) => {
    fileName = fileName.slice(0, -3);
    fileName = require('./routes/' + fileName + '.js');
    app.use('/', fileName);
    // or add langCheck via for loop
    app.use('/', langCheck, fileName);
});

// parameters not needed with '?'
app.get('/movies/:title?', (req, res) => {
    var title = req.params.title;
    res.send(`the title is ${title}`);
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});