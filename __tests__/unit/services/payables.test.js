const moment = require('moment')
const { factore } = require('../../utils')
const { PayableService } = require('../../../src/services')

moment.locale('pt-BR')

describe('Service: Payable', () => {
  describe('method: store', () => {
    const paymentConfig = {
      debit_card: {
        status: '',
        percentageFee: 5,
        amountDay: 10
      }
    }
    it('should create new payable', async () => {
      const transaction = await factore.attrs('Transaction', {
        amount: 1000,
        paymentMethod: 'debit_card',
        transactionId: 1
      })
      const PayableModel = {
        create: (value) => Promise.resolve(value)
      }
      const payableService = new PayableService(PayableModel, null, paymentConfig)

      const payable = await payableService.store(transaction)

      expect(payable.transactionId).toBe(transaction.id)
    })
    it('calcular o fee corretamente com configurações customizadas', async () => {
      const transaction = await factore.attrs('Transaction', {
        clientId: 1,
        paymentMethod: 'debit_card',
        amount: 1000
      })
      const payableModel = {
        create: (value) => Promise.resolve(value)
      }
      const payableService = new PayableService(payableModel, null, paymentConfig)

      const payable = await payableService.store(transaction)
      const fee = ((1000 * paymentConfig.debit_card.percentageFee) / 100)

      expect(payable.fee).toBe(fee)
    })
    it('calcular o paymentDate com a configuração customizada', async () => {
      const transaction = await factore.attrs('Transaction', {
        clientId: 1,
        paymentMethod: 'debit_card'
      })
      const payableModel = {
        create: (value) => Promise.resolve(value)
      }
      const payableService = new PayableService(payableModel, null, paymentConfig)
      const payable = await payableService.store(transaction)
      expect(moment(payable.paymentDate).format('DDMMYYYY'))
        .toBe(
          moment()
            .add(paymentConfig.debit_card.amountDay, 'days')
            .format('DDMMYYYY')
        )
    })
  })
})
