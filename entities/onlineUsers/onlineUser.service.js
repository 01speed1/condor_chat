const OnlineUser = require("./onlineUser.model");

const modelBuilder = require("../../libs/modelsBuilder");

const { create, remove, getOne, findBy } = modelBuilder(OnlineUser);

const connectUser = async (parameters) => {
  const { userID, socketID } = parameters;

  const oldConnections = await findBy({ userID });

  const oldConnectionsPromises = oldConnections.map(
    async ({ _id }) => await remove(_id)
  );

  await Promise.all(oldConnectionsPromises);
  const newConnection = await create({ userID, socketID });

  return { newConnection };
};

const isConnectedUser = async ({ userID }) => {
  const connectedUser = await getOne({ userID });

  const { socketID } = connectedUser;

  if (!connectedUser) return { error: "user disconnected" };

  return { socketID };
};

const disconnectUser = async ({ userID }) => {
  const foundConnection = await getOne({ userID });

  if (!foundConnection)
    return Promise.reject({ error: "user is disconnected now" });

  const { _id } = foundConnection;

  return await remove(_id);
};

module.exports = { connectUser, disconnectUser, isConnectedUser };
