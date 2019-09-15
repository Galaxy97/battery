const fs = require('fs')
const userDevices = require('../defaultdevices/models/modelServices').userDevices
const axios = require('axios')
const telegramBot = require('node-telegram-bot-api')

const token = '934121651:AAFnPJPQerdbvkGSQW6mW9bk0QTxbbghouA'

const bot = new telegramBot(token, { polling: true })
const userid = '374144926'

const showAll = (req, res) => {
  userDevices.find({})
    .then((data) => {
      res.json(data)
    })
    .catch(err => {
      res.status(404).json(err.message)
    })
}

const getServerTime = () => {
  try {
    const jsonData = JSON.parse(fs.readFileSync('./app/db/db.json', 'utf8'))
    return jsonData.serverTime
  } catch (error) {
    return error
  }
}

const setServerTime = (jsonData) => {
  const data = {
    serverTime: jsonData
  }
  fs.writeFile('./app/db/db.json', JSON.stringify(data, null, 4), (error) => {
    if (error) {
      throw error
    }
  })
}

const performer = (serverTime) => {
  userDevices.find({})
    .then((data) => {
      data.forEach(element => {
        console.log(element.status)
        if (element.status === 'discharged') {
          if (element.timeDischargin === serverTime) {
            element.status = 'need chargin'
            element.battery = 0
            eventCharge(element.breand + ' ' + element.model, element.id)
            console.log('user message chargin')
            userDevices.updateOne({ _id: element.id },
              {
                status: element.status,
                battery: element.battery
              })
              .catch((e) => {
                console.error(e)
              })
          } else {
            element.battery = ((element.timeDischargin - serverTime) / element.dischargin) * 100
            userDevices.updateOne({ _id: element.id },
              {
                battery: element.battery
              })
              .catch((e) => {
                console.error(e)
              })
          }
        } else if (element.status === 'charged') {
          if (element.timeChargin === serverTime) {
            element.status = 'need stop chargin'
            // req to user messanger
            element.battery = 100
            eventDisCharge(element.breand + ' ' + element.model, element.id)
            console.log('user message chargin')
            userDevices.updateOne({ _id: element.id },
              {
                status: element.status,
                battery: element.battery
              })
              .catch((e) => {
                console.error(e)
              })
          } else {
            element.battery = (1 - ((element.timeChargin - serverTime) / element.chargin)) * 100
            userDevices.updateOne({ _id: element.id },
              {
                battery: element.battery
              })
              .catch((e) => {
                console.error(e)
              })
          }
        }
      })
    })
    .catch(err => {
      console.error(err)
    })
}

const eventCharge = (name, id) => {
  const options = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{
          text: 'Put on charge', callback_data: 'on' + id
        }]
      ]
    })
  }
  bot.sendMessage(userid, `To be careful!!! Your device ${name} is low power`, options)
}
const eventDisCharge = (name, id) => {
  const options = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{
          text: 'take off the charge', callback_data: 'of' + id
        }]
      ]
    })
  }
  bot.sendMessage(userid, `Сongratulations!!! Your device ${name} have fuul power`, options)
}

bot.on('callback_query', function (msg) {
  if (msg.data.slice(0, 2) === 'on') {
    const _id = msg.data.slice(2)
    const serverTime = getServerTime()
    userDevices.findOne({ _id: _id }, function (err, data) {
      if (err) {
        console.error(err)
      } else {
        timeChargin = serverTime + data.chargin
        timeDischargin = null
        const status = 'charged'
        userDevices.updateOne({
          status,
          timeChargin,
          timeDischargin
        })
          .catch((e) => {
            console.error(e)
          })
      }
    })
  } else if (msg.data.slice(0, 2) === 'of') {
    const id = msg.data.slice(2)
    const serverTime = getServerTime()
    userDevices.findOne({ _id: id }, function (err, data) {
      if (err) {
        console.error(err)
      } else {
        timeDischargin = serverTime + data.dischargin
        timeChargin = null
        const status = 'discharged'
        userDevices.updateOne({
          status,
          timeChargin,
          timeDischargin
        })
          .catch((e) => {
            console.error(e)
          })
      }
    })
  }
})

const putOnCharge = (req, res) => {

}

module.exports = {
  showAll,
  getServerTime,
  setServerTime,
  performer,
  putOnCharge,
  eventCharge
}
