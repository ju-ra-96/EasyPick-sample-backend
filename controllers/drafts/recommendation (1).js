const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const RecommendationsSchema = new mongoose.Schema({
  nr: Number,
  name: {
    type: String,
    required: [true, "Please add a name"]
  },
  comment: {
    type: String,
    required: [true, "Please add a comment"]
  },
  creationDate: { type: Date, required: true, default: Date.now },
  modifiationDate: { type: Date, required: true, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"}
});

RecommendationsSchema.index({ name: 1, userId: 1 }, { unique: true });

const Recommendation = mongoose.model('Recommendation', RecommendationsSchema);

module.exports = Recommendation;
