const {
  createGroup,
  loadGroups,
  addMessageToGroup,
  loadGroupConversation,
} = require("./groupConversation.service");

module.exports = function (socket) {
  socket.on("loadGroups", (parameters, callback) => {
    loadGroups(parameters)
      .then((groups) => callback({ valid: true, groups }))
      .catch((errors) => callback({ errors }));
  });

  socket.on("loadGroupConversation", (parameters, callback) => {
    loadGroupConversation(parameters)
      .then(({ messages, groupName }) => {
        callback({ valid: true, messages, groupName });
      })
      .catch((errors) => callback({ errors }));
  });

  socket.on("sendGroupMessage", (parameters, callback) => {
    addMessageToGroup(parameters)
      .then((messages) => {
        callback({ valid: true, messages });
        // send notification

      })
      .catch((errors) => callback({ errors }));
  });

  socket.on("createGroup", (parameters, callback) => {
    createGroup(parameters)
      .then((newGroup) => {
        callback({ valid: true, newGroup });
      })
      .catch((errors) => callback({ valid: false, errors }));
  });
};
