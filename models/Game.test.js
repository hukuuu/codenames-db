const chai = require('chai')
const expect = chai.expect
const Game = require('./Game')

const mongoose = require('mongoose')

const sinon = require('sinon')
const sinonTest = require('sinon-test')(sinon)

describe('Game test', () => {
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

  it('should save a game', async () => {
    const game = new Game()
    await game.save()
    const found = await Game.findOne()
    expect(found).not.to.be.null
  })

  it('should delete game', async () => {
    const game = await Game.findOne()
    expect(game).not.to.be.null
    await Game.remove({ _id: game._id })
    const found = await Game.find()
    expect(found.length).to.equal(0)
  })

  describe('Cards', () => {
    it('should have default length of 0', async () => {
      const game = new Game()
      expect(game.cards).to.be.instanceof(Array)
      expect(game.cards.length).to.equal(0)
    })
    it('should have maximum length of 25', async () => {
      let error
      try {
        const game = new Game({
          cards: Array(26).fill({})
        })
        await game.save()
      } catch (e) {
        error = e
      }
      expect(error).to.be.ok
    })
  })

  describe('Turn', () => {
    it('should have default value of 0', async () => {
      const game = new Game()
      expect(game.turn).to.equal(0)
    })

    it('should be minimum 0', async () => {
      const game = new Game({ turn: -1 })
      let error
      try {
        await game.save()
      } catch (e) {
        error = e
      }
      expect(error).to.be.ok
    })

    it('should be maximum 3', async () => {
      const game = new Game({ turn: 4 })
      let error
      try {
        await game.save()
      } catch (e) {
        error = e
      }
      expect(error).to.be.ok
    })
  })
})
