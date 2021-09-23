const express = require('express');
const router = express.Router();

const {
  createRecommendation,
  getRecommendations,
  getUserRecommendation,
  updateRecommendation,
  deleteRecommendation,
} = require('../controllers/recommendation');

router.route('/createRecommendation').post(createRecommendation);
router.route('/getRecommendations').get(getRecommendations);
router.route('/getUserRecommendation').post(getUserRecommendation);
router.route('/updateRecommendation').put(updateRecommendation);
router.route('/deleteRecommendation').delete(deleteRecommendation);
module.exports = router;
