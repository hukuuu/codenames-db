const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
  id: Schema.Types.ObjectId,
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
