const schedule = require('node-schedule')
const services = require('../routes/dashboard/services')

const serverTimer = () => {
  schedule.scheduleJob('*/5 * * * * *', function () {
    let serverTime = services.getServerTime()
    serverTime++
    services.setServerTime(serverTime)
  })
}

module.exports = {
  serverTimer
}