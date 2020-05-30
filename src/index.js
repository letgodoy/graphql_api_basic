const http = require('http')

const app = require('./app')
const { db } = require('./models')
const { normalizePort, onError, onListening } = require('./utils/utils')

const server = http.createServer(app)
// eslint-disable-next-line no-undef
const port = normalizePort(process.env.port || 3000)
// eslint-disable-next-line no-undef
const host = process.env.host || '127.0.0.1'

db.sequelize.sync().then(() => {
  server.listen(port, host)
  server.on('error', onError(server))
  server.on('listening', onListening(server))
})
