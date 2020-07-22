const express = require('express');

const { ApolloServer } = require('apollo-server-express');
const { schema } = require('./schema');
const { resolvers } = require('./resolvers');

const app = express();

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

server.applyMiddleware({ app });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('server started'));
