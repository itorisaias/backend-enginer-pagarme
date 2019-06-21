class TransactionController {
  constructor (Model) {
    this.Model = Model
  }

  index (req, res, next) {
    return this.Model
      .findAll()
      .then(transaction => res.send(transaction))
      .catch(next)
  }

  store (req, res, next) {
    return this.Model
      .create(req.body)
      .then((transaction) => res.status(201).json(transaction))
      .catch(next)
  }
}

module.exports = TransactionController
