const moment = require('moment')
const paymentConfigDefault = require('../config/payables.config')

moment.locale('pt-BR')

class PayableService {
  constructor (PayableModel, TransactionModel, paymentConfig = paymentConfigDefault) {
    this.PayableModel = PayableModel
    this.TransactionModel = TransactionModel
    this.paymentConfig = paymentConfig
  }

  async store (transaction) {
    const { id: transactionId, amount, paymentMethod } = transaction
    const configPayment = this.paymentConfig[paymentMethod]
    const {
      status,
      percentageFee,
      amountDay
    } = configPayment

    try {
      const payable = await this.PayableModel.create({
        transactionId,
        status,
        paymentDate: moment().add(amountDay, 'days'),
        fee: ((percentageFee * amount) / 100)
      })

      return payable
    } catch (error) {
      throw error
    }
  }

  findTransactionPayable (clientId) {
    return this.PayableModel
      .findAll({
        include: [
          {
            model: this.TransactionModel,
            as: 'transaction',
            where: {
              clientId
            }
          }
        ]
      })
  }
}

module.exports = PayableService
