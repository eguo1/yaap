'use strict'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { latestFetchReducer, eventDataReducer, eventBrowserReducer } from './client_events'

const reducer = combineReducers({
  latestFetch: latestFetchReducer,
  eventData: eventDataReducer,
  browserData: eventBrowserReducer
})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
))

const store = createStore(reducer, middleware)

export default store
