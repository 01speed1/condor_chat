const jwt = require("jsonwebtoken");

function athorizacion(socket, next) {
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(socket.handshake.query.token, process.env.SECRET, function (
      err,
      decoded
    ) {
      if (err) {
        next(
          new Error(
            JSON.stringify({
              valid: false,
              code: "token101",
              error: "Authentication error invalid token",
            })
          )
        );
      }

      socket.decoded = decoded;
      next();
    });
  } else {
    next(
      new Error(
        JSON.stringify({
          valid: false,
          code: "token102",
          error: "token not found",
        })
      )
    );
  }
}

module.exports = athorizacion;
