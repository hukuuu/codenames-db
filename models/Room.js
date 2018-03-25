const createModel = require('./createModel')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoomSchema = Schema({
  id: Schema.Types.ObjectId,
  players: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

RoomSchema.methods.addPlayer = function(user) {
  this.players.push(user)
  return this.save()
}

RoomSchema.methods.removePlayer = function(user) {
  this.players = this.players.filter(u => u != user)
  return this.save()
}

module.exports = createModel('Room', RoomSchema)
