require('./db/database')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const demo = require('./routes/demo/routes')
const defaultdevices = require('./routes/defaultdevices/routes')
const dashboard = require('./routes/dashboard/routes')

app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', demo)
app.use('/defaultdevices', defaultdevices)
app.use('/dashboard', dashboard)

console.log(`
***********************************************
*********  Server is ready for usage  *********
***********************************************
***********************************************
`)

module.exports = app