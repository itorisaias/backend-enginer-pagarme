const routes = require('express').Router()

const TransactionController = require('../controllers/transactions')
const { Transaction } = require('../database/models')

const transactionController = new TransactionController(Transaction)

routes
  .route('/v1/transactions')
  .get((req, res, next) => transactionController.index(req, res, next))
  .post((req, res, next) => transactionController.store(req, res, next))

module.exports = routes
