const { handleError, throwError } = require('../../../utils/utils')
const compose = require('../../composable/composable.resolver')
const { authResolvers } = require('../../composable/auth.resolver')

module.exports = {
  Rank: {
    player: (rank, args, { dataloaders: { playerLoader } }, info) => {
      return playerLoader
        .load({ key: rank.get('player'), info })
        .catch(handleError)
    },
    from: (rank, args, { dataloaders: { playerLoader } }, info) => {
      return playerLoader
        .load({ key: rank.get('from'), info })
        .catch(handleError)
    },
    propose: (rank, args, { dataloaders: { proposeLoader } }, info) => {
      return proposeLoader
        .load({ key: rank.get('propose'), info })
        .catch(handleError)
    },
  },
  Query: {
    allRanks: (parent, { first = 50, offset = 0 }, context, info) => {
      return context.db.Rank.findAll({
        limit: first,
        offset: offset,
        attributes: context.requestedFields.getFields(info, {
          keep: ['id'],
          exclude: ['player'],
        }),
      }).catch(handleError)
    },
    rank: (parent, { id }, context, info) => {
      id = parseInt(id)
      return context.db.Rank.findById(id, {
        attributes: context.requestedFields.getFields(info, {
          keep: ['id'],
          exclude: ['player'],
        }),
      })
        .then((rank) => {
          throwError(!rank, `Endereço com id ${id} não encontrado!`)
          return rank
        })
        .catch(handleError)
    },
  },
  Mutation: {
    createRank: compose(
      authResolvers,
      (parent, { input }, { db, authUser }) => {
        input.from = authUser.player
        return db.sequelize
          .transaction((t) => {
            return db.Rank.create(input, { transaction: t })
          })
          .catch(handleError)
      }
    ),
    updateRank: compose(
      authResolvers,
      (parent, { id, input }, { db, authUser }) => {
        id = parseInt(id)
        return db.sequelize
          .transaction((t) => {
            return db.Rank.findById(id).then((rank) => {
              throwError(!rank, `Endereço com id ${id} não encontrado!`)
              throwError(
                rank.get('player') != authUser.player,
                `Não autorizado! Você só pode editar seu proprio endereço!`
              )
              input.player = authUser.player
              return rank.update(input, { transaction: t })
            })
          })
          .catch(handleError)
      }
    ),
    deleteRank: compose(authResolvers, (parent, { id }, { db, authUser }) => {
      id = parseInt(id)
      return db.sequelize
        .transaction((t) => {
          return db.Rank.findById(id).then((rank) => {
            throwError(!rank, `Endereço com id ${id} não encontrado!`)
            throwError(
              rank.get('player') != authUser.player,
              `Não autorizado! Você só pode deletar seu proprio endereço!`
            )
            return rank.destroy({ transaction: t }).then((rank) => !!rank)
          })
        })
        .catch(handleError)
    }),
  },
}
