const modelBuilder = require("../../libs/modelsBuilder");

const Friend = require("./friend.model");
const { create, getOne, findBy, getAll } = modelBuilder(Friend);

const User = require("../users/user.model");
const { getOne: getOneUser } = modelBuilder(User);

const { findUserByUsername } = require("../users/user.service");

const toListFriends = async (currentUserID) => {
  const frindsList = await findBy({ user: currentUserID });

  const friendsData = frindsList.map(
    async (friendship) => await getOneUser({ _id: friendship.friend })
  );

  return await (await Promise.all(friendsData)).map(
    (friend) => friend.username
  );
};

const addFriend = async ({ currentUserID, newFriend }) => {
  const foundFriend = await findUserByUsername(newFriend);

  if (!foundFriend) return { error: `${newFriend} not found` };

  const isNowMyFried = await isMyFriend({
    currentUserID,
    friendID: foundFriend._id,
  });

  if (isNowMyFried) return { error: `${newFriend} is actually your friend` };

  const friendship = await create({
    user: currentUserID,
    friend: foundFriend._id,
  });

  return { friendship, message: `${newFriend} and you are friends now` };
};

const isMyFriend = async ({ currentUserID, friendID }) => {
  const myFriend = await getOne({ user: currentUserID, friend: friendID });
  return Boolean(myFriend);
};

module.exports = { addFriend, toListFriends };
