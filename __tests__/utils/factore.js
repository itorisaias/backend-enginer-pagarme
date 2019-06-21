const faker = require('faker')
const moment = require('moment')
const factory = require('factory-girl').factory
const creditcardGenerator = require('creditcard-generator')
const {
  Transaction,
  Client,
  Payable
} = require('../../src/database/models')

const BRAND_DEFAULTS = ['VISA', 'MasterCard']
const PAYMENT_METHOD_DEFATULS = ['debit_card', 'credit_card']
const STATUS_PAYMENT_DEFAULT = ['paid', 'waiting_funds']

const brand = () => BRAND_DEFAULTS[Math.floor(Math.random() * BRAND_DEFAULTS.length)]
const paymentMethodSort = () => PAYMENT_METHOD_DEFATULS[Math.floor(Math.random() * PAYMENT_METHOD_DEFATULS.length)]
const statusPayament = () => STATUS_PAYMENT_DEFAULT[Math.floor(Math.random() * STATUS_PAYMENT_DEFAULT.length)]

faker.locale = 'pt_BR'

factory.define('Transaction', Transaction, {
  amount: faker.commerce.price(),
  cardNumber: creditcardGenerator.GenCC(brand())[0],
  cardHolderName: faker.name.findName().toUpperCase(),
  cardExpirationDate: moment(faker.date.future()).format('MMYY'),
  cardCvv: faker.random.number({ min: 0, max: 999, precision: 3 }),
  paymentMethod: paymentMethodSort(),
  descriptionTransaction: faker.commerce.productName()
})

factory.define('Client', Client, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  apiKey: faker.random.number()
})

factory.define('Payable', Payable, {
  status: statusPayament(),
  paymentDate: faker.date.future(),
  fee: faker.commerce.price()
})

module.exports = factory
