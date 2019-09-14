const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

const schema = mongoose.Schema({
  devices: {
    type: String,
    require: true
  },
  entety: {
    type: String,
    require: true
  },
  breand: {
    type: String,
    require: true
  },
  model: {
    type: String,
    require: true
  },
  icon: {
    type: String,
    require: true
  },
  chargin: {
    type: Number,
    require: true
  },
  dischargin: {
    type: Number,
    require: true
  }
})

schema.set('toJSON', {
  virtuals: true
})
schema.index({
  devices: 'text',
  entety: 'text',
  breand: 'text'
})

const defaultDevices = mongoose.model('defaultDevices', schema)
module.exports = defaultDevices