'use strict'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { eventsReducer, latestFetchReducer, latestEventsReducer } from './client_events'

const reducer = combineReducers({
  events: eventsReducer,
  latestFetch: latestFetchReducer,
  latestEvents: latestEventsReducer
})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
))

const store = createStore(reducer, middleware)

export default store
