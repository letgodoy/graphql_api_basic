const { handleError, throwError } = require('../../../utils/utils')
const compose = require('../../composable/composable.resolver')
const { authResolvers } = require('../../composable/auth.resolver')

module.exports = {
  Anuncio: {
    player: (anuncio, args, { dataloaders: { playerLoader } }, info) => {
      return playerLoader
        .load({ key: anuncio.get('player'), info })
        .catch(handleError)
    },
    proposes: (anuncio, args, { dataloaders: { proposeLoader } }, info) => {
      return proposeLoader
        .load({ key: anuncio.get('proposes'), info })
        .catch(handleError)
    },
    skills: (anuncio, args, { dataloaders: { skillsLoader } }, info) => {
      return skillsLoader
        .load({ key: anuncio.get('skills'), info })
        .catch(handleError)
    },
    files: (anuncio, args, { dataloaders: { fileLoader } }, info) => {
      return fileLoader
        .load({ key: anuncio.get('files'), info })
        .catch(handleError)
    },
  },
  Query: {
    allAnuncioes: (parent, { first = 50, offset = 0 }, context, info) => {
      return context.db.Anuncio.findAll({
        limit: first,
        offset: offset,
        attributes: context.requestedFields.getFields(info, {
          keep: ['id'],
          exclude: ['anuncios'],
        }),
      }).catch(handleError)
    },
    anuncio: (parent, { id }, context, info) => {
      id = parseInt(id)
      return context.db.Anuncio.findById(id, {
        attributes: context.requestedFields.getFields(info, {
          keep: ['id'],
          exclude: ['anuncios'],
        }),
      })
        .then((anuncio) => {
          throwError(!anuncio, `Anuncio com id ${id} não encontrado!`)
          return anuncio
        })
        .catch(handleError)
    },
  },
  Mutation: {
    createAnuncio: compose(
      authResolvers,
      (parent, { input }, { db, authUser }) => {
        input.player = authUser.player
        return db.sequelize
          .transaction((t) => {
            return db.Anuncio.create(input, { transaction: t })
          })
          .catch(handleError)
      }
    ),
    updateAnuncio: compose(
      authResolvers,
      (parent, { id, input }, { db, authUser }) => {
        // id = parseInt(id);
        return db.sequelize
          .transaction((t) => {
            return db.Anuncio.findById(id).then((Anuncio) => {
              throwError(!Anuncio, `Anuncio com id ${id} não encontrado!`)
              throwError(
                Anuncio.get('player') != authUser.player,
                `Não autorizado! Você só pode alterar seus proprios anuncios!`
              )
              input.player = authUser.player
              return Anuncio.update(input, { transaction: t })
            })
          })
          .catch(handleError)
      }
    ),
    deleteAnuncio: compose(
      authResolvers,
      (parent, { id }, { db, authUser }) => {
        // id = parseInt(id);
        return db.sequelize
          .transaction((t) => {
            return db.Anuncio.findById(id).then((anuncio) => {
              throwError(!anuncio, `Anuncio com id ${id} não encontrado!`)
              throwError(
                anuncio.get('player') != authUser.player,
                `Não autorizado! Você só pode alterar seus proprios anuncios!`
              )
              return anuncio
                .destroy({ transaction: t })
                .then((anuncio) => !!anuncio)
            })
          })
          .catch(handleError)
      }
    ),
  },
}
