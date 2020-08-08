const { connectUser, disconnectUser } = require("./onlineUser.service");

module.exports = function (socket) {
  socket.on("connectUser", ({ userID }, callback) => {
    connectUser({ userID, socketID: socket.id })
      .then(({ user }) => {
        callback({ valid: true, user })})
      .catch((errors) => callback({ valid: false, errors }));
  });

};