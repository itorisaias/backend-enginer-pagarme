const express = require('express')

const routes = express.Router()

routes
  .route('/v1/transactions')
  .get((req, res) => res.send('trasanctions v1'))
  .post((req, res) => res.send('transactions v1'))

module.exports = routes
