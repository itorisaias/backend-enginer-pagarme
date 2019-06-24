const {
  Transaction,
  Payable
} = require('../database/models')

class TransactionController {
  constructor (
    PayableService,
    TransactionService,
    TransactionModel = Transaction,
    PayableModel = Payable
  ) {
    this.PayableService = PayableService
    this.TransactionService = TransactionService
    this.TransactionModel = TransactionModel
    this.PayableModel = PayableModel
  }

  async index (req, res, next) {
    const transactionService = new this.TransactionService(this.TransactionModel)
    const {
      id: clientId
    } = req.client

    try {
      const transactions = await transactionService.index(clientId)
      return res.send(transactions)
    } catch (error) {
      return next(error)
    }
  }

  async store (req, res, next) {
    const payableService = new this.PayableService(this.PayableModel, this.TransactionModel)
    const transactionService = new this.TransactionService(this.TransactionModel)
    const {
      id: clientId
    } = req.client

    try {
      const transaction = await transactionService.store(clientId, req.body)
      await payableService.store(transaction)

      return res.status(201).json(transaction)
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = TransactionController
