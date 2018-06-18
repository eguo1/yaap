'use strict'

import { expect } from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

import {
  UPDATE_TIMESTAMP,
  UPDATE_EVENT_DATA,
  UPDATE_BROWSER_DATA,
  fetchEventData,
  eventDataReducer,
  eventBrowserReducer,
  latestFetchReducer,
} from './client_events'

const mockStore = configureMockStore([thunkMiddleware])

const fakeTime = '2018-06-15 19:50:46.469+00'

const fakeEventData = [{
  seconds: 52,
  events: 2
}, {
  seconds: 8,
  events: 1
}]

const initialState = {
  latestFetch: '',
  eventData: []
}

describe('latestFetch reducer', () => {
  it('should return the initial state', () => {
    expect(latestFetchReducer('', 'not-a-valid-action')).to.deep.equal('')
  })

  it('should handle UPDATE_TIMESTAMP', () => {
    const updateTime = {
      type: UPDATE_TIMESTAMP,
      latestFetch: fakeTime
    }
    expect(latestFetchReducer('', updateTime)).to.deep.equal(fakeTime)
  })
})

describe('eventData reducer', () => {
  it('should return the initial state', () => {
    expect(eventDataReducer([], 'not-a-valid-action')).to.deep.equal([])
  })

  it('should handle UPDATE_EVENT_DATA', () => {
    const updateEventData = {
      type: UPDATE_EVENT_DATA,
      eventData: fakeEventData
    }
    expect(eventDataReducer([], updateEventData)).to.deep.equal(fakeEventData)
  })
})

describe('eventBrowser reducer', () => {
  it('should return the initial state', () => {
    expect(eventBrowserReducer({}, 'not-a-valid-action')).to.deep.equal({})
  })

  it('should handle UPDATE_EVENT_BROWSER_DATA', () => {
    const updateEventBrowserData = {
      type: UPDATE_BROWSER_DATA,
      browserData: { ie: fakeEventData }
    }
    expect(eventBrowserReducer({}, updateEventBrowserData)).to.deep.equal({ ie: fakeEventData })
  })
})

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


  describe('fetchEventData', () => {
    beforeEach(() => {
      mockAxios.onPost('/api/events/data', { latestFetch: fakeTime })
        .replyOnce(200, { eventData: fakeEventData, latestFetch: fakeTime })
    })

    it('dispatches the UPDATE_EVENT_DATA action with the events array', () => {
      return store.dispatch(fetchEventData(fakeTime))
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal(UPDATE_EVENT_DATA)
          expect(actions[0].eventData).to.be.deep.equal(fakeEventData)
        })
    })

    it('dispatches the UPDATE_TIMESTAMP action with the latestFetch string', () => {
      return store.dispatch(fetchEventData(fakeTime))
        .then(() => {
          const actions = store.getActions()
          expect(actions[1].type).to.be.equal(UPDATE_TIMESTAMP)
          expect(actions[1].latestFetch).to.be.deep.equal(fakeTime)
        })
    })
  })
})

