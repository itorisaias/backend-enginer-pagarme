module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    amount: {
      type: DataTypes.STRING
    },
    cardNumber: {
      type: DataTypes.STRING
    },
    cardHolderName: {
      type: DataTypes.STRING
    },
    cardExpirationDate: {
      type: DataTypes.STRING
    },
    cardCvv: {
      type: DataTypes.STRING
    },
    paymentMethod: {
      type: DataTypes.STRING
    },
    descriptionTransaction: {
      type: DataTypes.STRING
    }
  }, {
    hooks: {
      beforeCreate: transaction => {
        transaction.cardNumber = transaction.cardNumber
          .slice(-4)
          .padStart(16, '0')
      }
    }
  })

  Transaction.associate = function (models) {
    // associations can be defined here
  }

  return Transaction
}
