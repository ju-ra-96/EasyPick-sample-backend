const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  device: {
    type: String,
    required: true,
  },
  time: { 
    type: Date, 
    default: Date.now },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
