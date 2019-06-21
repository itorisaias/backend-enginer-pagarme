const paymentMethods = ['debit_card', 'credit_card']

module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    amount: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cardNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cardHolderName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cardExpirationDate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cardCvv: {
      type: DataTypes.STRING,
      allowNull: false
    },
    paymentMethod: {
      type: DataTypes.ENUM(...Object.values(paymentMethods)),
      allowNull: false,
      validate: {
        isIn: {
          args: [Object.values(paymentMethods)],
          msg: 'paymentMethod not allowed'
        }
      }
    },
    descriptionTransaction: {
      type: DataTypes.STRING,
      allowNull: false
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
