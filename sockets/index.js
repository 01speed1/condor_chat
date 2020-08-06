const userSockets = require("../entities/users/user.sockets");
const chatSockets = require("../entities/chat/chat.sockets");
const friendSockets = require("../entities/friends/friend.socket");
const privateConvesationSockets = require("../entities/privateConversations/privateConversation.socket");
const groupsConvesationSockets = require("../entities/groupConversations/groupConversation.sockets");
const onlineUserSockets = require("../entities/onlineUsers/onlineUser.socket");
const searcherSockets = require("../entities/Searcher/searcher.socket");

const { privateIO } = require("../app");
const {
  disconnectUser,
} = require("../entities/onlineUsers/onlineUser.service");

privateIO.on("connection", (socket) => {
  console.log("conection detected");

  userSockets(socket);
  chatSockets(socket, privateIO);
  friendSockets(socket);
  privateConvesationSockets(socket, privateIO);
  groupsConvesationSockets(socket);
  onlineUserSockets(socket);
  searcherSockets(socket);

  socket.on("disconnect", ({ userID }) => {
    disconnectUser({ userID }).then(console.log).catch(console.log);
  });
});
