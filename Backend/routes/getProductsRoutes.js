const express = require("express");
const { getAllProduct, createProduct, updateProduct, deleteProducts } = require("../controllers/productController");
const { isAuthUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();
router.route("/products").get(getAllProduct);
router.route("/products/new").post(isAuthUser,authorizeRoles("admin"),createProduct);
router.route("/products/:id").put(isAuthUser,authorizeRoles("admin"),updateProduct);
router.route("/products/:id").delete(isAuthUser,authorizeRoles("admin"),deleteProducts);
router.route("/products/:id").get(updateProduct); // GET PRODUCTS BY ID


module.exports = router;

