const { ApolloServer } = require('apollo-server-express')
const depthLimit = require('graphql-depth-limit')

const { resolvers, schema } = require('../graphql')
const models = require('../database/models')

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: () => {
    return {
      models
    }
  },
  validationRules: [
    depthLimit(6)
  ]
})

module.exports = {
  start: (app) => {
    server.applyMiddleware({
      app,
      path: '/graphql'
    })
  }
}
