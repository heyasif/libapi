const mongoose = require("mongoose");

const UserModel = mongoose.Schema({
  Username: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  pass: { type: String, required: true, unique: true },

});
