const routes = require('express').Router()

const { TransactionsController, BalancesController } = require('../controllers')
const { PayableService, TransactionService } = require('../services')

const balancesController = new BalancesController(PayableService)
const transactionsController = new TransactionsController(
  PayableService,
  TransactionService
)

routes
  .route('/v1/transactions')
  .get((req, res, next) => transactionsController.index(req, res, next))
  .post((req, res, next) => transactionsController.store(req, res, next))

routes
  .route('/v1/balances')
  .get((req, res, next) => balancesController.index(req, res, next))

module.exports = routes
