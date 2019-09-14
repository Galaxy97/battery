const defaultDevices = require('./models/modelServices').defaultDevices
const userDevices = require('./models/modelServices').userDevices
// const moment = require('moment')
// moment().format()

const addNewDevice = (req, res) => {
  new defaultDevices({
    devices: req.body.devices,
    entety: req.body.entety,
    breand: req.body.breand,
    model: req.body.model,
    icon: req.body.icon,
    chargin: req.body.chargin,
    dischargin: req.body.dischargin

  }).save()
    .then(() => {
      res.status(200).send('Successfully added')
    })
    .catch((err) => {
      return next(new RequestError(400, err))
    })
}
const addDevice = (req, res, serverTime) => {
  defaultDevices.findById(req.body.id, (err, data) => {
    if (err) {
      res.status(404).json(err.message)
    } else {
      new userDevices({
        breand: data.breand,
        model: data.model,
        icon: data.icon,
        chargin: data.chargin,
        dischargin: data.dischargin,
        status: 'discharged',
        battery: 100,
        timeDischargin:serverTime + data.dischargin,
        timeChargin: null
      }).save()
        .then(() => {
          res.status(200).send('Successfully added')
        })
        .catch((err) => {
          throw err
        })
    }
  })
}

const findDevice = (req, res) => {
  if (req.query.devices) {
    defaultDevices.find({ 'devices': { '$regex': req.query.devices } },
      function (err, data) {
        if (!err) {
          res.status(200).json({ devices: data })
        } else {
          res.status(404).json(err.message)
        }
      })
  } else if (req.query.breand) {
    defaultDevices.find({ 'breand': { '$regex': req.query.breand } },
      function (err, data) {
        if (!err) {
          res.status(200).json({ devices: data })
        } else {
          res.status(404).json(err.message)
        }
      })
  } else if (req.query.id) {
    defaultDevices.findById(req.query.id, (err, data) => {
      if (!err) {
        res.status(200).json({ device: data })
      } else {
        res.status(404).json(err.message)
      }
    })
  }
}

module.exports = {
  addNewDevice,
  addDevice,
  findDevice
}