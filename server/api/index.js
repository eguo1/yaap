'use strict'

const router = require('express').Router()
module.exports.router = router

router.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})
