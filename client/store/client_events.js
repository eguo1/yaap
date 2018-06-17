'use strict'

import axios from 'axios'

export const GET_ALL_EVENTS = 'GET_EVENTS'
export const GET_LATEST_EVENTS = 'GET_LATEST_EVENTS'
export const UPDATE_TIMESTAMP = 'STORE_TIMESTAMP'

export const getAllEvents = events => {
  return {
    type: GET_ALL_EVENTS,
    events
  }
}

const getLatestEvents = events => {
  return {
    type: GET_LATEST_EVENTS,
    events
  }
}

const updateTimestamp = latestFetch => {
  return {
    type: UPDATE_TIMESTAMP,
    latestFetch
  }
}

export const fetchEventsFromServer = () => {
  return async dispatch => {
    const { data } = await axios.get('/api/events')
    dispatch(getAllEvents(data))
  }
}

export const fetchLatestEvents = (timestamp) => {
  return async dispatch => {
    const { data } = await axios.post('/api/events/latest', timestamp)
    dispatch(getLatestEvents(data.events))
    dispatch(updateTimestamp(data.latestFetch))
  }
}

export const eventsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_EVENTS:
      return [ ...state, ...action.events ]
    case GET_LATEST_EVENTS:
      return [ ...state, ...action.events ]
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
