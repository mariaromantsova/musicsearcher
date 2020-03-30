const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  token: { type: String },
  googleId: { type: String },
  spotifyId: { type: String },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: false },
  password: { type: String },
  registrationDate: { type: Date, default: Date.now },
  lastLoginDate: { type: Date, default: Date.now },
  status: { type: String, default: 'Active' },
  albums : { type : Array , default: [] }
})

module.exports = model('User', schema)
