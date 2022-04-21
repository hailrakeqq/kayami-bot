const mongoose = require('mongoose')

module.exports = mongoose.model('Member', new mongoose.Schema({
    id: { type: String, default: `` },
    guild: { type: String, default: `` },
    registeredAt: { type: Number, default: Date.now() }
}))