const getAll = Model => async () => await Model.find().exec();
const findBy = Model => async (parameters) => {
  try {return await Model.find(parameters).exec()} catch (errors) { return errors }
};
const getOne = Model => async findOptions =>
  await Model.findOne(findOptions).exec();

const create = Model => async parameters => {
  const newInstace = new Model(parameters);

  return await newInstace.save();
};

module.exports = Model => ({
  findBy: findBy(Model),
  getAll: getAll(Model),
  getOne: getOne(Model),
  create: create(Model),
  update: async (_id, parameters) =>
    await Model.findOneAndUpdate({ _id }, parameters, { new: true }).exec(),
  remove: async _id => await Model.findOneAndRemove({ _id })
});
