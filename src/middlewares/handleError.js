const { ValidationError } = require('sequelize')
const PagarmeError = require('../helpers/PagarmeError')
const log = require('../utils/logger').getInstance('server')

function handleError (err, req, res, next) {
  const error = new PagarmeError()
  log.error(err)

  if (err instanceof ValidationError) {
    error.message = err.errors[0].message
    error.status = 400
    error.type = 'validation_error'
    error.error = err.errors
  } else if (err instanceof PagarmeError) {
    error.message = err.message
    error.status = err.status
    error.type = err.type
    error.error = err.stack
  } else if (err instanceof Error) {
    error.message = err.message || 'Ocorreu um erro interno'
    error.type = err.name || 'internal_server_error'
    error.type = err.status || 500
    error.error = err
  }

  const {
    status,
    message,
    type
  } = error

  return res.status(status).json({ message, type })
}

module.exports = () => handleError
