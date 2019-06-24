const {
  BalancesController
} = require('../../../src/controllers')

describe('Controller: Balance', () => {
  describe('method: index', () => {
    it('should return balance', async () => {
      class PayablesService {
        findTransactionPayable (clientId) {
          const value = [
            {
              status: 'paid',
              fee: 2,
              transaction: {
                amount: 10
              }
            },
            {
              status: 'waiting_funds',
              fee: 3,
              transaction: {
                amount: 5
              }
            }
          ]
          return Promise.resolve(value)
        }
      }

      const balancesController = new BalancesController(PayablesService)

      const req = { client: { id: 1 } }
      const res = { send: jest.fn() }

      await balancesController.index(req, res, null)

      expect(res.send).toBeCalledWith({
        'waiting_funds': {
          amount: (2).toFixed(2)
        },
        available: {
          amount: (8).toFixed(2)
        }
      })
    })
    it('should return next error when throw error', async () => {
      class PayablesService {
        findTransactionPayable (_) {
          return Promise.reject(new Error('teste'))
        }
      }

      const balancesController = new BalancesController(PayablesService)

      const req = { client: { id: 1 } }
      const next = jest.fn()

      await balancesController.index(req, null, next)

      expect(next).toBeCalled()
      expect(next).toBeCalledWith(new Error('teste'))
    })
    it('should return null when call computeBalance with trancions null', async () => {
      class PayablesService {}

      const balancesController = new BalancesController(PayablesService)

      expect(balancesController.computeBalance('fake'))
        .toBeNull()
    })
  })
})
