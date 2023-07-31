const app = require("./app");
const dotenv = require("dotenv");

dotenv.config();

app.listen(process.env.PORT, () => {
  console.log(`hey server is started  on ${process.env.PORT}`);
});
