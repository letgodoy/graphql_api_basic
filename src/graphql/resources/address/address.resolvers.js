const { handleError, throwError } = require('../../../utils/utils')
const compose = require('../../composable/composable.resolver')
const { authResolvers } = require('../../composable/auth.resolver')

module.exports = {
  Address: {
    player: (address, args, { dataloaders: { playerLoader } }, info) => {
      return playerLoader
        .load({ key: address.get('player'), info })
        .catch(handleError)
    },
  },

  Query: {
    allAddresses: (parent, { first = 50, offset = 0 }, context, info) => {
      return context.db.Address.findAll({
        limit: first,
        offset: offset,
        attributes: context.requestedFields.getFields(info, {
          keep: ['id'],
          exclude: ['player'],
        }),
      }).catch(handleError)
    },
    address: (parent, { id }, context, info) => {
      id = parseInt(id)
      return context.db.Address.findById(id, {
        attributes: context.requestedFields.getFields(info, {
          keep: ['id'],
          exclude: ['player'],
        }),
      })
        .then((address) => {
          throwError(!address, `Endereço com id ${id} não encontrado!`)
          return address
        })
        .catch(handleError)
    },
  },

  Mutation: {
    createAddress: compose(
      authResolvers,
      (parent, { input }, { db, authUser }) => {
        input.player = authUser.player
        return db.sequelize
          .transaction((t) => {
            return db.Address.create(input, { transaction: t })
          })
          .catch(handleError)
      }
    ),
    updateAddress: compose(
      authResolvers,
      (parent, { id, input }, { db, authUser }) => {
        id = parseInt(id)
        return db.sequelize
          .transaction((t) => {
            return db.Address.findById(id).then((address) => {
              throwError(!address, `Endereço com id ${id} não encontrado!`)
              throwError(
                address.get('player') != authUser.player,
                `Não autorizado! Você só pode editar seu proprio endereço!`
              )
              input.player = authUser.player
              return address.update(input, { transaction: t })
            })
          })
          .catch(handleError)
      }
    ),
    deleteAddress: compose(
      authResolvers,
      (parent, { id }, { db, authUser }) => {
        id = parseInt(id)
        return db.sequelize
          .transaction((t) => {
            return db.Address.findById(id).then((address) => {
              throwError(!address, `Endereço com id ${id} não encontrado!`)
              throwError(
                address.get('player') != authUser.player,
                `Não autorizado! Você só pode deletar seu proprio endereço!`
              )
              return address
                .destroy({ transaction: t })
                .then((address) => !!address)
            })
          })
          .catch(handleError)
      }
    ),
  },
}