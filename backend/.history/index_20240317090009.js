const express = require("express");
const { userRouter } = require("./Routes/User.Route");
require("dotenv").config();

const app = express();
app.use("/users", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Connected Server to Port ${process.env.PORT}`);
});
