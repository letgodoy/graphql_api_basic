const jwt = require('jsonwebtoken')
const db = require('./../models')
const { JWT_SECRET } = require('../utils/utils')

module.exports = {
  extractJwtMiddleware() {
    return (req, res, next) => {
      let authorization = req.get('authorization')
      let token = authorization ? authorization.split(' ')[1] : undefined

      req['context'] = {}
      req['context']['authorization'] = authorization

      if (!token) {
        return next()
      }

      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          return next()
        }
        db.User.findById(decoded.sub, {
          attributes: ['id', 'player'],
        }).then((user) => {
          if (user) {
            req['context']['authUser'] = {
              id: user.get('id'),
              playerId: user.get('player'),
            }
          }
          return next()
        })
      })
    }
  },
}
