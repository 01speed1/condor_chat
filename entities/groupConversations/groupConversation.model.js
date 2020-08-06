const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OID = Schema.Types.ObjectId;

var groupConversationSchema = Schema({
  name: { type: String },
  users: [{ type: OID, ref: "User" }],
  // messages: [{ type: OID, ref: 'groupMessage' }],
  createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("groupCoversation", groupConversationSchema);
