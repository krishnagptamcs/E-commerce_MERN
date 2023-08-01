const User = require("../models/userModels");
const sendToken = require("../utils/jwtToken"); // A FUNCITON FOR SENDING TOKEN AND STORING IT IN BROWSER COOKIE

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

    // const token = user.getJWTToken();

    // res.status(201).json({
    //   success: true,
    //   user,
    //   token,
    //   message: "the user created succesfully and token generated succesfully",
    // });

    sendToken(user, 201, res);
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

    // const token = user.getJWTToken(); // this method already present in database and we just using it

    // res.status(200).json({
    //   success: true,
    //   user,
    //   token,
    //   message: "userr logged in succesful",
    // });

    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
      message: "user cannot be logged in",
    });
  }
};

//LOGOUT THE USER

exports.logoutUser = async (req, res) => {
  // we are taking token null and expires time is current date & time
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(201).json({
      success: true,
      message: "loged out succesfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
      message: "user cannot be logged in",
    });
  }
};

// RESET PASSWORD

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Enter valid email id",
      });
    }

    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`; // url to send with email to particular user 

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;


    // SENDING PASSWORD RESET MAIL TO USER 
    try {
        await sendEmail({
          email: user.email,
          subject: `Ecommerce Password Recovery`,
          message,
        });
    
        res.status(200).json({
          success: true,
          message: `Email sent to ${user.email} successfully`,
        });
      } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
    
        await user.save({ validateBeforeSave: false });
    
        return res.status(500).json({
            success: false,
            error: error,
            message: "password reset mail sent  failedd",
          }); ;
      }




  } catch (error) {
    res.status(500).json({
        success: false,
        error: error,
        message: "password reste failedd",
      });
    

  }
};
