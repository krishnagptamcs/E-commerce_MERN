const express  = require("express");

const app = express();

const dbConnect = require("./config/database")

app.use(express.json()); // middle ware to convert all the req. in json formate

const products = require("./routes/getProductsRoutes");

app.use("/api/v1", products);



module.exports = app;