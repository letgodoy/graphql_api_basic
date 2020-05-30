const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../../utils/utils')

module.exports = {
  verifyTokenResolver(resolver) {
    return (parent, args, context, info) => {
      const token = context.authorization.split(' ')[1]

      return jwt.verify(token, JWT_SECRET, (err) => {
        if (!err) {
          return resolver(parent, args, context, info)
        }
        throw new Error(`${err.name}: ${err.message}`)
      })
    }
  },
}
