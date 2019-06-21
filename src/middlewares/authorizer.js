const { Client } = require('../database/models')
const PagarmeError = require('../helpers/PagarmeError')

/**
 * authorizer
 * @param {request} req request
 * @param {response} res response
 * @param {next} next next
 */
async function authorizer (req, res, next) {
  const {
    api_key: apiKey
  } = req.headers

  if (!apiKey) {
    return next(new PagarmeError({
      message: 'api_key not informed',
      status: 403,
      type: 'api_key_required'
    }))
  }

  const client = await Client.findOne({ where: { apiKey } })

  if (!client) {
    return next(new PagarmeError({
      message: 'api_key not found',
      status: 403,
      type: 'api_key_invalid'
    }))
  }

  req.client = client

  return next()
}

module.exports = () => authorizer
