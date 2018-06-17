'use strict'

import { expect } from 'chai'

import { UPDATE_EVENT_DATA, eventDataReducer } from './event_data'

const fakeSingleEventData = [{
  seconds: 52,
  events: 1
}]


const fakeEventData = [{
  seconds: 52,
  events: 2
}, {
  seconds: 8,
  events: 1
}]


describe('Event Data reducer', () => {
  it('should return the initial state', () => {
    expect(eventDataReducer([], 'not-a-valid-action')).to.deep.equal([])
  })

  it('should handle UPDATE_EVENT_DATA', () => {
    const updateData = {
      type: UPDATE_EVENT_DATA,
      eventData: fakeEventData
    }
    expect(eventDataReducer([], updateData)).to.deep.equal(fakeEventData)
  })
})
