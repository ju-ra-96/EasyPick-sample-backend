const express = require("express");
const router = express.Router();
const { help } = require("../controllers/email");
const { feedback } = require("../controllers/email");
const { protect } = require("../middleware/auth");

router.route("/feedback").post(protect, feedback);
router.route("/help").post(protect, help);

module.exports = router;
