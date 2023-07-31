const app = require("./app");
const dotenv = require("dotenv");
const dbConnect = require("./config/database")

dotenv.config();

dbConnect();

app.listen(process.env.PORT, () => {
  console.log(`hey server is started  on ${process.env.PORT}`);
});
