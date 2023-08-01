const Product = require("../models/productModels");
const APIfeatures = require("../utils/APIfeatures");

//CREATE A NEW PRODUCTS
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
      message: " product created succesfully",
    });
  } catch (error) {
    console.log(error);
  }
};

// UPDATE PRODUCTS

exports.updateProduct = async (req, res, next) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};

// GET ALL PRODUCTS
exports.getAllProduct = async (req, res) => {
  try {
    const resultPerPage = 5;
    const productCount = await Product.countDocuments();
    const apiFeatures = new APIfeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
    const allProducts = await apiFeatures.query;
    res.status(200).json({
      success: "true",
      allProducts,
      productCount,
      message: "all products fetch succesfully",
    });
  } catch (error) {
    console.log(error);
  }
};

//GET PRODUCT DETAILS- BY ID

exports.productDetails = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(500).json({
        success: false,
        message: "product id not found ! pls enter a valid product id ",
      });
    }

    product = await Product.findById(req.params.id);

    res.status(200).json({
      success: true,
      product,

      message: "products details fetch succesfully od particular id",
    });
  } catch (error) {
    console.log(error);
  }
};

// DELET ALL PRODUCTS

exports.deleteProducts = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};
