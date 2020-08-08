const PrivateConversation = require("./privateConversation.model");
const User = require('../users/user.model')

const modelBuilder = require("../../libs/modelsBuilder");
const {
  validateSavePrivateMessage,
  validateLoadPrivateConversation
} = require("./privateConversation.validations");

const { create, findBy } = modelBuilder(PrivateConversation);
const { getOne: findFriendBy } = modelBuilder(User);

const savePrivateMessage = async (privateConversationParameters) => {
  const { errors, parameters } = validateSavePrivateMessage(
    privateConversationParameters
  );

  if (errors) return Promise.reject(errors);

  const { userID, friendID, message, createdAt } = parameters;

  const savedMessage = await create({
    userFrom: userID,
    userTo: friendID,
    message,
    createdAt,
  });

  return { savedMessage, friendID };
};
const loadPrivateConversation = async (privateConversationParameters) => {
  const {errors, parameters} = validateLoadPrivateConversation(privateConversationParameters)

  if(errors) return Promise.reject(errors)

  const { userID, friendID } = parameters

  const messagesOrigin = await findBy({ userFrom: userID, userTo: friendID });
  const messagesDestination = await findBy({
    userFrom: friendID,
    userTo: userID,
  });

  const { username } = await findFriendBy({_id: friendID })

  const unsortMessages = [...messagesOrigin, ...messagesDestination].map(
    ({ userFrom, userTo, message, createdAt }) => ({
      userFrom,
      userTo,
      message,
      createdAt,
    })
  );

  const messages = unsortMessages.sort(
    (messageOne, messageTwo) => messageOne.createdAt - messageTwo.createdAt
  );

  return { messages, username };
};

module.exports = { savePrivateMessage, loadPrivateConversation };
