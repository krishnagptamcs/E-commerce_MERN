//CREATING TOKEN AND SAVING IN COOKIE(BROWSER)

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // creating option for cookie

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000 // converting into miliseconds
    ),
    httpOnly: true,
  };

  //STORIN THE TOKEN IN COOKIE OF BROWSER
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
    message: "Authentication successful! user logged inn",
  });
};

module.exports = sendToken;
