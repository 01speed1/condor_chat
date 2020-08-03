const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OID = Schema.Types.ObjectId;

var friendSchema = Schema({
  user: { type: OID, ref: "User", required: true },
  friend: { type: OID, ref: "User", required: true }
});

module.exports = mongoose.model("Friend", friendSchema);
