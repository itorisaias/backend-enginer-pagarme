const statusPayment = ['paid', 'waiting_funds']

module.exports = (sequelize, DataTypes) => {
  const Payable = sequelize.define('Payable', {
    status: {
      type: DataTypes.ENUM(...Object.values(statusPayment)),
      allowNull: false,
      validate: {
        isIn: {
          args: [Object.values(statusPayment)],
          msg: 'status not allowed'
        }
      }
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fee: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    transactionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {})

  Payable.associate = function (models) {
    Payable.belongsTo(models.Transaction, {
      foreignKey: 'transactionId',
      as: 'transaction'
    })
  }

  return Payable
}
