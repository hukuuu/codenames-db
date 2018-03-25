const chai = require('chai')
const expect = chai.expect
const User = require('./User')
const Room = require('./Room')

const mongoose = require('mongoose')

const sinon = require('sinon')
const sinonTest = require('sinon-test')(sinon)

describe('Room test', () => {
  before(done => {
    mongoose.connect('mongodb://localhost/testDatabase')
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error'))
    db.once('open', function() {
      // console.log('We are connected to test database!')
      done()
    })
  })

  after(done => {
    mongoose.connection.db.dropDatabase(function() {
      mongoose.connection.close(done)
    })
  })

  describe('Room schema', function() {
    it('should save a room', async () => {
      await new Room({}).save()
    })

    it('should return all rooms as array', async () => {
      const rooms = await Room.find().exec()
      expect(rooms).to.be.instanceof(Array)
      expect(rooms.length).to.equal(1)
    })

    it('should add user', async () => {
      const someUser = new User({
        name: 'nikolay',
        nickname: 'huku'
      })
      const room = await Room.findOne()
      await room.addPlayer(someUser)
      expect(room.players).to.have.length(1)
      expect(room.players[0].name).to.equal('nikolay')
    })

    it('should remove user', async () => {
      const room = await Room.findOne()
      const playerToRemove = room.players[0]
      await room.removePlayer(playerToRemove)
      expect(room.players).to.have.length(0)
    })
  })
})
