const mongoose = require('mongoose')
const config = require('../../config.json');

module.exports = mongoose.model('Guild', new mongoose.Schema({
  id: {
    type: String
  },
  registeredAt: {
    type: Number,
    default: Date.now()
  },
  prefix: {
    type: String,
    default: config.prefix
  },

}))