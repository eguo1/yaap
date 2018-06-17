'use strict'

const { expect } = require('chai')
const request = require('supertest')
const app = require('../index')
const { ClientEvent } = require('../db/models')

const fakeEvent = {
  type: 'click',
  page: '/profile',
  target: 'edit-profile',
  time: Date.now(),
  ip: '1.1.1.1',
  userAgent: 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
  userId: 1
}

describe('Client Events routes', () => {
  describe('/api/events', () => {
    it('GET /api/events returns an array of events', async () => {
      await ClientEvent.create(fakeEvent)
      return request(app)
        .get('/api/events')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].browser).to.be.equal('Firefox')
        })
    })

    it('GET /api/events/:eventId returns a single event', async () => {
      await ClientEvent.create(fakeEvent)
      return request(app)
        .get('/api/events/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.browser).to.be.equal('Firefox')
        })
    })

    it('POST /api/events adds a new event', () => {
      return request(app)
        .post('/api/events')
        .send(fakeEvent)
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.type).to.be.equal('click')
        })
    })
  })

  describe('POST /api/events/latest', () => {
    beforeEach(() => {
      return ClientEvent.create(fakeEvent)
    })
      it('returns an object with an events array', () => {
        return request(app)
          .post('/api/events/latest')
          .send({ latestFetch: '2018-06-15 19:50:46.469+00' })
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('object')
            expect(res.body.events).to.be.an('array')
            expect(res.body.events[0].type).to.be.equal('click')
          })
      })

      it('also returns a latestFetch string with the object', () => {
        return request(app)
          .post('/api/events/latest')
          .send({ latestFetch: '2018-06-15 19:50:46.469+00' })
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('object')
            expect(res.body.latestFetch).to.be.a('string')
          })
      })
    })
})
