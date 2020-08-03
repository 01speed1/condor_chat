const modelBuilder = require("../../libs/modelsBuilder");
const User = require("./user.model");
const { create, getOne } = modelBuilder(User);
const { validateCreateUser, validateFindUser } = require("./user.validations");

const findUserByUsername = async (username) => {
  return await getOne({username})
}

const createUser = (userParameters) => {
  const { errors, parameters } = validateCreateUser(userParameters);

  return new Promise(async (resolve, reject) => {
    if (errors) reject(errors);

    const getByUsername = await getOne({ username: parameters.username });

    if (getByUsername) {
      reject({
        ...errors,
        username: { taken: `${userParameters.username} taken` },
      });
    }

    resolve(await create(parameters));
  });
};

const findUser = (userParameters) => {
  const { errors, parameters } = validateFindUser(userParameters);

  return new Promise(async (resolve, reject) => {
    if(errors) reject(errors)

    const foundUser = await getOne(parameters);

    if(!foundUser){
      reject({
        ...errors,
        username: { invalid: `invalid credentials` },
      });
    }

    resolve(foundUser)
  });
};

let users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const exisitingUser = users.find(
    (user) => user.room == room && user.name == name
  );

  if (exisitingUser) {
    return { error: "user now exisit", user: null };
  }

  const user = { id, name, room };

  users = [...users, user];

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = () => users.filter((user) => user.room === room);

module.exports = {
  createUser,
  findUser,
  findUserByUsername,

  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};
