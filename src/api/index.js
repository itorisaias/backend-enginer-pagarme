const routes = require('express').Router()

const TransactionController = require('../controllers/transactions')
const { PayableService, TransactionService } = require('../services')

const transactionController = new TransactionController(
  PayableService,
  TransactionService
)

routes
  .route('/v1/transactions')
  .get((req, res, next) => transactionController.index(req, res, next))
  .post((req, res, next) => transactionController.store(req, res, next))

module.exports = routes
