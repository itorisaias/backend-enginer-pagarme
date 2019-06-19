const http = require('http')
const app = require('./app')

const server = http.createServer(app)

server.on('error', err => {
  console.error(err)
})

server.on('listening', () => {
  const { port, address } = server.address()
  console.info(`server listening ${address}:${port}`)
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
