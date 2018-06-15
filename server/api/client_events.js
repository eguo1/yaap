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
