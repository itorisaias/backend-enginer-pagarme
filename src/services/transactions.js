class TransactionService {
  constructor (TransactionModel) {
    this.TransactionModel = TransactionModel
  }

  store (clientId, transaction) {
    return this.TransactionModel
      .create({ ...transaction, clientId })
  }

  index (clientId) {
    return this.TransactionModel
      .findAll({
        order: [
          ['createdAt', 'DESC']
        ],
        where: {
          clientId
        }
      })
  }
}

module.exports = TransactionService
