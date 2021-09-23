const crypto = require("crypto");
const ErrorResponse = require("../middleware/errorResponse");
const User = require("../models/User");
const sendEmail = require("../middleware/sendEmail");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("No email could not be sent", 404));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please make a put request to the following link:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (err) {

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid Token", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Password Updated Success",
      token: user.getSignedJwtToken(),
    });
  } catch (err) {
    next(err);
  }
};


exports.deleteAccount = async (req, res, next) => {
  const { email } = req.body;
  let token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "RTM7FlKRsmkZuWpEdh9/iL7ZQesL8P+9kgguGXdErH3vQNuoUnxbteobo/1fs5G8ilDkfp+96iGZjtothEIur8YuOR6glOzlDx6U+vn9QqliunPTRUDlH0LgtjoHFBgAwWyPOSBYqkHPi5MrW5f8SpseeeIPiJgn8YhLv0p7o9BYqUFNCikunzTk3WI7pSsSlL2Inpb+cozDDdnT68FuE6Sf8y+oHg30J1TNgVUbKWJnFJHXD/qFI9Tu8i++IX+OpCKDaARnIHOYUmh1c71rUCrt4MePyYp0EjeH8tw1gCkOtwWkc894YIyFIt7fc7sR2FgbYzbyAXylkYZ5uoV+lg==");
  const identified = await User.findById(decoded.id);
  next();

  if (!email) {
    return next(new ErrorResponse("email not found, Please retry deleting the account", 400));
  }

  try {
    const user = await User.deleteOne({ email });
    if (!user) {
      return next(new ErrorResponse("user not found, Please retry deleting the account", 401));
    }
  } catch (err) {
    next(err);
  }
};

exports.updateFirstName = async (req, res, next) => {

  const { email, firstName } = req.body;
  let token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "RTM7FlKRsmkZuWpEdh9/iL7ZQesL8P+9kgguGXdErH3vQNuoUnxbteobo/1fs5G8ilDkfp+96iGZjtothEIur8YuOR6glOzlDx6U+vn9QqliunPTRUDlH0LgtjoHFBgAwWyPOSBYqkHPi5MrW5f8SpseeeIPiJgn8YhLv0p7o9BYqUFNCikunzTk3WI7pSsSlL2Inpb+cozDDdnT68FuE6Sf8y+oHg30J1TNgVUbKWJnFJHXD/qFI9Tu8i++IX+OpCKDaARnIHOYUmh1c71rUCrt4MePyYp0EjeH8tw1gCkOtwWkc894YIyFIt7fc7sR2FgbYzbyAXylkYZ5uoV+lg==");
  const identified = await User.findById(decoded.id);
  next();

  try {
    var user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Invalid Token", 400));
    }
    user = await User.updateOne(user, { firstName: firstName })

    res.status(201).json({
      success: true,
      data: "first name Updated Success",
      firstname: user.firstname,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateLastName = async (req, res, next) => {
  const { email, lastName } = req.body;
  let token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "RTM7FlKRsmkZuWpEdh9/iL7ZQesL8P+9kgguGXdErH3vQNuoUnxbteobo/1fs5G8ilDkfp+96iGZjtothEIur8YuOR6glOzlDx6U+vn9QqliunPTRUDlH0LgtjoHFBgAwWyPOSBYqkHPi5MrW5f8SpseeeIPiJgn8YhLv0p7o9BYqUFNCikunzTk3WI7pSsSlL2Inpb+cozDDdnT68FuE6Sf8y+oHg30J1TNgVUbKWJnFJHXD/qFI9Tu8i++IX+OpCKDaARnIHOYUmh1c71rUCrt4MePyYp0EjeH8tw1gCkOtwWkc894YIyFIt7fc7sR2FgbYzbyAXylkYZ5uoV+lg==");
  const identified = await User.findById(decoded.id);
  next();

  try {
    var user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Invalid Token", 400));
    }
    user = await User.updateOne(user, { lastName: lastName })

    res.status(201).json({
      success: true,
      data: "last name Updated Success",
      lastName: user.lastName,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateEmail = async (req, res, next) => {
  const { email, newmail } = req.body;
  let token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "RTM7FlKRsmkZuWpEdh9/iL7ZQesL8P+9kgguGXdErH3vQNuoUnxbteobo/1fs5G8ilDkfp+96iGZjtothEIur8YuOR6glOzlDx6U+vn9QqliunPTRUDlH0LgtjoHFBgAwWyPOSBYqkHPi5MrW5f8SpseeeIPiJgn8YhLv0p7o9BYqUFNCikunzTk3WI7pSsSlL2Inpb+cozDDdnT68FuE6Sf8y+oHg30J1TNgVUbKWJnFJHXD/qFI9Tu8i++IX+OpCKDaARnIHOYUmh1c71rUCrt4MePyYp0EjeH8tw1gCkOtwWkc894YIyFIt7fc7sR2FgbYzbyAXylkYZ5uoV+lg==");
  const identified = await User.findById(decoded.id);
  next();

  try {
    var user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Invalid Token", 400));
    }
    user = await User.updateOne(user, { email: newmail })

    res.status(201).json({
      success: true,
      data: "email Updated Success",
      lastName: user.newmail,
    });
  } catch (err) {
    next(err);
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({ sucess: true, firstName: user.firstName, lastName: user.lastName, token });
};

