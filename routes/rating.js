const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const {
  createRating,
  getRatings,
  getDeviceAvgRating,
  updateRating,
  deleteRating
} = require("../controllers/rating");

router.route("/createRating").post(createRating);
router.route("/getRatings").get(getRatings);
router.route("/getDeviceAvgRating").post(getDeviceAvgRating);
router.route("/updateRating").put(updateRating);
router.route("/deleteRating").delete(deleteRating);
module.exports = router;
