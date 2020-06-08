import { makeExecutableSchema } from 'graphql-tools'
import { merge } from 'lodash'

import Query from './query'
import Mutation from './mutation'

import { tokenTypes } from './resources/token/token.schema'
import { userTypes } from './resources/user/user.schema'
import { addressTypes } from './resources/address/address.schema'
import tokenResolvers from './resources/token/token.resolvers'
import userResolvers from './resources/user/user.resolvers'
import addressResolvers from './resources/address/address.resolvers'


const resolvers = merge(
  tokenResolvers,
  userResolvers,
  addressResolvers,
)

const SchemaDefinition = `
    type Schema {
        query: Query
        mutation: Mutation
    }
`

export default makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    Query,
    Mutation,
    tokenTypes,
    userTypes,
    addressTypes,
  ],
  resolvers,
})
