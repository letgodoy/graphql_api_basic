const { commentMutations } = require('./resources/comment/comment.schema')
const { postMutations } = require('./resources/post/post.schema')
const { tokenMutations } = require('./resources/token/token.schema')
const { userMutations } = require('./resources/user/user.schema')
const { addressMutations } = require('./resources/address/address.schema')
const { anuncioMutations } = require('./resources/anuncio/anuncio.schema')
const { categoryMutations } = require('./resources/category/category.schema')
const { chatMutations } = require('./resources/chat/chats.schema')
const {
  habilidadeMutations,
} = require('./resources/habilidade/habilidade.schema')
const { newsMutations } = require('./resources/news/news.schema')
const {
  notificationMutations,
} = require('./resources/notifications/notifications.schema')
const { playerMutations } = require('./resources/player/player.schema')
const { proposeMutations } = require('./resources/propose/propose.schema')
const { rankMutations } = require('./resources/rank/rank.schema')
const { skillsMutations } = require('./resources/skills/skills.schema')
const { fileMutations } = require('./resources/file/file.schema')

module.exports = `
    type Mutation {
        ${commentMutations}
        ${postMutations}
        ${tokenMutations}
        ${userMutations}
        ${addressMutations}
        ${anuncioMutations}
        ${categoryMutations}
        ${chatMutations}
        ${habilidadeMutations}
        ${newsMutations}
        ${notificationMutations}
        ${playerMutations}
        ${proposeMutations}
        ${rankMutations}
        ${skillsMutations}
        ${fileMutations}
    }
`
