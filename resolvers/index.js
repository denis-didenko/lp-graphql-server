const { getAllLps, getLpById, getLpsByIds, getLpsByNames } = require('../model');

const resolvers = {
    Query: {
        allLps: () => getAllLps(),
        lpsByIds: (parent, { ids }) => getLpsByIds(ids),
        lpsByNames: (parent, { names }) => getLpsByNames(names),
        lp: (parent, { id }) => getLpById(id),
    },
};

module.exports = {
    resolvers,
};
