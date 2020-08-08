const mongoose = require("mongoose");

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  autoIndex: true,
  keepAlive: true,
  poolSize: 10,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports = mongoose.connect(
  "mongodb://admin:7YJw59DH36DJcANB@ds159507.mlab.com:59507/condor_chat_db",
  options
);
//module.exports = mongoose.connect(process.env.NODE_MOGOOSE_URL_DB, options);
