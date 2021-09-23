const Comment = require('../models/Comment');
exports.makeComment = async (req, res, next) => {
  const {text, user, device, email} = req.body;

  try {
    const comment = await Comment.create({
      text,
      user,
      device,
      email,
    });
    return res.status(200).json({
      message: user + ' commented on ' + device + ' : ' + text,
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
};
exports.getComments = async (req, res, next) => {
  try {
    let comments = await Comment.find({}).exec();
    return res.status(200).json(comments);
  } catch (err) {
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
};
exports.updateComment = async (req, res, next) => {
  const {id, text} = req.body;

  try {
    let comment = await Comment.findById(id);
    let updated = await Comment.updateOne(comment, {text: text});
    return res.status(200).json(' updated comment to: ' + text);
  } catch (err) {
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
};
exports.deleteComment = async (req, res, next) => {
  const {id} = req.body;

  try {
    await Comment.findByIdAndRemove(id).exec();
    return res.status(200).json({message: `comment with id${id} was deleted`});
  } catch (err) {
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
};
exports.getDeviceComments = async (req, res, next) => {
  const {device} = req.body;
  try {
    let comments = await Comment.find({device: device}).exec();
    return res.status(200).json(comments);
  } catch (err) {
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
};
