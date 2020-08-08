const Friend = require("./friend.model");
const modelBuilder = require("../../libs/modelsBuilder");

const { create, getOne, findBy } = modelBuilder(Friend);

const User = require("../users/user.model");
const { getOne: getOneUser } = modelBuilder(User);

const { findUserByUsername } = require("../users/user.service");

const { validateloadFriends } = require("./friend.validations");

const loadFriendList = async (friendParameters) => {
  const { errors, parameters } = validateloadFriends(friendParameters);

  if (errors) Promise.reject(errors);

  const { userID } = parameters;

  const frindsList = await findBy({ user: userID });

  const friendsPromises = frindsList.map(({ friend }) =>
    getOneUser({ _id: friend })
  );

  const friendsResolved = await Promise.all(friendsPromises);

  const friends = friendsResolved.map(({ username, _id: friendID, imagePath }) => ({
    username,
    friendID,
    imagePath
  }));

  return friends
};

const addFriend = async ({ currentUserID, newFriend }) => {
  const foundFriend = await findUserByUsername(newFriend);

  if (!foundFriend) return Promise.reject({ error: `${newFriend} not found` });

  const isNowMyFried = await isMyFriend({
    currentUserID,
    friendID: foundFriend._id,
  });

  if (isNowMyFried) return  Promise.reject({ error: `${newFriend} is actually your friend` });

  const {friend} = await create({
    user: currentUserID,
    friend: foundFriend._id,
  });

  return { friendID: friend, message: `${newFriend} and you are friends now` };
};

const isMyFriend = async ({ currentUserID, friendID }) => {
  const myFriend = await getOne({ user: currentUserID, friend: friendID });
  return Boolean(myFriend);
};

module.exports = { addFriend, loadFriendList };
