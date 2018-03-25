const createModel = require('./createModel')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GameSchema = Schema({
  id: Schema.Types.ObjectId,
  cards: {
    type: [
      {
        cardType: Number,
        text: String,
        revealed: Boolean
      }
    ],
    validate: [arr => arr.length <= 25, '{PATH} exceeds the limit of 25']
  },
  turn: {
    type: Number,
    default: 0,
    min: 0,
    max: 3
  }
})

module.exports = createModel('Game', GameSchema)
