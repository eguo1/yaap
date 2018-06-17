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

describe('Event Data reducer', () => {
  it('should return the initial state', () => {
    expect(eventDataReducer([], 'not-a-valid-action')).to.deep.equal([])
  })

  describe('the UPDATE_EVENT_DATA action', () => {
    it('should single new events', () => {
      const updateData = {
        type: UPDATE_EVENT_DATA,
        eventData: fakeSingleEventData
      }
      expect(eventDataReducer([], updateData)).to.deep.equal(fakeSingleResult)
    })
  })
})
