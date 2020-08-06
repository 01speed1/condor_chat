const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OID = Schema.Types.ObjectId;

var onlineUserSchema = Schema({
  userID: { type: OID, ref: "User" },
  socketID: { type: String },
  status: {type: String, enum: ['conneted', 'disconneted'], default: 'conneted' },
  createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("onlineUser", onlineUserSchema);
