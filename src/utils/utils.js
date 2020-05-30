const normalizePort = (val) => {
  return typeof val === 'string' ? parseInt(val) : val
}

const onError = (server) => {
  return (error) => {
    let port = server.address().port
    if (error.syscall !== 'listen') throw error
    let bind = typeof port === 'string' ? `pipe ${port}` : `port ${port}`
    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`)
        // eslint-disable-next-line no-undef
        process.exit(1)
        break
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`)
        // eslint-disable-next-line no-undef
        process.exit(1)
        break
      default:
        throw error
    }
  }
}

const onListening = (server) => {
  return () => {
    let addr = server.address()
    let bind =
      typeof addr === 'string'
        ? `pipe ${addr}`
        : `http://${addr.address}:${addr.port}`
    console.log(`Listening at ${bind}... as ${process.env.NODE_ENV}`)
  }
}
const handleError = (error) => {
  let errorMessage = `${error.name}: ${error.message}`
  // eslint-disable-next-line no-undef
  let env = process.env.NODE_ENV
  if (env !== 'test' && env !== 'pipelines') {
    console.log(errorMessage)
  }
  return Promise.reject(new Error(errorMessage))
}
const throwError = (condition, message) => {
  if (condition) {
    throw new Error(message)
  }
}
// eslint-disable-next-line no-undef
const JWT_SECRET = process.env.JWT_SECRET

module.exports = {
  normalizePort,
  onError,
  onListening,
  handleError,
  throwError,
  JWT_SECRET,
}
