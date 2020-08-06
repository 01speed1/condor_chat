const { addFriend, loadFriendList } = require("./friend.service");

module.exports = function (socket) {

  socket.on("loadFriendList", (parameters, callback) => {
    loadFriendList(parameters)
      .then((friends) => callback({ valid: true, friends }))
      .catch((errors) => callback({ valid: false, errors }));
  });

  socket.on("addFriend", ({ currentUserID, newFriend }, callback) => {
    addFriend({ currentUserID, newFriend })
      .then((response) => {
        callback(response);

        return loadFriendList(currentUserID);
      })
      .then((data) => {
        socket.emit("loadFriendList", data);
      })
      .catch((error) => callback({ error }));
  });
};
