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


    const token  = user.getJWTToken();

    res.status(201).json({
      success: true,
      user,
      token,
      message: "the user created succesfully and token generated succesfully",
    });

    


  } catch (error) {
    res.status(500).json({
        success:false,

        error: error,
        message:"user cannot be created "
    })
    console.log(error);
  }
};
