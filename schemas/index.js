const graphql = require('graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString } = graphql;

const { getData } = require('../db');

// init database
let db;
getData().then((data) => {
  db = data.reduce((acc, item) => {
    const landing = acc.find((lp) => lp.name === item.name);
    if (landing) {
      landing.version = item.version;
      return acc;
    }

    acc.push(item);

    return acc;
  }, []);
});

// Landing graphql type
const LandingType = new GraphQLObjectType({
  name: 'Landing',
  fields: () => ({
    lid: { type: GraphQLID },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    platform: { type: GraphQLString },
    safe: { type: GraphQLString },
    version: { type: GraphQLString },
    locales: { type: GraphQLString },
    trend: { type: GraphQLString },
    author: { type: GraphQLString },
    dependPkgName: { type: GraphQLString },
    useContentBuilder: { type: GraphQLString },
    isArchive: { type: GraphQLString },
    isVersionActive: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    allLps: {
      type: new GraphQLList(LandingType),
      resolve(parent, args) {
        return db;
      },
    },
    lpsByIds: {
      type: new GraphQLList(LandingType),
      args: { ids: { type: new GraphQLList(GraphQLID) } },
      resolve(parent, args) {
        return db.filter((landing) => args.ids && args.ids.includes(landing.lid));
      },
    },
    lp: {
      type: LandingType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return db.find((landing) => landing.lid === args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
