const { authorizer } = require('../../../src/middlewares')
const { factore, truncate } = require('../../utils')
const APIKEY = '123456789'

describe('Middleware: Authorizer', () => {
  beforeEach(async () => {
    await truncate()
  })
  afterEach(async () => {
    await truncate()
  })

  it('should authenticate user', async () => {
    await factore.create('Client', { apiKey: APIKEY })
    const next = jest.fn()
    const req = { headers: { 'api_key': APIKEY } }

    await authorizer()(req, null, next)

    expect(next).toBeCalled()
  })
  it('should return next error when not informad api_key', async () => {
    const next = jest.fn()
    const req = { headers: { 'api_key': '' } }

    await authorizer()(req, null, next)

    expect(next).toBeCalled()
  })
  it('should return next error when not found api_key', async () => {
    await factore.create('Client', { apiKey: APIKEY })
    const next = jest.fn()
    const req = { headers: { 'api_key': '987654321' } }

    await authorizer()(req, null, next)

    expect(next).toBeCalled()
  })
})
