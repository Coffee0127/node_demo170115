var express = require('express');
// Router() express built-in function
var router = express.Router();
var mongoose = require('mongoose');
var movieSchema = mongoose.model('movies', movieSchema);

router.get('/', (req, res) => {
  movieSchema.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { movie: data });
    }
  });
});

// SEARCH FOR MOVIE
router.post('/search', (req, res, next) => {
  var query = req.body.title;
  movieSchema.find({ title: new RegExp(query, 'i') }, (err, data) => {
    res.render('index', { movie: data });
  });
});

// ADD NEW MOVIE
router.post('/', (req, res, next) => {
  var movie = new movieSchema({
    title: req.body.title
  });
  movie.save((err) => {
    console.log(err);
  });
  res.render('index', { movie: movie });
});

// 擴充 express，而非 export function
module.exports = router;
