const { required, empty } = require("../../libs/errorsBuilder");

const { isEmpty } = require("../../helpers/object.helpers");

const validateloadGroupConversation = ({ groupID }) => {
  let errors = {};

  errors = required(errors, "groupID", groupID);

  if (isEmpty(errors)) return { errors: null, parameters: { groupID } };

  return { errors, parameters: null };
};

const validateAddMessageToGroup = (groupConvesationParameters) => {
  const { userID, groupID, createdAt, message } = groupConvesationParameters;

  let errors = {};

  errors = required(errors, "userID", userID);
  errors = required(errors, "groupID", groupID);
  errors = required(errors, "createdAt", createdAt);
  errors = required(errors, "message", message);

  if (isEmpty(errors))
    return { errors: null, parameters: groupConvesationParameters };

  return { errors, parameters: null };
};

const validateloadGroups = (userID) => {
  let errors = {};

  errors = required(errors, "userID", userID);

  if (isEmpty(errors)) return { errors: null, parameters: { userID } };

  return { errors, parameters: null };
};

const validateCreateGroup = (groupConvesationParameters) => {
  const { name, users } = groupConvesationParameters;

  let errors = {};

  errors = required(errors, "name", name);
  errors = empty(errors, "users", users);

  if (isEmpty(errors))
    return { errors: null, parameters: groupConvesationParameters };

  return { errors, parameters: null };
};

const addMessageToGroup = (groupConvesationParameters) => {
  const { groupConversationID, message, userID } = groupConvesationParameters;

  errors = required(errors, "groupConversationID", groupConversationID);
  errors = required(errors, "message", message);
  errors = required(errors, "userID", userID);

  if (isEmpty(errors))
    return { errors: null, parameters: groupConvesationParameters };

  return { errors, parameters: null };
};

const removeUserFromGroup = (groupConvesationParameters) => {
  const { groupConversationID, userID } = groupConvesationParameters;

  errors = required(errors, "groupConversationID", groupConversationID);
  errors = required(errors, "userID", userID);

  if (isEmpty(errors))
    return { errors: null, parameters: groupConvesationParameters };

  return { errors, parameters: null };
};

module.exports = {
  validateloadGroups,
  validateCreateGroup,
  addMessageToGroup,
  removeUserFromGroup,
  validateAddMessageToGroup,
  validateloadGroupConversation,
};
