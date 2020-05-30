const { commentQueries } = require('./resources/comment/comment.schema')
const { postQueries } = require('./resources/post/post.schema')
const { userQueries } = require('./resources/user/user.schema')
const { addressQueries } = require('./resources/address/address.schema')
const { anuncioQueries } = require('./resources/anuncio/anuncio.schema')
const { categoryQueries } = require('./resources/category/category.schema')
const { chatQueries } = require('./resources/chat/chats.schema')
const {
  habilidadeQueries,
} = require('./resources/habilidade/habilidade.schema')
const { newsQueries } = require('./resources/news/news.schema')
const {
  notificationQueries,
} = require('./resources/notifications/notifications.schema')
const { playerQueries } = require('./resources/player/player.schema')
const { proposeQueries } = require('./resources/propose/propose.schema')
const { rankQueries } = require('./resources/rank/rank.schema')
const { skillsQueries } = require('./resources/skills/skills.schema')
const { fileQueries } = require('./resources/file/file.schema')

module.exports = `
    type Query {
        ${commentQueries}
        ${postQueries}
        ${userQueries}
        ${addressQueries}
        ${anuncioQueries}
        ${categoryQueries}
        ${chatQueries}
        ${habilidadeQueries}
        ${newsQueries}
        ${notificationQueries}
        ${playerQueries}
        ${proposeQueries}
        ${rankQueries}
        ${skillsQueries}
        ${fileQueries}
        
    }
`
