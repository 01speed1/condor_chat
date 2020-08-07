const express = require('express')
const path = require('path')
const ApiRouter = express.Router()

const registrationRouter = require('../entities/authentication/registration/registration.routes')
const sessionRouter = require('../entities/authentication/session/session.routes')
const imageUploaderRouter = require('../entities/imageUploader/imageUploader.routes')
const userRouter = require('../entities/users/user.routes.js')

ApiRouter.get('/', (request, response) => {
  response.send('server api is running')
})

module.exports = (app) => {
  app.use('/api/users', userRouter)
  app.use('/api/signup', registrationRouter)
  app.use('/api/login', sessionRouter)
  app.use('/api/image_uploader', imageUploaderRouter)
  app.use('/api', ApiRouter)

  // app.get('/', (request, response) => {
  //   response.sendFile('index.html', { root: path.join(__dirname, 'public') })
  // })

  // app.get('/*', (request, response) => response.redirect(301, '/') )
}