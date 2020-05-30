const { handleError, throwError } = require('../../../utils/utils')
const compose = require('../../composable/composable.resolver')
const { authResolvers } = require('../../composable/auth.resolver')

module.exports = {
  Chat: {
    from: (chat, args, { dataloaders: { playerLoader } }, info) => {
      return playerLoader
        .load({ key: chat.get('from'), info })
        .catch(handleError)
    },
    to: (chat, args, { dataloaders: { playerLoader } }, info) => {
      return playerLoader.load({ key: chat.get('to'), info }).catch(handleError)
    },
    propose: (chat, args, { dataloaders: { proposeLoader } }, info) => {
      return proposeLoader
        .load({ key: chat.get('proposes'), info })
        .catch(handleError)
    },
  },
  Query: {
    allChats: (parent, { first = 50, offset = 0 }, context, info) => {
      return context.db.Chat.findAll({
        limit: first,
        offset: offset,
        attributes: context.requestedFields.getFields(info, {
          keep: ['id'],
          exclude: ['anuncios'],
        }),
      }).catch(handleError)
    },
    chat: (parent, { id }, context, info) => {
      id = parseInt(id)
      return context.db.Chat.findById(id, {
        attributes: context.requestedFields.getFields(info, {
          keep: ['id'],
          exclude: ['Chats'],
        }),
      })
        .then((chat) => {
          throwError(!chat, `Mensagem com id ${id} não encontrado!`)
          return chat
        })
        .catch(handleError)
    },
  },
  Mutation: {
    createChat: compose(
      authResolvers,
      (parent, { input }, { db, authUser }) => {
        input.from = authUser.player
        return db.sequelize
          .transaction((t) => {
            return db.Chat.create(input, { transaction: t })
          })
          .catch(handleError)
      }
    ),
    updateChat: compose(authResolvers, (parent, { id, input }, { db }) => {
      // id = parseInt(id);
      return db.sequelize
        .transaction((t) => {
          return db.Chat.findById(id).then((chat) => {
            throwError(!chat, `Mensagem com id ${id} não encontrado!`)
            return chat.update(input, { transaction: t })
          })
        })
        .catch(handleError)
    }),
    deleteChat: compose(authResolvers, (parent, { id }, { db, authUser }) => {
      // id = parseInt(id);
      return db.sequelize
        .transaction((t) => {
          return db.Chat.findById(id).then((chat) => {
            throwError(!chat, `Mensagem com id ${id} não encontrado!`)
            throwError(
              chat.get('from') != authUser.player,
              `Não autorizado! Você só pode alterar seus proprios mensagens!`
            )
            return chat.destroy({ transaction: t }).then((chat) => !!chat)
          })
        })
        .catch(handleError)
    }),
  },
}
