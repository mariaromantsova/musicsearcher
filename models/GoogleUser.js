const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  username: { type: String },
  googleId: { type: String }
})

module.exports = model('GoogleUser', schema)
