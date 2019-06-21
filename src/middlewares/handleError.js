const { ValidationError } = require('sequelize')
const PagarmeError = require('../helpers/PagarmeError')

function handleError (err, req, res, next) {
  const error = new PagarmeError()

  if (err instanceof ValidationError) {
    error.message = err.errors[0].message
    error.status = 400
    error.type = 'validation_error'
    error.error = err.errors
  }

  return res
    .status(error.status || 500)
    .json({
      message: error.message || 'Ocorreu um erro interno',
      type: error.type || 'internal_server_error'
    })
}

module.exports = () => handleError
