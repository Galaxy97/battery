const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

const defaultSchema = mongoose.Schema({
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

defaultSchema.set('toJSON', {
  virtuals: true
})
defaultSchema.index({
  devices: 'text',
  entety: 'text',
  breand: 'text'
})

const userDevicesShema = mongoose.Schema({
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
  },
  status: {
    type: String,
    require: true
  },
  battery: {
    type: Number,
    require: true
  },
  timeChargin: {
    type: Number,
    require: true
  },
  timeDischargin: {
    type: Number,
    require: true
  }

})

const defaultDevices = mongoose.model('defaultDevices', defaultSchema)
const userDevices = mongoose.model('userDevices', userDevicesShema)
module.exports = {
  defaultDevices,
  userDevices
}