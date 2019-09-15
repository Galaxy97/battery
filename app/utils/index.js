const schedule = require('node-schedule')
const services = require('../routes/dashboard/services')

const serverTimer = () => {
  schedule.scheduleJob('*/5 * * * * *', function () {
    let serverTime = services.getServerTime()
    services.performer(serverTime)
    console.log(serverTime)    
    serverTime += 0.5
    services.setServerTime(serverTime)
  })
}

module.exports = {
  serverTimer
}