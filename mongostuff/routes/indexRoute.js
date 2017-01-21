var express = require('express');
// Router() express built-in function
var router = express.Router();
var mongoose = require('mongoose');
var movieSchema = mongoose.model('movies', movieSchema);

let deleteFailed;

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

router.post('/delete', (req, res, next) => {
  var title = req.body.title;
  movieSchema.find({ title: title }, (err, movies) => {
    if (err) throw err;

    if (movies[0]) {
      movies[0].remove((err) => {
        if (err) throw err;

        console.log(`Movie-${title} successfully deleted!`);

        res.redirect('/');
      });
    } else {
      deleteFailed = `${title} not exists!!`;
      res.render('index', { deleteFailed: deleteFailed });
    }

  });
})

// 擴充 express，而非 export function
module.exports = router;
