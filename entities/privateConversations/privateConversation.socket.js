const {
  savePrivateMessage,
  loadPrivateConversation,
} = require("./privateConversation.service");

const { isConnectedUser } = require("../onlineUsers/onlineUser.service");
module.exports = function (socket, io) {
  socket.on("loadPrivateConversation", (parameters, callback) => {
    loadPrivateConversation(parameters)
      .then(({ messages, username }) => {
        callback({ valid: true, messages, username });
      })
      .catch((errors) => callback({ errors }));
  });

  socket.on("sendPrivateMessage", (params, callback) => {
    savePrivateMessage(params)
      .then(({ friendID }) => {
        callback({ valid: true });

        return isConnectedUser({userID: friendID})
      })
      .then(({ socketID }) => {
        io.to(socketID).emit("notifyPrivateMessage", { valid: true });
      })
      .catch((error) => callback({ error }));
  });
};
