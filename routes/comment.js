const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const {
  makeComment,
  getComments,
  getDeviceComments,
  updateComment,
  deleteComment
} = require("../controllers/comment");


router.route("/makeComment").post(makeComment);
router.route("/getComments").get(getComments);
router.route("/getDeviceComments").post(getDeviceComments);
router.route("/updateComment").put(updateComment);
router.route("/deleteComment").delete(deleteComment);

module.exports = router;
