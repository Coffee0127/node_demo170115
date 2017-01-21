var express = require('express');
var app = express();
var mongoose = require('mongoose');
var fs = require('fs');
var bodyParser = require('body-parser');

// static files
app.use(express.static(__dirname + '/public'));
// SET VIEW ENGINE
app.set('view engine', 'pug');
// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// INCLUDE ALL MODELS INSIDE MODEL FOLDER
fs.readdirSync(__dirname + '/models').forEach((fileName) => {
  if (~fileName.indexOf('.js')) {
    require(__dirname + '/models/' + fileName);
  }
});

// INCLUDE ROUTES
fs.readdirSync(__dirname + '/routes').forEach((fileName) => {
  fileName = fileName.slice(0, -3);
  fileName = require('./routes/' + fileName + '.js');
  app.use('/', fileName);
});

if ('development' == app.get('env')) {
  mongoose.connect('mongodb://localhost:27017/mongostuff?socketTimeoutMS=300000');
} else {
  // connect to production MongoDB
  mongoose.connect('mongodb://192.168.57.21:45678/mongostuff');
}

app.listen(3000, (req, res) => {
  console.log('listening on port 3000');
});
