const express  = require("express");
const cookieParser = require("cookie-parser")

const app = express();




app.use(express.json()); // middle ware to convert all the req. in json formate
app.use(cookieParser()); // MIDDLE WARE TO FETCH COOKIE FROM 

const products = require("./routes/getProductsRoutes");
const user = require("./routes/userRoute");

app.use("/api/v1", products);
app.use("/api/v1", user);



module.exports = app;
