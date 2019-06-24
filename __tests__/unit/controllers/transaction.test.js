const { factore } = require('./../../utils')
const { TransactionsController } = require('../../../src/controllers')

describe('Controller: TransactionController', () => {
  const mockResponse = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    res.send = jest.fn().mockReturnValue(res)
    return res
  }
  describe('method: store', () => {
    it('should return new transaction', async () => {
      const transaction = await factore.attrs('Transaction')
      class PayableService {
        store (transaction) {
          return Promise.resolve(transaction)
        }
      }
      class TransactionService {
        store (_, transaction) {
          return Promise.resolve(transaction)
        }
      }
      const transactionController = new TransactionsController(
        PayableService,
        TransactionService
      )

      const req = { client: { id: 1 }, body: transaction }
      const res = mockResponse()

      await transactionController.store(req, res, null)

      expect(res.json).toBeCalledWith(transaction)
      expect(res.status).toBeCalledWith(201)
    })
    it('should call next when error', async () => {
      class PayableService {
        store (transaction) {
          return Promise.reject(transaction)
        }
      }
      class TransactionService {
        store (transaction) {
          return Promise.reject(transaction)
        }
      }
      const transactionsController = new TransactionsController(
        PayableService,
        TransactionService
      )

      const req = { client: { id: 1 } }
      const next = jest.fn()

      await transactionsController.store(req, null, next)

      expect(next).toBeCalled()
    })
  })
  describe('method: index', () => {
    it('should find all transaction', async () => {
      const transaction = await factore.attrs('Transaction')
      class TransactionService {
        index (_) {
          return Promise.resolve([transaction])
        }
      }
      const transactionController = new TransactionsController(null, TransactionService)
      const req = { client: { id: 1 } }
      const res = mockResponse()

      await transactionController.index(req, res, null)

      expect(res.send).toBeCalledWith([transaction])
    })
    it('should call next when error ', async () => {
      class TransactionService {
        index (clientId) {
          return Promise.reject(clientId)
        }
      }
      const transactionController = new TransactionsController(null, TransactionService)
      const req = { client: { id: 1 } }
      const next = jest.fn()

      await transactionController.index(req, null, next)

      expect(next).toBeCalled()
    })
  })
})
