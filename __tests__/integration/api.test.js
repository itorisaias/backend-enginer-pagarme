const request = require('supertest')
const app = require('../../src/config/app')
const { factore, truncate } = require('../utils')
describe('API: Transactions', () => {
  beforeEach(async () => {
    await truncate()
    await factore.create('Client', { apiKey: '123456789' })
  })
  afterEach(async () => {
    await truncate()
  })

  describe('GET /api/v1/transactions', () => {
    it('should exist router', async () => {
      const response = await request(app)
        .get('/api/v1/transactions')
        .set('api_key', '123456789')

      expect(response.notFound).toBeFalsy()
    })
    it('should response with status 200', async () => {
      const response = await request(app)
        .get('/api/v1/transactions')
        .set('api_key', '123456789')

      expect(response.status).toBe(200)
    })
  })
  describe('POST /api/v1/transactions', () => {
    it('should exist router', async () => {
      const response = await request(app)
        .post('/api/v1/transactions')
        .set('api_key', '123456789')

      expect(response.notFound).toBeFalsy()
    })
    it('should response with status 201', async () => {
      const transaction = await factore.attrs('Transaction')
      const cardNumber = transaction.cardNumber.slice(-4).padStart(16, '0')
      const response = await request(app)
        .post('/api/v1/transactions')
        .set('api_key', '123456789')
        .send(transaction)

      expect(response.status).toBe(201)
      expect(response.body.cardNumber).toEqual(cardNumber)
    })
    it('should response with 400 when patmentMethod is not allowed', async () => {
      const transaction = await factore.attrs('Transaction', {
        paymentMethod: 'teste'
      })
      const response = await request(app)
        .post('/api/v1/transactions')
        .set('api_key', '123456789')
        .send(transaction)

      expect(response.status).toBe(400)
      expect(response.body.type).toBe('validation_error')
    })
    it('should return erro when not informad field required', async () => {
      const transaction = await factore.attrs('Transaction')
      delete transaction.amount
      const response = await request(app)
        .post('/api/v1/transactions')
        .set('api_key', '123456789')
        .send(transaction)

      expect(response.status).toBe(400)
      expect(response.body.type).toBe('validation_error')
      expect(response.body.message.includes('cannot be null')).toBeTruthy()
    })
  })
})
