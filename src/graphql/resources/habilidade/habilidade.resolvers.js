const { handleError, throwError } = require('../../../utils/utils')
const compose = require('../../composable/composable.resolver')
const { authResolvers } = require('../../composable/auth.resolver')

module.exports = {
  Habilidade: {
    player: (habilidade, args, { dataloaders: { playerLoader } }, info) => {
      return playerLoader
        .load({ key: habilidade.get('player'), info })
        .catch(handleError)
    },
  },
  Query: {
    allHabilidades: (parent, { first = 50, offset = 0 }, context, info) => {
      return context.db.Habilidade.findAll({
        limit: first,
        offset: offset,
        attributes: context.requestedFields.getFields(info, {
          keep: ['id'],
          exclude: ['player'],
        }),
      }).catch(handleError)
    },
    habilidade: (parent, { id }, context, info) => {
      id = parseInt(id)
      return context.db.Habilidade.findById(id, {
        attributes: context.requestedFields.getFields(info, {
          keep: ['id'],
          exclude: ['player'],
        }),
      })
        .then((habilidade) => {
          throwError(!habilidade, `Habilidade com id ${id} não encontrado!`)
          return habilidade
        })
        .catch(handleError)
    },
  },
  Mutation: {
    createHabilidade: compose(
      authResolvers,
      (parent, { input }, { db, authUser }) => {
        input.player = authUser.player
        return db.sequelize
          .transaction((t) => {
            return db.Habilidade.create(input, { transaction: t })
          })
          .catch(handleError)
      }
    ),
    updateHabilidade: compose(
      authResolvers,
      (parent, { id, input }, { db }) => {
        // id = parseInt(id);
        return db.sequelize
          .transaction((t) => {
            return db.Habilidade.findById(id).then((habilidade) => {
              throwError(!habilidade, `Habilidade com id ${id} não encontrado!`)
              return habilidade.update(input, { transaction: t })
            })
          })
          .catch(handleError)
      }
    ),
    deleteHabilidade: compose(authResolvers, (parent, { id }, { db }) => {
      // id = parseInt(id);
      return db.sequelize
        .transaction((t) => {
          return db.Habilidade.findById(id).then((habilidade) => {
            throwError(!habilidade, `Habilidade com id ${id} não encontrado!`)
            return habilidade
              .destroy({ transaction: t })
              .then((habilidade) => !!habilidade)
          })
        })
        .catch(handleError)
    }),
  },
}
