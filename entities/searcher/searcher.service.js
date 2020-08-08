const PrivateConversation = require("../privateConversations/privateConversation.model");
const GroupMessage = require("../groupMessages/groupMessage.model");
const User = require("../users/user.model");

const modelBuilder = require("../../libs/modelsBuilder");

const { findBy: findInPrivateConversationBy } = modelBuilder(
  PrivateConversation
);
const { findBy: findInGroupMessagesBy } = modelBuilder(GroupMessage);

const { getOne: getOneUser } = modelBuilder(User);

const getUsernameByID = async (ID) => {
  const { username } = await getOneUser({ _id: ID });
  return username;
};

const searchInConversataion = async ({ query, userID }) => {
  const foundPrivateMessages = await findInPrivateConversationBy({
    $or: [{ userTo: userID }, { userFrom: userID }],
    $or: [{ $text: { $search: query } }, { message: query }],
  });

  const foundGroupMessages = await findInGroupMessagesBy({
    userFrom: userID,
    $or: [{ $text: { $search: query } }, { message: query }],
  });

  const cleanGroupMessages = foundGroupMessages
    .map(({ groupID, userFrom, message }) => ({ groupID, userFrom, message }))
    .map(async (props) => ({
      ...props,
      username: await getUsernameByID(props.userFrom),
    }));

  const groupMessages = await Promise.all(cleanGroupMessages);

  const cleanPrivateMessags = foundPrivateMessages
    .map(({ userFrom, userTo, message }) => ({ userFrom, userTo, message }))
    .map(async (props) => ({
      ...props,
      username: await getUsernameByID(props.userFrom),
    }));

  const privateMessages = await Promise.all(cleanPrivateMessags);

  return {
    groupMessages,
    privateMessages,
  };
};

module.exports = { searchInConversataion };
