var jwt = require("jsonwebtoken");
const { createUser } = require("../../users/user.service");

const registerUser = async (userParameters) => {
  const { username } = await createUser(userParameters)

  const payload = {
    username,
    timestap: new Date().getTime(),
    expireIn: 60 * 60 * 24
  }

  return jwt.sign(payload, 'temporal sescret');
}

module.exports = { registerUser }