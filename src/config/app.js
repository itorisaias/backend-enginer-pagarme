const path = require('path')
const swaggerUi = require('swagger-ui-express')
const express = require('express')
const helmet = require('helmet')
const YAML = require('yamljs')
const cors = require('cors')

const routes = require('../api')
const {
  handleError,
  authorizer,
  logging
} = require('../middlewares')

const pahtSwagger = path.join(__dirname, './swagger', 'swagger.yaml')
const swaggerDocument = YAML.load(pahtSwagger)
const app = express()

app.use(cors())
app.use(logging())
app.use(helmet())
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(authorizer())
app.use('/api', routes)
app.use(handleError())

module.exports = app
