const GroupConversation = require("./groupConversation.model");
const GroupMessage = require("../groupMessages/groupMessage.model");
const User = require("../users/user.model");

const modelBuilder = require("../../libs/modelsBuilder");
const {
  validateCreateGroup,
  validateloadGroups,
  validateAddMessageToGroup,
  validateloadGroupConversation,
} = require("./groupConversation.validations");

const { create, findBy, getOne } = modelBuilder(GroupConversation);
const { create: createMessage, findBy: findMessageBy } = modelBuilder(
  GroupMessage
);
const { getOne: getUser } = modelBuilder(User);

const loadGroups = async ({ userID }) => {
  const { errors, parameters } = validateloadGroups(userID);

  if (errors) return Promise.reject({ errors });

  const { userID: cleanUserID } = parameters;

  const foundGroups = await findBy({ users: cleanUserID });

  return foundGroups.map(({ _id, name }) => ({
    groupID: _id,
    groupName: name,
  }));
};

const loadGroupConversation = async (groupConvesationParameters) => {
  const { errors, parameters } = validateloadGroupConversation(
    groupConvesationParameters
  );

  if (errors) return Promise.reject(errors);

  const { groupID } = parameters;

  const { name } = await getOne({ _id: groupID });

  const foundMessages = await findMessageBy({ groupID });

  const loadMessagesPromises = foundMessages.map(
    async ({ message, createdAt, userFrom }) => {
      const { username } = await getUser({ _id: userFrom });
      return { message, createdAt, username, userFrom };
    }
  );

  const unsortLoadMessages = await Promise.all(loadMessagesPromises);
  const loadMessages = unsortLoadMessages.sort(
    (messageOne, messageTwo) => messageOne.createdAt - messageTwo.createdAt
  );

  return { messages: loadMessages, groupName: name };
};

const createGroup = async (groupConvesationParameters) => {
  const { errors, parameters } = validateCreateGroup(
    groupConvesationParameters
  );

  if (errors) return Promise.reject(errors);

  const { name, users } = parameters;

  const { _id: groupID, name: groupName } = await create({ name, users });

  return { groupID, groupName };
};

const addMessageToGroup = async (groupConvesationParameters) => {
  const { errors, parameters } = validateAddMessageToGroup(
    groupConvesationParameters
  );

  if (errors) return Promise.reject(errors);

  const { userID, groupID, message, createdAt } = parameters;

  const newMessageBuilder = { groupID, userFrom: userID, message, createdAt };

  const newMessage = await createMessage(newMessageBuilder);

  return newMessage;
};

const removeUserFromGroup = () => {};

module.exports = {
  createGroup,
  addMessageToGroup,
  removeUserFromGroup,
  loadGroups,
  loadGroupConversation,
};
