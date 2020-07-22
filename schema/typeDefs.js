const { gql } = require('apollo-server-express');

const typeDefs = gql`
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
    lp(id: ID!): Landing
  }
`;

module.exports = {
  typeDefs,
};
