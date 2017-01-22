var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var UserSchema = mongoose.model('users', UserSchema);

router.get('/user', (req, res, next) => {
  UserSchema.findOne({ email: req.session.user.email }, (err, user) => {
    res.render('user', { user: user });
  });
});

module.exports = router;
