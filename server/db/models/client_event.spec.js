'use strict'

const { expect } = require('chai')
const { ClientEvent } = require('./client_event')

const fakeEvents = [{
  type: 'click',
  page: '/profile',
  target: 'edit-profile',
  time: Date.now(),
  userAgent: 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
  userId: 1
}, {
  type: 'click',
  page: '/profile',
  target: 'edit-profile',
  time: Date.now(),
  userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36',
  userId: 2
}, {
  type: 'click',
  page: '/profile',
  target: 'edit-profile',
  time: Date.now(),
  userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36 OPR/38.0.2220.41',
  userId: 3
}, {
  type: 'click',
  page: '/profile',
  target: 'edit-profile',
  time: Date.now(),
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1',
  userId: 4
}, {
  type: 'click',
  page: '/profile',
  target: 'edit-profile',
  time: Date.now(),
  userAgent: 'Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0)',
  userId: 5
}, {
  type: 'click',
  page: '/',
  target: 'search',
  time: Date.now(),
  userAgent: 'Googlebot/2.1 (+http://www.google.com/bot.html)',
  userId: 6
}]

describe('Client Events model', () => {
  describe('Browser method', () => {

    beforeEach(() => {
      return Promise.all(fakeEvents.map(fakeEvent => {
        return ClientEvent.create({...fakeEvent})
      }))
    })

    it('returns Firefox if userAgent contains Firefox', async () => {
      const userOne = await ClientEvent.findOne({
        where: { userId: 1 }
      })
      expect(userOne.browser).to.be.equal('Firefox')
    })

    it('returns Chrome if userAgent contains Chrome but not OPR', async () => {
      const userOne = await ClientEvent.findOne({
        where: { userId: 2 }
      })
      expect(userOne.browser).to.be.equal('Chrome')
    })

    it('returns Opera if userAgent contains OPR', async () => {
      const userOne = await ClientEvent.findOne({
        where: { userId: 3 }
      })
      expect(userOne.browser).to.be.equal('Opera')
    })

    it('returns Safari if userAgent contains Safari but not Chrome', async () => {
      const userOne = await ClientEvent.findOne({
        where: { userId: 4 }
      })
      expect(userOne.browser).to.be.equal('Safari')
    })

    it('returns Internet Explorer if userAgent contains Windows', async () => {
      const userOne = await ClientEvent.findOne({
        where: { userId: 5 }
      })
      expect(userOne.browser).to.be.equal('Internet Explorer')
    })

    it('returns Bot if userAgent doesn\'t contain any of the above', async () => {
      const userOne = await ClientEvent.findOne({
        where: { userId: 6 }
      })
      expect(userOne.browser).to.be.equal('Bot')
    })

  })
})
