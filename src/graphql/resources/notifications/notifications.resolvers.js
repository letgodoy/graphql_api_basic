const { handleError, throwError } = require('../../../utils/utils')
const compose = require('../../composable/composable.resolver')
const { authResolvers } = require('../../composable/auth.resolver')

module.exports = {
  Notification: {
    player: (notification, args, { dataloaders: { playerLoader } }, info) => {
      return playerLoader
        .load({ key: notification.get('player'), info })
        .catch(handleError)
    },
  },
  Query: {
    allNotifications: (parent, { first = 50, offset = 0 }, context, info) => {
      return context.db.Notification.findAll({
        limit: first,
        offset: offset,
        attributes: context.requestedFields.getFields(info, {
          keep: ['id'],
          exclude: ['player'],
        }),
      }).catch(handleError)
    },
    notification: (parent, { id }, context, info) => {
      id = parseInt(id)
      return context.db.Notification.findById(id, {
        attributes: context.requestedFields.getFields(info, {
          keep: ['id'],
          exclude: ['player'],
        }),
      })
        .then((notification) => {
          throwError(!notification, `Notificacao com id ${id} não encontrado!`)
          return notification
        })
        .catch(handleError)
    },
  },
  Mutation: {
    createNotification: compose(
      authResolvers,
      (parent, { input }, { db, authUser }) => {
        input.from = authUser.player
        return db.sequelize
          .transaction((t) => {
            return db.Notification.create(input, { transaction: t })
          })
          .catch(handleError)
      }
    ),
    updateNotification: compose(
      authResolvers,
      (parent, { id, input }, { db, authUser }) => {
        // id = parseInt(id);
        return db.sequelize
          .transaction((t) => {
            return db.Notification.findById(id).then((notification) => {
              throwError(
                !notification,
                `Notificacao com id ${id} não encontrado!`
              )
              return notification.update(input, { transaction: t })
            })
          })
          .catch(handleError)
      }
    ),
    deleteNotification: compose(
      authResolvers,
      (parent, { id }, { db, authUser }) => {
        // id = parseInt(id);
        return db.sequelize
          .transaction((t) => {
            return db.Notification.findById(id).then((notification) => {
              throwError(
                !notification,
                `Notificacao com id ${id} não encontrado!`
              )
              throwError(
                notification.get('player') != authUser.player,
                `Não autorizado! Você só pode alterar seus proprios notificacoes!`
              )
              return notification
                .destroy({ transaction: t })
                .then((notification) => !!notification)
            })
          })
          .catch(handleError)
      }
    ),
  },
}
