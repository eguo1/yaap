'use strict'

export const UPDATE_EVENT_DATA = 'UPDATE_EVENT_DATA'

export const updateEventData = eventData => {
  return {
    type: UPDATE_EVENT_DATA,
    eventData: eventData
  }
}

export const eventDataReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_EVENT_DATA:
      return action.eventData
    default:
      return state
  }
}
