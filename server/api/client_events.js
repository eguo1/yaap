'use strict'

const router = require('express').Router()
const { ClientEvent } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  ClientEvent.findAll()
    .then(events => res.json(events))
    .catch(next)
})

router.get('/:eventId', (req, res, next) => {
  ClientEvent.findById(req.params.eventId)
    .then(event => res.json(event))
    .catch(next)
})

router.post('/', (req, res, next) => {
  const { type, page, target, time, userAgent, userId } = req.body
  ClientEvent.create({ type, page, target, time, userAgent, userId })
    .then(event => res.status(201).json(event))
    .catch(next)
})
