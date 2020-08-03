const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("../users/user.service");

module.exports = function (socket, io) {
  socket.on("join", ({ name, room}, callback) => {

    //const { error, user } = addUser({ id: socket.id, name, room })

    //if(error) return callback(error)

    //socket.emit('message', { user: 'admin', text: `welcome ${name}` })
    //socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has join`})

    //socket.join(user.room)

    //io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })

    callback()
  });

  socket.on('sendMessage', (message, callback) => {
    //const user = getUser(socket.id)

    // if(user.room) io.to(user.room).emit('message', { user: user.name, text: message })
    // if(user.room) io.to(user.room).emit('roomData', { room: user.room, users:  getUsersInRoom(user.room) })

    callback()
  })
};
