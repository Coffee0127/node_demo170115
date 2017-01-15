var express = require('express');
var router = express.Router();

router.get('/user/:name', (req, res) => {
    var name = req.params.name;
    // could find user via database
    var movie = {
        title: 'Titanic',
        year: 1997,
        director: 'James Cameron'
    };
    res.render('user', { user: name, movie: movie });
});

module.exports = router;