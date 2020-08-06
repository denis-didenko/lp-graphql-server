const { gql } = require('apollo-server-express');

const schema = gql`
    type Landing {
        lid: ID
        name: String
        type: String
        platform: String
        safe: String
        version: String
        locales: String
        trend: String
        author: String
        dependPkgName: String
        useContentBuilder: String
        isArchive: String
        isVersionActive: String
    }

    type Query {
        allLps: [Landing]
        lpsByIds(ids: [ID]): [Landing]
        lpsByNames(names: [String]): [Landing]
        lpsByUrls(urls: [String]): [Landing]
        lp(id: ID!): Landing
    }
`;

module.exports = {
    schema,
};
