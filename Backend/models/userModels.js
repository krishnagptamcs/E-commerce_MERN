const mongoose = require("mongoose");
const validator = require("validator"); // to validate email
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your name "],
    maxLength: [8, "name should be not more than 8 character"],
  },
  email: {
    type: String,
    required: [true, "please enter your email"],
    unique: true,
    validate: [validator.isEmail, "please enter your valid  email id "],
  },
  password: {
    type: String,
    required: [true, "please enter your password"],
    minLength: [8, "password must have at least 8 characters."],
    select: false,
  },
  avtar: {
    public_Id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// BCRYPTING THE PASSWORD {pre--> to saving the document in mongodb before}

userSchema.pre("save", async function (next) {
  // APPLYING THE CONDITION WHEN WE HAVE TO BCRYPT
  // if only name , email changes then paswword will not again hased , if user chnaged the paswword in forgot/changes password section then password will hashed agian
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN , TO LOGIN JSUT AFTER REGISTER OR OTHER CASE ALSO TO STORING THE TOKEN IN COOKIES FOR A PARTICULAR USER

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("User", userSchema);