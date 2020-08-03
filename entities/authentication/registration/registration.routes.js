const express = require('express')
const router = express.Router()

const { registerUser } = require('../registration/registration.service')

router.get('/', (request, response) => {
  response.send('register controller')
})

router.post('/', ({ body: userParameters }, response) => {

  registerUser(userParameters)
    .then(token => response.status(200).json({ valid: true, token }) )
    .catch(errors => response.status(400).json({ valid: false, errors }))
})

module.exports = router