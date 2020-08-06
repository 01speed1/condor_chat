const { required } = require("../../libs/errorsBuilder");
const { isEmpty } = require('../../helpers/object.helpers')

const validateSavePrivateMessage = (privateConvesationParameters) => {

  const { userID, friendID, message } = privateConvesationParameters

  let errors = {}

  errors = required(errors, 'userID', userID)
  errors = required(errors, 'friendID', friendID)
  errors = required(errors, 'message', message)

  if(isEmpty(errors)) return { errors: null, parameters: privateConvesationParameters }

  return { errors, parameters: null }
}

const validateLoadPrivateConversation = (privateConvesationParameters) => {
  const {userID, friendID} = privateConvesationParameters

  let errors = {}

  errors = required(errors, 'userID', userID)
  errors = required(errors, 'friendID', friendID)

  if(isEmpty(errors)) return { errors: null, parameters: privateConvesationParameters }

  return { errors, parameters: null }
}

module.exports = { validateSavePrivateMessage, validateLoadPrivateConversation }