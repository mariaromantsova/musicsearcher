const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  // googleId: { type: String, default: undefined },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now },
  lastLoginDate: { type: Date, default: Date.now },
  status: { type: String, default: 'Active' },
  albums : { type : Array , default: [] }
})

module.exports = model('User', schema)
