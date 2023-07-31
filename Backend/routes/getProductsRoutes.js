const express = require("express");
const { getAllProduct, createProduct } = require("../controllers/productController");
const router = express.Router();
router.route("/products").get(getAllProduct);
router.route("/products/new").post(createProduct);


module.exports = router;

