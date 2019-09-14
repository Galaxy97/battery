require('./db/database')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const demo = require('./routes/demo/routes')
const defaultdevices = require('./routes/defaultdevices/routes')
const dashboard = require('./routes/dashboard/routes')
const utils = require('./utils/index')
const images = require('./routes/images/routes')

app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', demo)
app.use('/defaultdevices', defaultdevices)
app.use('/dashboard', dashboard)
app.use('/images', images)

// utils.serverTimer()

console.log(`
***********************************************
*********  Server is ready for usage  *********
***********************************************
***********************************************
`)

module.exports = app