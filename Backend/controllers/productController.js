const Product = require("../models/productModels");

//create a new product
exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  

  res.status(201).json({
    success: true,
    product,
    message: " product created succesfully",
  });
};

exports.getAllProduct = (req, res) => {
  res.status(200).json({ message: "Your route is running okay" });
};
