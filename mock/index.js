import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { addMocksToSchema } from "@graphql-tools/mock"
import { makeExecutableSchema } from "@graphql-tools/schema"

const typeDefs = `#graphql
type Query {
    hello: String
    resolved: String
}
`

const resolvers = {
  Query: {
    resolved: () => "Resolved"
  }
}

const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => "Hello"
}

const server = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    mocks,
    preserveResolvers: true
  })
})

startStandaloneServer(server, { listen: { port: 4000 } })
