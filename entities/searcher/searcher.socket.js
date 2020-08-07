const { searchInConversataion } = require("./searcher.service")

module.exports = function (socket) {
  socket.on('searchConversation', (parameters) => {
    searchInConversataion(parameters)
    .then((messages)=> {
      socket.emit('searchResults', messages)
    })
    .catch(errors => callback({errors}))
  })
}