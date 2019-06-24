const moment = require('moment')
const uuui = require('uuid/v4')
const { PayableService, TransactionService } = require('../../services')

module.exports = {
  Query: {
    transactions: async (parent, args, { models }) => {
      const transactions = await models.Transaction.findAll()
      return transactions
    },
    payables: async (parent, args, { models }) => {
      const payables = await models.Payable.findAll()
      return payables
    },
    clients: async (parent, args, { models }) => {
      const clients = await models.Client.findAll()
      return clients
    }
  },
  Client: {
    transactions: async ({ id }, args, { models }) => {
      const transactions = await models.Transaction.findAll({
        where: {
          clientId: id
        }
      })

      return transactions
    },
    createdAt: ({ createdAt }) => moment(createdAt).format('DD-MM-YYYY HH:mm:ss'),
    updatedAt: ({ updatedAt }) => moment(updatedAt).format('DD-MM-YYYY HH:mm:ss')
  },
  Transaction: {
    payables: async ({ id }, args, { models }) => {
      const payables = await models.Payable.findAll({
        where: {
          transactionId: id
        }
      })

      return payables
    },
    createdAt: ({ createdAt }) => moment(createdAt).format('DD-MM-YYYY HH:mm:ss'),
    updatedAt: ({ updatedAt }) => moment(updatedAt).format('DD-MM-YYYY HH:mm:ss')
  },
  Payable: {
    fee: ({ fee }) => {
      return Number(fee).toFixed(2)
    },
    paymentDate: ({ paymentDate }) => {
      return moment(paymentDate).format('DD-MM-YYYY HH:mm:ss')
    },
    createdAt: ({ createdAt }) => moment(createdAt).format('DD-MM-YYYY HH:mm:ss'),
    updatedAt: ({ updatedAt }) => moment(updatedAt).format('DD-MM-YYYY HH:mm:ss')
  },
  Mutation: {
    createClient: async (parent, { input }, { models }) => {
      const client = await models.Client.create({
        ...input,
        apiKey: uuui()
      })
      return client
    },
    createTransaction: async (parent, { input }, { models, client: { id } }) => {
      const {
        Payable: PayableModel,
        Transaction: TransactionModel
      } = models
      const payableService = new PayableService(PayableModel, TransactionModel)
      const transactionService = new TransactionService(TransactionModel)

      const transaction = await transactionService.store(id, input)
      await payableService.store(transaction)

      return transaction
    }
  }
}
