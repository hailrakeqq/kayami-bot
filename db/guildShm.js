const mongoose = require('mongoose')
const cfg = require('../config.json')
module.exports = mongoose.model('Guild', new mongoose.Schema({
  id: { type: String, default: `` },
  modRoles: { type: Array, default: [] },
  prefix: { type: String, default: cfg.prefix }
}))