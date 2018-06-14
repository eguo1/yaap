'use strict'

const { expect } = require('chai')
const request = require('supertest')
const { db } = require('../db')
const app = require('../index')
const { ClientEvent } = require('../db/models')

describe('Client Events routes', () => {

  describe('/api/events', () => {

    const fakeEvent = {
      type: 'click',
      page: '/profile',
      target: 'edit-profile',
      time: Date.now(),
      userAgent: 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
      userId: 1
    }

    afterEach(() => {
      return db.sync({ force: true })
    })

    it('GET /api/events returns an array of events', async () => {
      await ClientEvent.create({...fakeEvent})
      return request(app)
        .get('/api/events')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].browser).to.be.equal('Firefox')
        })
    })

  })
})
