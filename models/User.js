const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide last name"],
  },
  email: {
    type: String,
    required: [true, "Please provide email address"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getEmail =function () {
  return this.email;
};

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, "RTM7FlKRsmkZuWpEdh9/iL7ZQesL8P+9kgguGXdErH3vQNuoUnxbteobo/1fs5G8ilDkfp+96iGZjtothEIur8YuOR6glOzlDx6U+vn9QqliunPTRUDlH0LgtjoHFBgAwWyPOSBYqkHPi5MrW5f8SpseeeIPiJgn8YhLv0p7o9BYqUFNCikunzTk3WI7pSsSlL2Inpb+cozDDdnT68FuE6Sf8y+oHg30J1TNgVUbKWJnFJHXD/qFI9Tu8i++IX+OpCKDaARnIHOYUmh1c71rUCrt4MePyYp0EjeH8tw1gCkOtwWkc894YIyFIt7fc7sR2FgbYzbyAXylkYZ5uoV+lg==", {
    expiresIn: "30min",
  });
};

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
  return resetToken;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
