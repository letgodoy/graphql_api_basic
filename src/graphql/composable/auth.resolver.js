const { verifyTokenResolver } = require('./verify-token.resolver')

const authResolver = (resolver) => {
  return (parent, args, context, info) => {
    if (context.authUser || context.authorization) {
      return resolver(parent, args, context, info)
    }
    throw new Error('Unauthorized! Token not provided!')
  }
}
const authResolvers = [authResolver, verifyTokenResolver]

module.exports = {
  authResolver,
  authResolvers,
}
