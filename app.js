const { ApolloServer } = require('apollo-server');
const { schema } = require('./schema');
const { resolvers } = require('./resolvers');

const server = new ApolloServer({
	typeDefs: schema,
	resolvers,
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log('server started'));
