const fs = require('fs')
const userDevices = require('../defaultdevices/models/modelServices').userDevices

const showAll = () => {
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

module.exports = {
  showAll,
  getServerTime,
  setServerTime
}
