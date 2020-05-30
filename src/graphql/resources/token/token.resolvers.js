const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../../../utils/utils')

module.exports = {
  Mutation: {
    authUser: (parent, { email, password }, { db }) => {
      return db.User.findOne({
        where: { email: email },
        attributes: ['id', 'password', 'player'],
      }).then((user) => {
        let errorMessage = 'Não autorizado, e-mail ou senha errados!'
        if (!user || !user.isPassword(user.get('password'), password)) {
          throw new Error(errorMessage)
        }
        const payload = { sub: user.get('player') }
        return {
          token: jwt.sign(payload, JWT_SECRET),
        }
      })
    },
  },
}
