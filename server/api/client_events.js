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

router.post('/data', (req, res, next) => {
  const { latestFetch } = req.body
  ClientEvent.returnData(latestFetch)
    .then(result => { res.json(result) })
    .catch(next)
})

router.post('/browser', (req, res, next) => {
  const { latestFetch } = req.body
  ClientEvent.returnDataBrowser(latestFetch)
    .then(result => { res.json(result) })
    .catch(next)
})

// router.post('/latest', (req, res, next) => {
//   const { latestFetch } = req.body
//   ClientEvent.findAll({
//     where: {
//       createdAt: {
//         [Op.lte]: latestFetch,
//         [Op.gt]: sixtySecCheck(latestFetch)
//       }
//     }
//   })
//     .then(events => {
//       return events.map(event => {
//         const timeElapsed = event.timeData(latestFetch)
//         return {
//           id: event.id,
//           type: event.type,
//           timeElapsed
//         }
//       })
//     })
//     .then(events => {
//       const response = { events }
//       const lastTime = (new Date(latestFetch)).getTime()
//       const updatedTime = (new Date(lastTime + 1000)).toISOString()
//       response.latestFetch = updatedTime.replace('T', ' ').replace('Z', '') + '+00'
//       res.json(response)
//     })
//     .catch(next)
// })


