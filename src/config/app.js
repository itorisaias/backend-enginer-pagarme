const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const routes = require('../api')

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())
app.use('/api', routes)

module.exports = app
