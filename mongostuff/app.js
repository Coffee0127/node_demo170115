var express = require('express');
var app = express();
var mongoose = require('mongoose');
var fs = require('fs');
var bodyParser = require('body-parser');
var sessions = require('client-sessions');
var bcrypt = require('bcryptjs');

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

var userSchema = mongoose.model('users', userSchema);

// SET UP SESSION
app.use(sessions({
  cookieName: 'session',
  secret: 'nodeclass',
  duration: 30 * 60 * 10000,
  httpOnly: true,   // doesn't let browser JS touch the cookie
  secure: true,   // only use cookies over https
  ephemral: true // delete this cookie after the browser is closed
}));

app.use((req, res, next) => {
  if (req.session && req.session.user) {
    userSchema.findOne({ email: req.session.user.email }, (err, user) => {
      if (user) {
        req.user = user;
        delete req.user.password;
        req.session.user = user;
        app.locals.user = user;
      }
      next();
    });
  } else {
    next();
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
