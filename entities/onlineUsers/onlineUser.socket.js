const { connectUser, disconnectUser } = require("./onlineUser.service");

module.exports = function (socket) {
  socket.on("connectUser", ({ userID }, callback) => {
    connectUser({ userID, socketID: socket.id })
      .then(() => callback({ valid: true }))
      .catch((errors) => callback({ valid: false, errors }));
  });

};