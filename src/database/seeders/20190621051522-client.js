module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('clients', [{
      name: 'Itor Isaias',
      email: 'itor.isaias@gmail.com',
      api_key: '1234567890',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: 'Pagarme',
      email: 'teste@pagar.me',
      api_key: '0987654321',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('clients', null, {})
  }
}
