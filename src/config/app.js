const path = require('path')
const swaggerUi = require('swagger-ui-express')
const express = require('express')
const helmet = require('helmet')
const YAML = require('yamljs')
const cors = require('cors')

const routes = require('../api')

const pahtSwagger = path.join(__dirname, './swagger', 'swagger.yaml')
const swaggerDocument = YAML.load(pahtSwagger)
const app = express()

app.use(cors())
app.use(helmet())
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/api', routes)

module.exports = app
