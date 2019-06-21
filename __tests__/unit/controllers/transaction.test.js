const factore = require('./../../utils/factore')
const TransactionController = require('../../../src/controllers/transactions')

const transactionFake = () => factore.attrs('Transaction')
const mockResponse = () => {
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  res.send = jest.fn().mockReturnValue(res)
  return res
}
const mockRequest = (body = {}, params = {}) => ({
  body,
  params
})
const mockModel = (value) => ({
  findAll: jest.fn().mockResolvedValue(value),
  create: jest.fn().mockResolvedValue(value)
})

describe('Controller: TransactionController', () => {
  describe('store method', () => {
    it('should return new transaction', async () => {
      const transaction = await transactionFake()
      const req = mockRequest(transaction)
      const res = mockResponse()
      const model = mockModel(transaction)
      const transactionController = new TransactionController(model)

      await transactionController.store(req, res, null)

      expect(res.json).toHaveBeenCalledWith(transaction)
      expect(res.status).toHaveBeenCalledWith(201)
    })
    it('should call next when error', async () => {
      const model = {
        create: jest.fn().mockRejectedValue()
      }
      const req = mockRequest()
      const transactionController = new TransactionController(model)
      const next = jest.fn()

      await transactionController.store(req, null, next)

      expect(next).toBeCalled()
    })
  })
  describe('index method', () => {
    it('should find all transaction', async () => {
      const transaction = await transactionFake()
      const model = mockModel([transaction])
      const transactionController = new TransactionController(model)
      const req = mockRequest()
      const res = mockResponse()

      await transactionController.index(req, res, null)

      expect(res.send).toHaveBeenCalledWith([transaction])
    })
    it('should call next when error ', async () => {
      const model = {
        findAll: jest.fn().mockRejectedValue()
      }
      const transactionController = new TransactionController(model)
      const next = jest.fn()

      await transactionController.index(null, null, next)

      expect(next).toBeCalled()
    })
  })
})
