const sendEmail = require("../middleware/sendEmail");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../middleware/errorResponse");
const User = require("../models/User");

exports.feedback = async (req, res, next) => {
  let { mail } = req.body;
  let token = req.headers.authorization.split(" ")[1];

  const decoded = jwt.verify(token, "RTM7FlKRsmkZuWpEdh9/iL7ZQesL8P+9kgguGXdErH3vQNuoUnxbteobo/1fs5G8ilDkfp+96iGZjtothEIur8YuOR6glOzlDx6U+vn9QqliunPTRUDlH0LgtjoHFBgAwWyPOSBYqkHPi5MrW5f8SpseeeIPiJgn8YhLv0p7o9BYqUFNCikunzTk3WI7pSsSlL2Inpb+cozDDdnT68FuE6Sf8y+oHg30J1TNgVUbKWJnFJHXD/qFI9Tu8i++IX+OpCKDaARnIHOYUmh1c71rUCrt4MePyYp0EjeH8tw1gCkOtwWkc894YIyFIt7fc7sR2FgbYzbyAXylkYZ5uoV+lg==");

  const user = await User.findById(decoded.id);

  next();
  try {
    await sendEmail({
      to: "easypick.info@gmail.com",
      subject: "User Feedback",
      text: mail,
    });

    res.status(200).json({ success: true, data: "Email Sent" });
  } catch (err) {
    return next(new ErrorResponse("Email could not be sent", 500));
  }
};
exports.help = async (req, res, next) => {
  let { mail } = req.body;
  let token = req.headers.authorization.split(" ")[1];

  const decoded = jwt.verify(token, "RTM7FlKRsmkZuWpEdh9/iL7ZQesL8P+9kgguGXdErH3vQNuoUnxbteobo/1fs5G8ilDkfp+96iGZjtothEIur8YuOR6glOzlDx6U+vn9QqliunPTRUDlH0LgtjoHFBgAwWyPOSBYqkHPi5MrW5f8SpseeeIPiJgn8YhLv0p7o9BYqUFNCikunzTk3WI7pSsSlL2Inpb+cozDDdnT68FuE6Sf8y+oHg30J1TNgVUbKWJnFJHXD/qFI9Tu8i++IX+OpCKDaARnIHOYUmh1c71rUCrt4MePyYp0EjeH8tw1gCkOtwWkc894YIyFIt7fc7sR2FgbYzbyAXylkYZ5uoV+lg==");

  const user = await User.findById(decoded.id);

  next();
  try {
    await sendEmail({
      to: "easypick.info@gmail.com",
      subject: "I need help",
      text: mail,
    });

    res.status(200).json({ success: true, data: "Email Sent" });
  } catch (err) {
    return next(new ErrorResponse("Email could not be sent", 500));
  }
};