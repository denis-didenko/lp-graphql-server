const { getAllLps, getLpById, getLpsByIds, getLpsByNames, getLpsByUrls, saveScreenshot } = require('../model');

const resolvers = {
    Query: {
        allLps: () => getAllLps(),
        lpsByIds: (_, { ids }) => getLpsByIds(ids),
        lpsByNames: (_, { names }) => getLpsByNames(names),
        lpsByUrls: (_, { urls, platform }) => getLpsByUrls(urls, platform),
        lp: (_, { id }) => getLpById(id),
    },
    Mutation: {
        saveScreenshot: (_, { url }) => saveScreenshot(url),
    },
};

module.exports = {
    resolvers,
};
