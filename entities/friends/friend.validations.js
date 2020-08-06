const { required } = require("../../libs/errorsBuilder");

const { isEmpty } = require("../../helpers/object.helpers");

const validateloadFriends = ({userID}) => {
  let errors = {};

  errors = required(errors, "userID", userID);

  if (isEmpty(errors))
    return { errors: null, parameters: {userID} };

  return { errors, parameters: null };
}

module.exports = { validateloadFriends }