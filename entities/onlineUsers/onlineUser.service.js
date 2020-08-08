const OnlineUser = require("./onlineUser.model");
const User = require("../users/user.model");

const modelBuilder = require("../../libs/modelsBuilder");

const { create, remove, getOne, findBy } = modelBuilder(OnlineUser);
const { getOne: getUser } = modelBuilder(User);

const connectUser = async (parameters) => {
  const { userID, socketID } = parameters;

  const oldConnections = await findBy({ userID });

  const oldConnectionsPromises = oldConnections.map(
    async ({ _id }) => await remove(_id)
  );

  await Promise.all(oldConnectionsPromises);
  const newConnection = await create({ userID, socketID });

  const {imagePath, username} = await getUser({ _id: userID })

  return { user: { imagePath, username } };
};

const isConnectedUser = async ({ userID }) => {
  const connectedUser = await getOne({ userID });

  if (!connectedUser) return { error: "user disconnected" };

  const { socketID } = connectedUser;

  return { socketID, userID };
};

const disconnectUser = async ({ userID }) => {
  const foundConnection = await getOne({ userID });

  if (!foundConnection)
    return Promise.reject({ error: "user is disconnected now" });

  const { _id } = foundConnection;

  return await remove(_id);
};

module.exports = { connectUser, disconnectUser, isConnectedUser };
