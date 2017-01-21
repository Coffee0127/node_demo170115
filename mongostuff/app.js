var express = require('express');
var app = express();
var mongoose = require('mongoose');
var fs = require('fs');

// INCLUDE ALL MODELS INSIDE MODEL FOLDER
fs.readdirSync(__dirname + '/models').forEach((fileName) => {
  if (~fileName.indexOf('.js')) {
    require(__dirname + '/models/' + fileName);
  }
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
