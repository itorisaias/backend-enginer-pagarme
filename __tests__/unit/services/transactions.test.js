const TransactionService = require('../../../src/services/transactions')
const { factore, truncate } = require('../../utils')

describe('Service: Transaction', () => {
  describe('method: store', () => {
    let client = null
    beforeEach(async () => {
      await truncate()
      client = await factore.create('Client')
    })
    afterEach(async () => {
      await truncate()
    })

    it('should create new transaction for user', async () => {
      const transaction = await factore.attrs('Transaction', {
        clientId: client.id
      })
      const transactionModel = {
        create: jest.fn().mockResolvedValue(transaction)
      }
      const transactionService = new TransactionService(transactionModel)

      const newTransaciotn = await transactionService.store(transaction)

      expect(newTransaciotn.clientId).toBe(client.id)
    })
    it('return throw error', async () => {
      const transactionModel = {
        create: jest.fn().mockRejectedValue('teste')
      }
      const transactionService = new TransactionService(transactionModel)

      transactionService
        .store({})
        .catch(err => expect(err).toBe('teste'))
    })
  })
  describe('method: index', () => {
    let client = null
    beforeEach(async () => {
      await truncate()
      client = await factore.create('Client')
    })
    afterEach(async () => {
      await truncate()
    })
    it('should return list of transaction', async () => {
      const transaction = await factore.create('Transaction', {
        clientId: client.id
      })
      const transactionModel = {
        findAll: jest.fn().mockResolvedValue([transaction])
      }
      const transactionService = new TransactionService(transactionModel)

      const transactions = await transactionService.index(client.id)

      expect(transactionModel.findAll.mock.calls[0][0].where.clientId).toBe(client.id)
      expect(transactions[0].id).toBe(transaction.id)
    })
    it('should return throw error', async () => {
      const transactionModel = {
        findAll: jest.fn().mockRejectedValue('teste')
      }
      const transactionService = new TransactionService(transactionModel)

      transactionService
        .index(null)
        .catch(err => expect(err).toBe('teste'))
    })
  })
})
