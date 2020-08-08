const modelBuilder = require("../../libs/modelsBuilder");
const User = require("../users/user.model");
const { update } = modelBuilder(User);

const saveUserImage = async ({ userID, file }) => {
  const { imagePath } = await update(userID, { imagePath: file.filename })

  return { imagePath }
}

module.exports = { saveUserImage }