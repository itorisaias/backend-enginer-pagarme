const moment = require('moment')
const PayableService = require('../../../src/services/payables')
const { factore, truncate } = require('../../utils')

moment.locale('pt-BR')

describe('Service: Payable', () => {
  describe('method: store', () => {
    let client = null
    const paymentConfig = {
      debit_card: {
        percentageFee: 5,
        amountDay: 10
      }
    }

    beforeEach(async () => {
      await truncate()
      client = await factore.create('Client')
    })
    afterEach(async () => {
      await truncate()
    })

    it('should create new payable', async () => {
      const transaction = await factore.create('Transaction', { clientId: client.id })
      const payableModel = {
        create: (value) => Promise.resolve(value)
      }
      const payableService = new PayableService(payableModel)

      const payable = await payableService.store(transaction)

      expect(payable.transactionId).toBe(transaction.id)
    })
    it('calcular o fee corretamente com configurações customizadas', async () => {
      const transaction = await factore.create('Transaction', {
        clientId: client.id,
        paymentMethod: 'debit_card',
        amount: 1000
      })
      const payableModel = {
        create: (value) => Promise.resolve(value)
      }
      const payableService = new PayableService(payableModel, paymentConfig)

      const payable = await payableService.store(transaction)
      const fee = ((1000 * paymentConfig.debit_card.percentageFee) / 100)

      expect(payable.fee).toBe(fee)
    })
    it('calcular o paymentDate com a configuração customizada', async () => {
      const transaction = await factore.create('Transaction', {
        clientId: client.id,
        paymentMethod: 'debit_card'
      })
      const payableModel = {
        create: (value) => Promise.resolve(value)
      }
      const payableService = new PayableService(payableModel, paymentConfig)
      const payable = await payableService.store(transaction)
      expect(payable.paymentDate)
        .toBe(
          moment()
            .add(paymentConfig.debit_card.amountDay, 'days')
            .format('L')
        )
    })
  })
})
