const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OID = Schema.Types.ObjectId;

var privateConversationSchema = Schema({
  userFrom: { type: OID, ref: "User", required: true },
  userTo: { type: OID, ref: "User", required: true },
  message: { type: String },
  createdAt: { type: Number, default: Date.now() }
});

privateConversationSchema.index({ '$**': 'text' })

module.exports = mongoose.model("privateCoversation", privateConversationSchema);
