const express = require('express')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')

const { db } = require('./models')
const schema = require('./graphql/schema')
const { extractJwtMiddleware } = require('./middlewares/extract-jwt.middleware')
const DataLoaderFactory = require('./graphql/dataloaders/DataLoaderFactory')
const { RequestedFields } = require('./graphql/ast/RequestedFields')

class App {
  constructor() {
    this.express = express()
    this.init()
  }
  init() {
    this.requestedFields = new RequestedFields()
    this.dataLoaderFactory = new DataLoaderFactory(db, this.requestedFields)
    this.middleware()
  }
  middleware() {
    this.express.use(
      cors({
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Enconding'],
        preflightContinue: false,
        optionsSuccessStatus: 204,
      })
    )

    this.express.use(compression())
    this.express.use(helmet())

    this.express.use(
      '/graphql',

      extractJwtMiddleware(),

      (req, res, next) => {
        req['context']['db'] = db
        req['context']['dataloaders'] = this.dataLoaderFactory.getLoaders()
        req['context']['requestedFields'] = this.requestedFields
        next()
      },
      graphqlHTTP((req) => ({
        schema: schema,
        // eslint-disable-next-line no-undef
        graphiql: process.env.NODE_ENV == 'development',
        context: req['context'],
      }))
    )
  }
}

const server = new App().express
module.exports = { server }
