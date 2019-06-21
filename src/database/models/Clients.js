module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Oops. Looks like you already have an account with this email address. Please try to login.',
        fields: [sequelize.fn('lower', sequelize.col('email'))]
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'The email you entered is invalid or is already in our system.'
        },
        max: {
          args: 254,
          msg: 'The email you entered is invalid or longer than 254 characters.'
        }
      }
    },
    apiKey: {
      type: DataTypes.STRING
    }
  }, {})

  Client.associate = function (models) {
    // associations can be defined here
  }

  return Client
}
