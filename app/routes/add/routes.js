const express = require('express')
const services = require('./sevices')
const router = express.Router()

router.post('/', (req, res) => {
    services.addDevice(req, res)
})
router.get('/', (req, res) => {
    services.findDevice(req, res)
})

module.exports = router