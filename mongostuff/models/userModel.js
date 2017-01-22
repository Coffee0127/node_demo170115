var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: String,
  password: String,
  birthday: Date,
  age: Number,
  sex: String
});

mongoose.model('users', userSchema);
