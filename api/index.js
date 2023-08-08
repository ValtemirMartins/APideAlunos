const { ApolloServer} = require('apollo-server')
const { makeExecutableSchema } = require('@graphql-tools/schema');
const path = require('path')


const userSchema = require('./user/schema/user.graphql')
const userResolvers = require('./user/resolvers/userResolvers')
const UsersAPI = require('./user/datasource/user')

const turmaSchema = require('./turma/schema/turma.graphql');
const turmaResolvers = require('./turma/resolvers/turmaRsolvers');
const TurmasAPI = require('./turma/datasource/turma')

const typeDefs = [userSchema, turmaSchema];
const resolvers = [userResolvers, turmaResolvers];

const dbConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
  filename: path.resolve( __dirname, './data/database.db')
  }

}

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  dataSources: () => {
    return {
      usersAPI: new UsersAPI(),
      turmasAPI: new TurmasAPI(dbConfig)
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`Servidor rodando na porta ${url}`);
});
