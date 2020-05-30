const { makeExecutableSchema } = require('graphql-tools')
const { merge } = require('lodash')

const Query = require('./query')
const Mutation = require('./mutation')

const { commentTypes } = require('./resources/comment/comment.schema')
const { postTypes } = require('./resources/post/post.schema')
const { tokenTypes } = require('./resources/token/token.schema')
const { userTypes } = require('./resources/user/user.schema')
const commentResolvers = require('./resources/comment/comment.resolvers')
const postResolvers = require('./resources/post/post.resolvers')
const tokenResolvers = require('./resources/token/token.resolvers')
const userResolvers = require('./resources/user/user.resolvers')
const addressResolvers = require('./resources/address/address.resolvers')
const anuncioResolvers = require('./resources/anuncio/anuncio.resolvers')
const categoryResolvers = require('./resources/category/category.resolvers')
const chatResolvers = require('./resources/chat/chat.resolvers')
const habilidadeResolvers = require('./resources/habilidade/habilidade.resolvers')
const newsResolvers = require('./resources/news/news.resolvers')
const notificationResolvers = require('./resources/notifications/notifications.resolvers')
const playerResolvers = require('./resources/player/player.resolvers')
const proposeResolvers = require('./resources/propose/propose.resolvers')
const rankResolvers = require('./resources/rank/rank.resolvers')
const skillsResolvers = require('./resources/skills/skills.resolvers')
const { addressTypes } = require('./resources/address/address.schema')
const { anuncioTypes } = require('./resources/anuncio/anuncio.schema')
const { categoryTypes } = require('./resources/category/category.schema')
const { chatTypes } = require('./resources/chat/chats.schema')
const { habilidadeTypes } = require('./resources/habilidade/habilidade.schema')
const { newsTypes } = require('./resources/news/news.schema')
const {
  notificationTypes,
} = require('./resources/notifications/notifications.schema')
const { playerTypes } = require('./resources/player/player.schema')
const { proposeTypes } = require('./resources/propose/propose.schema')
const { rankTypes } = require('./resources/rank/rank.schema')
const { skillsTypes } = require('./resources/skills/skills.schema')
const fileResolvers = require('./resources/file/file.resolvers')
const { fileTypes } = require('./resources/file/file.schema')

const resolvers = merge(
  commentResolvers,
  postResolvers,
  tokenResolvers,
  userResolvers,
  addressResolvers,
  anuncioResolvers,
  categoryResolvers,
  chatResolvers,
  habilidadeResolvers,
  newsResolvers,
  notificationResolvers,
  playerResolvers,
  proposeResolvers,
  rankResolvers,
  skillsResolvers,
  fileResolvers
)

const SchemaDefinition = `
    type Schema {
        query: Query
        mutation: Mutation
    }
`

module.exports = makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    Query,
    Mutation,
    commentTypes,
    postTypes,
    tokenTypes,
    userTypes,
    addressTypes,
    anuncioTypes,
    categoryTypes,
    chatTypes,
    habilidadeTypes,
    newsTypes,
    notificationTypes,
    playerTypes,
    proposeTypes,
    rankTypes,
    skillsTypes,
    fileTypes,
  ],
  resolvers,
})
