'use strict'

const { expect } = require('chai')
const { ClientEvent } = require('./client_event')

const fakeTime = '2018-06-15 19:50:46.469+00'
const fakeFutureTime = {
  immediate: '2018-06-15 19:50:46.750+00',
  oneSec: '2018-06-15 19:50:47.469+00',
  nineSec: '2018-06-15 19:50:56.269+00',
  tenSec: '2018-06-15 19:50:56.669+00',
  thirtySec: '2018-06-15 19:51:16.669+00'
}

const fakeEvents = [{
  type: 'click',
  page: '/profile',
  target: 'edit-profile',
  time: Date.now(),
  ip: '1.1.1.1',
  userAgent: 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
  userId: 1,
  createdAt: fakeTime
}, {
  type: 'click',
  page: '/profile',
  target: 'edit-profile',
  time: Date.now(),
  ip: '2.1.1.1',
  userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36',
  userId: 2,
  createdAt: fakeTime
}, {
  type: 'click',
  page: '/profile',
  target: 'edit-profile',
  time: Date.now(),
  ip: '3.1.1.1',
  userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36 OPR/38.0.2220.41',
  userId: 3,
  createdAt: fakeTime
}, {
  type: 'click',
  page: '/profile',
  target: 'edit-profile',
  time: Date.now(),
  ip: '4.1.1.1',
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1',
  userId: 4,
  createdAt: fakeTime
}, {
  type: 'click',
  page: '/profile',
  target: 'edit-profile',
  time: Date.now(),
  ip: '5.1.1.1',
  userAgent: 'Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0)',
  userId: 5,
  createdAt: fakeTime
}, {
  type: 'click',
  page: '/',
  target: 'search',
  time: Date.now(),
  ip: '6.1.1.1',
  userAgent: 'Googlebot/2.1 (+http://www.google.com/bot.html)',
  userId: 6,
  createdAt: fakeTime
}]

describe('Client Events model', () => {
  beforeEach(() => {
    return Promise.all(fakeEvents.map(fakeEvent => {
      return ClientEvent.create({...fakeEvent})
    }))
  })

  describe('timeData instance method', () => {
    it('returns the number of seconds since the timestamp passed in as an argument', async () => {
      const user = await ClientEvent.findOne({
        where: { userId: 1 }
      })
      expect(user.timeData(fakeFutureTime.immediate)).to.be.equal(0)
      expect(user.timeData(fakeFutureTime.oneSec)).to.be.equal(1)
      expect(user.timeData(fakeFutureTime.nineSec)).to.be.equal(9)
      expect(user.timeData(fakeFutureTime.tenSec)).to.be.equal(10)
      expect(user.timeData(fakeFutureTime.thirtySec)).to.be.equal(30)
    })
  })

  describe('returnData class method', () => {
    it('returns an object with a data array', async () => {
      const result = await ClientEvent.returnData(fakeFutureTime.oneSec)
      expect(result.eventData).to.be.an('array')
      expect(result.eventData.length).to.be.equal(60)
    })

    it('the object also contains a latestFetch string', async () => {
      const result = await ClientEvent.returnData(fakeFutureTime.oneSec)
      expect(result.latestFetch).to.be.an('string')
    })
  })

  describe('browser getter method', () => {
    it('returns Firefox if userAgent contains Firefox', async () => {
      const user = await ClientEvent.findOne({
        where: { userId: 1 }
      })
      expect(user.browser).to.be.equal('firefox')
    })

    it('returns Chrome if userAgent contains Chrome but not OPR', async () => {
      const user = await ClientEvent.findOne({
        where: { userId: 2 }
      })
      expect(user.browser).to.be.equal('chrome')
    })

    it('returns Opera if userAgent contains OPR', async () => {
      const user = await ClientEvent.findOne({
        where: { userId: 3 }
      })
      expect(user.browser).to.be.equal('opera')
    })

    it('returns Safari if userAgent contains Safari but not Chrome', async () => {
      const user = await ClientEvent.findOne({
        where: { userId: 4 }
      })
      expect(user.browser).to.be.equal('safari')
    })

    it('returns Internet Explorer if userAgent contains MSIE', async () => {
      const user = await ClientEvent.findOne({
        where: { userId: 5 }
      })
      expect(user.browser).to.be.equal('ie')
    })

    it('returns Bot if userAgent contains bot', async () => {
      const user = await ClientEvent.findOne({
        where: { userId: 6 }
      })
      expect(user.browser).to.be.equal('bot')
    })
  })

  describe('returnDataBrowser class method', () => {
    it('returns an object with a data object', async () => {
      const result = await ClientEvent.returnDataBrowser(fakeFutureTime.oneSec)
      expect(result.eventData).to.be.an('object')
      expect(Object.keys(result.eventData).length).to.be.equal(7)
    })

    it('each element in data object is an array', async () => {
      const result = await ClientEvent.returnDataBrowser(fakeFutureTime.oneSec)
      expect(result.eventData.ie).to.be.an('array')
      expect(result.eventData.ie.length).to.be.equal(60)
    })

    it('each element in those arrays have two keys', async () => {
      const result = await ClientEvent.returnDataBrowser(fakeFutureTime.oneSec)
      expect(result.eventData.ie[0]).to.be.an('object')
      expect(result.eventData.ie[0].seconds).to.be.equal(0)
      expect(result.eventData.ie[0].events).to.be.equal(0)
    })

    it('the response object also contains a latestFetch string', async () => {
      const result = await ClientEvent.returnData(fakeFutureTime.oneSec)
      expect(result.latestFetch).to.be.an('string')
    })
  })
})
