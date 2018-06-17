'use strict'

const { expect } = require('chai')
const request = require('supertest')
const app = require('../index')
const { ClientEvent } = require('../db/models')

const fakeEvents = [{
  type: 'click',
  page: '/profile',
  target: 'edit-profile',
  time: Date.now(),
  ip: '1.1.1.1',
  userAgent: 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
  userId: 1,
  createdAt: '2018-06-15 19:49:54.469+00'
}, {
  type: 'click',
  page: '/profile',
  target: 'edit-profile',
  time: Date.now(),
  ip: '1.1.1.1',
  userAgent: 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
  userId: 1,
  createdAt: '2018-06-15 19:50:34.469+00'
}]

const fakeFutureEvents = [{
  type: 'click',
  page: '/profile',
  target: 'edit-profile',
  time: Date.now(),
  ip: '1.1.1.1',
  userAgent: 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
  userId: 2,
  createdAt: '2018-06-15 19:49:45.469+00'
}, {
  type: 'click',
  page: '/profile',
  target: 'edit-profile',
  time: Date.now(),
  ip: '1.1.1.1',
  userAgent: 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
  userId: 2,
  createdAt: '2018-06-15 19:49:46.469+00'
}]

const fakeTime = '2018-06-15 19:50:46.469+00'
const fakeFutureTime = '2018-06-15 19:50:47.469+00'

describe('Client Events routes', () => {
  describe('/api/events', () => {
    it('GET /api/events returns an array of events', async () => {
      await ClientEvent.create(fakeEvents[0])
      return request(app)
        .get('/api/events')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].browser).to.be.equal('Firefox')
        })
    })

    it('GET /api/events/:eventId returns a single event', async () => {
      await ClientEvent.create(fakeEvents[0])
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
        .send(fakeEvents[0])
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.type).to.be.equal('click')
        })
    })
  })

  describe('POST /api/events/data', () => {
    beforeEach(() => {
      return Promise.all(fakeEvents.map(fakeEvent => {
        return ClientEvent.create({...fakeEvent})
      }))
    })

    it('returns an object with a data array', () => {
      return request(app)
        .post('/api/events/data')
        .send({ latestFetch: fakeTime })
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.data).to.be.an('array')
        })
    })

    it('also returns a latestFetch string with the object', () => {
      return request(app)
        .post('/api/events/latest')
        .send({ latestFetch: fakeTime })
        .expect(200)
        .then(res => {
          expect(res.body.latestFetch).to.be.a('string')
        })
    })
  })

  describe('POST /api/events/latest', () => {
    beforeEach(() => {
      return Promise.all(fakeEvents.map(fakeEvent => {
        return ClientEvent.create({...fakeEvent})
      }))
    })

      it('returns an object with an events array', () => {
        return request(app)
          .post('/api/events/latest')
          .send({ latestFetch: fakeTime })
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('object')
            expect(res.body.events).to.be.an('array')
            expect(res.body.events[0].type).to.be.equal('click')
          })
      })

      it('does not return events from over 60 seconds prior', async () => {
        await ClientEvent.create(fakeFutureEvents[0])
        return request(app)
          .post('/api/events/latest')
          .send({ latestFetch: fakeTime })
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('object')
            expect(res.body.events).to.be.an('array')
            expect(res.body.events.length).to.be.equal(2)
          })
      })

      it('does not include events from exactly 60 seconds prior either', async () => {
        await ClientEvent.create(fakeFutureEvents[1])
        return request(app)
          .post('/api/events/latest')
          .send({ latestFetch: fakeTime })
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('object')
            expect(res.body.events).to.be.an('array')
            expect(res.body.events.length).to.be.equal(2)
          })
      })

      it('also returns a latestFetch string with the object', () => {
        return request(app)
          .post('/api/events/latest')
          .send({ latestFetch: fakeTime })
          .expect(200)
          .then(res => {
            expect(res.body.latestFetch).to.be.a('string')
          })
      })

      it('increments the latestFetch string by one second', () => {
        return request(app)
          .post('/api/events/latest')
          .send({ latestFetch: fakeTime })
          .expect(200)
          .then(res => {
            expect(res.body.latestFetch).to.be.equal(fakeFutureTime)
          })
      })
    })
    describe('The above route also', () => {
      it('contains a value on each event for number of seconds since timestamp', async () => {
        await ClientEvent.create(fakeEvents[0])
        return request(app)
          .post('/api/events/latest')
          .send({ latestFetch: fakeTime })
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('object')
            expect(res.body.events).to.be.an('array')
            expect(res.body.events.length).to.be.equal(1)
            expect(res.body.events[0].timeElapsed).to.be.equal(52)
          })
      })
      it('increments latestFetch even if no instances are found', () => {
        return request(app)
          .post('/api/events/latest')
          .send({ latestFetch: fakeTime })
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('object')
            expect(res.body.events).to.be.an('array')
            expect(res.body.events[0]).to.be.equal(undefined)
            expect(res.body.latestFetch).to.be.a('string')
            expect(res.body.latestFetch).to.be.equal(fakeFutureTime)
          })
      })
    })
})
