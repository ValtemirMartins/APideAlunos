const { ApolloServer} = require('apollo-server')
const { makeExecutableSchema } = require('@graphql-tools/schema');
const path = require('path')

const { userSchema, userResolvers, UsersAPI } = require('./user')
const { turmaSchema, turmaResolvers, TurmasAPI} = require('./turma')
const { matriculaSchema, matriculaResolvers, MatriculasAPI } = require('./matricula')

const typeDefs = [userSchema, turmaSchema, matriculaSchema];
const resolvers = [userResolvers, turmaResolvers, matriculaResolvers];

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
      turmasAPI: new TurmasAPI(dbConfig),
      matriculasAPI: new MatriculasAPI(dbConfig)
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`Servidor rodando na porta ${url}`);
});
