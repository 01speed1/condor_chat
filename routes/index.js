const express = require('express')
const ApiRouter = express.Router()

const registrationRouter = require('../entities/authentication/registration/registration.routes')
const sessionRouter = require('../entities/authentication/session/session.routes')
const userRouter = require('../entities/users/user.routes.js')

ApiRouter.get('/', (request, response) => {
  response.send('server is running')
})

module.exports = (app) => {
  app.use('/api/users', userRouter)
  app.use('/api/signup', registrationRouter)
  app.use('/api/login', sessionRouter)
  app.use('/api', ApiRouter)
}