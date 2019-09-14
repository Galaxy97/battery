const express = require('express')
const services = require('./services')
const router = express.Router()

router.get('/all', (req, res) => {
    services.showAll(req, res)
})

module.exports = router