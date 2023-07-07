const mongoose = require('mongoose');

const concertSchema = new mongoose.Schema({
  performer: {type: String, require: true},
  genre: {type: String, require: true},
  price: {type: Number, require: true},
  day: {type: Number, require: true},
  image: {type: String, require: true}
});

module.exports = mongoose.model('Concert', concertSchema);