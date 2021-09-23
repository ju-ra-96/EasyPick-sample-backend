const mongoose = require('mongoose');

const RecommendationSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  device1: {
    type: String,
    required: true,
  },
  device2: {
    type: String,
    required: true,
  },
  device3: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const Recommendation = mongoose.model('Recommendation', RecommendationSchema);

module.exports = Recommendation;
