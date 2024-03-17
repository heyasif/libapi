const mongoose = require("mongoose");
require("dotenv").config();

const ConnectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Databse Connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { ConnectDatabase };
