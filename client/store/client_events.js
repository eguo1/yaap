'use strict'

import axios from 'axios'

export const UPDATE_EVENT_DATA = 'UPDATE_EVENT_DATA'
export const UPDATE_TIMESTAMP = 'UPDATE_TIMESTAMP'

export const updateEventData = eventData => {
  return {
    type: UPDATE_EVENT_DATA,
    eventData: eventData
  }
}

const updateTimestamp = latestFetch => {
  return {
    type: UPDATE_TIMESTAMP,
    latestFetch
  }
}

export const fetchEventData = (timestamp) => {
  return async dispatch => {
    const { data } = await axios.post('/api/events/data', timestamp)
    dispatch(updateEventData(data.eventData))
    dispatch(updateTimestamp(data.latestFetch))
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

export const latestFetchReducer = (state = '', action) => {
  switch (action.type) {
    case UPDATE_TIMESTAMP:
      return action.latestFetch
    default:
      return state
  }
}
