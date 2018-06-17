'use strict'

import axios from 'axios'

export const GET_ALL_EVENTS = 'GET_EVENTS'
export const GET_LATEST_EVENTS = 'GET_LATEST_EVENTS'
export const UPDATE_TIMESTAMP = 'STORE_TIMESTAMP'

const getAllEvents = events => {
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

export const eventsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_EVENTS:
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
