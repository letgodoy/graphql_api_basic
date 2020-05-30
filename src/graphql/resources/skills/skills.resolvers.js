const { handleError, throwError } = require('../../../utils/utils')
const compose = require('../../composable/composable.resolver')
const { authResolvers } = require('../../composable/auth.resolver')

module.exports = {
  Skills: {
    user: (skills, args, { dataloaders: { userLoader } }, info) => {
      return userLoader
        .load({ key: skills.get('user'), info })
        .catch(handleError)
    },
  },
  Query: {
    allSkillses: (parent, { first = 50, offset = 0 }, context, info) => {
      return context.db.Skills.findAll({
        limit: first,
        offset: offset,
        attributes: context.requestedFields.getFields(info, {
          keep: ['id'],
          exclude: ['skillses'],
        }),
      }).catch(handleError)
    },
    skills: (parent, { id }, context, info) => {
      id = parseInt(id)
      return context.db.Skills.findById(id, {
        attributes: context.requestedFields.getFields(info, {
          keep: ['id'],
          exclude: ['skillses'],
        }),
      })
        .then((skills) => {
          throwError(!skills, `Habilidade com id ${id} não encontrado!`)
          return skills
        })
        .catch(handleError)
    },
  },
  Mutation: {
    createSkills: compose(
      authResolvers,
      (parent, { input }, { db, authUser }) => {
        input.user = authUser.id
        return db.sequelize
          .transaction((t) => {
            throwError(
              authUser.role != 'ADMINA',
              `Não autorizado! Você não tem permissoes para isso!`
            )
            return db.Skills.create(input, { transaction: t })
          })
          .catch(handleError)
      }
    ),
    updateSkills: compose(
      authResolvers,
      (parent, { id, input }, { db, authUser }) => {
        // id = parseInt(id);
        return db.sequelize
          .transaction((t) => {
            return db.Skills.findById(id).then((skills) => {
              throwError(!skills, `Habilidade com id ${id} não encontrado!`)
              throwError(
                authUser.role != 'ADMINA',
                `Não autorizado! Você não tem permissoes para isso!`
              )
              return skills.update(input, { transaction: t })
            })
          })
          .catch(handleError)
      }
    ),
    deleteSkills: compose(authResolvers, (parent, { id }, { db, authUser }) => {
      // id = parseInt(id);
      return db.sequelize
        .transaction((t) => {
          return db.Skills.findById(id).then((skills) => {
            throwError(!skills, `Habilidade com id ${id} não encontrado!`)
            throwError(
              authUser.role != 'ADMINA',
              `Não autorizado! Você não tem permissoes para isso!`
            )
            return skills.destroy({ transaction: t }).then((skills) => !!skills)
          })
        })
        .catch(handleError)
    }),
  },
}
