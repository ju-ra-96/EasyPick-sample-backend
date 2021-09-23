const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const {
  login,
  register,
  forgotPassword,
  resetPassword,
  deleteAccount,
  updateFirstName,
  updateLastName,
  updateEmail
} = require("../controllers/account");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgotpassword").post(forgotPassword);
router.route("/passwordreset/:resetToken").put(resetPassword);
router.route("/myaccount").delete(protect, deleteAccount);
router.route("/updatefirstname").put(protect, updateFirstName);
router.route("/updatelastname").put(protect, updateLastName);
router.route("/updateemail").put(protect, updateEmail);



module.exports = router;
