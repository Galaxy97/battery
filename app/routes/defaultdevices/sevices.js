const defaultDevices = require('./models/modelServices')

const addDevice = (req, res) => {
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
  addDevice,
  findDevice
}