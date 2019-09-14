require('./db/database')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const demo = require('./routes/demo/routes')
const add = require('./routes/add/routes')
const dashboard = require('./routes/dashboard/routes')

app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', demo)
app.use('/add', add)
app.use('/dashboard', dashboard)

console.log(`
***********************************************
*********  Server is ready for usage  *********
***********************************************
***********************************************
`)

module.exports = app