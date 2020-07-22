const { getAllLps, getLpById, getLpsByIds } = require('../model');

const resolvers = {
  Query: {
    allLps: () => getAllLps(),
    lpsByIds: (parent, { ids }) => getLpsByIds(ids),
    lp: (parent, { id }) => getLpById(id),
  },
};

module.exports = {
  resolvers,
};
