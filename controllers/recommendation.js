const Recommendation = require('../models/recommendation');

exports.createRecommendation = async (req, res) => {
  const {user, device1, device2, device3} = req.body;

  try {
    const recommendation = await Recommendation.create({
      user,
      device1,
      device2,
      device3,
    });
    return res.status(200).json({
      message:
        device1 +
        ', ' +
        device2 +
        ', and ' +
        device3 +
        ' were recommended to ' +
        user,
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
};

exports.deleteRecommendation = async (req, res) => {
  const {id} = req.body;

  try {
    await Recommendation.findByIdAndRemove(id).exec();
    return res
      .status(200)
      .json({message: `recommendation with id${id} was deleted`});
  } catch (err) {
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
};

exports.updateRecommendation = async (req, res) => {
  const {id, device, phone} = req.body;

  try {
    let recommendation = await Recommendation.findById(id);
    let updated;
    if (device === 'device1') {
      updated = await Recommendation.updateOne(recommendation, {
        device1: phone,
      });
    } else if (device === 'device2') {
      updated = await Recommendation.updateOne(recommendation, {
        device2: phone,
      });
    } else if (device === 'device3') {
      updated = await Recommendation.updateOne(recommendation, {
        device3: phone,
      });
    }
    return res.status(200).json(updated);
  } catch (err) {
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
};

exports.getUserRecommendation = async (req, res) => {
  const {user} = req.body;

  try {
    let recommendation = await Recommendation.find({user: user}).exec();
    return res.status(200).json(recommendation);
  } catch (err) {
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
};

exports.getRecommendations = async (req, res) => {
  try {
    let recommendation = await Recommendation.find({}).exec();
    return res.status(200).json({recommendation});
  } catch (err) {
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
};
