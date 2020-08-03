const { addFriend, toListFriends } = require("./friend.service");

module.exports = function (socket) {
  socket.on("addFriend", ({ currentUserID, newFriend }, callback) => {
    addFriend({ currentUserID, newFriend })
      .then((response) => {
        callback(response);

        return toListFriends(currentUserID);
      })
      .then((data) => {
        socket.emit("friendsList", data);
      })
      .catch(callback);
  });
};
