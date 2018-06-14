'use strict'

const router = require('express').Router()
module.exports = router

router.use('/events', require('./client_events'))

router.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})
