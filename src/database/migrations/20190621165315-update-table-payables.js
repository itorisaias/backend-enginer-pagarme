module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('payables', 'transaction_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'transactions',
        key: 'id'
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('payables', 'transaction_id')
  }
}
