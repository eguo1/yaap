'use strict'

import axios from 'axios'

export const UPDATE_EVENT_DATA = 'UPDATE_EVENT_DATA'
export const UPDATE_TIMESTAMP = 'UPDATE_TIMESTAMP'
export const UPDATE_BROWSER_DATA = 'UPDATE_BROWSER_DATA'

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

const updateBrowserData = browserData => {
  return {
    type: UPDATE_BROWSER_DATA,
    browserData
  }
}

export const fetchEventData = (latestFetch) => {
  return async dispatch => {
    const { data } = await axios.post('/api/events/data', { latestFetch })
    dispatch(updateEventData(data.eventData))
    dispatch(updateTimestamp(data.latestFetch))
  }
}

export const fetchBrowserData = (latestFetch) => {
  return async dispatch => {
    const { data } = await axios.post('/api/events/browser', { latestFetch })
    dispatch(updateBrowserData(data.browserData))
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

export const eventBrowserReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_BROWSER_DATA:
      return action.browserData
    default:
      return state
  }
}

const defaultLatestFetch = (
  new Date(Date.now()))
    .toISOString()
    .replace('T', ' ')
    .replace('Z', '') + '+00'

export const latestFetchReducer = (state = defaultLatestFetch, action) => {
  switch (action.type) {
    case UPDATE_TIMESTAMP:
      return action.latestFetch
    default:
      return state
  }
}
