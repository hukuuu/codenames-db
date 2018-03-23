const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
  id: Number,
  name: String,
  nickname: String
})

let model
try {
  model = mongoose.model('User')
} catch (e) {
  model = mongoose.model('User', UserSchema)
}

module.exports = model
