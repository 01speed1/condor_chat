var jwt = require("jsonwebtoken");
const { findUser } = require("../../users/user.service");

const loginUser = async (userParameters) => {
  const { _id, username, imagePath } = await findUser(userParameters)

  const payload = {
    _id,
    username,
    imagePath,
    timestap: new Date().getTime(),
    expireIn: 60 * 60 * 24
  }

  return jwt.sign(payload, process.env.SECRET);
}

module.exports = { loginUser }