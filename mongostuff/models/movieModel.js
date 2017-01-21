var mongoose = require('mongoose');
// http://mongoosejs.com/docs/guide.html
var Schema = mongoose.Schema;

// 即使在 MongoDB 內新增額外欄位，若未設定於 Schema 中，mongoose 也會忽略
var movieSchema = new Schema({
  title: String,
  year: Number,
  good: Boolean,
  director: String,
  star: [
    {
      // expected data type
      starId: { type: Schema.Types.ObjectId, ref: 'stars' }
    }
  ]
});

mongoose.model('movies', movieSchema);
