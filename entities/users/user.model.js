const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  imagePath: { type: String },
});

module.exports = mongoose.model("User", userSchema);
