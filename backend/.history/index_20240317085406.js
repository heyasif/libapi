const express = require("express");
require("dotenv").config();

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Connected Server to Port ${process.env.port}`);
});
