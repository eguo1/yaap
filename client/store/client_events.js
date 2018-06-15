'use strict'

import axios from 'axios'

const GET_ALL_EVENTS = 'GET_EVENTS'
const GET_LATEST_EVENTS = 'GET_LATEST_EVENTS'
const UPDATE_TIMESTAMP = 'STORE_TIMESTAMP'

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

