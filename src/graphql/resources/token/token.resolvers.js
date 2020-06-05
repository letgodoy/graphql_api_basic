const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../../../utils/utils')

module.exports = {
  Mutation: {
    authUser: async (parent, { email, password }, { db }) => {
      const errorMessage = 'Não autorizado, e-mail ou senha errados!'
      try {
        const user = await db.User.findOne({ email }).exec();

        if (!user) {
          user.comparePassword(password, (error, match) => {
            if (!match) throw new Error(errorMessage)
            if (error) throw new Error(error.message)
            const payload = { sub: user._id }
            return {
              token: jwt.sign(payload, JWT_SECRET),
            }
          });
        } else {
          throw new Error(errorMessage)
        }
      } catch {
        error => {
          throw new Error(error.message)
        }
      }
    }
  }
}
