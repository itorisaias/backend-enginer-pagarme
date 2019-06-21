const faker = require('faker')
const moment = require('moment')
const factory = require('factory-girl').factory
const creditcardGenerator = require('creditcard-generator')
const {
  Transaction
} = require('../../src/database/models')

const BRAND_DEFAULTS = ['VISA', 'MasterCard']
const PAYMENT_METHOD_DEFATULS = ['credit', 'debit']
const brand = () => BRAND_DEFAULTS[Math.floor(Math.random() * BRAND_DEFAULTS.length)]
const paymentMethodSort = () => PAYMENT_METHOD_DEFATULS[Math.floor(Math.random() * PAYMENT_METHOD_DEFATULS.length)]

faker.locale = 'pt_BR'

factory.define('Transaction', Transaction, {
  amount: faker.commerce.price(),
  card_number: creditcardGenerator.GenCC(brand())[0],
  card_holder_name: faker.name.findName().toUpperCase(),
  card_expiration_date: moment(faker.date.future()).format('MMYY'),
  card_cvv: faker.random.number({ min: 0, max: 999, precision: 3 }),
  payment_method: paymentMethodSort(),
  description_transaction: faker.commerce.productName()
})

module.exports = factory
