module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    amount: {
      type: DataTypes.STRING
    },
    card_number: {
      type: DataTypes.STRING
    },
    card_holder_name: {
      type: DataTypes.STRING
    },
    card_expiration_date: {
      type: DataTypes.STRING
    },
    card_cvv: {
      type: DataTypes.STRING
    },
    payment_method: {
      type: DataTypes.STRING
    },
    description_transaction: {
      type: DataTypes.STRING
    }
  }, {
    hooks: {
      beforeCreate: transaction => {
        transaction.card_number = transaction.card_number.slice(-4)
      }
    }
  })

  Transaction.associate = function (models) {
    // associations can be defined here
  }

  return Transaction
}
