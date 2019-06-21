const moment = require('moment')
const paymentConfigDefault = require('../config/payables.config')

moment.locale('pt-BR')

class PayableService {
  constructor (PayableModel, paymentConfig = paymentConfigDefault) {
    this.PayableModel = PayableModel
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
        paymentDate: moment().add(amountDay, 'days').format('L'),
        fee: ((percentageFee * amount) / 100)
      })

      return payable
    } catch (error) {
      throw error
    }
  }
}

module.exports = PayableService
