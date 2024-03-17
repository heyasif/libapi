const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Pass: { type: String, required: true },

}, { versionKey: false });
const User = mongoose.model("Users", UserSchema);
module.exports = { User };
