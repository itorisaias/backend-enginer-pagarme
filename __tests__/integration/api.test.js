const request = require('supertest')
const app = require('../../src/config/app')
const factore = require('../utils/factore')

describe('API: Transactions', () => {
  describe('GET /api/v1/transactions', () => {
    it('should exist router', async () => {
      const response = await request(app)
        .get('/api/v1/transactions')

      expect(response.notFound).toBeFalsy()
    })
    it('should response with status 200', async () => {
      const response = await request(app)
        .get('/api/v1/transactions')

      expect(response.status).toBe(200)
    })
  })
  describe('POST /api/v1/transactions', () => {
    it('should exist router', async () => {
      const response = await request(app)
        .post('/api/v1/transactions')

      expect(response.notFound).toBeFalsy()
    })
    it('should response with status 201', async () => {
      const transaction = await factore.attrs('Transaction')
      const cardNumber = transaction.card_number.slice(-4).padStart(16, '0')
      const response = await request(app)
        .post('/api/v1/transactions')
        .send(transaction)

      expect(response.status).toBe(201)
      expect(response.body.card_number).toEqual(cardNumber)
    })
  })
})
