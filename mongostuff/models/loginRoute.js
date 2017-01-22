var express = require('express');
var router = express.Router();

router.get('/login', (req, res, next) => {
  if (!req.user) {
    res.render('login');
  } else {
    res.redirect('/user');
  }
});

module.exports = router;
