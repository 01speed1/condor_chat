const userSockets = require('../entities/users/user.sockets')
const chatSockets = require('../entities/chat/chat.sockets')
const friendSockets = require('../entities/friends/friend.socket')

const {removeUser} = require('../entities/users/user.service')

const { io, privateIO } = require('../app')

privateIO.on('connection', (socket) => {

  console.log("conection detected")

  userSockets(socket)
  chatSockets(socket, privateIO)
  friendSockets(socket)

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)

    user && privateIO.to(user.room).emit('message', { user: 'admin', text: `ùser ${user.name} has left.` })
  })
})