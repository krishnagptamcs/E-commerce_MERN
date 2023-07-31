const Product = require("../models/productModels");

//CREATE A NEW PRODUCTS
exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
    message: " product created succesfully",
  });
};

// UPDATE PRODUCTS

exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "product id not found ! pls enter a valid product id ",
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // to get the updated data in response
    runValidator: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
    message: "product uppdated succesfully",
  });
};

// GET ALL PRODUCTS
exports.getAllProduct = async (req, res) => {
  const allProducts = await Product.find({});
  res.status(200).json({
    success: "true",
    allProducts,
    message: "all products fetch succesfully",
  });
};

//GET PRODUCT DETAILS- BY ID

exports.productDetails = async (req, res) => {
    let product = await Product.findById(req.params.id);
  
    if (!product) {
      return res.status(500).json({
        success: false,
        message: "product id not found ! pls enter a valid product id ",
      });
    }
  
    product= await Product.findById(req.params.id);
  
    res.status(200).json({
      success: true,
      product,
      message: "products details fetch succesfully od particular id",
    });
  };

// DELET ALL PRODUCTS

exports.deleteProducts = async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "product id not found ! pls enter a valid product id ",
    });
  }

  await Product.findOneAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "product delete succesfully",
  });
};
