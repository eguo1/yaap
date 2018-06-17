'use strict'

import { expect } from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

import {
  GET_ALL_EVENTS,
  fetchEventsFromServer,
  getAllEvents,
  eventsReducer,
} from './client_events'

const mockStore = configureMockStore([thunkMiddleware])

const fakeEvents = [{
  type: 'click',
  page: '/profile',
  target: 'edit-profile',
  time: Date.now(),
  ip: '1.1.1.1',
  userAgent: 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
  userId: 1
}, {
  type: 'click',
  page: '/profile',
  target: 'edit-profile',
  time: Date.now(),
  ip: '2.1.1.1',
  userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36',
  userId: 2
}, {
  type: 'click',
  page: '/profile',
  target: 'edit-profile',
  time: Date.now(),
  ip: '3.1.1.1',
  userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36 OPR/38.0.2220.41',
  userId: 3
}, {
  type: 'click',
  page: '/profile',
  target: 'edit-profile',
  time: Date.now(),
  ip: '4.1.1.1',
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1',
  userId: 4
}, {
  type: 'click',
  page: '/profile',
  target: 'edit-profile',
  time: Date.now(),
  ip: '5.1.1.1',
  userAgent: 'Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0)',
  userId: 5
}, {
  type: 'click',
  page: '/',
  target: 'search',
  time: Date.now(),
  ip: '6.1.1.1',
  userAgent: 'Googlebot/2.1 (+http://www.google.com/bot.html)',
  userId: 6
}]

const initialState = {
  events: [],
  latestFetch: ''
}

describe('Thunk creators', () => {
  let store
  let mockAxios

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchEventsFromServer thunk', () => {
    it('dispatches the GET_ALL_EVENTS thunk', () => {
      mockAxios.onGet('/api/events').replyOnce(200, fakeEvents)
      return store.dispatch(fetchEventsFromServer())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal(GET_ALL_EVENTS)
          expect(actions[0].events).to.be.deep.equal(fakeEvents)
        })
    })
  })
})


describe('Events reducer', () => {
  it('should return the initial state', () => {
    expect(eventsReducer([], 'not-a-valid-action')).to.eql([])
  })
  it('should handle GET_ALL_EVENTS', () => {
    const getAction = {
      type: GET_ALL_EVENTS,
      events: fakeEvents
    }
    expect(eventsReducer([], getAction)).to.eql(fakeEvents)
  })
})