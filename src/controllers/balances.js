const {
  Transaction,
  Payable
} = require('../database/models')

class BalancesController {
  constructor (
    PayablesService,
    TransactionsService,
    TransactionModel = Transaction,
    PayableModel = Payable
  ) {
    this.PayablesService = PayablesService
    this.TransactionsService = TransactionsService
    this.TransactionModel = TransactionModel
    this.PayableModel = PayableModel
  }

  async index (req, res, next) {
    const {
      id: clientId
    } = req.client

    const payablesService = new this.PayablesService(this.PayableModel, this.TransactionModel)

    try {
      this.transactionPayable = await payablesService.findTransactionPayable(clientId)

      return res.send({
        'waiting_funds': {
          amount: this.computeBalance('waiting_funds')
        },
        available: {
          amount: this.computeBalance('paid')
        }
      })
    } catch (error) {
      return next(error)
    }
  }

  computeBalance (status) {
    if (this.transactionPayable) {
      return null
    }

    return this.transactionPayable
      .filter(payable => payable.status === status)
      .reduce((prev, current) => {
        prev += current.transaction.amount - current.fee

        return prev
      }, 0)
      .toFixed(2)
  }
}

module.exports = BalancesController
