'use strict'

const router = require('express').Router()
const { Op } = require('sequelize')
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
  const ip = req.connection.remoteAddress
  ClientEvent.create({ type, page, target, time, userAgent, userId, ip })
    .then(event => res.status(201).json(event))
    .catch(next)
})

router.post('/latest', (req, res, next) => {
  const { latestFetch } = req.body
  ClientEvent.findAll({
    where: {
      createdAt: {
        [Op.gt]: latestFetch
      }
    },
    order: [ [ 'createdAt', 'DESC' ]]
  })
    .then(events => res.json(events))
    .catch(next)
})
