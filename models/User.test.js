const chai = require('chai')
const expect = chai.expect
const User = require('./User')

// const mongoose = require('mongoose')

const sinon = require('sinon')
const sinonTest = require('sinon-test')(sinon)

describe('Get all users', function() {
  it(
    'should return all users as array',
    sinonTest(function() {
      const expectedResult = [
        {
          id: 1,
          name: 'Nikolay Karadzhov',
          nickname: 'niki'
        }
      ]
      var UserMock = this.mock(User)
        .expects('find')
        .yields(null, expectedResult)

      User.find((err, result) => {
        expect(err).to.be.null
        expect(result).to.be.instanceof(Array)
        expect(result.length).to.equal(1)
        expect(result[0].id).to.equal(1)
        expect(result[0].name).to.equal('Nikolay Karadzhov')
        expect(result[0].nickname).to.equal('niki')
      })
    })
  )
})
