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
  defaultDevices.find({ 'breand': { '$regex': req.query.key } },
    function (err, docs) {
      if (!err) {
        res.status(200).json({ tasks: docs })
      } else {
        res.status(404).json(err.message)
      }
    })
}

module.exports = {
  addDevice,
  findDevice
}