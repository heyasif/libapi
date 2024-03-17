const express = require("express");
const { userRouter } = require("./Routes/User.Route");
const { ConnectDatabase } = require("./config/db");
require("dotenv").config();

const app = express();
app.use("/users", userRouter);

app.listen(process.env.PORT, () => {
  ConnectDatabase();
  console.log(`Connected Server to Port ${process.env.PORT}`);
});
