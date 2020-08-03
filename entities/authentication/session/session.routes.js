const express = require('express')
const router = express.Router()

const { loginUser } = require('../session/session.service')

router.get('/', (request, response) => {
  response.send('login controller')
})

router.post('/', ({ body: userParameters }, response) => {

  loginUser(userParameters)
    .then(token => response.status(200).json({ valid: true, token }) )
    .catch(errors => response.status(400).json({ valid: false, errors }))
})

module.exports = router