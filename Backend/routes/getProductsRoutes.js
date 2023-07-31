const express = require("express");
const { getAllProduct, createProduct, updateProduct, deleteProducts } = require("../controllers/productController");
const router = express.Router();
router.route("/products").get(getAllProduct);
router.route("/products/new").post(createProduct);
router.route("/products/:id").put(updateProduct);
router.route("/products/:id").delete(deleteProducts);
router.route("/products/:id").get(updateProduct); // GET PRODUCTS BY ID


module.exports = router;

