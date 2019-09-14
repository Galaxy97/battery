const express = require('express')
const services = {
    default: require('./sevices'),
    dashboard: require('../dashboard/services')
}
const router = express.Router()

router.post('/', (req, res) => {
    services.default.addNewDevice(req, res)
})

router.get('/find', (req, res) => {
    services.default.findDevice(req, res)
})

router.post('/device', (req, res) => {
    const serverTime = services.dashboard.getServerTime()
    services.default.addDevice(req, res, serverTime)
})

module.exports = router