const { handleError, throwError } = require('../../../utils/utils')
const compose = require('../../composable/composable.resolver')
const { authResolvers } = require('../../composable/auth.resolver')

module.exports = {
  Player: {
    address: (player, args, { dataloaders: { addressLoader } }, info) => {
      return addressLoader
        .load({ key: player.get('address'), info })
        .catch(handleError)
    },
    chatsFrom: (player, args, { dataloaders: { chatLoader } }, info) => {
      return chatLoader
        .load({ key: player.get('chatsFrom'), info })
        .catch(handleError)
    },
    chatsTo: (player, args, { dataloaders: { chatLoader } }, info) => {
      return chatLoader
        .load({ key: player.get('chatsTo'), info })
        .catch(handleError)
    },
    commentsTo: (player, args, { dataloaders: { commentLoader } }, info) => {
      return commentLoader
        .load({ key: player.get('commentsTo'), info })
        .catch(handleError)
    },
    commentsfrom: (player, args, { dataloaders: { commentLoader } }, info) => {
      return commentLoader
        .load({ key: player.get('commentsfrom'), info })
        .catch(handleError)
    },
    notifications: (
      player,
      args,
      { dataloaders: { notificationLoader } },
      info
    ) => {
      return notificationLoader
        .load({ key: player.get('notifications'), info })
        .catch(handleError)
    },
    proposes: (player, args, { dataloaders: { proposeLoader } }, info) => {
      return proposeLoader
        .load({ key: player.get('proposes'), info })
        .catch(handleError)
    },
    proposesFrom: (player, args, { dataloaders: { proposeLoader } }, info) => {
      return proposeLoader
        .load({ key: player.get('proposesFrom'), info })
        .catch(handleError)
    },
    ranks: (player, args, { dataloaders: { rankLoader } }, info) => {
      return rankLoader
        .load({ key: player.get('ranks'), info })
        .catch(handleError)
    },
    anuncioses: (player, args, { dataloaders: { anuncioLoader } }, info) => {
      return anuncioLoader
        .load({ key: player.get('anuncioses'), info })
        .catch(handleError)
    },
    ranksmaked: (player, args, { dataloaders: { rankLoader } }, info) => {
      return rankLoader
        .load({ key: player.get('ranksmaked'), info })
        .catch(handleError)
    },
    photo: (player, args, { dataloaders: { fileLoader } }, info) => {
      return fileLoader
        .load({ key: player.get('photo'), info })
        .catch(handleError)
    },
  },
  Query: {
    allPlayers: (parent, { first = 50, offset = 0 }, context, info) => {
      return context.db.Player.findAll({
        limit: first,
        offset: offset,
        attributes: context.requestedFields.getFields(info, {
          keep: ['id'],
          exclude: ['Players'],
        }),
      }).catch(handleError)
    },
    player: (parent, { id }, context, info) => {
      id = parseInt(id)
      return context.db.Player.findById(id, {
        attributes: context.requestedFields.getFields(info, {
          keep: ['id'],
          exclude: ['Players'],
        }),
      })
        .then((player) => {
          throwError(!player, `Perfil com id ${id} não encontrado!`)
          return player
        })
        .catch(handleError)
    },
    hello: (parent, { string }) => {
      return string
    },
  },
  Mutation: {
    createPlayer: compose(
      authResolvers,
      (parent, { input }, { db, authUser }) => {
        input.user = authUser.id
        return db.sequelize
          .transaction((t) => {
            return db.Player.create(input, { transaction: t })
          })
          .catch(handleError)
      }
    ),
    updatePlayer: compose(
      authResolvers,
      (parent, { input }, { db, authUser }) => {
        // id = parseInt(id);
        return db.sequelize
          .transaction((t) => {
            return db.Player.findById(authUser.player).then((player) => {
              throwError(
                !player,
                `Player com id ${authUser.player} não encontrado!`
              )
              throwError(
                player.get('user') != authUser.id,
                `Não autorizado! Você só pode alterar seus proprios Perfil!`
              )
              return player.update(input, { transaction: t })
            })
          })
          .catch(handleError)
      }
    ),
    deletePlayer: compose(authResolvers, (parent, args, { db, authUser }) => {
      // id = parseInt(id);
      return db.sequelize
        .transaction((t) => {
          return db.Player.findById(authUser.player).then((player) => {
            throwError(
              !player,
              `Perfil com id ${authUser.player} não encontrado!`
            )
            throwError(
              player.get('user') != authUser.id,
              `Não autorizado! Você só pode alterar seus proprios Perfil!`
            )
            return player.destroy({ transaction: t }).then((player) => !!player)
          })
        })
        .catch(handleError)
    }),
  },
}
