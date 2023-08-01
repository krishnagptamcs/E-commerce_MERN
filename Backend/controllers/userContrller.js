const User = require("../models/userModels");

// REGISTER A USER

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      avtar: {
        public_Id: "this is dummy avtar",
        url: "dummypicUrl",
      },
    });

    const token = user.getJWTToken();

    res.status(201).json({
      success: true,
      user,
      token,
      message: "the user created succesfully and token generated succesfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      error: error,
      message: "user cannot be created ",
    });
  }
};

// LOGIN THE USER

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // VALIDATING
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "Please provide email or Password",
      });
    }

    // FINDING THE USER
    const user = await User.findOne({ email }).select("password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "enter correct email id and password ",
      });
    }

    // COMPARING THE PASSWORD , OF CLIENT SIDE AND DB
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "enter correct email id and password",
      });
    }

    // Generate JWT token for the logged in user

    const token = user.getJWTToken(); // this method already present in database and we just using it

    res.status(200).json({
      success: true,
      user,
      token,
      message: "userr logged in succesful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
      message: "user cannot be logged in",
    });
  }
};
