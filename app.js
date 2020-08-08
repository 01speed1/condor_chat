require("dotenv").config();

const express = require("express");
var bodyParser = require("body-parser");
const io = require("socket.io");
const http = require("http");
const app = express();

require("./config/database");

const cors = require("cors");

app.use(bodyParser.json());

app.use(express.static("public"));

const server = http.createServer(app);

app.use(cors({ origin: 'http://localhost:3000' }));

const baseIO = io(server);
baseIO.origins('http://localhost:3000');

const privateIO = baseIO.of("/private");
const athorizacion = require('./middlewares/athorizacionSocket')
privateIO.use(athorizacion);

module.exports = { io: baseIO, privateIO };

require("./sockets");
require("./routes")(app);

server.listen(process.env.NODE_PORT, () =>
  console.log(`Socket Server running on port ${process.env.NODE_PORT}`)
);
