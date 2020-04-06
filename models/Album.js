const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  album: { type: Object, default: {} },
  likedBy: { type: Array, default: [] }
})

module.exports = model('Album', schema)
