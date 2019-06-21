const request = require('supertest')
const app = require('../../src/config/app')
const { factore, truncate } = require('../utils')
const APIKEY = 123456789

describe('API: Transactions', () => {
  let client = null
  beforeEach(async () => {
    await truncate()
    client = await factore.create('Client', { apiKey: APIKEY })
  })
  afterEach(async () => {
    await truncate()
  })

  describe('GET /api/v1/transactions', () => {
    it('should exist router', async () => {
      const response = await request(app)
        .get('/api/v1/transactions')
        .set('api_key', APIKEY)

      expect(response.notFound).toBeFalsy()
    })
    it('should response with status 200', async () => {
      const response = await request(app)
        .get('/api/v1/transactions')
        .set('api_key', APIKEY)

      expect(response.status).toBe(200)
    })
    it('should return list of transactions', async () => {
      const { id: clientId } = client
      await factore.create('Transaction', { clientId })
      const response = await request(app)
        .get('/api/v1/transactions')
        .set('api_key', APIKEY)

      expect(response.body).toHaveLength(1)
    })
  })
  describe('POST /api/v1/transactions', () => {
    it('should exist router', async () => {
      const response = await request(app)
        .post('/api/v1/transactions')
        .set('api_key', APIKEY)

      expect(response.notFound).toBeFalsy()
    })
    it('should response with status 201', async () => {
      const transaction = await factore.attrs('Transaction')
      const cardNumber = transaction.cardNumber.slice(-4).padStart(16, '0')
      const { id: clientId } = client
      const response = await request(app)
        .post('/api/v1/transactions')
        .set('api_key', APIKEY)
        .send(transaction)

      expect(response.status).toBe(201)
      expect(response.body.cardNumber).toEqual(cardNumber)
      expect(response.body.clientId).toBe(clientId)
    })
    it('should response with 400 when patmentMethod is not allowed', async () => {
      const transaction = await factore.attrs('Transaction', {
        paymentMethod: 'teste'
      })
      const response = await request(app)
        .post('/api/v1/transactions')
        .set('api_key', APIKEY)
        .send(transaction)

      expect(response.status).toBe(400)
      expect(response.body.type).toBe('validation_error')
    })
    it('should return erro when not informad field required', async () => {
      const transaction = await factore.attrs('Transaction')
      delete transaction.amount
      const response = await request(app)
        .post('/api/v1/transactions')
        .set('api_key', APIKEY)
        .send(transaction)

      expect(response.status).toBe(400)
      expect(response.body.type).toBe('validation_error')
      expect(response.body.message.includes('cannot be null')).toBeTruthy()
    })
  })
})
