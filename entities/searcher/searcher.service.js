const PrivateConversation = require("../privateConversations/privateConversation.model");
const GroupMessage = require("../groupMessages/groupMessage.model");

const modelBuilder = require("../../libs/modelsBuilder");

const { findBy: findInPrivateConversationBy } = modelBuilder(
  PrivateConversation
);
const { findBy: findInGroupMessagesBy } = modelBuilder(GroupMessage);

const searchInConversataion = async ({ query, userID }) => {
  const foundPrivateMessages = await findInPrivateConversationBy({
    $or: [{ userTo: userID }, { userFrom: userID }],
    $or: [{ $text: { $search: query } }, { message: query }],
  });

  const foundGroupMessages = await findInGroupMessagesBy({
    userFrom: userID,
    $or: [{ $text: { $search: query } }, { message: query }],
  });

  const cleanGroupMessages = foundGroupMessages.map(
    ({ groupID, userFrom, message }) => ({ groupID, userFrom, message })
  );

  const cleanPrivateMessags = foundPrivateMessages.map(
    ({ userFrom, userTo, message }) => ({ userFrom, userTo, message })
  );

  return {
    groupMessages: cleanGroupMessages,
    privateMessages: cleanPrivateMessags,
  };
};

module.exports = { searchInConversataion };
