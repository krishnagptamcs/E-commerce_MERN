//AUTHORISE USER
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

// AUTHORISED USER

exports.isAuthUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    // console.log(token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "pls login first to access the resources",
      });
    }

    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedUser.id);

    next();
  } catch (error) {
    res.status(201).json({ 
      success: false,
      error: error,
      message: "something went wrong while authorizing user",
    });
  }
};

// IS ADMIN OR NOT

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized for this action, Only Admin allowed",
      });
    }

    next();
  };
};
