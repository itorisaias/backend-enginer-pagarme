const http = require('http')
const graphql = require('./graphql')
const app = require('./app')
const log = require('../utils/logger').getInstance('server')

const server = http.createServer(app)

graphql.start(app)

server.on('error', err => {
  if (err.syscall !== 'listen') {
    throw err
  }

  log.error(err)
  process.exit(1)
})

server.on('listening', () => {
  const { port, address } = server.address()
  log.info(`server listening ${address}:${port}`)
})

module.exports = {
  /**
   * Start listening server
   * @param {number} port port to up http server
   */
  start: function (port) {
    server.listen(port)
  }
}
