const { required, tooShort, equality } = require("../../libs/errorsBuilder");
const {isEmpty} = require('../../helpers/object.helpers')

const validateCreateUser = (userParameters) => {
  const { username, password, passwordConfirmantion, createdAt, imagePath } = userParameters

  let errors = {}

  errors = required(errors, 'username', username)
  errors = tooShort(errors, 'username', username, 3)

  errors = required(errors, 'password', password)
  errors = tooShort(errors, 'password', password, 6)

  errors = equality(errors, 'passwordConfirmantion', password, passwordConfirmantion)

  errors = required(errors, 'createdAt', createdAt)

  if(isEmpty(errors)) return { errors: null, parameters: userParameters }

  return { errors, parameters: null }
}

const validateFindUser = (userParameters) => {
  const { username, password} = userParameters

  let errors = {}

  errors = required(errors, 'username', username)
  errors = tooShort(errors, 'username', username, 3)

  errors = required(errors, 'password', password)
  errors = tooShort(errors, 'password', password, 6)

  if(isEmpty(errors)) return { errors: null, parameters: userParameters }

  return { errors, parameters: null }
}

module.exports = { validateCreateUser, validateFindUser }