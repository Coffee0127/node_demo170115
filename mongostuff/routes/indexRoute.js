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

// 擴充 express，而非 export function
module.exports = router;
