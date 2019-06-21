const {
  sequelize
} = require('../../src/database/models')

const {
  Client,
  Payable,
  Transaction
} = sequelize.models

async function truncate () {
  await Payable.destroy({ truncate: true, force: true })
  await Transaction.destroy({ truncate: true, force: true })
  await Client.destroy({ truncate: true, force: true })
}

module.exports = () => truncate()
