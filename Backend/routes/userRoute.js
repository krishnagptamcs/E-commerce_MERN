const express = require("express");
const { registerUser } = require("../controllers/userContrller");
const router = express.Router();

router.route("/register").post(registerUser)

module.exports = router;