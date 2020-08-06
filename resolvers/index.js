const { getAllLps, getLpById, getLpsByIds, getLpsByNames, getLpsByUrls } = require('../model');

const resolvers = {
    Query: {
        allLps: () => getAllLps(),
        lpsByIds: (parent, { ids }) => getLpsByIds(ids),
        lpsByNames: (parent, { names }) => getLpsByNames(names),
        lpsByUrls: (parent, { urls }) => getLpsByUrls(urls),
        lp: (parent, { id }) => getLpById(id),
    },
};

module.exports = {
    resolvers,
};
