const { handleError, throwError } = require('../../../utils/utils')
const compose = require('../../composable/composable.resolver')
const { authResolvers } = require('../../composable/auth.resolver')

module.exports = {
  Propose: {
    anuncio: (propose, args, { dataloaders: { anuncioLoader } }, info) => {
      return anuncioLoader
        .load({ key: propose.get('anuncios'), info })
        .catch(handleError)
    },
    from: (propose, args, { dataloaders: { playerLoader } }, info) => {
      return playerLoader
        .load({ key: propose.get('from'), info })
        .catch(handleError)
    },
    to: (propose, args, { dataloaders: { playerLoader } }, info) => {
      return playerLoader
        .load({ key: propose.get('to'), info })
        .catch(handleError)
    },
  },
  Query: {
    allProposes: (parent, { first = 50, offset = 0 }, context, info) => {
      return context.db.Propose.findAll({
        limit: first,
        offset: offset,
        attributes: context.requestedFields.getFields(info, {
          keep: ['id'],
          exclude: ['Proposes'],
        }),
      }).catch(handleError)
    },
    propose: (parent, { id }, context, info) => {
      id = parseInt(id)
      return context.db.Propose.findById(id, {
        attributes: context.requestedFields.getFields(info, {
          keep: ['id'],
          exclude: ['Players'],
        }),
      })
        .then((propose) => {
          throwError(!propose, `Perfil com id ${id} não encontrado!`)
          return propose
        })
        .catch(handleError)
    },
  },
  Mutation: {
    createPropose: compose(
      authResolvers,
      (parent, { input }, { db, authUser }) => {
        input.from = authUser.player
        return db.sequelize
          .transaction((t) => {
            return db.Propose.create(input, { transaction: t })
          })
          .catch(handleError)
      }
    ),
    updatePropose: compose(
      authResolvers,
      (parent, { id, input }, { db, authUser }) => {
        // id = parseInt(id);
        return db.sequelize
          .transaction((t) => {
            return db.Propose.findById(id).then((propose) => {
              throwError(!propose, `Proposta com id ${id} não encontrado!`)
              throwError(
                propose.get('from') != authUser.player ||
                  propose.get('to') != authUser.player,
                `Não autorizado! Você só pode alterar suas propostas!`
              )
              return propose.update(input, { transaction: t })
            })
          })
          .catch(handleError)
      }
    ),
    deletePropose: compose(
      authResolvers,
      (parent, { id }, { db, authUser }) => {
        // id = parseInt(id);
        return db.sequelize
          .transaction((t) => {
            return db.Propose.findById(id).then((propose) => {
              throwError(!propose, `Proposta com id ${id} não encontrado!`)
              throwError(
                propose.get('from') != authUser.player ||
                  propose.get('to') != authUser.player,
                `Não autorizado! Você só pode alterar suas propostas!`
              )
              return propose
                .destroy({ transaction: t })
                .then((propose) => !!propose)
            })
          })
          .catch(handleError)
      }
    ),
  },
}
