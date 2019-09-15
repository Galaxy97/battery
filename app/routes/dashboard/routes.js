const express = require('express')
const services = require('./services')
const router = express.Router()

router.get('/all', (req, res) => {
    services.showAll(req, res)
})

router.get('/device/chargin', (req, res) => {
    services.putOnCharge(req, res)
})

module.exports = router