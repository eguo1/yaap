'use strict'

import { expect } from 'chai'

import { UPDATE_EVENT_DATA, eventDataReducer } from './event_data'

const fakeSingleEventData = [{
  id: 1,
  type: 'click',
  timeElapsed: 52
}]

const fakeSingleResult = [{
  seconds: 52,
  events: 1
}]

const fakeEventData = [{
  id: 1,
  type: 'click',
  timeElapsed: 52
}, {
  id: 2,
  type: 'click',
  timeElapsed: 52
}]

const fakeResult = [{
  seconds: 52,
  events: 2
}]

describe('Event Data reducer', () => {
  it('should return the initial state', () => {
    expect(eventDataReducer([], 'not-a-valid-action')).to.deep.equal([])
  })

  describe('the UPDATE_EVENT_DATA action', () => {
    it('should handle new events', () => {
      const updateData = {
        type: UPDATE_EVENT_DATA,
        eventData: fakeSingleEventData
      }
      expect(eventDataReducer([], updateData)).to.deep.equal(fakeSingleResult)
    })

    it('should handle multiple new events', () => {
      const updateData = {
        type: UPDATE_EVENT_DATA,
        eventData: fakeEventData
      }
      expect(eventDataReducer([], updateData)).to.deep.equal(fakeResult)
    })
  })
})
