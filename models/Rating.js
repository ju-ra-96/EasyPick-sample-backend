const mongoose = require('mongoose');
const RatingSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
  },
  user: {
    type: String,
    required: true,
    unique: true,
  },
  device: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const Rating = mongoose.model('Rating', RatingSchema);

module.exports = Rating;
