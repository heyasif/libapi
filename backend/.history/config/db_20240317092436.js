const mongoose = require("mongoose");

const ConnectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
  } catch (error) {

  }
};
