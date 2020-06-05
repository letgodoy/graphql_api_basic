const jwt = require('jsonwebtoken')
const { db } = require('./../models')
const { JWT_SECRET } = require('../utils/utils')

export function extractJwtMiddleware() {
    return (req, res, next) => {
      let authorization = req.get('Authorization')
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
        
        db.User.findById(decoded.sub).then((user) => {
          if (user) {
            req['context']['authUser'] = {
              id: user._id,
            }
          }
          return next()
        })
      })
    }
  }

export function authUser(resolvers) {
  Object.keys(resolvers).forEach(k => {
    resolvers[k] = resolvers[k].wrapResolve(next => rp => {
      if (!rp.context.authUser) {
        throw new Error('Voce nao tem autorizacao para fazer isso.');
      }
      return next(rp);
    });
  });
  return resolvers;
}