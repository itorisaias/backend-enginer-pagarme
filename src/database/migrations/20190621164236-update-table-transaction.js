module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('transactions', 'client_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'clients',
        key: 'id'
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('transactions', 'client_id')
  }
}
