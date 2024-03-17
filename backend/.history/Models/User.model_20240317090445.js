const mongoose = require("mongoose");

const UserModel = mongoose.Schema({
  Username: { type: String, required: true },

});
