const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name "],
    trim: true,
  },

  description: {
    type: String,
    required: [true, "Please enter description "],
  },
  price: {
    type: Number,
    maxLength: 8,
    required: [true, "Please enter product Price  "],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_Id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  category: {
    type: String,
    required: [true, "Please enter product catsegory"],
  },
  Stock: {
    type: Number,
    default: 1,
    required: true,
    maxLength: 4,
  },

  noOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
