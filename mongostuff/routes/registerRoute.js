var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var UserSchema = mongoose.model('users', UserSchema);
var bcrypt = require('bcryptjs');

router.get('/register', (req, res, next) => {
  if (!req.user) {
    var error = '';
    res.render('register', { error: error });
  } else {
    res.redirect('/user');
  }
});

router.post('/register', (req, res, next) => {
  // genSaltSync 次數愈多愈花時間
  var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  var user = new UserSchema({
    email: req.body.email,
    password: hash  // avoid saving the raw password
  });
  user.save((err) => {
    if (err) {
      error = 'something bad happend';
      console.log(error);
      if (err.code === 11000) {
        // 11000 代表資料庫已存在
        error = 'That email is taken';
      }
    } else {
      req.user = user;
      req.session.user = user;
      delete req.user.password;
      app.locals.user = user;
      res.redirect('/user');
    }
  });
});

module.exports = router;
