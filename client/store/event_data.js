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
      const frequencyObj = action.eventData.reduce((result, event) => {
        if (result[event.timeElapsed]) {
          result[event.timeElapsed]++
        } else {
          result[event.timeElapsed] = 1
        }
        return result
      }, {})

      const resultArr = []

      for (let key in frequencyObj) {
        if (frequencyObj.hasOwnProperty(key)) {
          resultArr.push({ seconds: +key, events: frequencyObj[key] })
        }
      }
      return resultArr
    default:
      return state
  }
}
