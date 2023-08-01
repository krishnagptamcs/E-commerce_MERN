const express = require("express");
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword } = require("../controllers/userContrller");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset").post(resetPassword);
router.route("/logout").post(logoutUser);

module.exports = router;