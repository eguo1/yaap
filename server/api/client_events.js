'use strict'

const router = require('express').Router()
const { ClientEvent } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  ClientEvent.findAll()
    .then(events => res.json(events))
    .catch(next)
})
