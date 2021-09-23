const jwt = require("jsonwebtoken");
const ErrorResponse = require("../middleware/errorResponse");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    const decoded = jwt.verify(token, "RTM7FlKRsmkZuWpEdh9/iL7ZQesL8P+9kgguGXdErH3vQNuoUnxbteobo/1fs5G8ilDkfp+96iGZjtothEIur8YuOR6glOzlDx6U+vn9QqliunPTRUDlH0LgtjoHFBgAwWyPOSBYqkHPi5MrW5f8SpseeeIPiJgn8YhLv0p7o9BYqUFNCikunzTk3WI7pSsSlL2Inpb+cozDDdnT68FuE6Sf8y+oHg30J1TNgVUbKWJnFJHXD/qFI9Tu8i++IX+OpCKDaARnIHOYUmh1c71rUCrt4MePyYp0EjeH8tw1gCkOtwWkc894YIyFIt7fc7sR2FgbYzbyAXylkYZ5uoV+lg==");

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ErrorResponse("No user found with this id", 404));
    }

    req.user = user;

    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this router", 401));
  }
};
