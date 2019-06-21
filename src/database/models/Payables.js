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
    payment_date: {
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
      foreignKey: 'trasanctionId',
      as: 'trasanction'
    })
  }

  return Payable
}
