const chai = require('chai')
const expect = chai.expect
const User = require('./User')

const mongoose = require('mongoose')

const sinon = require('sinon')
const sinonTest = require('sinon-test')(sinon)

describe('Mongoose tests', () => {
  before(done => {
    mongoose.connect('mongodb://localhost/testDatabase')
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error'))
    db.once('open', function() {
      console.log('We are connected to test database!')
      done()
    })
  })

  after(done => {
    mongoose.connection.db.dropDatabase(function() {
      mongoose.connection.close(done)
    })
  })

  describe('Get all users', function() {
    it(
      'should return all users as array',
      sinonTest(function() {
        User.find((err, result) => {
          expect(err).to.be.null
          expect(result).to.be.instanceof(Array)
          expect(result.length).to.equal(0)
        })
      })
    )
  })

  describe('Create user', function() {
    it(
      'should save a user',
      sinonTest(async function() {
        await new User({
          name: 'ivan',
          nickname: 'ivancho'
        }).save()
        const users = await User.find().exec()
        expect(users).to.be.instanceof(Array)
        expect(users).to.have.length(1)
        expect(users[0]).to.have.property('name')
        expect(users[0].name).to.equal('ivan')
      })
    )
  })
})
