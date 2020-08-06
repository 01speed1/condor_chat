const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OID = Schema.Types.ObjectId;

var groupMessageSchema = Schema({
  groupID: { type: OID, ref: "User" },
  userFrom: { type: OID, ref: "User" },
  message: { type: String, index: true },
  createdAt: { type: Number, Default: Date.now() }
});

groupMessageSchema.index({ '$**': 'text' })

module.exports = mongoose.model("groupMessage", groupMessageSchema);
