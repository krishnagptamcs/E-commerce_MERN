const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    })
    .then((data) => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = dbConnect;